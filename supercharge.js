(function() {
  'use strict';

  var styleId = 'unify-supercharge-experiment-css';
  if (!document.getElementById(styleId)) {
    var style = document.createElement('style');
    style.id = styleId;
    style.textContent = ".supercharge {\n  position: relative;\n  display: inline-block;\n  font-kerning: normal;\n  font-feature-settings: \"kern\" 1;\n  vertical-align: baseline;\n}\n.supercharge .sc-char {\n  position: absolute;\n  display: inline-block;\n  font-kerning: normal;\n  font-feature-settings: \"kern\" 1;\n  will-change: filter;\n  z-index: -2;\n}\n.supercharge .sc-kern-ref {\n  visibility: hidden;\n  font-kerning: normal;\n  font-feature-settings: \"kern\" 1;\n  letter-spacing: inherit;\n}\n.supercharge .sc-overlay,\n.supercharge .sc-plus-lighter {\n  position: absolute;\n  border-radius: 50%;\n  background: var(--sc-color, #FE3C01);\n  pointer-events: none;\n  transform-origin: center center;\n  will-change: transform, box-shadow;\n  z-index: -1;\n}\n.supercharge .sc-overlay {\n  mix-blend-mode: overlay;\n}\n.supercharge .sc-plus-lighter {\n  mix-blend-mode: plus-lighter;\n}\n@supports not (mix-blend-mode: plus-lighter) {\n  .supercharge .sc-plus-lighter {\n    mix-blend-mode: screen;\n  }\n}\n";
    document.head.appendChild(style);
  }
})();

