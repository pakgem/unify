
(// Self-contained: the build embeds this same function in Next.js and Webflow.
function installConsent(config, resolveRegionPolicy) {
  'use strict';
  if (!config.enabled || window.UnifyConsent) return;
  // Keep token-bearing report and verification routes outside marketing collection.
  if (config.allowedPaths && config.allowedPaths.indexOf(location.pathname.replace(/\/$/, '') || '/') === -1) return;
  var productionHost = ['www.unifygtm.com', 'unifygtm.com'].indexOf(location.hostname) !== -1;
  var live = config.mode === 'production' && productionHost && location.protocol === 'https:';
  // Preview mode exercises the UI and state machine without contacting vendors.
  if (config.mode === 'production' && !live) return;
  if (config.mode === 'preview' && productionHost) return;

  var storageKey = live ? 'unify_consent_v1' : 'unify_consent_preview_v1';
  var maxAge = 180 * 24 * 60 * 60 * 1000;
  var listeners = [];
  var googleConsentListener;
  var storageAvailable = canPersistChoice();
  var choice = readChoice();
  var state = choice || { analytics: false, marketing: false };
  var gtmStarted = false;
  var posthogStarted = false;
  var posthogReady = false;
  var posthogConsent;
  var posthogIsCookieless = false;
  var measurementInput;
  var measurementNotice;
  var measurementWasAllowed = false;
  var googleAdvancedWasAllowed = false;
  var banner;
  var settingsButton;
  var preferenceOpener;
  var analyticsInput;
  var marketingInput;
  var preferenceFields;
  var closeButton;
  var expiryTimer;
  var regionPolicy = { mode: 'review', rule: 'unresolved', country: null, region: null };
  var regionPending = config.regional === true;
  var preferencesOpen = false;
  var gpcNotice;
  var optOutNotice;
  var optOutButton;
  var optInConfirmation;
  window.dataLayer = window.dataLayer || [];

  function canPersistChoice() {
    try {
      var key = storageKey + '_check';
      localStorage.setItem(key, '1');
      localStorage.removeItem(key);
      return true;
    } catch (_) { return false; }
  }

  function readChoice() {
    if (!storageAvailable) return null;
    try {
      var saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && saved.version === 1 && typeof saved.analytics === 'boolean' &&
          typeof saved.marketing === 'boolean' && Number.isFinite(saved.savedAt) &&
          saved.savedAt <= Date.now()) {
        if (Date.now() - saved.savedAt < maxAge) return saved;
        // Expiring a permission must never turn a refusal into a regional grant.
        // Keep refusals until the visitor changes them or clears site storage.
        if (!saved.analytics || !saved.marketing || saved.saleSharingOptOut === true) {
          return Object.assign({}, saved, { analytics: false, marketing: false, measurement: false });
        }
      }
    } catch (_) { storageAvailable = false; }
    return null;
  }

  function effectiveChoice() {
    return choice || (storageAvailable && !regionPending && regionPolicy.defaults) || { analytics: false, marketing: false };
  }

  function decisionSource() {
    if (gpcEnabled() || choice && choice.source === 'gpc') return 'gpc';
    if (!choice && storageAvailable && !regionPending && regionPolicy.rule === 'unknown' && regionPolicy.mode === 'privacy_controls') return 'unknown_geography_default';
    return choice ? 'explicit_choice' : (storageAvailable && !regionPending && regionPolicy.mode === 'privacy_controls' ? 'regional_default' : 'default_denied');
  }

  function measurementPolicy() {
    var approved = !regionPending && regionPolicy.measurement || {};
    return {
      googleAdvanced: config.googleAdvanced === true && approved.googleAdvanced === true,
      posthogCookieless: config.posthogCookieless === true && approved.posthogCookieless === true,
    };
  }

  function limitedAllowed() {
    // Old saved refusals also suppress reduced collection. No opt-out migration grants.
    return !gpcEnabled() && (!choice || choice.saleSharingOptOut !== true && choice.measurement === true);
  }

  function googleAdvancedAllowed() {
    // GPC also suppresses reduced Google advertising measurements in this release.
    return measurementPolicy().googleAdvanced && limitedAllowed() && !gpcEnabled();
  }

  function posthogAllowed() {
    if (posthogIsCookieless || measurementPolicy().posthogCookieless) return limitedAllowed();
    return state.analytics;
  }

  function googleState() {
    return {
      analytics_storage: state.analytics ? 'granted' : 'denied',
      ad_storage: state.marketing ? 'granted' : 'denied',
      ad_user_data: state.marketing ? 'granted' : 'denied',
      ad_personalization: state.marketing ? 'granted' : 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    };
  }

  function command() { window.dataLayer.push(arguments); }
  // Defaults precede any GTM script and all measurement commands.
  if (config.googleConsentOwner !== 'gtm') command('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied',
    ad_personalization: 'denied', functionality_storage: 'denied',
    personalization_storage: 'denied', security_storage: 'granted',
  });

  // Configure redaction before any Google tags. Do not forward click IDs across URLs.
  if (config.googleConsentOwner !== 'gtm') {
    command('set', 'ads_data_redaction', true);
    command('set', 'url_passthrough', false);
  }

  function appendScript(id, src, onerror) {
    if (document.getElementById(id)) return;
    var script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    script.onerror = onerror || null;
    document.head.appendChild(script);
  }

  function syncPosthog() {
    var allowed = posthogAllowed();
    if (!posthogReady || posthogConsent === allowed) return;
    posthogConsent = allowed;
    if (posthogIsCookieless) {
      // In always mode SDK opt-in/out methods are ignored. before_send enforces withdrawal.
      window.posthog.set_config({ disable_persistence: true });
      return;
    }
    if (allowed) {
      window.posthog.set_config({ disable_persistence: false });
      window.posthog.opt_in_capturing();
    } else {
      window.posthog.opt_out_capturing();
      window.posthog.stopSessionRecording();
      window.posthog.set_config({ disable_persistence: true });
    }
  }

  function startPosthog() {
    if (!live || posthogStarted || !posthogAllowed()) return;
    // Resolve the regional strategy before initializing this SDK, even for saved grants.
    if (regionPending && config.posthogCookieless === true) return;
    // Activation requires removal of other SDK initializers, including Segment destinations.
    if (window.posthog) {
      console.error('Website consent: an existing PostHog loader must be removed before activation.');
      return;
    }
    posthogStarted = true;
    posthogIsCookieless = measurementPolicy().posthogCookieless;
    var stub = [];
    stub._i = [];
    stub.__SV = 1;
    ['capture', 'opt_in_capturing', 'opt_out_capturing', 'set_config', 'stopSessionRecording'].forEach(function (method) {
      stub[method] = function () { stub.push([method].concat(Array.prototype.slice.call(arguments))); };
    });
    var options = {
      api_host: 'https://us.i.posthog.com',
      defaults: '2026-05-30',
      person_profiles: posthogIsCookieless ? 'never' : 'identified_only',
      cookieless_mode: posthogIsCookieless ? 'always' : undefined,
      persistence: 'localStorage',
      disable_persistence: true,
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true,
      capture_pageview: false,
      capture_pageleave: false,
      autocapture: false,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_feature_flags: true,
      before_send: filterPosthogEvent,
      loaded: function (sdk) {
        window.posthog = sdk;
        posthogReady = true;
        syncPosthog();
        if (posthogAllowed()) capturePage();
      },
    };
    if (posthogIsCookieless) {
      options.persistence = 'memory';
      options.save_campaign_params = false;
      options.save_referrer = false;
      options.request_batching = false;
      options.advanced_disable_flags = true;
      options.__preview_remote_config = false;
      options.capture_performance = false;
      options.capture_exceptions = false;
      options.enable_heatmaps = false;
    }
    stub._i.push([config.posthogKey, options, 'posthog']);
    window.posthog = stub;
    appendScript('unify-posthog', 'https://us-assets.i.posthog.com/static/array.js', function () {
      // Keep the consent choice. A later page load may retry without opting in silently.
      console.warn('Website consent: PostHog failed to load.');
    });
  }

  function startGtm() {
    if (!live || gtmStarted || (!state.analytics && !state.marketing && !googleAdvancedAllowed())) return;
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf('googletagmanager.com/gtm.js') !== -1 ||
          /^\/d7hn(?:[/?]|$)/.test(new URL(scripts[i].src, location.href).pathname) ||
          scripts[i].src.indexOf('/lsfr9no2cgfp') !== -1) {
        console.error('Website consent: an existing GTM loader must be removed before activation.');
        return;
      }
    }
    gtmStarted = true;
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    // This same-origin path serves GTM-5NKFVR3 through the Terraform-managed gateway.
    appendScript('unify-gtm', '/d7hn/?id=' + encodeURIComponent(config.gtmId));
  }

  function pageGroup() {
    // Coarse, fixed labels only: no free-form path, query, hash or form values.
    var segment = location.pathname.split('/')[1];
    return ['get-started', 'insights', 'integrations', 'use-cases', 'the-jump', 'versus', 'blog'].indexOf(segment) !== -1 ? segment : (segment ? 'other' : 'home');
  }

  function filterPosthogEvent(event) {
    if (!posthogAllowed()) return null;
    if (!posthogIsCookieless) return event;
    if (event.event !== '$pageview') return null;
    // Preserve only the SDK's documented cookieless ingestion markers and project token.
    var props = event.properties || {};
    if (props.$cookieless_mode !== true || props.distinct_id !== '$posthog_cookieless') return null;
    return {
      event: '$pageview',
      timestamp: event.timestamp,
      properties: {
        token: config.posthogKey,
        distinct_id: '$posthog_cookieless',
        $cookieless_mode: true,
        $process_person_profile: false,
        $geoip_disable: true,
        $current_url: location.origin + '/' + pageGroup(),
        page_group: pageGroup(),
      },
    };
  }

  function capturePage() {
    if (live && posthogAllowed() && posthogReady) {
      window.posthog.capture('$pageview', posthogIsCookieless ? {} : { $current_url: location.href });
    }
  }

  function apply(next, persist) {
    var previouslyPosthog = posthogAllowed();
    var previouslyLimited = measurementWasAllowed;
    // The live Google tag has both GA4 and Ads destinations. Until those are
    // independently verified, a sale/sharing opt-out stops all optional vendors.
    var optedOut = gpcEnabled() || next.saleSharingOptOut === true;
    var effective = { analytics: next.analytics === true && !optedOut, marketing: next.marketing === true && !optedOut };
    var revoked = (state.analytics && !effective.analytics) || (state.marketing && !effective.marketing);
    state = effective;
    // GPC is an opt-out request, not an affirmative consent. Preserve it after
    // the browser signal disappears, without repeatedly renewing its timestamp.
    if (gpcEnabled() && (!choice || choice.source !== 'gpc' || !choice.saleSharingOptOut)) {
      choice = { version: 1, analytics: false, marketing: false, measurement: false,
        saleSharingOptOut: true, source: 'gpc', savedAt: choice ? choice.savedAt : Date.now() };
      try { localStorage.setItem(storageKey, JSON.stringify(choice)); } catch (_) { storageAvailable = false; }
    }
    if (persist && !gpcEnabled()) {
      choice = { version: 1, analytics: state.analytics, marketing: state.marketing,
        measurement: next.measurement === true && !optedOut, saleSharingOptOut: optedOut,
        source: 'explicit_choice', savedAt: Date.now() };
      try { localStorage.setItem(storageKey, JSON.stringify(choice)); } catch (_) { storageAvailable = false; }
    }
    measurementWasAllowed = limitedAllowed();
    revoked = revoked || (previouslyLimited && !measurementWasAllowed) ||
      (googleAdvancedWasAllowed && !googleAdvancedAllowed());
    googleAdvancedWasAllowed = googleAdvancedAllowed();
    // The reviewed GTM consent template subscribes here and applies updateConsentState
    // synchronously, before a consent event can trigger a measurement tag.
    if (googleConsentListener) {
      googleConsentListener(googleState());
    } else if (config.googleConsentOwner !== 'gtm') {
      command('consent', 'update', googleState());
    }
    listeners.slice().forEach(function (callback) {
      try { callback(googleState()); } catch (_) { console.warn('Website consent: a vendor callback failed.'); }
    });
    syncPosthog();
    window.dataLayer.push({
      event: 'unify_consent_update',
      unify_analytics_consent: state.analytics,
      unify_marketing_consent: state.marketing,
      unify_consent_source: decisionSource(),
      unify_google_advanced: googleAdvancedAllowed(),
    });
    if (revoked && live && (gtmStarted || posthogStarted)) {
      // Third-party scripts cannot be unloaded reliably. Reload after synchronous
      // denial and persistence, so the next page starts from the saved restrictions.
      if (banner) renderChoice();
      location.reload();
      return;
    }
    startGtm();
    startPosthog();
    if (!previouslyPosthog && posthogAllowed() && posthogReady) capturePage();
    scheduleExpiry();
    if (banner) renderChoice();
  }

  function scheduleExpiry() {
    clearTimeout(expiryTimer);
    if (!choice || (!choice.analytics && !choice.marketing && !choice.measurement)) return;
    // Recheck at least daily to stay within the browser's timer limit.
    expiryTimer = setTimeout(refreshChoice, Math.min(86400000, Math.max(1, choice.savedAt + maxAge - Date.now())));
  }

  function refreshChoice() {
    var saved = readChoice();
    if (storageAvailable || !choice || Date.now() - choice.savedAt >= maxAge) choice = saved;
    var next = effectiveChoice();
    var optedOut = gpcEnabled() || next.saleSharingOptOut === true;
    if (googleAdvancedWasAllowed === googleAdvancedAllowed() && measurementWasAllowed === limitedAllowed() && !(gpcEnabled() && (!choice || choice.source !== 'gpc')) && state.analytics === (next.analytics === true && !optedOut) && state.marketing === (next.marketing === true && !optedOut)) {
      scheduleExpiry();
      if (banner) renderChoice();
      return;
    }
    apply(next, false);
  }

  function renderChoice() {
    var usControls = (regionPolicy.country === 'US' || regionPolicy.rule === 'unknown') && regionPolicy.mode === 'privacy_controls';
    var optedOut = !!(choice && choice.saleSharingOptOut);
    analyticsInput.checked = state.analytics;
    analyticsInput.disabled = gpcEnabled() || optedOut;
    marketingInput.checked = state.marketing;
    marketingInput.disabled = gpcEnabled() || optedOut;
    gpcNotice.hidden = !gpcEnabled();
    optOutNotice.hidden = !optedOut || gpcEnabled();
    optOutButton.hidden = optedOut || (!usControls && !preferencesOpen);
    settingsButton.textContent = (usControls ? 'Do Not Sell or Share My Personal Information' : 'Your Privacy Choices') + (optedOut ? ' (Opt-out active)' : '');
    banner.querySelector('.us-notice').hidden = !usControls;
    banner.querySelector('.choice-notice').hidden = usControls;
    // Do not solicit a new opt-in after an opt-out. Visitors can still turn
    // additional measurement off; restoring sale/sharing needs a separate flow.
    banner.querySelector('[data-action="accept"]').hidden = optedOut;
    banner.querySelector('[data-action="review-opt-in"]').hidden = !optedOut || gpcEnabled() || !preferencesOpen;
    if (!preferencesOpen || gpcEnabled()) optInConfirmation.hidden = true;
    var reduced = measurementPolicy();
    measurementInput.closest('label').hidden = !reduced.googleAdvanced && !reduced.posthogCookieless;
    measurementInput.checked = limitedAllowed();
    measurementInput.disabled = gpcEnabled() || optedOut;
    measurementNotice.hidden = !reduced.googleAdvanced && !reduced.posthogCookieless;
    var prompt = !choice && !regionPending && (!storageAvailable || regionPolicy.mode !== 'privacy_controls');
    banner.hidden = !preferencesOpen && !prompt;
    settingsButton.hidden = !banner.hidden;
    closeButton.hidden = !choice && regionPolicy.mode !== 'privacy_controls' && !regionPending;
  }

  function openSettings(opener) {
    if (!banner) return;
    preferenceOpener = opener && typeof opener.focus === 'function' ? opener : null;
    preferencesOpen = true;
    optInConfirmation.hidden = true;
    renderChoice();
    preferenceFields.hidden = false;
    settingsButton.hidden = true;
    analyticsInput.checked = state.analytics;
    marketingInput.checked = state.marketing;
    banner.querySelector('h2').focus();
  }

  window.UnifyConsent = {
    getGoogleConsent: googleState,
    getMeasurementPolicy: measurementPolicy,
    setGoogleConsentListener: function (callback) {
      googleConsentListener = callback;
      callback(googleState());
    },
    subscribe: function (callback) {
      listeners.push(callback);
      callback(googleState());
      return function () { listeners = listeners.filter(function (entry) { return entry !== callback; }); };
    },
    openPreferences: openSettings,
    getRegionPolicy: function () { return Object.assign({ pending: regionPending }, regionPolicy); },
  };

  function gpcEnabled() { return navigator.globalPrivacyControl === true; }

  function resolveRegion() {
    if (!regionPending) return;
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var finished = false;
    function finish(location) {
      if (finished) {
        // A late trusted location replaces the unknown fallback. Explicit
        // choices and GPC still take precedence over every regional default.
        if (location && regionPolicy.rule === 'unknown') {
          regionPolicy = resolveRegionPolicy(config.regionPolicy, location);
          apply(effectiveChoice(), false);
        }
        return;
      }
      finished = true;
      clearTimeout(timeout);
      regionPending = false;
      regionPolicy = resolveRegionPolicy(config.regionPolicy, location);
      if (!choice) apply(effectiveChoice(), false);
      else {
        startGtm();
        startPosthog();
        if (banner) renderChoice();
      }
      googleAdvancedWasAllowed = googleAdvancedAllowed();
      window.dataLayer.push({ event: 'unify_measurement_ready', unify_google_advanced: googleAdvancedAllowed() });
    }
    var timeout = setTimeout(function () {
      finish(null);
      if (controller) controller.abort();
    }, 1500);
    // Shared same-origin endpoint for Webflow and every public Vercel route.
    // No third-party IP service, query override, locale inference or cached geo.
    try {
      fetch('/privacy-region', { cache: 'no-store', credentials: 'omit',
        signal: controller ? controller.signal : undefined })
        .then(function (response) { if (!response.ok) throw new Error('Region unavailable'); return response.json(); })
        .then(function (location) { finish(location && location.source === 'cloudfront' ? location : null); })
        .catch(function () { finish(null); });
    } catch (_) { finish(null); }
  }

  function mount() {
    var host = document.createElement('div');
    host.id = 'unify-consent';
    host.className = 'ph-no-capture';
    // Shadow styles isolate this shared control from Webflow and each app's CSS.
    var root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>' +
      ':host{display:block;font-family:"Unify Consent Sans",Saans,Verdana,sans-serif;color:#241e20;font-size:16px;line-height:1.4;letter-spacing:-.01em}' +
      '*{box-sizing:border-box}[hidden]{display:none!important}' +
      'section{position:fixed;z-index:2147483000;bottom:16px;left:16px;width:min(480px,calc(100vw - 32px));max-height:calc(100dvh - 32px);overflow:auto;background:#fffff9;border:1px solid #a3a3a333;border-radius:8px;padding:24px;box-shadow:0 4px 20px #241e2014}' +
      'h2{font:400 24px/1.25 "Unify Consent Heading","Feature Text",Georgia,serif;letter-spacing:-.02em;margin:0 0 8px}p{margin:0 0 16px}a{color:inherit;text-decoration:underline;text-underline-offset:3px}' +
      '.actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}button{font:500 16px/1 "Unify Consent Sans",Saans,Verdana,sans-serif;letter-spacing:0;cursor:pointer;border:1px solid #241e20;border-radius:5px;padding:14px;min-height:48px;background:#241e20;color:#fffff9;transition:background-color .2s}' +
      'button:hover{background:#241e20cc}.actions button{min-width:0}button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid #fe3c01;outline-offset:3px}' +
      'fieldset{border:0;padding:0;margin:16px 0}legend{font-weight:500;margin-bottom:8px}label{display:flex;align-items:center;gap:10px;min-height:48px}input{width:20px;height:20px;flex-shrink:0;accent-color:#241e20}' +
      '[data-action="customize"],.settings,.close{background:#fffff9;color:#241e20;border-color:transparent;text-decoration:underline;text-underline-offset:3px;min-height:44px;padding:10px 14px}' +
      '[data-action="customize"],[data-action="opt-out"],[data-action="review-opt-in"]{grid-column:1/-1}.settings-footer{display:flex;justify-content:center;background:#fffff9}.settings{position:static;max-width:100%;font-size:13px;line-height:1.4;text-align:center;border:0;border-radius:0;background:transparent}.close{margin-top:8px}' +
      '[data-action="customize"]:hover,.settings:hover,.close:hover{background:#fe3c010d}' +
      '@media(max-width:380px){section{padding:16px}button{padding:12px 8px;font-size:14px}}@media(prefers-reduced-motion:reduce){button{transition:none}}' +
      '</style><section role="region" aria-labelledby="consent-title">' +
      '<h2 id="consent-title" tabindex="-1">Your privacy choices</h2>' +
      '<p class="choice-notice">We use optional cookies and similar technologies for analytics and advertising. Choose what to allow. <a href="https://www.unifygtm.com/legal/privacy-policy">Privacy policy</a></p>' +
      '<p class="us-notice" hidden>We use cookies and similar technologies for analytics and advertising. You can opt out of sale, sharing, and targeted advertising below. <a href="https://www.unifygtm.com/legal/privacy-policy">Privacy policy</a></p>' +
      '<p class="opt-out-notice" role="status" hidden>Your opt-out is active for this browser. Optional analytics and advertising are off.</p>' +
      '<p class="gpc" role="status" hidden>Global Privacy Control is on. Your opt-out is applied and optional analytics and advertising are off.</p>' +
      '<p class="measurement-notice" hidden>Where permitted, we also use limited measurement without cookies. You can turn it off in Customize or select Reject optional.</p>' +
      '<fieldset hidden><legend>Choose optional tracking</legend>' +
      '<label><input type="checkbox" name="analytics">Analytics</label>' +
      '<label><input type="checkbox" name="marketing">Marketing and advertising</label>' +
      '<label hidden><input type="checkbox" name="measurement">Allow limited measurement without cookies</label>' +
      '<p>Essential storage remembers your privacy choices.</p><button type="button" data-action="save">Save preferences</button></fieldset>' +
      '<div class="actions"><button type="button" data-action="opt-out">Opt out of sale, sharing, and targeted advertising</button>' +
      '<button type="button" data-action="reject">Reject optional</button>' +
      '<button type="button" data-action="accept">Accept all</button>' +
      '<button type="button" data-action="review-opt-in" hidden>Allow sale, sharing, and targeted advertising again</button>' +
      '<button type="button" data-action="customize">Customize</button></div>' +
      '<div class="opt-in-confirmation" hidden><p>Allow optional analytics and advertising again, including sale or sharing for targeted advertising? Your opt-out stays active unless you confirm.</p>' +
      '<button type="button" data-action="confirm-opt-in">Confirm: allow analytics and advertising</button>' +
      '<button class="close" type="button" data-action="cancel-opt-in">Keep my opt-out</button></div>' +
      '<button class="close" type="button" data-action="close" hidden>Close</button></section>' +
      '<footer class="settings-footer" aria-label="Privacy controls"><button class="settings" type="button" hidden>Cookie settings</button></footer>';
    banner = root.querySelector('section');
    preferenceFields = root.querySelector('fieldset');
    analyticsInput = root.querySelector('[name="analytics"]');
    marketingInput = root.querySelector('[name="marketing"]');
    gpcNotice = root.querySelector('.gpc');
    optOutNotice = root.querySelector('.opt-out-notice');
    optOutButton = root.querySelector('[data-action="opt-out"]');
    optInConfirmation = root.querySelector('.opt-in-confirmation');
    measurementInput = root.querySelector('[name="measurement"]');
    measurementNotice = root.querySelector('.measurement-notice');
    closeButton = root.querySelector('[data-action="close"]');
    settingsButton = root.querySelector('.settings');
    root.addEventListener('click', function (event) {
      var action = event.target.getAttribute('data-action');
      if (['accept', 'reject', 'save', 'close', 'opt-out'].indexOf(action) !== -1) preferencesOpen = false;
      if (action === 'accept' && !(choice && choice.saleSharingOptOut)) apply({ analytics: true, marketing: true, measurement: true }, true);
      if (action === 'reject') apply({ analytics: false, marketing: false, saleSharingOptOut: !!(choice && choice.saleSharingOptOut) }, true);
      if (action === 'opt-out') apply({ analytics: false, marketing: false, saleSharingOptOut: true }, true);
      if (action === 'save') apply({ analytics: analyticsInput.checked, marketing: marketingInput.checked,
        measurement: measurementInput.checked, saleSharingOptOut: !!(choice && choice.saleSharingOptOut) }, true);
      if (action === 'customize') openSettings();
      if (action === 'review-opt-in' && preferencesOpen && !gpcEnabled()) optInConfirmation.hidden = false;
      if (action === 'cancel-opt-in') optInConfirmation.hidden = true;
      if (action === 'confirm-opt-in' && preferencesOpen && !gpcEnabled() && !optInConfirmation.hidden) {
        preferencesOpen = false;
        apply({ analytics: true, marketing: true, measurement: true }, true);
      }
      if (action === 'close') renderChoice();
      if (!settingsButton.hidden && ['accept', 'reject', 'save', 'close', 'opt-out', 'confirm-opt-in'].indexOf(action) !== -1) {
        (preferenceOpener && preferenceOpener.isConnected ? preferenceOpener : settingsButton).focus();
        preferenceOpener = null;
      }
    });
    settingsButton.addEventListener('click', openSettings);
    // Keep the privacy link in document flow at the bottom of the page.
    // Only the preference panel may overlay content when it is needed or opened.
    document.body.appendChild(host);
    // Webflow footer components can reopen this same UI without inline JavaScript.
    // Delegation also supports components inserted after the head script runs.
    document.addEventListener('click', function (event) {
      var control = event.target.closest && event.target.closest('[data-unify-consent-settings]');
      if (!control || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openSettings(control);
    });
    renderChoice();
  }

  var previousUrl = location.href;
  function navigation() {
    if (location.href === previousUrl) return;
    previousUrl = location.href;
    capturePage();
    // GA4 owns its own enhanced-measurement history pageviews; do not send a second one.
  }
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function () {
      var result = original.apply(this, arguments);
      navigation();
      return result;
    };
  });
  window.addEventListener('popstate', navigation);
  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null) refreshChoice();
  });
  window.addEventListener('pageshow', function (event) { if (event.persisted) refreshChoice(); });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') refreshChoice();
  });
  apply(state, false);
  resolveRegion();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
}
)({"enabled":true,"mode":"production","regional":true,"regionPolicy":{"version":"2026-10-02","reviewStatus":"pending-engineering-and-privacy-review","defaultMode":"review","unknownLocationDefaults":{"analytics":true,"marketing":true},"notice":"Draft regional tracking policy, pending review. Regional defaults can enable tracking without a popup; they are not an explicit user consent record.","groups":[{"id":"eea","countries":["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO"],"mode":"opt_in","basis":"law-and-google-policy","sources":["https://www.google.com/about/company/user-consent-policy/","https://europa.eu/youreurope/citizens/consumers/internet-telecoms/data-protection-online-privacy/index_en.htm"]},{"id":"uk","countries":["GB"],"mode":"opt_in","basis":"advertising-consent-and-google-policy","sources":["https://www.google.com/about/company/user-consent-policy/","https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-storage-and-access-technologies/"]},{"id":"switzerland","countries":["CH"],"mode":"opt_in","basis":"google-policy-for-ad-personalization-not-blanket-swiss-cookie-law","sources":["https://www.google.com/about/company/user-consent-policy/"]},{"id":"us","countries":["US"],"mode":"privacy_controls","basis":"proposed opt-out default pending privacy review; retain privacy controls and honor GPC and saved choices","sources":["https://www.oag.ca.gov/privacy/ccpa","https://coag.gov/opt-out/"],"defaults":{"analytics":true,"marketing":true}},{"id":"australia","countries":["AU"],"mode":"review","basis":"proposed opt-out default pending privacy review; retain privacy controls and honor GPC and saved choices","sources":["https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/tracking-pixels-and-privacy-obligations"],"defaults":{"analytics":false,"marketing":false}},{"id":"canada","countries":["CA"],"mode":"review","basis":"opt-out conditional on meaningful notice, non-sensitive data and effective withdrawal","sources":["https://www.priv.gc.ca/en/privacy-topics/technology/online-privacy-tracking-cookies/tracking-and-ads/gl_ba_1112/"]},{"id":"brazil","countries":["BR"],"mode":"review","basis":"confirm legal basis per purpose; retain opt-in pending assessment","sources":["https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-emite-recomendacoes-para-adequacao-da-pratica-de-coleta-de-cookies-do-portal-gov.br"]},{"id":"turkiye","countries":["TR"],"mode":"opt_in","basis":"conservative treatment of advertising and non-essential tracking","sources":["https://www.kvkk.gov.tr/Icerik/7408/Summary-of-the-Board-Decision-on-the-processing-of-personal-data-by-the-data-controller-operating-in-e-commerce-sector-through-cookies-used-by-the-websites-mobile-applications-"]},{"id":"singapore","countries":["SG"],"mode":"opt_in","basis":"personal-data behavioural targeting consent; not every cookie requires consent","sources":["https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/ag-on-selected-topics/advisory-guidelines-on-the-pdpa-for-selected-topics-%28revised-may-2024%29.pdf"]}],"regionOverrides":{"CA-QC":{"mode":"opt_in","basis":"identification-location-profiling activation under section 8.1","sources":["https://www.legisquebec.gouv.qc.ca/fr/version/lc/P-39.1?code=se%3A8_1&history=20250922"]}},"reviewedUsStateSources":{"US-CA":"https://www.oag.ca.gov/privacy/ccpa","US-CO":"https://coag.gov/opt-out/","US-MN":"https://ag.state.mn.us/Data-Privacy/Consumer/","US-OR":"https://www.doj.state.or.us/consumer-protection/for-businesses/privacy-law-faqs-for-businesses/","US-IN":"https://www.in.gov/attorneygeneral/files/Indiana-Consumer-Data-Protection_Consumer-Bill-of-Rights_CDPCBOR.pdf","US-KY":"https://www.ag.ky.gov/about/Office-Divisions/ODP/KCDPA/Pages/default.aspx","US-RI":"https://webserver.rilegislature.gov/Statutes/TITLE6/6-48.1/6-48.1-5.htm"},"measurementNotice":"Reduced measurement requires per-rule approvalReference and reviewStatus=approved plus explicit build flags. No regions are approved in this draft. Overrides do not inherit country approvals."},"googleAdvanced":false,"posthogCookieless":false,"gtmId":"GTM-5NKFVR3","posthogKey":"phc_eLELdjMUDABB8Qg0pC0poaktw8fhGHcBFDGR2z7Q4a8","googleConsentOwner":"gtm"}, // Embedded unchanged in the Webflow and Next.js runtimes by scripts/build.mjs.
function resolveRegionPolicy(policy, location) {
  // These are site defaults for missing geography, not a visitor consent record
  // or an inference that the visitor is in an opt-out jurisdiction.
  var unknown = policy && policy.unknownLocationDefaults || {};
  var fallback = { mode: unknown.analytics === true || unknown.marketing === true ? 'privacy_controls' : 'review',
    rule: 'unknown', country: null, region: null,
    defaults: { analytics: unknown.analytics === true, marketing: unknown.marketing === true } };
  if (!policy || !location || typeof location.country !== 'string') return fallback;
  var country = location.country.toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) return fallback;
  var region = typeof location.region === 'string' ? location.region.toUpperCase() : '';
  if (region.indexOf(country + '-') === 0) region = region.slice(3);
  if (!/^[A-Z0-9]{1,3}$/.test(region)) region = '';
  var key = country + '-' + region;
  var override = region && policy.regionOverrides && policy.regionOverrides[key];
  var group = Array.isArray(policy.groups) && policy.groups.find(function (entry) {
    return entry.countries.indexOf(country) !== -1;
  });
  var rule = override || group;
  var mode = rule && ['opt_in', 'privacy_controls', 'review'].indexOf(rule.mode) !== -1 ? rule.mode : 'review';
  var measurement = rule && rule.measurement;
  var reviewed = measurement && measurement.reviewStatus === 'approved' &&
    typeof measurement.approvalReference === 'string' && measurement.approvalReference.trim().length > 0;
  var defaults = mode === 'privacy_controls' && rule.defaults || {};
  return {
    measurement: {
      googleAdvanced: !!reviewed && measurement.googleAdvanced === true,
      posthogCookieless: !!reviewed && measurement.posthogCookieless === true,
    },
    defaults: { analytics: defaults.analytics === true, marketing: defaults.marketing === true },
    mode: mode,
    rule: override ? key : (group ? group.id : 'unreviewed'),
    country: country,
    region: region || null,
  };
}
);
