const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../JS/website-consent.js'), 'utf8');

// Execute the complete deployed integration with no real DOM, fetch or vendor SDK.
function harness(analytics = true, marketing = false) {
  let now = 1000000, nextTimer = 0, reloads = 0;
  const timers = new Map(), events = {}, scripts = [], captures = [], sdkCalls = [];
  const store = new Map();
  function save(a, m) { store.set('unify_consent_v1', JSON.stringify({version:1, analytics:a, marketing:m, savedAt:now})); }
  save(analytics, marketing);
  const location = new URL('https://www.unifygtm.com/');
  location.reload = () => reloads++;
  const document = {
    readyState: 'loading', addEventListener() {},
    getElementById: id => scripts.find(s => s.id === id && !s.removed),
    querySelectorAll: () => scripts.filter(s => !s.removed),
    createElement: () => ({ remove() { this.removed = true; } }),
    head: { appendChild(s) { scripts.push(s); } },
  };
  const window = { addEventListener(name, fn) { (events[name] ||= []).push(fn); } };
  const history = {};
  for (const method of ['pushState', 'replaceState']) history[method] = (_, __, url) => { location.href = new URL(url, location).href; };
  const context = vm.createContext({window, document, location, history, navigator: {},
    localStorage: {getItem:k=>store.get(k) || null, setItem:(k,v)=>store.set(k,v), removeItem:k=>store.delete(k)},
    Date: {now:()=>now}, console:{warn(){},error(){}},
    fetch: () => new Promise(() => {}), // Never performs a network request.
    setTimeout(fn, ms) { const id = ++nextTimer; timers.set(id,{fn,at:now+ms,ms}); return id; },
    clearTimeout:id=>timers.delete(id),
  });
  vm.runInContext(source, context);
  function emit(name, data = {}) { for (const fn of events[name] || []) fn(data); }
  function advance(ms) {
    const end = now + ms;
    for (;;) {
      const first = [...timers].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];
      if (!first) break;
      now = first[1].at; timers.delete(first[0]); first[1].fn();
    }
    now = end;
  }
  const attempts = () => scripts.filter(s=>s.id === 'unify-posthog');
  const stub = window.posthog;
  let initStub = stub;
  const options = () => (initStub ||= window.posthog)._i[0][1];
  const sdk = {capture:(name,props)=>captures.push({name,props}),
    set_config:v=>sdkCalls.push(['config',v]), opt_in_capturing:()=>sdkCalls.push(['in']),
    opt_out_capturing:()=>sdkCalls.push(['out']), stopSessionRecording:()=>sdkCalls.push(['stop'])};
  return {window, scripts, attempts, captures, sdkCalls, advance, emit, history, stub,
    error:()=>attempts().at(-1).onerror(), ready:()=>options().loaded(sdk),
    consent(a,m=false) { save(a,m); emit('storage',{key:'unify_consent_v1'}); },
    retries:()=>[...timers.values()].filter(t=>t.ms===1000 || t.ms===3000).length,
    reloads:()=>reloads,
    reinstall:()=>vm.runInContext(source,context)};
}

test('initial success initializes once and sends one initial pageview',()=>{
  const h=harness(); assert.equal(h.attempts().length,1); h.ready(); h.ready(); h.reinstall();
  h.consent(true); h.advance(10000); assert.equal(h.captures.length,1); assert.equal(h.attempts().length,1);
  assert.equal(h.stub._i.length,1);
});
test('transient error recovers using same URL, queue and one initialization',()=>{
  const h=harness(); const original=h.attempts()[0]; h.error(); h.consent(true); h.consent(true);
  assert.equal(h.retries(),1); h.advance(999); assert.equal(h.attempts().length,1);
  h.advance(1); assert.equal(h.attempts().length,2); assert.equal(h.attempts()[1].src,original.src);
  assert.equal(h.window.posthog,h.stub); assert.equal(h.stub._i.length,1);
  original.onerror(); assert.equal(h.retries(),0); h.ready(); h.ready(); assert.equal(h.captures.length,1);
});
test('persistent failure stops after three total attempts despite updates or restoration',()=>{
  const h=harness(); h.error(); h.advance(1000); h.error(); h.advance(3000); h.error();
  h.consent(true); h.emit('pageshow',{persisted:true}); h.advance(100000);
  assert.equal(h.attempts().length,3); assert.equal(h.retries(),0); assert.equal(h.captures.length,0);
});
for (const marketing of [false,true]) test(`analytics denied, marketing ${marketing}: no PostHog load`,()=>{
  const h=harness(false,marketing); h.advance(10000); assert.equal(h.attempts().length,0);
  assert.equal(h.scripts.filter(s=>s.id==='unify-gtm').length,marketing?1:0);
});
test('withdrawal cancels pending retry; later explicit grant retains remaining budget',()=>{
  const h=harness(); h.error(); h.consent(false); assert.equal(h.retries(),0); assert.equal(h.reloads(),1);
  h.advance(10000); assert.equal(h.attempts().length,1);
  h.consent(true); assert.equal(h.retries(),1); h.advance(1000); h.ready(); assert.equal(h.captures.length,1);
});
test('withdrawal during in-flight recovery suppresses late readiness pageview and opts out',()=>{
  const h=harness(); h.error(); h.advance(1000); h.consent(false); h.ready(); h.advance(10000);
  assert.equal(h.captures.length,0); assert.ok(h.sdkCalls.some(c=>c[0]==='out')); assert.equal(h.attempts().length,2);
});
test('pagehide cancels recovery and BFCache restoration resumes only while allowed',()=>{
  const h=harness(); h.error(); h.emit('pagehide'); h.advance(10000); assert.equal(h.attempts().length,1);
  h.emit('pageshow',{persisted:true}); h.advance(1000); h.ready(); assert.equal(h.captures.length,1);
  h.emit('pageshow',{persisted:true}); assert.equal(h.captures.length,1);
});
test('resource error after pagehide stays suspended; restored denial prevents retry',()=>{
  const h=harness(); h.emit('pagehide'); h.error(); h.advance(10000); assert.equal(h.attempts().length,1);
  h.consent(false); h.emit('pageshow',{persisted:true}); h.advance(10000); assert.equal(h.attempts().length,1);
});
test('navigation before recovery captures current URL once, then normal history continues',()=>{
  const h=harness(); h.error(); h.history.pushState(null,'','/pricing'); h.advance(1000);
  h.ready(); assert.equal(h.captures.length,1); assert.equal(h.captures[0].props.$current_url,'https://www.unifygtm.com/pricing');
  h.history.replaceState(null,'','/pricing'); assert.equal(h.captures.length,1);
  h.history.pushState(null,'','/get-started'); assert.equal(h.captures.length,2);
});
test('does not replace another owner or retry a slow successful download',()=>{
  const h=harness(); h.advance(10000); assert.equal(h.attempts().length,1);
  h.error(); h.window.posthog={}; h.advance(10000); assert.equal(h.attempts().length,1);
});

test('grant after initial refusal starts once; withdrawal after readiness stops capture',()=>{
  const h=harness(false); h.consent(true); h.ready(); assert.equal(h.attempts().length,1);
  assert.equal(h.captures.length,1); h.consent(false); h.history.pushState(null,'','/pricing');
  h.advance(10000); assert.equal(h.captures.length,1); assert.equal(h.retries(),0);
});
test('recovery does not remove an unrelated element using the loader id',()=>{
  const h=harness(); h.error(); const other={id:'unify-posthog',src:'https://example.invalid/other.js'};
  h.scripts.push(other); h.advance(10000); assert.equal(h.attempts().length,2); assert.equal(other.removed,undefined);
});