(function() {
  'use strict';

  var instances = [];
  var loopRunning = false;
  var lastTime = 0;
  var motionQuery = getMotionQuery();
  var scrollListenerBound = false;
  var warnedBlendTrapAncestors = [];
  var objectHasOwn = Object.prototype.hasOwnProperty;
  var passiveEventOptions = getPassiveEventOptions();

  var R = {
    padX: 0.222,
    padY: 0.178,
    shiftRight: 0.667,
    maxDist: 4.444,
    maxBlur: 0.028,
    heightExtra: 0.333,
    xHeight: 0.45,
    sharedHeightMul: 1.0,
    ovalScale: 5,
    overlayBlur: 0.756,
    plusLighterBlur: 0.734,
    autoSpeed: 2.5,
    hoverBoost: 2.1,
    hoverRamp: 2300,
    hoverDecay: 500,
    energyNoise: 3.7
  };

  var DATA_KEYS = {
    padX: 'scPadX',
    padY: 'scPadY',
    shiftRight: 'scShiftRight',
    maxDist: 'scMaxDist',
    maxBlur: 'scMaxBlur',
    heightExtra: 'scHeightExtra',
    xHeight: 'scXHeight',
    sharedHeightMul: 'scSharedHeightMul',
    ovalScale: 'scOvalScale',
    overlayBlur: 'scOverlayBlur',
    plusLighterBlur: 'scPlusLighterBlur',
    autoSpeed: 'scAutoSpeed',
    hoverBoost: 'scHoverBoost',
    hoverRamp: 'scHoverRamp',
    hoverDecay: 'scHoverDecay',
    energyNoise: 'scEnergyNoise'
  };

  var EASE_IN = 0.08;
  var EASE_OUT = 0.16;
  var SETTLE_SQ = 4;
  var DT_CAP = 50;
  var FRAME_MS = 16.667;
  var BASE_FILTER = 'contrast(1.15) saturate(1.1)';
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var HEAT_BUCKETS = 8;
  var HOVER_STABILITY = {
    stillRadius: 10,
    stillDelay: 120,
    moveEpsilon: 1.5,
    moveCooldown: 120,
    moveDecay: 900
  };

  var requestFrame = window.requestAnimationFrame ||
    function(callback) { return window.setTimeout(function() { callback(Date.now()); }, FRAME_MS); };

  function noop() {}

  function getPassiveEventOptions() {
    var supported = false;
    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function() {
          supported = true;
        }
      });
      window.addEventListener('test-passive', noop, options);
      window.removeEventListener('test-passive', noop, options);
    } catch (error) {
      supported = false;
    }
    return supported ? { passive: true } : false;
  }

  function getMotionQuery() {
    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(prefers-reduced-motion: reduce)');
    }
    return {
      matches: false,
      addEventListener: noop,
      removeEventListener: noop,
      addListener: noop,
      removeListener: noop
    };
  }

  function addMotionListener(listener) {
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', listener);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(listener);
    }
  }

  function removeMotionListener(listener) {
    if (typeof motionQuery.removeEventListener === 'function') {
      motionQuery.removeEventListener('change', listener);
    } else if (typeof motionQuery.removeListener === 'function') {
      motionQuery.removeListener(listener);
    }
  }

  function reportRuntimeError(error) {
    if (window.console && typeof window.console.error === 'function') {
      window.console.error('[supercharge] animation stopped after an error', error);
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function square(value) {
    return value * value;
  }

  HOVER_STABILITY.stillRadiusSq = square(HOVER_STABILITY.stillRadius);
  HOVER_STABILITY.moveEpsilonSq = square(HOVER_STABILITY.moveEpsilon);

  function roundPx(value) {
    return Math.round(value * 100) / 100;
  }

  function isUsableColor(value) {
    return !value ||
      typeof CSS === 'undefined' ||
      typeof CSS.supports !== 'function' ||
      CSS.supports('color', value);
  }

  function parseRgbChannels(value) {
    if (!value) return null;
    var probe = document.createElement('span');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.color = value;
    (document.body || document.documentElement).appendChild(probe);
    var computed = window.getComputedStyle(probe).color;
    if (probe.parentNode) {
      probe.parentNode.removeChild(probe);
    }
    var match = computed && computed.match(/rgba?\(([^)]+)\)/i);
    if (!match) return null;
    var parts = match[1].trim().split(/[,\s\/]+/).filter(Boolean);
    if (parts.length < 3) return null;
    var r = parseFloat(parts[0]);
    var g = parseFloat(parts[1]);
    var b = parseFloat(parts[2]);
    if (!isFinite(r) || !isFinite(g) || !isFinite(b)) return null;
    return {
      r: clamp(r, 0, 255),
      g: clamp(g, 0, 255),
      b: clamp(b, 0, 255)
    };
  }

  function mixRgbChannels(from, to, amount) {
    var t = clamp(amount, 0, 1);
    var r = Math.round(from.r + (to.r - from.r) * t);
    var g = Math.round(from.g + (to.g - from.g) * t);
    var b = Math.round(from.b + (to.b - from.b) * t);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  function readBooleanFlag(value) {
    if (typeof value !== 'string') return false;
    var normalized = value.trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
  }

  function containsToken(value, token) {
    return typeof value === 'string' && value.indexOf(token) !== -1;
  }

  function hasPaintContainment(value) {
    return containsToken(value, 'paint') ||
      containsToken(value, 'layout') ||
      containsToken(value, 'strict') ||
      containsToken(value, 'content');
  }

  function createsBlendTrap(style) {
    if (!style) return false;

    var position = style.position;
    var zIndex = style.zIndex;
    var opacity = parseFloat(style.opacity);

    if (zIndex && zIndex !== 'auto' && (
      position === 'relative' ||
      position === 'absolute' ||
      position === 'fixed' ||
      position === 'sticky'
    )) return true;
    if (isFinite(opacity) && opacity < 1) return true;
    if (style.transform && style.transform !== 'none') return true;
    if (style.filter && style.filter !== 'none') return true;
    if (style.backdropFilter && style.backdropFilter !== 'none') return true;
    if (style.webkitBackdropFilter && style.webkitBackdropFilter !== 'none') return true;
    if (style.perspective && style.perspective !== 'none') return true;
    if (style.mixBlendMode && style.mixBlendMode !== 'normal') return true;
    if (style.clipPath && style.clipPath !== 'none') return true;
    if (style.isolation === 'isolate') return true;
    if (hasPaintContainment(style.contain)) return true;
    if (style.willChange && style.willChange !== 'auto' && (
      containsToken(style.willChange, 'transform') ||
      containsToken(style.willChange, 'filter') ||
      containsToken(style.willChange, 'opacity') ||
      containsToken(style.willChange, 'perspective') ||
      containsToken(style.willChange, 'contain')
    )) return true;

    return false;
  }

  function findBlendTrapAncestor(el) {
    var parent = el.parentElement;
    while (parent && parent.nodeType === 1) {
      if (createsBlendTrap(window.getComputedStyle(parent))) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  }

  function formatNodeSelector(node) {
    if (!node || !node.tagName) return '<unknown>';
    var tag = node.tagName.toLowerCase();
    var id = node.id ? '#' + node.id : '';
    var classes = '';
    if (typeof node.className === 'string' && node.className.trim()) {
      classes = '.' + node.className.trim().replace(/\s+/g, '.');
    }
    return tag + id + classes;
  }

  function warnBlendTrapOnce(wordEl, ancestorEl) {
    if (!ancestorEl) return;
    if (warnedBlendTrapAncestors.indexOf(ancestorEl) !== -1) return;
    warnedBlendTrapAncestors.push(ancestorEl);
    if (window.console && typeof window.console.warn === 'function') {
      window.console.warn(
        '[supercharge] blend-layer fallback enabled for',
        formatNodeSelector(wordEl),
        'because ancestor',
        formatNodeSelector(ancestorEl),
        'creates a stacking context (transform/filter/isolation/contain).'
      );
    }
  }

  function createHtmlSpan(className, text) {
    var span = document.createElement('span');
    span.className = className;
    if (text != null) span.textContent = text;
    span.setAttribute('aria-hidden', 'true');
    return span;
  }

  function setBox(el, left, top, width, height) {
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.width = width + 'px';
    el.style.height = height + 'px';
  }

  function setPosition(el, left, top) {
    el.style.left = left + 'px';
    el.style.top = top + 'px';
  }

  function resetTransformCache() {
    return { tx: NaN, ty: NaN, scale: NaN };
  }

  function disposeRange(range) {
    if (range && typeof range.detach === 'function') {
      range.detach();
    }
  }

  function getTextUnits(text) {
    var units = [];

    if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
      var segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      var iterator = segmenter.segment(text)[Symbol.iterator]();
      var next = iterator.next();
      while (!next.done) {
        units.push({
          text: next.value.segment,
          start: next.value.index,
          end: next.value.index + next.value.segment.length
        });
        next = iterator.next();
      }
      return units;
    }

    var offset = 0;
    var chars = typeof Array.from === 'function' ? Array.from(text) : text.split('');
    for (var i = 0; i < chars.length; i++) {
      units.push({ text: chars[i], start: offset, end: offset + chars[i].length });
      offset += chars[i].length;
    }
    return units;
  }

  function setSvgAttrs(el, attrs) {
    for (var key in attrs) {
      if (objectHasOwn.call(attrs, key)) {
        el.setAttribute(key, attrs[key]);
      }
    }
  }

  function createHeatFilterBank(prefix) {
    var filterSvg = document.createElementNS(SVG_NS, 'svg');
    filterSvg.setAttribute('aria-hidden', 'true');
    filterSvg.setAttribute('focusable', 'false');
    filterSvg.style.position = 'absolute';
    filterSvg.style.width = '0';
    filterSvg.style.height = '0';
    filterSvg.style.overflow = 'hidden';
    filterSvg.style.pointerEvents = 'none';

    var defs = document.createElementNS(SVG_NS, 'defs');
    var urls = new Array(HEAT_BUCKETS + 1);
    var noises = new Array(HEAT_BUCKETS + 1);
    var displaces = new Array(HEAT_BUCKETS + 1);

    for (var bucket = 1; bucket <= HEAT_BUCKETS; bucket++) {
      var heatFilterId = prefix + '-' + bucket;
      var heatFilter = document.createElementNS(SVG_NS, 'filter');
      setSvgAttrs(heatFilter, {
        id: heatFilterId,
        x: '-45%',
        y: '-45%',
        width: '190%',
        height: '190%',
        'color-interpolation-filters': 'sRGB'
      });

      var heatNoise = document.createElementNS(SVG_NS, 'feTurbulence');
      setSvgAttrs(heatNoise, {
        type: 'turbulence',
        baseFrequency: '0.006 0.08',
        numOctaves: '1',
        seed: '2',
        result: 'heatNoise'
      });

      var heatMap = document.createElementNS(SVG_NS, 'feComponentTransfer');
      setSvgAttrs(heatMap, {
        'in': 'heatNoise',
        result: 'heatMap'
      });

      var heatGreen = document.createElementNS(SVG_NS, 'feFuncG');
      setSvgAttrs(heatGreen, {
        type: 'linear',
        slope: '0',
        intercept: '0.5'
      });
      heatMap.appendChild(heatGreen);

      var heatDisplace = document.createElementNS(SVG_NS, 'feDisplacementMap');
      setSvgAttrs(heatDisplace, {
        'in': 'SourceGraphic',
        in2: 'heatMap',
        scale: '0',
        xChannelSelector: 'R',
        yChannelSelector: 'G'
      });

      heatFilter.appendChild(heatNoise);
      heatFilter.appendChild(heatMap);
      heatFilter.appendChild(heatDisplace);
      defs.appendChild(heatFilter);

      urls[bucket] = 'url("#' + heatFilterId + '")';
      noises[bucket] = heatNoise;
      displaces[bucket] = heatDisplace;
    }

    filterSvg.appendChild(defs);
    return {
      svg: filterSvg,
      urls: urls,
      noises: noises,
      displaces: displaces
    };
  }

  function onScrollShared() {
    for (var i = 0; i < instances.length; i++) {
      instances[i].invalidateRect();
    }
  }

  function ensureScrollListener() {
    if (!scrollListenerBound) {
      scrollListenerBound = true;
      window.addEventListener('scroll', onScrollShared, passiveEventOptions);
    }
  }

  function releaseScrollListenerIfIdle() {
    if (scrollListenerBound && instances.length === 0) {
      scrollListenerBound = false;
      window.removeEventListener('scroll', onScrollShared, passiveEventOptions);
    }
  }

  function tick(timestamp) {
    if (!lastTime) lastTime = timestamp;
    var dt = Math.min(timestamp - lastTime, DT_CAP);
    lastTime = timestamp;

    var anyActive = false;
    for (var i = 0; i < instances.length; i++) {
      var inst = instances[i];
      if (inst.active) {
        try {
          inst.step(dt);
          anyActive = anyActive || inst.active;
        } catch (error) {
          inst.active = false;
          reportRuntimeError(error);
        }
      }
    }
    if (anyActive) {
      requestFrame(tick);
    } else {
      loopRunning = false;
      lastTime = 0;
    }
  }

  function startLoop() {
    if (!loopRunning) {
      loopRunning = true;
      lastTime = 0;
      requestFrame(tick);
    }
  }

  function readNumber(value, fallback) {
    var n = parseFloat(value);
    return isFinite(n) ? n : fallback;
  }

  function readConfig(el) {
    var config = {};
    for (var key in R) {
      if (objectHasOwn.call(R, key)) {
        config[key] = readNumber(el.dataset[DATA_KEYS[key]], R[key]);
      }
    }
    config.padX = Math.max(0, config.padX);
    config.padY = Math.max(0, config.padY);
    config.maxDist = Math.max(0.001, config.maxDist);
    config.maxBlur = Math.max(0, config.maxBlur);
    config.heightExtra = Math.max(0, config.heightExtra);
    config.xHeight = Math.max(0.001, config.xHeight);
    config.sharedHeightMul = Math.max(0.001, config.sharedHeightMul);
    config.ovalScale = Math.max(0.001, config.ovalScale);
    config.overlayBlur = Math.max(0, config.overlayBlur);
    config.plusLighterBlur = Math.max(0, config.plusLighterBlur);
    config.autoSpeed = Math.max(0, config.autoSpeed);
    config.hoverBoost = Math.max(0, config.hoverBoost);
    config.hoverRamp = Math.max(1, config.hoverRamp);
    config.hoverDecay = Math.max(1, config.hoverDecay);
    config.energyNoise = Math.max(0, config.energyNoise);
    return config;
  }

  function initSupercharge(el) {
    if (el._superchargeDestroy) {
      el._superchargeDestroy();
    }

    var word = el.textContent.trim();
    if (!word) return;
    if (typeof document.createRange !== 'function') return;

    var originalText = el.textContent;
    var destroyed = false;
    var units = getTextUnits(word);
    var n = units.length;
    if (!n) return;
    var config = readConfig(el);
    var baseTextColor = parseRgbChannels(window.getComputedStyle(el).color) || { r: 36, g: 30, b: 32 };
    var targetTintColor = parseRgbChannels(
      (el.dataset.scColor && isUsableColor(el.dataset.scColor)) ? el.dataset.scColor : '#FE3C01'
    ) || { r: 254, g: 60, b: 1 };

    var coverCount = clamp(parseInt(el.dataset.scCover, 10) || 4, 1, n);

    if (el.dataset.scColor) {
      if (isUsableColor(el.dataset.scColor)) {
        el.style.setProperty('--sc-color', el.dataset.scColor);
      } else {
        el.style.removeProperty('--sc-color');
      }
    }

    el.textContent = '';
    el.setAttribute('aria-label', word);
    el.setAttribute('role', 'text');

    var kernRef = createHtmlSpan('sc-kern-ref', word);
    el.appendChild(kernRef);

    var spans = new Array(n);
    for (var i = 0; i < n; i++) {
      var span = createHtmlSpan('sc-char', units[i].text);
      el.appendChild(span);
      spans[i] = span;
    }

    var ovEl = createHtmlSpan('sc-overlay');
    el.appendChild(ovEl);

    var plEl = createHtmlSpan('sc-plus-lighter');
    el.appendChild(plEl);

    var ovCloneEl = createHtmlSpan('sc-overlay');
    el.appendChild(ovCloneEl);

    var plCloneEl = createHtmlSpan('sc-plus-lighter');
    el.appendChild(plCloneEl);
    var useContainedTintFallback = false;

    var disableBlendLayers =
      readBooleanFlag(el.dataset.scNoOvals) ||
      readBooleanFlag(el.dataset.scNoBlend) ||
      readBooleanFlag(el.dataset.scForceFallback);
    var blendTrapAncestor = disableBlendLayers ? null : findBlendTrapAncestor(el);
    if (blendTrapAncestor) {
      disableBlendLayers = true;
      warnBlendTrapOnce(el, blendTrapAncestor);
    }
    if (disableBlendLayers) {
      el.style.zIndex = '0';
      for (var j = 0; j < spans.length; j++) {
        spans[j].style.zIndex = '1';
      }
      useContainedTintFallback = true;
      ovEl.style.display = 'none';
      plEl.style.display = 'none';
      ovCloneEl.style.display = 'none';
      plCloneEl.style.display = 'none';
    }

    var heatFilters = createHeatFilterBank('sc-heat-haze-' + Math.random().toString(36).slice(2));
    var heatFilterUrls = heatFilters.urls;
    var heatNoises = heatFilters.noises;
    var heatDisplaces = heatFilters.displaces;
    var filterSvg = heatFilters.svg;
    (document.body || document.documentElement).appendChild(filterSvg);

    var centersX = new Float64Array(n);
    var centersY = new Float64Array(n);
    var prevBlurs = new Float32Array(n);
    var prevHaze = new Int16Array(n);
    var prevTints = new Float32Array(n);
    prevTints.fill(-1);

    var fontSize = 0;
    var plInitLeft = 0, plInitTop = 0, plWidth = 0, sharedHeight = 0;
    var plHalfW = 0, halfHeight = 0;
    var maxBlur = 0, maxDist = 0, maxDistSq = 0;
    var wordWidth = 0;
    var speedPxPerMs = 0;
    var exitRight = 0;
    var loopSpan = 0;
    var overlayBlurPx = 0, plusLighterBlurPx = 0;

    var currentX = 0, currentY = 0;
    var targetX = 0, targetY = 0;
    var hoverCharge = 0;
    var hovering = false;
    var autoAnimating = true;
    var inViewport = true;
    var cachedRect = null;
    var lastMouseX = 0, lastMouseY = 0;
    var hoverAnchorX = 0, hoverAnchorY = 0;
    var hoverStillMs = 0;
    var hoverMoveCooldown = 0;
    var autoX = 0;
    var activeOffset = 0;
    var transformCache = resetTransformCache();
    var lastGlowIntensity = NaN;
    var lastEnergyLevel = NaN;
    var energyClock = 0;
    var energyPhase = 0;
    var measured = false;

    function invalidateCharFilters() {
      prevBlurs.fill(-1);
      prevHaze.fill(-1);
      prevTints.fill(-1);
    }

    function resetHoverStability(x, y) {
      hoverAnchorX = x;
      hoverAnchorY = y;
      hoverStillMs = 0;
      hoverMoveCooldown = 0;
    }

    function normalizeLoopX(x) {
      if (!loopSpan) return x;
      var minX = exitRight - loopSpan;
      while (x > exitRight) x -= loopSpan;
      while (x <= minX) x += loopSpan;
      return x;
    }

    function measure() {
      if (destroyed) return;

      var cs = getComputedStyle(el);
      fontSize = readNumber(cs.fontSize, 0);
      if (fontSize <= 0) return;

      var elRect = el.getBoundingClientRect();
      if (elRect.width === 0 || elRect.height === 0) return;

      var textNode = kernRef.firstChild;
      if (!textNode) return;

      var kernRefRect = kernRef.getBoundingClientRect();
      var topOff = kernRefRect.top - elRect.top;
      var refHeight = kernRefRect.height;

      var charLeft = new Float64Array(n);
      var charTop = new Float64Array(n);
      var charWidth = new Float64Array(n);
      var charHeight = new Float64Array(n);
      var caretX = new Float64Array(n + 1);
      var range = document.createRange();

      function getCaretX(offset) {
        range.setStart(textNode, offset);
        range.setEnd(textNode, offset);

        var rects = range.getClientRects();
        if (rects.length) return rects[0].left;

        var rect = range.getBoundingClientRect();
        if (rect.height || rect.width) return rect.left;

        if (offset === 0) return kernRefRect.left;
        range.setStart(textNode, 0);
        range.setEnd(textNode, offset);
        return range.getBoundingClientRect().right;
      }

      try {
        for (var i = 0; i < n; i++) {
          caretX[i] = getCaretX(units[i].start);
        }
        caretX[n] = getCaretX(units[n - 1].end);
        var textOriginX = caretX[0];

        for (var i = 0; i < n; i++) {
          range.setStart(textNode, units[i].start);
          range.setEnd(textNode, units[i].end);
          var r = range.getBoundingClientRect();
          charLeft[i] = caretX[i] - textOriginX;
          charTop[i] = r.top - elRect.top - topOff;
          charWidth[i] = Math.max(0, caretX[i + 1] - caretX[i]);
          charHeight[i] = r.height;
        }
      } finally {
        disposeRange(range);
      }

      wordWidth = caretX[n] - textOriginX;
      if (!isFinite(wordWidth) || wordWidth <= 0) return;

      var padX = fontSize * config.padX;
      var padY = fontSize * config.padY;
      var shiftRight = fontSize * config.shiftRight;
      maxDist = fontSize * config.maxDist;
      maxDistSq = maxDist * maxDist;
      maxBlur = fontSize * config.maxBlur;
      var xHeight = fontSize * config.xHeight;
      var heightExtra = fontSize * config.heightExtra;

      var baselineY = refHeight * 0.75;
      sharedHeight = (xHeight + padY * 2) * config.sharedHeightMul + heightExtra;
      halfHeight = sharedHeight / 2;

      var firstIdx = n - coverCount;
      plWidth = (wordWidth - charLeft[firstIdx]) + padX * 2;
      plHalfW = plWidth / 2;
      plInitLeft = charLeft[firstIdx] - padX + shiftRight;
      plInitTop = baselineY - xHeight - padY - heightExtra;

      var plCX = plInitLeft + plHalfW;
      var ovW = plWidth * config.ovalScale;
      var ovInitLeft = plCX - ovW / 2;

      speedPxPerMs = fontSize * config.autoSpeed / 1000;
      exitRight = wordWidth - plHalfW + ovW / 2;
      loopSpan = wordWidth + plWidth;

      for (var i = 0; i < n; i++) {
        centersX[i] = charLeft[i] + charWidth[i] / 2;
        centersY[i] = charTop[i] + charHeight[i] / 2;
      }

      for (var i = 0; i < n; i++) {
        setPosition(spans[i], charLeft[i], charTop[i]);
      }

      overlayBlurPx = fontSize * config.overlayBlur;
      plusLighterBlurPx = fontSize * config.plusLighterBlur;
      lastGlowIntensity = NaN;
      writeGlowStyle();

      setBox(plEl, plInitLeft, plInitTop, plWidth, sharedHeight);
      setBox(plCloneEl, plInitLeft, plInitTop, plWidth, sharedHeight);
      setBox(ovEl, ovInitLeft, plInitTop, ovW, sharedHeight);
      setBox(ovCloneEl, ovInitLeft, plInitTop, ovW, sharedHeight);

      currentX = plInitLeft;
      currentY = plInitTop;
      targetX = plInitLeft;
      targetY = plInitTop;
      autoX = plInitLeft;
      activeOffset = 0;
      plEl.style.transform = '';
      ovEl.style.transform = '';
      plCloneEl.style.transform = '';
      ovCloneEl.style.transform = '';
      transformCache = resetTransformCache();
      lastEnergyLevel = NaN;
      cachedRect = null;
      invalidateCharFilters();
      measured = true;

      applyEffects();

      if (!hovering && !motionQuery.matches) {
        autoAnimating = true;
        inst.active = true;
        startLoop();
      }
      if (hovering) {
        cachedRect = el.getBoundingClientRect();
        targetX = (lastMouseX - cachedRect.left) - plHalfW;
        targetY = (lastMouseY - cachedRect.top) - halfHeight;
        inst.active = true;
        startLoop();
      }
    }

    function applyEffects() {
      var effectiveMaxBlur = maxBlur * (1 + hoverCharge * config.hoverBoost * 0.75);
      var hazeLevel = getEnergyLevel();
      var cloneX = loopSpan ? currentX - loopSpan : currentX;

      for (var i = 0; i < n; i++) {
        var proximity = Math.max(
          getGlowProximity(i, currentX),
          getGlowProximity(i, cloneX)
        );
        var blur = Math.round(proximity * effectiveMaxBlur * 20) / 20;

        var hazeProximity = proximity * proximity * proximity;
        writeCharFilter(i, blur, hazeLevel * hazeProximity);
        if (useContainedTintFallback) {
          writeCharTint(i, proximity);
        }
      }
    }

    function getGlowProximity(i, glowX) {
      var cx = glowX + plHalfW;
      var cy = plInitTop + halfHeight;
      var dx = centersX[i] - cx;
      var dy = centersY[i] - cy;
      var distSq = square(dx) + square(dy);
      if (distSq >= maxDistSq) return 0;
      return 1 - Math.sqrt(distSq) / maxDist;
    }

    function writeCharFilter(i, blur, haze) {
      var hazeBucket = 0;
      var normalizedHaze = clamp(haze / Math.max(config.energyNoise, 0.001), 0, 1);
      if (normalizedHaze > 0.05) {
        hazeBucket = clamp(Math.ceil(normalizedHaze * HEAT_BUCKETS), 1, HEAT_BUCKETS);
      }
      if (blur === prevBlurs[i] && hazeBucket === prevHaze[i]) return;

      prevBlurs[i] = blur;
      prevHaze[i] = hazeBucket;

      var filter = '';
      if (hazeBucket > 0) {
        filter += heatFilterUrls[hazeBucket] + ' ';
      }
      if (blur > 0.01) {
        filter += 'blur(' + blur + 'px) ';
      }
      spans[i].style.filter = filter + BASE_FILTER;
    }

    function writeCharTint(i, proximity) {
      var tintAmount = clamp(proximity * 1.08 + hoverCharge * proximity * 0.2, 0, 1);
      var roundedTint = Math.round(tintAmount * 40) / 40;
      if (roundedTint === prevTints[i]) return;
      prevTints[i] = roundedTint;
      if (roundedTint <= 0.001) {
        spans[i].style.color = '';
        return;
      }
      spans[i].style.color = mixRgbChannels(baseTextColor, targetTintColor, roundedTint);
    }

    function writeGlowStyle() {
      var intensity = Math.round(hoverCharge * 1000) / 1000;
      if (intensity === lastGlowIntensity) return;
      lastGlowIntensity = intensity;

      var glowBlur = Math.round(intensity * config.hoverBoost * fontSize * 0.32 * 100) / 100;
      var glowSpread = Math.round(intensity * config.hoverBoost * fontSize * 0.12 * 100) / 100;
      var glow = intensity === 0
        ? ''
        : '0 0 ' + glowBlur + 'px ' + glowSpread + 'px var(--sc-color, #FE3C01)';

      ovEl.style.filter = 'blur(' + overlayBlurPx + 'px)';
      plEl.style.filter = 'blur(' + plusLighterBlurPx + 'px)';
      ovCloneEl.style.filter = 'blur(' + overlayBlurPx + 'px)';
      plCloneEl.style.filter = 'blur(' + plusLighterBlurPx + 'px)';
      ovEl.style.boxShadow = glow;
      plEl.style.boxShadow = glow;
      ovCloneEl.style.boxShadow = glow;
      plCloneEl.style.boxShadow = glow;
    }

    function getEnergyLevel() {
      var peak = clamp((hoverCharge - 0.62) / 0.38, 0, 1);
      return peak * Math.max(0, config.energyNoise);
    }

    function writeEnergyStyle(dt) {
      var level = getEnergyLevel();
      var rounded = Math.round(level * 1000) / 1000;
      energyClock += dt;
      energyPhase += dt * 0.010;

      if (rounded <= 0) {
        if (lastEnergyLevel !== 0) {
          lastEnergyLevel = 0;
          for (var bucket = 1; bucket <= HEAT_BUCKETS; bucket++) {
            heatDisplaces[bucket].setAttribute('scale', '0');
          }
          invalidateCharFilters();
        }
        return;
      }

      if (energyClock < 42 && rounded === lastEnergyLevel) return;
      energyClock = 0;
      lastEnergyLevel = rounded;

      var strength = Math.min(3.2, rounded);
      var freqX = 0.0035 + Math.sin(energyPhase * 0.33) * 0.001;
      var freqY = 0.055 + strength * 0.028 + Math.sin(energyPhase * 0.52) * 0.015;

      for (var bucket = 1; bucket <= HEAT_BUCKETS; bucket++) {
        var falloff = bucket / HEAT_BUCKETS;
        var scale = Math.min(fontSize * 0.2, fontSize * strength * 0.065 * falloff);
        heatDisplaces[bucket].setAttribute('scale', scale.toFixed(2));
        heatNoises[bucket].setAttribute('baseFrequency', freqX.toFixed(4) + ' ' + freqY.toFixed(4));
        heatNoises[bucket].setAttribute('seed', String(2 + Math.floor(energyPhase) % 89));
      }
      invalidateCharFilters();
    }

    function updateHoverCharge(dt) {
      var previous = hoverCharge;
      if (hovering) {
        if (hoverMoveCooldown > 0) {
          hoverMoveCooldown = Math.max(0, hoverMoveCooldown - dt);
        }

        var anchorDx = lastMouseX - hoverAnchorX;
        var anchorDy = lastMouseY - hoverAnchorY;
        var isStill = hoverMoveCooldown === 0 &&
          square(anchorDx) + square(anchorDy) <= HOVER_STABILITY.stillRadiusSq;

        if (isStill) {
          hoverStillMs += dt;
        } else {
          hoverStillMs = 0;
        }

        if (hoverStillMs >= HOVER_STABILITY.stillDelay) {
          hoverCharge = Math.min(1, hoverCharge + dt / Math.max(config.hoverRamp, 1));
        } else if (hoverCharge > 0) {
          hoverCharge = Math.max(0, hoverCharge - dt / HOVER_STABILITY.moveDecay);
        }
      } else if (hoverCharge > 0) {
        hoverCharge = Math.max(0, hoverCharge - dt / Math.max(config.hoverDecay, 1));
      }

      if (hoverCharge !== previous) {
        invalidateCharFilters();
        writeGlowStyle();
      }
    }

    function writeTransform(tx, ty) {
      tx = roundPx(tx);
      ty = roundPx(ty);
      var scale = Math.round((1 + hoverCharge * config.hoverBoost * 0.08) * 1000) / 1000;
      if (tx === transformCache.tx && ty === transformCache.ty && scale === transformCache.scale) return;
      transformCache.tx = tx;
      transformCache.ty = ty;
      transformCache.scale = scale;
      var s = tx === 0 && ty === 0 ? '' : 'translate(' + tx + 'px,' + ty + 'px)';
      if (scale !== 1) {
        s += ' scale(' + scale + ')';
      }
      var cloneTx = loopSpan ? tx - loopSpan : tx;
      var cloneS = cloneTx === 0 && ty === 0 ? '' : 'translate(' + cloneTx + 'px,' + ty + 'px)';
      if (scale !== 1) {
        cloneS += ' scale(' + scale + ')';
      }
      plEl.style.transform = s;
      ovEl.style.transform = s;
      plCloneEl.style.transform = cloneS;
      ovCloneEl.style.transform = cloneS;
    }

    var inst = {
      active: false,
      invalidateRect: function() { cachedRect = null; },
      step: function(dt) {
        if (!inViewport || !measured) {
          this.active = false;
          return;
        }
        updateHoverCharge(dt);
        writeEnergyStyle(dt);
        if (autoAnimating && !hovering) {
          autoX = normalizeLoopX(autoX + speedPxPerMs * dt);
          currentX = autoX;
          currentY = plInitTop;
          writeTransform(currentX - plInitLeft, 0);
          applyEffects();
        } else {
          var ease = hovering ? EASE_IN : EASE_OUT;
          var factor = 1 - Math.pow(1 - ease, dt / FRAME_MS);
          currentX += (targetX - currentX) * factor;
          currentY += (targetY - currentY) * factor;
          writeTransform(currentX - plInitLeft, currentY - plInitTop);
          applyEffects();

          if (!hovering) {
            var dx = targetX - currentX;
            var dy = targetY - currentY;
            if (square(dx) + square(dy) < SETTLE_SQ) {
              currentX = targetX;
              currentY = targetY;
              autoX = currentX;
              autoAnimating = true;
            }
          }
        }
      }
    };

    instances.push(inst);
    ensureScrollListener();

    function chooseActiveOffset(rawTargetX) {
      if (!loopSpan) return 0;
      var mainDist = Math.abs(currentX - rawTargetX);
      var cloneDist = Math.abs((currentX - loopSpan) - rawTargetX);
      return cloneDist < mainDist ? loopSpan : 0;
    }

    function activateHover(e) {
      if (motionQuery.matches || !measured) return;
      var wasHovering = hovering;
      hovering = true;
      autoAnimating = false;

      if (!wasHovering) {
        resetHoverStability(e.clientX, e.clientY);
      } else {
        var moveDx = e.clientX - lastMouseX;
        var moveDy = e.clientY - lastMouseY;
        if (square(moveDx) + square(moveDy) > HOVER_STABILITY.moveEpsilonSq) {
          hoverMoveCooldown = HOVER_STABILITY.moveCooldown;
        }

        var driftDx = e.clientX - hoverAnchorX;
        var driftDy = e.clientY - hoverAnchorY;
        if (square(driftDx) + square(driftDy) > HOVER_STABILITY.stillRadiusSq) {
          resetHoverStability(e.clientX, e.clientY);
          hoverMoveCooldown = HOVER_STABILITY.moveCooldown;
        }
      }

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      if (!cachedRect) cachedRect = el.getBoundingClientRect();
      var rawTargetX = (e.clientX - cachedRect.left) - plHalfW;
      if (!wasHovering) {
        activeOffset = chooseActiveOffset(rawTargetX);
      }
      targetX = rawTargetX + activeOffset;
      targetY = (e.clientY - cachedRect.top) - halfHeight;
      if (!inst.active) {
        inst.active = true;
        startLoop();
      }
    }

    function onMousemove(e) {
      activateHover(e);
    }

    function onMouseleave() {
      if (!measured) return;
      hovering = false;
      resetHoverStability(lastMouseX, lastMouseY);
      activeOffset = 0;
      autoX = normalizeLoopX(currentX);
      currentX = autoX;
      targetX = currentX;
      targetY = plInitTop;
      autoAnimating = true;
      if (!inst.active) {
        inst.active = true;
        startLoop();
      }
    }

    el.addEventListener('mouseenter', activateHover, passiveEventOptions);
    el.addEventListener('mousemove', onMousemove, passiveEventOptions);
    el.addEventListener('mouseleave', onMouseleave, passiveEventOptions);

    var resizeTimer;
    var ro = null;
    var io = null;

    function scheduleMeasure() {
      if (destroyed) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    }

    if (typeof ResizeObserver === 'function') {
      ro = new ResizeObserver(scheduleMeasure);
      ro.observe(el);
    } else {
      window.addEventListener('resize', scheduleMeasure, passiveEventOptions);
    }

    function onMotionPref() {
      if (destroyed) return;
      if (motionQuery.matches) {
        hovering = false;
        autoAnimating = false;
        currentX = plInitLeft;
        currentY = plInitTop;
        targetX = plInitLeft;
        targetY = plInitTop;
        activeOffset = 0;
        plEl.style.transform = '';
        ovEl.style.transform = '';
        plCloneEl.style.transform = '';
        ovCloneEl.style.transform = '';
        transformCache = resetTransformCache();
        hoverCharge = 0;
        resetHoverStability(lastMouseX, lastMouseY);
        lastGlowIntensity = NaN;
        lastEnergyLevel = NaN;
        writeGlowStyle();
        writeEnergyStyle(0);
        invalidateCharFilters();
        applyEffects();
        inst.active = false;
      } else {
        autoAnimating = true;
        autoX = plInitLeft;
        if (inViewport && measured) {
          inst.active = true;
          startLoop();
        }
      }
    }
    addMotionListener(onMotionPref);

    if (typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(function(entries) {
        if (destroyed || !entries.length) return;
        inViewport = entries[0].isIntersecting;
        if (inViewport && autoAnimating && !motionQuery.matches && measured) {
          inst.active = true;
          startLoop();
        }
      });
      io.observe(el);
    }

    measure();

    el._superchargeDestroy = function() {
      destroyed = true;
      var idx = instances.indexOf(inst);
      if (idx !== -1) instances.splice(idx, 1);
      releaseScrollListenerIfIdle();
      inst.active = false;
      el.removeEventListener('mouseenter', activateHover, passiveEventOptions);
      el.removeEventListener('mousemove', onMousemove, passiveEventOptions);
      el.removeEventListener('mouseleave', onMouseleave, passiveEventOptions);
      removeMotionListener(onMotionPref);
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener('resize', scheduleMeasure, passiveEventOptions);
      }
      if (io) io.disconnect();
      if (filterSvg.parentNode) {
        filterSvg.parentNode.removeChild(filterSvg);
      }
      clearTimeout(resizeTimer);
      el.removeAttribute('aria-label');
      el.removeAttribute('role');
      el.textContent = originalText;
      delete el._superchargeDestroy;
    };
  }

  function init() {
    var els = document.querySelectorAll('.supercharge');
    if (!els.length) return;

    function initAll() {
      for (var i = 0; i < els.length; i++) {
        initSupercharge(els[i]);
      }
    }

    if (typeof document.fonts !== 'undefined' && document.fonts.ready) {
      document.fonts.ready.then(initAll, initAll);
    } else {
      initAll();
    }
  }

  window.SuperchargeExperiment = {
    defaults: R,
    init: initSupercharge,
    refresh: function(el) {
      if (!el) return;
      initSupercharge(el);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


(function() {
  if (window.SuperchargeExperiment && !window.SuperchargeText) {
    window.SuperchargeText = window.SuperchargeExperiment;
  }
})();
