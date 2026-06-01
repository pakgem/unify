(function (window, document) {
  "use strict";

  var STYLE_ID = "unify-supercharge-text-style";
  var DEFAULTS = {
    cover: 4,
    color: "#FE3C01",
    autoSpeed: 2.5,
    maxBlur: 0.028,
    ovalScale: 5,
    shiftRight: 0.667,
    overlayBlur: 0.756,
    plusLighterBlur: 0.734,
    hoverBoost: 2.1,
    hoverRamp: 2300,
    energyNoise: 3.7,
  };

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      ".supercharge.sc-ready{" +
      "position:relative;display:inline-block;isolation:isolate;" +
      "--sc-color:#FE3C01;--sc-word-width:0px;--sc-word-height:1em;" +
      "--sc-cover-width:0px;--sc-cover-left:0px;" +
      "--sc-overlay-blur:0.756em;--sc-plus-blur:0.734em;" +
      "--sc-speed:2.5s;--sc-hover-ramp:2300ms;--sc-hover-level:0;" +
      "--sc-hover-boost:2.1;--sc-noise:3.7;" +
      "}" +
      ".supercharge.sc-ready .sc-kern-ref{" +
      "position:relative;z-index:3;display:inline-block;color:inherit;white-space:inherit;" +
      "}" +
      ".supercharge.sc-ready .sc-char{" +
      "position:absolute;z-index:2;display:block;pointer-events:none;" +
      "color:var(--sc-color);" +
      "mix-blend-mode:multiply;" +
      "text-shadow:" +
      "0 0 calc((0.04em + var(--sc-noise) * 0.012em) * (1 + var(--sc-hover-level) * var(--sc-hover-boost))) var(--sc-color)," +
      "0 0 calc((0.16em + var(--sc-noise) * 0.032em) * (1 + var(--sc-hover-level) * var(--sc-hover-boost))) var(--sc-color);" +
      "text-shadow:" +
      "0 0 calc((0.04em + var(--sc-noise) * 0.012em) * (1 + var(--sc-hover-level) * var(--sc-hover-boost))) color-mix(in srgb,var(--sc-color) 84%,transparent)," +
      "0 0 calc((0.16em + var(--sc-noise) * 0.032em) * (1 + var(--sc-hover-level) * var(--sc-hover-boost))) color-mix(in srgb,var(--sc-color) 54%,transparent);" +
      "transition:filter var(--sc-hover-ramp) ease,text-shadow var(--sc-hover-ramp) ease;" +
      "}" +
      ".supercharge.sc-ready .sc-overlay," +
      ".supercharge.sc-ready .sc-plus-lighter{" +
      "position:absolute;top:0;pointer-events:none;transform-origin:center;" +
      "mix-blend-mode:plus-lighter;" +
      "}" +
      ".supercharge.sc-ready .sc-overlay{" +
      "z-index:1;left:calc(var(--sc-cover-left) - var(--sc-cover-width) * 0.45);" +
      "width:calc(var(--sc-cover-width) * var(--sc-oval-scale,5));" +
      "height:var(--sc-word-height);opacity:0.72;" +
      "background:radial-gradient(ellipse at center,var(--sc-color) 0%,var(--sc-color) 34%,transparent 72%);" +
      "background:radial-gradient(ellipse at center,color-mix(in srgb,var(--sc-color) 76%,white 10%) 0%,color-mix(in srgb,var(--sc-color) 46%,transparent) 34%,transparent 72%);" +
      "filter:blur(var(--sc-overlay-blur));" +
      "animation:sc-drift var(--sc-speed) ease-in-out infinite alternate;" +
      "transition:opacity var(--sc-hover-ramp) ease,filter var(--sc-hover-ramp) ease;" +
      "}" +
      ".supercharge.sc-ready .sc-plus-lighter{" +
      "z-index:4;left:calc(var(--sc-cover-left) + var(--sc-cover-width) * 1.55);" +
      "width:var(--sc-cover-width);height:var(--sc-word-height);opacity:0.44;" +
      "background:linear-gradient(90deg,transparent,var(--sc-color),transparent);" +
      "background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--sc-color) 24%,white 76%),transparent);" +
      "filter:blur(var(--sc-plus-blur));" +
      "animation:sc-drift calc(var(--sc-speed) * 1.18) ease-in-out infinite alternate-reverse;" +
      "transition:opacity var(--sc-hover-ramp) ease,filter var(--sc-hover-ramp) ease;" +
      "}" +
      ".supercharge.sc-ready:hover{" +
      "--sc-hover-level:1;" +
      "}" +
      ".supercharge.sc-ready:hover .sc-overlay{" +
      "opacity:1;filter:blur(calc(var(--sc-overlay-blur) * 1.35));" +
      "}" +
      ".supercharge.sc-ready:hover .sc-plus-lighter{" +
      "opacity:0.86;filter:blur(calc(var(--sc-plus-blur) * 1.25));" +
      "}" +
      "@keyframes sc-drift{" +
      "from{transform:translate3d(calc(var(--sc-shift-right,0em) * -1),0,0);}" +
      "to{transform:translate3d(calc(var(--sc-shift-right,0em) * 1),0,0);}" +
      "}" +
      "@media (prefers-reduced-motion:reduce){" +
      ".supercharge.sc-ready .sc-overlay,.supercharge.sc-ready .sc-plus-lighter{animation:none;}" +
      "}";

    document.head.appendChild(style);
  }

  function toNumber(value, fallback) {
    var number = parseFloat(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function option(element, key, fallback) {
    var attr = element.getAttribute("data-sc-" + key);
    return attr === null || attr === "" ? fallback : attr;
  }

  function readOptions(element) {
    return {
      cover: Math.max(
        0,
        Math.round(toNumber(option(element, "cover", DEFAULTS.cover), DEFAULTS.cover))
      ),
      color: option(element, "color", DEFAULTS.color),
      autoSpeed: Math.max(
        0.1,
        toNumber(option(element, "auto-speed", DEFAULTS.autoSpeed), DEFAULTS.autoSpeed)
      ),
      maxBlur: Math.max(
        0,
        toNumber(option(element, "max-blur", DEFAULTS.maxBlur), DEFAULTS.maxBlur)
      ),
      ovalScale: Math.max(
        0.1,
        toNumber(option(element, "oval-scale", DEFAULTS.ovalScale), DEFAULTS.ovalScale)
      ),
      shiftRight: toNumber(
        option(element, "shift-right", DEFAULTS.shiftRight),
        DEFAULTS.shiftRight
      ),
      overlayBlur: Math.max(
        0,
        toNumber(
          option(element, "overlay-blur", DEFAULTS.overlayBlur),
          DEFAULTS.overlayBlur
        )
      ),
      plusLighterBlur: Math.max(
        0,
        toNumber(
          option(element, "plus-lighter-blur", DEFAULTS.plusLighterBlur),
          DEFAULTS.plusLighterBlur
        )
      ),
      hoverBoost: Math.max(
        0,
        toNumber(option(element, "hover-boost", DEFAULTS.hoverBoost), DEFAULTS.hoverBoost)
      ),
      hoverRamp: Math.max(
        0,
        toNumber(option(element, "hover-ramp", DEFAULTS.hoverRamp), DEFAULTS.hoverRamp)
      ),
      energyNoise: Math.max(
        0,
        toNumber(
          option(element, "energy-noise", DEFAULTS.energyNoise),
          DEFAULTS.energyNoise
        )
      ),
    };
  }

  function applyVariables(element, options) {
    var animationDuration = 6 / options.autoSpeed;

    element.style.setProperty("--sc-color", options.color);
    element.style.setProperty("--sc-speed", animationDuration + "s");
    element.style.setProperty("--sc-letter-blur", options.maxBlur + "em");
    element.style.setProperty("--sc-oval-scale", options.ovalScale);
    element.style.setProperty("--sc-shift-right", options.shiftRight + "em");
    element.style.setProperty("--sc-overlay-blur", options.overlayBlur + "em");
    element.style.setProperty("--sc-plus-blur", options.plusLighterBlur + "em");
    element.style.setProperty("--sc-hover-boost", options.hoverBoost);
    element.style.setProperty("--sc-hover-ramp", options.hoverRamp + "ms");
    element.style.setProperty("--sc-noise", options.energyNoise);
  }

  function getBlur(index, total, maxBlur) {
    if (total <= 1) return maxBlur;
    var center = (total - 1) / 2;
    var distance = Math.abs(index - center) / center;
    var wave = 0.35 + distance * 0.65;
    return maxBlur * wave;
  }

  function setCoverMetrics(element, reference, letters, cover, options) {
    var referenceRect = reference.getBoundingClientRect();
    var elementRect = element.getBoundingClientRect();
    var chargedLetters = letters.slice(0, Math.min(cover, letters.length));

    element.style.setProperty("--sc-word-width", referenceRect.width + "px");
    element.style.setProperty("--sc-word-height", referenceRect.height + "px");

    letters.forEach(function (letter, index) {
      var rect = letter._scMeasure.getBoundingClientRect();
      letter.style.left = rect.left - elementRect.left + "px";
      letter.style.top = rect.top - elementRect.top + "px";
      letter.style.filter =
        "blur(" +
        getBlur(index, letters.length, options.maxBlur * referenceRect.height) +
        "px) contrast(1.15) saturate(1.1)";
    });

    if (!chargedLetters.length) {
      element.style.setProperty("--sc-cover-left", "0px");
      element.style.setProperty("--sc-cover-width", "0px");
      return;
    }

    var firstRect = chargedLetters[0]._scMeasure.getBoundingClientRect();
    var lastRect =
      chargedLetters[chargedLetters.length - 1]._scMeasure.getBoundingClientRect();
    var left = firstRect.left - elementRect.left;
    var width = lastRect.right - firstRect.left;

    element.style.setProperty("--sc-cover-left", left + "px");
    element.style.setProperty("--sc-cover-width", width + "px");
  }

  function scheduleMetrics(element, reference, letters, cover, options) {
    var frame = 0;

    function measure() {
      frame = 0;
      setCoverMetrics(element, reference, letters, cover, options);
    }

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    }

    schedule();
    return {
      schedule: schedule,
      cancel: function () {
        if (frame) window.cancelAnimationFrame(frame);
      },
    };
  }

  function init(element) {
    if (!element) return null;
    if (element._superchargeDestroy) element._superchargeDestroy();

    injectStyles();

    var originalText = element.textContent || "";
    var options = readOptions(element);
    var characters = Array.from(originalText);
    var reference = document.createElement("span");
    var overlay = document.createElement("span");
    var plus = document.createElement("span");
    var letters = [];

    reference.className = "sc-kern-ref";
    reference.setAttribute("aria-hidden", "true");
    overlay.className = "sc-overlay";
    overlay.setAttribute("aria-hidden", "true");
    plus.className = "sc-plus-lighter";
    plus.setAttribute("aria-hidden", "true");

    characters.forEach(function (character, index) {
      var measure = document.createElement("span");
      var letter = document.createElement("span");

      measure.textContent = character;
      reference.appendChild(measure);

      letter.className = "sc-char";
      letter.textContent = character;
      letter._scMeasure = measure;
      letter.style.animationDelay = index * 70 + "ms";
      letters.push(letter);
    });

    element.textContent = "";
    element.setAttribute("role", "text");
    element.setAttribute("aria-label", originalText);
    element.appendChild(reference);
    letters.forEach(function (letter) {
      element.appendChild(letter);
    });
    element.appendChild(overlay);
    element.appendChild(plus);
    element.classList.add("sc-ready");
    applyVariables(element, options);

    var metrics = scheduleMetrics(element, reference, letters, options.cover, options);
    var resizeObserver = null;

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(metrics.schedule);
      resizeObserver.observe(element);
    } else {
      window.addEventListener("resize", metrics.schedule);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(metrics.schedule).catch(function () {});
    }

    element._superchargeDestroy = function () {
      metrics.cancel();
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", metrics.schedule);
      }

      element.classList.remove("sc-ready");
      element.removeAttribute("aria-label");
      element.removeAttribute("role");
      element.textContent = originalText;
      delete element._superchargeDestroy;
    };

    return element._superchargeDestroy;
  }

  function initAll(root) {
    var scope = root || document;
    var elements = scope.querySelectorAll
      ? scope.querySelectorAll(".supercharge")
      : [];

    if (scope.classList && scope.classList.contains("supercharge")) {
      init(scope);
    }

    Array.prototype.forEach.call(elements, init);
  }

  function onReady() {
    initAll(document);
  }

  window.SuperchargeText = {
    init: init,
    initAll: initAll,
  };

  window.SuperchargeExperiment = window.SuperchargeText;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})(window, document);
