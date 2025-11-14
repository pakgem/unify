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
      lazyLoadScript,
    };
  })();

  window.UnifyLoadUtils = UnifyLoadUtils;

  document.addEventListener("DOMContentLoaded", function () {
    const waitForDependencies = (callback, maxAttempts = 20) => {
      let attempts = 0;
      const check = () => {
        const hasDependencies =
          window.gsap &&
          window.ScrollTrigger &&
          window.Cookies &&
          window.$ &&
          window.analytics;

        if (hasDependencies) {
          callback();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(check, 100);
        } else {
          console.warn("Failed to load all required libraries");
        }
      };
      check();
    };

    initializeForm();
    waitForDependencies(() => {
      gsap.registerPlugin(ScrollTrigger);
      initializeNavigation();
      initializeScrollBehavior();
      initializeAnalytics();
      initializeScrollAnimations();
      initializeLinkedIn();
    });
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

    const activateLink = (link) => {
      clearActiveStates();
      link.classList.add("is--active");
    };

    const openDropdown = (dropdown) => {
      dropdown.classList.add("w--open");
    };

    elements.navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
        activateLink(link);
      });

      link.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(clearActiveStates, 200);
      });
    });

    elements.dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
        openDropdown(dropdown);
      });

      dropdown.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(clearActiveStates, 200);
      });
    });
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
            return window.unify.push([e, [].slice.call(arguments)]), window.unify;
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

    (function () {
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
        } else {
          console.log("Bot detected, Segment analytics not initialized");
        }
      } catch (error) {
        console.warn("Error initializing Segment:", error);
      }
    })();
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
  scheduleUnifyTag();
  setupSegmentAnalytics();
  setupTwitterPixel();
})(window, document);
