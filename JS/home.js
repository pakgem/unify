(function (window, document) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    setupSwiper();
    setupPlyr();
    setupLightboxYouTubeTracking();
  });

  function setupSwiper() {
    if (window.jQuery) {
      if (window.jQuery(".empty-state.w-dyn-empty").length) {
        window.jQuery(".section_related-items").hide();
      }
    }

    const swiperElement = document.querySelector("#basic-swiper");
    if (!swiperElement) return;

    const initSwiper = () => {
      const startSwiper = () => {
        if (typeof window.Swiper === "undefined") {
          if (typeof window.__UnifyLoadSwiper === "function") {
            window
              .__UnifyLoadSwiper()
              .then(startSwiper)
              .catch((error) =>
                console.warn("Failed to load Swiper bundle", error)
              );
            return;
          }
          console.error("Swiper library not found.");
          return;
        }

        new Swiper("#basic-swiper", {
          slidesPerView: 2.5,
          slidesPerGroup: 1,
          grabCursor: false,
          a11y: false,
          spaceBetween: 24,
          allowTouchMove: true,
          navigation: {
            nextEl: "#right-button",
            prevEl: "#left-button",
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 24,
            },
            480: {
              slidesPerView: 1.3,
              slidesPerGroup: 1,
              spaceBetween: 24,
            },
            767: {
              slidesPerView: 1.8,
              slidesPerGroup: 1,
              spaceBetween: 24,
            },
            992: {
              slidesPerView: 2.5,
              slidesPerGroup: 1,
              spaceBetween: 24,
            },
          },
        });
      };

      startSwiper();
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              initSwiper();
            }
          });
        },
        { rootMargin: "300px" }
      );
      observer.observe(swiperElement);
    } else {
      initSwiper();
    }
  }

  function setupPlyr() {
    if (!window.jQuery) {
      console.error("jQuery missing for Plyr initialization.");
      return;
    }

    const $ = window.jQuery;
    const components = Array.from(document.querySelectorAll(".plyr_component"));
    if (!components.length) return;

    const initComponent = (element) => {
      if (element.dataset.plyrInitialized === "true") return;
      if (!window.Plyr) {
        console.error("Plyr library missing.");
        return;
      }

      element.dataset.plyrInitialized = "true";
      const thisComponent = $(element);
      const player = new Plyr(thisComponent.find(".plyr_video")[0], {
        controls: ["play", "progress", "current-time", "mute", "fullscreen"],
        resetOnEnd: true,
        autoplay: false,
        muted: false,
      });

      player.on("play", function () {
        if (window.analytics && typeof window.analytics.track === "function") {
          window.analytics.track("Video Played");
        }
      });

      setTimeout(() => {
        if (!player.paused) {
          player.pause();
          thisComponent.removeClass("hide-cover");
        }
      }, 100);

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          player.pause();
        }
      });

      thisComponent.find(".plyr_cover").on("click", function () {
        player.play();
      });

      player.on("ended", () => {
        thisComponent.removeClass("hide-cover");
      });

      player.on("play", () => {
        $(".plyr_component").removeClass("hide-cover");
        thisComponent.addClass("hide-cover");
        const prevPlayingComponent = $(".plyr--playing")
          .closest(".plyr_component")
          .not(thisComponent);
        if (prevPlayingComponent.length > 0) {
          prevPlayingComponent.find(".plyr_pause-trigger")[0].click();
        }
      });

      thisComponent.find(".plyr_pause-trigger").on("click", function () {
        player.pause();
      });

      player.on("ended", () => {
        if (player.fullscreen.active) {
          player.fullscreen.exit();
        }
      });

      player.on("enterfullscreen", () => {
        thisComponent.addClass("contain-video");
      });

      player.on("exitfullscreen", () => {
        thisComponent.removeClass("contain-video");
      });

      $(".hero_preview-vid").on("click", function () {
        player.play();
        thisComponent.addClass("hide-cover");
      });

      $(".background-close").on("click", function () {
        player.pause();
        thisComponent.removeClass("hide-cover");
      });

      $(document).on("keydown", function (e) {
        if (e.key === "Escape" && !player.paused) {
          $(".background-close").click();
          player.pause();
          thisComponent.removeClass("hide-cover");
        }
      });
    };

    // Ensure the primary hero video is ready immediately so first-click autoplay works.
    initComponent(components[0]);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              initComponent(entry.target);
            }
          });
        },
        { rootMargin: "200px" }
      );
      components.forEach((component) => observer.observe(component));
    } else {
      components.forEach(initComponent);
    }
  }

  function setupLightboxYouTubeTracking() {
    const lightboxLinks = Array.from(
      document.querySelectorAll(".home-lightbox.w-lightbox")
    );
    if (!lightboxLinks.length) return;

    const durationOverrides = {
      bqgbZlMSW1I: 114,
    };
    const trackingState = {
      activeSession: null,
    };

    lightboxLinks.forEach((link) => {
      const videoInfo = extractLightboxVideoInfo(link);
      if (!videoInfo || !videoInfo.id) return;

      videoInfo.durationSeconds =
        durationOverrides[videoInfo.id] || parseDurationFromLink(link);

      link.addEventListener("click", () => {
        waitForLightboxOpen(videoInfo, link, trackingState);
      });
    });
  }

  function extractLightboxVideoInfo(link) {
    const jsonScript = link.querySelector(".w-json");
    if (!jsonScript) return null;

    let data;
    try {
      data = JSON.parse(jsonScript.textContent);
    } catch (error) {
      console.warn("Unable to parse Webflow lightbox JSON.", error);
      return null;
    }

    const item = Array.isArray(data.items) ? data.items[0] : null;
    if (!item) return null;

    const url = item.url || item.originalUrl || "";
    const html = item.html || "";
    const decodedHtml = decodeURIComponentSafe(html);
    const videoId =
      extractYouTubeId(url) ||
      extractYouTubeId(html) ||
      extractYouTubeId(decodedHtml);

    if (!videoId) return null;

    return {
      id: videoId,
      url: url || `https://www.youtube.com/watch?v=${videoId}`,
      width: item.width,
      height: item.height,
      label: getLightboxLabel(link),
    };
  }

  function getLightboxLabel(link) {
    const ariaLabel = link.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel.trim();
    const textNode = link.querySelector(".fw-500");
    const text = textNode ? textNode.textContent : link.textContent;
    return typeof text === "string" ? text.trim() : "";
  }

  function extractYouTubeId(value) {
    if (!value || typeof value !== "string") return null;
    const match = value.match(
      /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
    );
    return match ? match[1] : null;
  }

  function decodeURIComponentSafe(value) {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  }

  function waitForLightboxOpen(videoInfo, triggerElement, trackingState) {
    const startTime = Date.now();
    const maxWaitMs = 3000;

    const tryStart = () => {
      const backdrop = document.querySelector(".w-lightbox-backdrop");
      if (backdrop) {
        startManualLightboxTracking(
          backdrop,
          videoInfo,
          triggerElement,
          trackingState
        );
        return;
      }

      if (Date.now() - startTime < maxWaitMs) {
        window.requestAnimationFrame(tryStart);
      }
    };

    tryStart();
  }

  function startManualLightboxTracking(
    backdrop,
    videoInfo,
    triggerElement,
    trackingState
  ) {
    stopManualLightboxTracking(trackingState, "replaced");

    const session = {
      id: `${videoInfo.id}-${Date.now()}`,
      startTime: Date.now(),
      milestonesFired: new Set(),
      progressTimer: null,
      ended: false,
      videoInfo,
      triggerElement,
      cleanup: null,
    };
    trackingState.activeSession = session;

    trackVideoEvent(
      "Video Played",
      buildVideoPayload(videoInfo, triggerElement, {
        watch_time_seconds: 0,
        percent_watched: 0,
        tracking_method: "lightbox_timer",
      })
    );

    startManualProgressTracking(session, trackingState);
    attachLightboxCloseHandlers(backdrop, session, trackingState);
  }

  function stopManualLightboxTracking(trackingState, reason) {
    const session = trackingState.activeSession;
    if (!session || session.ended) return;

    session.ended = true;
    if (session.progressTimer) {
      window.clearInterval(session.progressTimer);
      session.progressTimer = null;
    }
    if (typeof session.cleanup === "function") {
      session.cleanup();
    }

    const elapsedSeconds = Math.max(
      0,
      Math.round((Date.now() - session.startTime) / 1000)
    );
    const duration = session.videoInfo.durationSeconds;
    const percent =
      duration && duration > 0
        ? Math.min(100, Math.round((elapsedSeconds / duration) * 100))
        : undefined;

    // No close/paused event per request.

    trackingState.activeSession = null;
  }

  function startManualProgressTracking(session, trackingState) {
    const duration = session.videoInfo.durationSeconds;
    if (!duration || duration <= 0) return;

    const milestones = [25, 50, 75, 100];

    session.progressTimer = window.setInterval(() => {
      if (session.ended) return;
      const elapsedSeconds = (Date.now() - session.startTime) / 1000;
      const percent = Math.min(
        100,
        Math.floor((elapsedSeconds / duration) * 100)
      );

      milestones.forEach((milestone) => {
        if (percent >= milestone && !session.milestonesFired.has(milestone)) {
          session.milestonesFired.add(milestone);
          trackVideoEvent(
            "Video Progress",
            buildVideoPayload(session.videoInfo, session.triggerElement, {
              milestone,
              percent_watched: milestone,
              watch_time_seconds: Math.round(elapsedSeconds),
              tracking_method: "lightbox_timer",
            })
          );

          if (milestone === 100) {
            trackVideoEvent(
              "Video Ended",
              buildVideoPayload(session.videoInfo, session.triggerElement, {
                completed: true,
                percent_watched: 100,
                watch_time_seconds: Math.round(duration),
                tracking_method: "lightbox_timer",
              })
            );
            stopManualLightboxTracking(trackingState, "ended");
          }
        }
      });
    }, 1000);
  }

  function attachLightboxCloseHandlers(backdrop, session, trackingState) {
    const close = () => stopManualLightboxTracking(trackingState, "closed");

    const closeButton = backdrop.querySelector(".w-lightbox-close");
    if (closeButton) {
      closeButton.addEventListener("click", close, { once: true });
    }

    const backdropClickHandler = (event) => {
      if (trackingState.activeSession !== session) return;
      const inBackdrop =
        event.target &&
        typeof event.target.closest === "function" &&
        event.target.closest(".w-lightbox-backdrop");
      if (!inBackdrop) return;
      const inFrame = event.target.closest(".w-lightbox-frame");
      if (!inFrame) {
        close();
      }
    };
    document.addEventListener("click", backdropClickHandler, true);

    const keyHandler = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", keyHandler);

    const observer = new MutationObserver(() => {
      if (!document.body.contains(backdrop)) {
        close();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    session.cleanup = () => {
      document.removeEventListener("click", backdropClickHandler, true);
      document.removeEventListener("keydown", keyHandler);
      observer.disconnect();
      if (closeButton) {
        closeButton.removeEventListener("click", close);
      }
    };
  }

  function parseDurationFromLink(link) {
    const textNode = link.querySelector(".plyr_explore-subtext");
    const text = textNode ? textNode.textContent : "";
    if (!text) return null;

    const timeMatch = text.trim().match(/(\d+)\s*:\s*(\d{2})/);
    if (timeMatch) {
      return parseInt(timeMatch[1], 10) * 60 + parseInt(timeMatch[2], 10);
    }

    const minMatch = text.trim().match(/(\d+)\s*min/i);
    if (minMatch) {
      return parseInt(minMatch[1], 10) * 60;
    }

    return null;
  }

  function buildVideoPayload(videoInfo, triggerElement, overrides) {
    const payload = {
      page_name: document.title || undefined,
      page_url: window.location.href,
      video_id: videoInfo.id,
      video_title: videoInfo.title,
      video_url: videoInfo.url,
      video_provider: "youtube",
      video_duration_seconds: videoInfo.durationSeconds || undefined,
      lightbox_label: videoInfo.label || undefined,
      trigger_label:
        triggerElement?.getAttribute?.("aria-label") ||
        triggerElement?.textContent?.trim() ||
        undefined,
      timestamp: new Date().toISOString(),
    };

    if (overrides && typeof overrides === "object") {
      Object.assign(payload, overrides);
    }

    return prunePayload(payload);
  }

  function prunePayload(payload) {
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined || payload[key] === "") {
        delete payload[key];
      }
    });
    return payload;
  }

  function trackVideoEvent(name, payload) {
    if (typeof console !== "undefined" && typeof console.log === "function") {
      console.log("[video-tracking]", name, payload);
    }
    if (window.analytics && typeof window.analytics.track === "function") {
      window.analytics.track(name, payload);
    }
  }
})(window, document);
