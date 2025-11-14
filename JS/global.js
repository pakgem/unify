(function (window, document) {
  "use strict";

  const UnifyLoadUtils = (() => {
    const runWhenIdle = (callback, timeout = 1500) => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(callback, { timeout });
      } else {
        setTimeout(callback, timeout);
      }
    };

    const runAfterInteraction = (() => {
      let hasTriggered = false;
      const queue = [];
      const listenerOptions = { passive: true };
      const events = [
        "pointerdown",
        "keydown",
        "touchstart",
        "mousemove",
        "scroll",
      ];

      const flushQueue = () => {
        if (hasTriggered) return;
        hasTriggered = true;
        events.forEach((event) =>
          window.removeEventListener(event, flushQueue, listenerOptions)
        );
        while (queue.length) {
          const cb = queue.shift();
          try {
            cb();
          } catch (error) {
            console.warn("Deferred script failed to load", error);
          }
        }
      };

      events.forEach((event) =>
        window.addEventListener(event, flushQueue, listenerOptions)
      );
      setTimeout(flushQueue, 4000);

      return (cb) => {
        if (hasTriggered) {
          cb();
        } else {
          queue.push(cb);
        }
      };
    })();

    const scriptCache = new Map();

    const loadExternalScript = (src, attributes = {}) => {
      const script = document.createElement("script");
      script.src = src;
      Object.entries(attributes).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (key in script) {
          script[key] = value;
        } else {
          script.setAttribute(key, value);
        }
      });
      document.head.appendChild(script);
      return script;
    };

    const loadScriptOnce = (src, attributes = {}) => {
      if (typeof document === "undefined") {
        return Promise.reject(new Error("Document is not available."));
      }
      if (scriptCache.has(src)) {
        return scriptCache.get(src);
      }

      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing && existing.dataset.loaded === "true") {
        return Promise.resolve(existing);
      }

      const promise = new Promise((resolve, reject) => {
        const script = loadExternalScript(src, attributes);
        script.dataset.managedSrc = src;
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve(script);
        };
        script.onerror = (event) => {
          scriptCache.delete(src);
          reject(event);
        };
      });

      scriptCache.set(src, promise);
      return promise;
    };

    const lazyLoadScript = (
      src,
      { strategy = "idle", attributes = {}, timeout = 1500 } = {}
    ) => {
      const load = () => loadExternalScript(src, attributes);
      if (strategy === "interaction") {
        runAfterInteraction(load);
      } else if (strategy === "immediate") {
        load();
      } else {
        runWhenIdle(load, timeout);
      }
      return load;
    };

    return {
      runWhenIdle,
      runAfterInteraction,
      loadExternalScript,
      loadScriptOnce,
      lazyLoadScript,
    };
  })();

  window.UnifyLoadUtils = UnifyLoadUtils;

  const CONSENT_GROUPS = {
    performance: ["C0002"],
    marketing: ["C0004"],
  };

  const consentWatchers = [];
  const TRACKING_IDS = (window.__UNIFY_TRACKING_IDS =
    window.__UNIFY_TRACKING_IDS || {});
  const missingTrackingWarnings = new Set();

  const getTrackingId = (key) => {
    const value = TRACKING_IDS[key];
    if (!value && !missingTrackingWarnings.has(key)) {
      missingTrackingWarnings.add(key);
      if (
        typeof window !== "undefined" &&
        /localhost|127\.0\.0\.1/.test(window.location.hostname)
      ) {
        console.info(
          `[tracking] Optional ID "${key}" not provided in __UNIFY_TRACKING_IDS.`
        );
      }
    }
    return value;
  };

  const isMobileViewport = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia) {
      return window.matchMedia("(max-width: 767px)").matches;
    }
    return window.innerWidth < 768;
  };

  function getGrantedConsentGroups() {
    const source =
      (typeof window !== "undefined" &&
        (window.OptanonActiveGroups || window.OnetrustActiveGroups)) ||
      "";
    return source.split(",").filter(Boolean);
  }

  function hasRequiredConsent(requiredGroups) {
    if (!requiredGroups || !requiredGroups.length) {
      return true;
    }
    const granted = getGrantedConsentGroups();
    if (!granted.length) return false;
    return requiredGroups.every((group) => granted.includes(group));
  }

  function notifyConsentWatchers() {
    consentWatchers.forEach((watcher) => {
      if (!watcher.fired && hasRequiredConsent(watcher.groups)) {
        watcher.fired = true;
        try {
          watcher.callback();
        } catch (error) {
          console.warn("Consent watcher failed", error);
        }
      }
    });
  }

  function onConsent(requiredGroups, callback) {
    const watcher = {
      groups: requiredGroups || [],
      callback,
      fired: false,
    };
    consentWatchers.push(watcher);
    if (hasRequiredConsent(watcher.groups)) {
      watcher.fired = true;
      callback();
    }
  }

  function tryAttachConsentListener() {
    if (window.__unifyConsentListenerAttached) return;
    if (
      window.OneTrust &&
      typeof window.OneTrust.OnConsentChanged === "function"
    ) {
      window.__unifyConsentListenerAttached = true;
      window.OneTrust.OnConsentChanged(function () {
        notifyConsentWatchers();
      });
    }
  }

  const GSAP_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
  const SCROLLTRIGGER_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/ScrollTrigger.min.js";
  const SWIPER_URL =
    "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js";

  const loadGsapBundle = (() => {
    let promise = null;
    return () => {
      if (window.gsap && window.ScrollTrigger) {
        return Promise.resolve();
      }
      if (!promise) {
        promise = UnifyLoadUtils.loadScriptOnce(GSAP_URL, { async: true })
          .then(() =>
            UnifyLoadUtils.loadScriptOnce(SCROLLTRIGGER_URL, { async: true })
          )
          .catch((error) => {
            console.warn("Failed to load GSAP bundle", error);
            promise = null;
            throw error;
          });
      }
      return promise;
    };
  })();

  const loadSwiperBundle = (() => {
    let promise = null;
    return () => {
      if (window.Swiper) {
        return Promise.resolve();
      }
      if (!promise) {
        promise = UnifyLoadUtils.loadScriptOnce(SWIPER_URL, {
          async: true,
        }).catch((error) => {
          console.warn("Failed to load Swiper", error);
          promise = null;
          throw error;
        });
      }
      return promise;
    };
  })();

  window.__UnifyLoadGsap = loadGsapBundle;
  window.__UnifyLoadSwiper = loadSwiperBundle;

  document.addEventListener("DOMContentLoaded", function () {
    initializeForm();
    initializeNavigation();
    initializeScrollBehavior();
    initializeLinkedIn();
    maybeInitDesktopEnhancements();
  });

  function initializeNavigation() {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const elements = {
      navLinks: document.querySelectorAll(".navbar_link-wrap"),
      dropdowns: document.querySelectorAll(".w-dropdown-toggle"),
      dropdownLinks: document.querySelectorAll(".navbar_dropdown-link"),
      megaLinks: document.querySelectorAll(".navbar-mega_dropdown-link"),
    };

    let timeoutId = null;

    const clearActiveStates = () => {
      elements.navLinks.forEach((l) => l.classList.remove("is--active"));
      elements.dropdowns.forEach((d) => d.classList.remove("w--open"));
    };
  }

  function initializeScrollBehavior() {
    const navbar = document.querySelector(".navbar_component");
    const navBg = document.querySelector(".navbar_bg");

    let ticking = false;
    const handleScroll = () => {
      if (!ticking && navbar && navBg) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 0;
          navbar.classList.toggle("with-border", scrolled);
          navBg.style.display = scrolled ? "block" : "none";
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  function initializeForm() {
    $(".default-email_form").on("submit", function (e) {
      e.preventDefault();

      var emailValue = $(this).find('input[name="Email"]').val();

      document.cookie =
        "email=" + encodeURIComponent(emailValue) + ";path=/;max-age=86400;";

      window.location.href = "/get-started";
    });
  }

  function trackGetStartedClicks() {
    try {
      const getStartedButtons = document.querySelectorAll(".get-started");

      if (!getStartedButtons.length) {
        return;
      }

      getStartedButtons.forEach((button) => {
        button.addEventListener("click", function () {
          if (
            window.analytics &&
            typeof window.analytics.track === "function"
          ) {
            analytics.track("Get Started Click", {
              page_name: document.title
                ? document.title.trim()
                : "Unknown Page",
              timestamp: new Date().toISOString(),
            });
          }
        });
      });
    } catch (error) {
      console.warn("Error setting up CTA tracking:", error);
    }
  }

  function initializeAnalytics() {
    try {
      const anonymousId = getOrCreateAnonymousId();

      if (window.analytics && typeof window.analytics.page === "function") {
        analytics.page(
          window.location.pathname,
          {
            url: window.location.href,
            path: window.location.pathname,
            anonymousId: anonymousId || undefined,
          },
          {
            integrations: { Amplitude: false },
          }
        );

        analytics.track("Viewed", {
          url: window.location.href,
          path: window.location.pathname,
          title: document.title || "",
          referrer: document.referrer || "",
          anonymousId: anonymousId || undefined,
        });
      }

      document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", () => {
          if (
            window.analytics &&
            typeof window.analytics.identify === "function"
          ) {
            const email = form.querySelector("input[type=email]")?.value;
            if (email && anonymousId) {
              analytics.identify(anonymousId, {
                email,
                lastUpdated: new Date().toISOString(),
              });
            }
          }
        });
      });

      trackGetStartedClicks();
    } catch (error) {
      console.warn("Analytics error:", error);
    }
  }

  function initializeScrollAnimations() {
    if (window.innerWidth <= 1160) return;

    try {
      const elements = {
        signIn: document.querySelector(".sign-in"),
        epLink: document.querySelector(".ep-link"),
        productLink: document.querySelector(".product-link"),
      };

      if (!elements.signIn || !elements.epLink || !elements.productLink) return;

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "+=1",
        onEnter: () => animateElements(elements, true),
        onLeaveBack: () => animateElements(elements, false),
      });
    } catch (error) {}
  }

  function animateElements(elements, entering) {
    const { signIn, epLink, productLink } = elements;

    gsap.to(signIn, {
      opacity: entering ? 0 : 1,
      y: entering ? 10 : 0,
      duration: 0.3,
      onStart: () => {
        if (!entering) signIn.style.display = "flex";
      },
      onComplete: () => {
        if (entering) {
          signIn.style.display = "none";
          signIn.classList.add("hide-link");
        } else {
          signIn.classList.remove("hide-link");
        }
      },
    });

    gsap.to(epLink, {
      opacity: entering ? 1 : 0,
      y: entering ? 0 : 10,
      duration: 0.3,
      onStart: () => {
        if (entering) {
          epLink.style.display = "flex";
          epLink.classList.remove("hide-link");
        }
      },
      onComplete: () => {
        if (!entering) {
          epLink.style.display = "none";
          epLink.classList.add("hide-link");
        }
      },
    });

    gsap.to(productLink, {
      opacity: entering ? 0 : 1,
      y: entering ? 10 : 0,
      duration: 0.3,
    });
  }

  function initializeLinkedIn() {
    document.querySelectorAll(".get-started").forEach((button) => {
      button.addEventListener("click", () => {
        if (typeof window.lintrk === "function") {
          window.lintrk("track", { conversion_id: 17369962 });
        }
      });
    });

    const linkedInForm = document.querySelector("#linkedin");
    if (linkedInForm) {
      linkedInForm.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });
    }
  }

  function getOrCreateAnonymousId() {
    try {
      if (
        typeof analytics === "undefined" ||
        typeof analytics.user !== "function"
      ) {
        return null;
      }

      let id = localStorage.getItem("segment_anonymous_id");

      if (!id) {
        id = analytics.user().anonymousId();
        console.log(id);
        if (id) {
          localStorage.setItem("segment_anonymous_id", id);
        }
      }

      return id;
    } catch (error) {
      console.warn("Anonymous ID error:", error);
      return null;
    }
  }

  function setupLinkedInPixel() {
    window._linkedin_partner_id = "6129522";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

    const loadLinkedInPixel = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      document.head.appendChild(script);
    };

    UnifyLoadUtils.runAfterInteraction(loadLinkedInPixel);

    if (!window.lintrk) {
      window.lintrk = function (a, b) {
        window.lintrk.q = window.lintrk.q || [];
        window.lintrk.q.push([a, b]);
      };
    }
  }

  function setupNavattic() {
    window.navatticQueue = window.navatticQueue || [];
    window.navattic =
      window.navattic ||
      new Proxy(
        {},
        {
          get: function (_target, property) {
            return function () {
              const args = Array.from(arguments);
              return window.navatticQueue.push({
                function: property,
                arguments: args,
              });
            };
          },
        }
      );

    UnifyLoadUtils.lazyLoadScript("https://js.navattic.com/embed-events.js", {
      strategy: "interaction",
      attributes: { async: true },
    });
  }

  function scheduleBrowserTestPixel() {
    const loadBrowserTest = () => {
      const script = document.createElement("script");
      script.async = true;
      script.id = "tvo";
      script.src =
        "https://a.usbrowserspeed.com/cs?pid=bcd62c752944a79956a221201f69c95645ea0c811396a71f7529e47414c5e58a";
      document.head.appendChild(script);
    };

    UnifyLoadUtils.runWhenIdle(loadBrowserTest, 2000);
  }

  function scheduleCookieLaw() {
    const domainScript = "01960838-72b8-7262-aeab-539642590360";
    const hasExistingConsent = () =>
      typeof document !== "undefined" &&
      document.cookie &&
      document.cookie.indexOf("OptanonConsent=") !== -1;

    const loadOneTrust = () => {
      if (window.OneTrustDeferredLoaded) {
        notifyConsentWatchers();
        tryAttachConsentListener();
        return;
      }

      const sdk = document.createElement("script");
      sdk.src = "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js";
      sdk.type = "text/javascript";
      sdk.charset = "UTF-8";
      sdk.setAttribute("data-domain-script", domainScript);
      sdk.onload = () => {
        window.OneTrustDeferredLoaded = true;
        tryAttachConsentListener();
        notifyConsentWatchers();
      };

      document.head.appendChild(sdk);
    };

    const existingOptanonWrapper = window.OptanonWrapper;
    window.OptanonWrapper = function () {
      window.OneTrustDeferredLoaded = true;
      tryAttachConsentListener();
      notifyConsentWatchers();
      if (typeof existingOptanonWrapper === "function") {
        try {
          existingOptanonWrapper();
        } catch (error) {
          console.warn("Existing OptanonWrapper threw an error", error);
        }
      }
    };

    const scheduleLoad = ({ idleDelay, fallbackDelay, gate = "interaction" }) => {
      let triggered = false;
      const run = () => {
        if (triggered) return;
        triggered = true;
        if (
          typeof UnifyLoadUtils.runWhenIdle === "function" &&
          typeof UnifyLoadUtils.runAfterInteraction === "function"
        ) {
          UnifyLoadUtils.runWhenIdle(loadOneTrust, idleDelay);
        } else {
          setTimeout(loadOneTrust, idleDelay);
        }
      };

      if (gate === "scroll" && typeof window !== "undefined") {
        const handleScroll = () => {
          window.removeEventListener("scroll", handleScroll);
          run();
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
      } else if (
        typeof UnifyLoadUtils.runAfterInteraction === "function" &&
        typeof UnifyLoadUtils.runWhenIdle === "function"
      ) {
        UnifyLoadUtils.runAfterInteraction(run);
      } else {
        run();
      }

      setTimeout(() => {
        if (!triggered) {
          loadOneTrust();
        }
      }, fallbackDelay);
    };

    const mobile = isMobileViewport();
    if (hasExistingConsent()) {
      scheduleLoad({
        idleDelay: mobile ? 6000 : 3000,
        fallbackDelay: mobile ? 45000 : 25000,
        gate: "interaction",
      });
    } else {
      scheduleLoad({
        idleDelay: mobile ? 4000 : 2000,
        fallbackDelay: mobile ? 40000 : 20000,
        gate: "scroll",
      });
    }
  }

  function maybeInitDesktopEnhancements() {
    const desktopQuery = window.matchMedia
      ? window.matchMedia("(min-width: 992px)")
      : null;

    const loadDesktopLibraries = () => {
      loadGsapBundle()
        .then(() => {
          const waitForGsap = (callback, maxAttempts = 20) => {
            let attempts = 0;
            const check = () => {
              const hasDependencies =
                window.gsap &&
                window.ScrollTrigger &&
                window.Cookies &&
                window.$;

              if (hasDependencies) {
                callback();
              } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(check, 100);
              } else {
                console.warn("Failed to load GSAP dependencies");
              }
            };
            check();
          };

          waitForGsap(() => {
            gsap.registerPlugin(ScrollTrigger);
            initializeScrollAnimations();
          });
        })
        .catch((error) => {
          console.warn("Desktop enhancements failed to load", error);
        });
    };

    if (!desktopQuery) {
      loadDesktopLibraries();
      return;
    }

    if (desktopQuery.matches) {
      loadDesktopLibraries();
    } else {
      const handler = (event) => {
        if (event.matches) {
          loadDesktopLibraries();
          if (desktopQuery.removeEventListener) {
            desktopQuery.removeEventListener("change", handler);
          } else if (desktopQuery.removeListener) {
            desktopQuery.removeListener(handler);
          }
        }
      };

      if (desktopQuery.addEventListener) {
        desktopQuery.addEventListener("change", handler);
      } else if (desktopQuery.addListener) {
        desktopQuery.addListener(handler);
      }
    }
  }

  function scheduleDefaultPixel() {
    let hasLoaded = false;
    const loadPixel = () => {
      if (hasLoaded) return;
      hasLoaded = true;
      if (document.querySelector("script[data-default-pixel]")) return;

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = "https://pixel-cdn.default.com";
      script.setAttribute("data-default-pixel", "true");
      document.head.appendChild(script);
    };

    if (
      typeof UnifyLoadUtils.runAfterInteraction === "function" &&
      typeof UnifyLoadUtils.runWhenIdle === "function"
    ) {
      UnifyLoadUtils.runAfterInteraction(() =>
        UnifyLoadUtils.runWhenIdle(
          loadPixel,
          isMobileViewport() ? 4000 : 2000
        )
      );
    }

    setTimeout(loadPixel, isMobileViewport() ? 20000 : 9000);
  }

  function scheduleGtmContainer() {
    const containerId = "GTM-5NKFVR3";
    const dataLayerName = "dataLayer";

    window[dataLayerName] = window[dataLayerName] || [];
    window[dataLayerName].push({
      "gtm.start": Date.now(),
      event: "gtm.js",
      "gtm.delayed": true,
    });

    let hasLoaded = false;
    const injectGtm = () => {
      if (hasLoaded) return;
      hasLoaded = true;

      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://www.googletagmanager.com/gtm.js?id=" +
        containerId +
        "&l=" +
        dataLayerName;

      window[dataLayerName].push({
        event: "gtm.deferredLoad",
        "gtm.loadTime": Date.now(),
      });

      document.head.appendChild(script);
    };

    onConsent(CONSENT_GROUPS.performance, () => {
      const mobile = isMobileViewport();
      const idleDelay = mobile ? 4500 : 1500;
      const fallbackDelay = mobile ? 35000 : 20000;

      if (
        typeof UnifyLoadUtils.runAfterInteraction === "function" &&
        typeof UnifyLoadUtils.runWhenIdle === "function"
      ) {
        UnifyLoadUtils.runAfterInteraction(() =>
          UnifyLoadUtils.runWhenIdle(injectGtm, idleDelay)
        );
      }
      setTimeout(injectGtm, fallbackDelay);
    });
  }

  function scheduleGtagMeasurement() {
    const measurementId = "G-FJ9R7F6WZJ";
    let hasLoaded = false;

    const injectGtag = () => {
      if (hasLoaded) return;
      hasLoaded = true;

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = window.gtag || gtag;

      if (!document.querySelector("script[data-gtag-measurement]")) {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
        script.setAttribute("data-gtag-measurement", measurementId);
        document.head.appendChild(script);
      }

      window.gtag("js", new Date());
      window.gtag("config", measurementId);
    };

    onConsent(CONSENT_GROUPS.performance, () => {
      const mobile = isMobileViewport();
      const idleDelay = mobile ? 5000 : 2000;
      const fallbackDelay = mobile ? 36000 : 22000;

      if (
        typeof UnifyLoadUtils.runAfterInteraction === "function" &&
        typeof UnifyLoadUtils.runWhenIdle === "function"
      ) {
        UnifyLoadUtils.runAfterInteraction(() =>
          UnifyLoadUtils.runWhenIdle(injectGtag, idleDelay)
        );
      }
      setTimeout(injectGtag, fallbackDelay);
    });
  }

  function scheduleClarityTracking() {
    const loadClarity = () => {
      const clarityId = getTrackingId("clarity");
      if (!clarityId) return;
      if (window.__clarityInitialized) return;
      window.__clarityInitialized = true;
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", clarityId);
    };

    onConsent(CONSENT_GROUPS.marketing, () => {
      const mobile = isMobileViewport();
      const idleDelay = mobile ? 7000 : 2200;
      const fallbackDelay = mobile ? 40000 : 22000;

      if (
        typeof UnifyLoadUtils.runAfterInteraction === "function" &&
        typeof UnifyLoadUtils.runWhenIdle === "function"
      ) {
        UnifyLoadUtils.runAfterInteraction(() =>
          UnifyLoadUtils.runWhenIdle(loadClarity, idleDelay)
        );
      }

      setTimeout(loadClarity, fallbackDelay);
    });
  }

  function scheduleBingTracking() {
    const loadBing = () => {
      const bingTag = getTrackingId("bing");
      if (!bingTag) return;
      if (window.__bingTrackingLoaded) return;
      window.__bingTrackingLoaded = true;
      (function (w, d, t, r, u) {
        var f, n, i;
        w[u] = w[u] || [];
        f = function () {
          var o = { ti: bingTag };
          o.q = w[u];
          w[u] = new UET(o);
          w[u].push("pageLoad");
        };
        n = d.createElement(t);
        n.src = r;
        n.async = 1;
        n.onload = n.onreadystatechange = function () {
          var s = this.readyState;
          if (!s || s === "loaded" || s === "complete") {
            f();
            n.onload = n.onreadystatechange = null;
          }
        };
        i = d.getElementsByTagName(t)[0];
        i.parentNode.insertBefore(n, i);
      })(window, document, "script", "https://bat.bing.com/bat.js", "uetq");
    };

    onConsent(CONSENT_GROUPS.marketing, () => {
      const mobile = isMobileViewport();
      const idleDelay = mobile ? 7500 : 2500;
      const fallbackDelay = mobile ? 42000 : 23000;

      if (
        typeof UnifyLoadUtils.runAfterInteraction === "function" &&
        typeof UnifyLoadUtils.runWhenIdle === "function"
      ) {
        UnifyLoadUtils.runAfterInteraction(() =>
          UnifyLoadUtils.runWhenIdle(loadBing, idleDelay)
        );
      }

      setTimeout(loadBing, fallbackDelay);
    });
  }

  function scheduleAmplitudeAnalytics() {
    const loadAmplitude = () => {
      const apiKey = getTrackingId("amplitude");
      if (!apiKey) return;
      if (window.__amplitudeInitialized) return;
      window.__amplitudeInitialized = true;
      UnifyLoadUtils.loadScriptOnce(
        "https://cdn.amplitude.com/libs/analytics-browser-gtm-2.8.0-min.js",
        { async: true }
      )
        .then(() => {
          if (
            window.amplitude &&
            typeof window.amplitude.getInstance === "function"
          ) {
            window.amplitude.getInstance().init(apiKey, undefined, {
              defaultTracking: {
                pageViews: true,
              },
              trackingOptions: {
                ipAddress: false,
              },
            });
          } else if (
            window.amplitude &&
            typeof window.amplitude.init === "function"
          ) {
            window.amplitude.init(apiKey);
          } else {
            console.warn("Amplitude SDK loaded but global API unavailable.");
          }
        })
        .catch((error) => {
          window.__amplitudeInitialized = false;
          console.warn("Failed to load Amplitude SDK", error);
        });
    };

    onConsent(CONSENT_GROUPS.performance, () => {
      const mobile = isMobileViewport();
      const idleDelay = mobile ? 6000 : 1800;
      const fallbackDelay = mobile ? 36000 : 18000;

      if (
        typeof UnifyLoadUtils.runAfterInteraction === "function" &&
        typeof UnifyLoadUtils.runWhenIdle === "function"
      ) {
        UnifyLoadUtils.runAfterInteraction(() =>
          UnifyLoadUtils.runWhenIdle(loadAmplitude, idleDelay)
        );
      }

      setTimeout(loadAmplitude, fallbackDelay);
    });
  }

  function scheduleUnifyTag() {
    window.unify =
      window.unify ||
      Object.assign(
        [],
        [
          "identify",
          "page",
          "startAutoPage",
          "stopAutoPage",
          "startAutoIdentify",
          "stopAutoIdentify",
        ].reduce(function (t, e) {
          t[e] = function () {
            return (
              window.unify.push([e, [].slice.call(arguments)]), window.unify
            );
          };
          return t;
        }, {})
      );

    const injectUnifyTag = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://tag.unifyintent.com/v1/AKUXjLHgk642jVe4ZNwfEK/script-staging.js";
      script.setAttribute(
        "data-api-key",
        "wk_5fTtsDLJ_7vx9DsjPcr79yk4FweES727w59pxS8EJ"
      );
      script.id = "unifytag";
      document.head.appendChild(script);
    };

    UnifyLoadUtils.runAfterInteraction(() =>
      UnifyLoadUtils.runWhenIdle(injectUnifyTag, 2000)
    );
  }

  function setupSegmentAnalytics() {
    function isBot() {
      return (
        /bot|crawler|spider|crawling/i.test(navigator.userAgent) ||
        navigator.webdriver ||
        window._phantom ||
        window.__nightmare ||
        window.callPhantom ||
        document.__selenium_unwrapped ||
        /HeadlessChrome/.test(navigator.userAgent)
      );
    }

    const pageNameFull = document.title ? document.title.split("-")[0] : "";
    const pageNameTrimmed = pageNameFull ? pageNameFull.trim() : "";

    const bootstrapSegment = () => {
      if (window.__segmentBootstrapped) {
        initializeAnalytics();
        return;
      }
      try {
        if (!isBot()) {
          var analytics = (window.analytics = window.analytics || []);
          if (!analytics.initialize) {
            if (analytics.invoked) {
              window.console &&
                console.error &&
                console.error("Segment snippet included twice.");
              return;
            }
            analytics.invoked = !0;
            analytics.methods = [
              "trackSubmit",
              "trackClick",
              "trackLink",
              "trackForm",
              "pageview",
              "identify",
              "reset",
              "group",
              "track",
              "ready",
              "alias",
              "debug",
              "page",
              "once",
              "off",
              "on",
              "addSourceMiddleware",
              "addIntegrationMiddleware",
              "setAnonymousId",
              "addDestinationMiddleware",
            ];
            analytics.factory = function (e) {
              return function () {
                var t = Array.prototype.slice.call(arguments);
                t.unshift(e);
                analytics.push(t);
                return analytics;
              };
            };
            for (var e = 0; e < analytics.methods.length; e++) {
              var key = analytics.methods[e];
              analytics[key] = analytics.factory(key);
            }
            analytics.load = function (key, e) {
              var t = document.createElement("script");
              t.type = "text/javascript";
              t.async = !0;
              t.src =
                "https://cdn.segment.com/analytics.js/v1/" +
                key +
                "/analytics.min.js";
              var n = document.getElementsByTagName("script")[0];
              n.parentNode.insertBefore(t, n);
              analytics._loadOptions = e || {
                integrations: {
                  "Segment.io": {
                    botFiltering: true,
                  },
                },
              };
            };
            analytics._writeKey = "sQrrlorDOdJXFEMEGP6ZD9EjtL9KTJ66";
            analytics.SNIPPET_VERSION = "4.15.3";
            analytics.load("sQrrlorDOdJXFEMEGP6ZD9EjtL9KTJ66");
          }
          window.__segmentBootstrapped = true;
          initializeAnalytics();
        } else {
          console.log("Bot detected, Segment analytics not initialized");
        }
      } catch (error) {
        console.warn("Error initializing Segment:", error);
      }
    };

    onConsent(CONSENT_GROUPS.marketing, () => {
      const mobile = isMobileViewport();
      const idleDelay = mobile ? 6000 : 2000;
      const fallbackDelay = mobile ? 20000 : 11000;

      if (
        typeof UnifyLoadUtils.runAfterInteraction === "function" &&
        typeof UnifyLoadUtils.runWhenIdle === "function"
      ) {
        UnifyLoadUtils.runAfterInteraction(() =>
          UnifyLoadUtils.runWhenIdle(bootstrapSegment, idleDelay)
        );
      } else {
        bootstrapSegment();
      }

      setTimeout(bootstrapSegment, fallbackDelay);
    });
  }

  function setupTwitterPixel() {
    const initTwitterPixel = () => {
      !(function (e, t, n, s, u, a) {
        e.twq ||
          ((s = e.twq =
            function () {
              s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }),
          (s.version = "1.1"),
          (s.queue = []),
          (u = t.createElement(n)),
          (u.async = !0),
          (u.src = "https://static.ads-twitter.com/uwt.js"),
          (a = t.getElementsByTagName(n)[0]),
          a.parentNode.insertBefore(u, a));
      })(window, document, "script");
      twq("config", "q4sy6");
    };

    UnifyLoadUtils.runAfterInteraction(initTwitterPixel);
  }

  setupLinkedInPixel();
  setupNavattic();
  scheduleBrowserTestPixel();
  scheduleCookieLaw();
  scheduleDefaultPixel();
  scheduleGtmContainer();
  scheduleGtagMeasurement();
  scheduleClarityTracking();
  scheduleBingTracking();
  scheduleAmplitudeAnalytics();
  scheduleUnifyTag();
  setupSegmentAnalytics();
  setupTwitterPixel();
})(window, document);
