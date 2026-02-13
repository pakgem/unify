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

    const playerStateByIframe = new Map();
    const ytApiReady = loadYouTubeIframeApi();

    lightboxLinks.forEach((link) => {
      const videoInfo = extractLightboxVideoInfo(link);
      if (!videoInfo || !videoInfo.id) return;

      link.addEventListener("click", () => {
        ytApiReady
          .then(() => attachPlayerWhenReady(link, videoInfo, playerStateByIframe))
          .catch((error) =>
            console.warn("YouTube API failed to load for tracking.", error)
          );
      });
    });
  }

  function loadYouTubeIframeApi() {
    if (window.__unifyYouTubeApiReady) {
      return window.__unifyYouTubeApiReady;
    }

    window.__unifyYouTubeApiReady = new Promise((resolve, reject) => {
      if (window.YT && typeof window.YT.Player === "function") {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        tag.onerror = () =>
          reject(new Error("Unable to load YouTube IFrame API"));
        document.head.appendChild(tag);
      }

      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previousReady === "function") {
          previousReady();
        }
        resolve();
      };

      setTimeout(() => {
        if (!window.YT || typeof window.YT.Player !== "function") {
          reject(new Error("YouTube API timed out"));
        }
      }, 10000);
    });

    return window.__unifyYouTubeApiReady;
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

  function attachPlayerWhenReady(link, videoInfo, playerStateByIframe) {
    const maxWaitMs = 6000;
    const startTime = Date.now();

    const tryAttach = () => {
      const iframe = findLightboxIframe();
      if (!iframe) {
        if (Date.now() - startTime < maxWaitMs) {
          window.requestAnimationFrame(tryAttach);
        }
        return;
      }

      if (iframe.dataset.unifyYoutubeTracked === "true") return;

      const trackingIframe = ensureYouTubeIframe(iframe, videoInfo);
      trackingIframe.dataset.unifyYoutubeTracked = "true";

      initializeYouTubeTracking(
        trackingIframe,
        videoInfo,
        link,
        playerStateByIframe
      );
    };

    tryAttach();
  }

  function findLightboxIframe() {
    const backdrop = document.querySelector(".w-lightbox-backdrop");
    if (!backdrop) return null;
    return backdrop.querySelector("iframe");
  }

  function ensureYouTubeIframe(existingIframe, videoInfo) {
    const currentSrc = existingIframe.getAttribute("src") || "";
    const isYouTubeEmbed =
      /youtube\.com\/embed\//i.test(currentSrc) ||
      /youtube-nocookie\.com\/embed\//i.test(currentSrc);

    if (isYouTubeEmbed) {
      const updatedSrc = appendQueryParams(currentSrc, {
        enablejsapi: "1",
        origin: window.location.origin,
      });
      existingIframe.setAttribute("src", updatedSrc);
      if (!existingIframe.getAttribute("id")) {
        existingIframe.setAttribute(
          "id",
          `unify-yt-${videoInfo.id}-${Date.now()}`
        );
      }
      return existingIframe;
    }

    const replacement = document.createElement("iframe");
    const width = existingIframe.getAttribute("width") || videoInfo.width;
    const height = existingIframe.getAttribute("height") || videoInfo.height;
    if (width) replacement.setAttribute("width", width);
    if (height) replacement.setAttribute("height", height);

    replacement.setAttribute(
      "src",
      buildYouTubeEmbedSrc(videoInfo.id)
    );
    replacement.setAttribute(
      "allow",
      existingIframe.getAttribute("allow") ||
        "autoplay; fullscreen; encrypted-media; picture-in-picture;"
    );
    replacement.setAttribute("frameborder", "0");
    replacement.setAttribute("allowfullscreen", "true");
    replacement.setAttribute(
      "title",
      existingIframe.getAttribute("title") || "YouTube embed"
    );
    replacement.className = existingIframe.className || "";
    replacement.style.cssText = existingIframe.style.cssText || "";
    replacement.setAttribute(
      "id",
      `unify-yt-${videoInfo.id}-${Date.now()}`
    );

    const parent = existingIframe.parentElement;
    if (parent) {
      parent.replaceChild(replacement, existingIframe);
    }
    return replacement;
  }

  function buildYouTubeEmbedSrc(videoId) {
    const origin = window.location.origin;
    const params = [
      "autoplay=1",
      "enablejsapi=1",
      "playsinline=1",
      "rel=0",
      `origin=${encodeURIComponent(origin)}`,
    ];
    return `https://www.youtube.com/embed/${videoId}?${params.join("&")}`;
  }

  function appendQueryParams(src, params) {
    if (!src) return src;
    const [base, queryString] = src.split("?");
    const search = new URLSearchParams(queryString || "");
    Object.keys(params).forEach((key) => {
      if (!search.has(key)) {
        search.set(key, params[key]);
      }
    });
    const updatedQuery = search.toString();
    return updatedQuery ? `${base}?${updatedQuery}` : base;
  }

  function initializeYouTubeTracking(
    iframe,
    videoInfo,
    triggerElement,
    playerStateByIframe
  ) {
    const player = new window.YT.Player(iframe, {
      events: {
        onReady: () => {
          const data = player.getVideoData ? player.getVideoData() : null;
          if (data && data.title) {
            videoInfo.title = data.title;
          }
        },
        onStateChange: (event) => {
          handleYouTubeStateChange(
            event,
            player,
            videoInfo,
            triggerElement,
            playerStateByIframe
          );
        },
      },
    });

    playerStateByIframe.set(iframe, {
      player,
      milestonesFired: new Set(),
      progressTimer: null,
      lastPercent: 0,
    });

    observeLightboxClose(iframe, player, playerStateByIframe);
  }

  function handleYouTubeStateChange(
    event,
    player,
    videoInfo,
    triggerElement,
    playerStateByIframe
  ) {
    const state = playerStateByIframe.get(event.target.getIframe());
    if (!state) return;

    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        trackVideoEvent(
          "Video Played",
          buildVideoPayload(player, videoInfo, triggerElement)
        );
        startProgressTracking(player, videoInfo, triggerElement, state);
        break;
      case window.YT.PlayerState.PAUSED:
        trackVideoEvent(
          "Video Paused",
          buildVideoPayload(player, videoInfo, triggerElement)
        );
        stopProgressTracking(state);
        break;
      case window.YT.PlayerState.ENDED:
        stopProgressTracking(state);
        fireMilestone(
          player,
          videoInfo,
          triggerElement,
          100,
          state.milestonesFired
        );
        trackVideoEvent(
          "Video Ended",
          buildVideoPayload(player, videoInfo, triggerElement, {
            completed: true,
            percent_watched: 100,
          })
        );
        break;
      default:
        break;
    }
  }

  function startProgressTracking(player, videoInfo, triggerElement, state) {
    if (state.progressTimer) return;
    const milestones = [25, 50, 75, 100];

    state.progressTimer = window.setInterval(() => {
      const duration = safeNumber(player.getDuration());
      const currentTime = safeNumber(player.getCurrentTime());
      if (!duration) return;

      const percent = Math.floor((currentTime / duration) * 100);
      if (percent === state.lastPercent) return;
      state.lastPercent = percent;

      milestones.forEach((milestone) => {
        if (percent >= milestone) {
          fireMilestone(
            player,
            videoInfo,
            triggerElement,
            milestone,
            state.milestonesFired
          );
        }
      });
    }, 1000);
  }

  function stopProgressTracking(state) {
    if (!state.progressTimer) return;
    window.clearInterval(state.progressTimer);
    state.progressTimer = null;
  }

  function fireMilestone(
    player,
    videoInfo,
    triggerElement,
    milestone,
    firedSet
  ) {
    if (firedSet.has(milestone)) return;
    firedSet.add(milestone);
    trackVideoEvent(
      "Video Progress",
      buildVideoPayload(player, videoInfo, triggerElement, {
        milestone,
        percent_watched: milestone,
      })
    );
  }

  function buildVideoPayload(player, videoInfo, triggerElement, overrides) {
    const duration = safeNumber(player.getDuration());
    const currentTime = safeNumber(player.getCurrentTime());
    const percent = duration
      ? Math.round((currentTime / duration) * 100)
      : undefined;
    const payload = {
      page_name: document.title || undefined,
      page_url: window.location.href,
      video_id: videoInfo.id,
      video_title: videoInfo.title,
      video_url: videoInfo.url,
      video_provider: "youtube",
      video_duration_seconds:
        typeof duration === "number" ? duration : undefined,
      watch_time_seconds:
        typeof currentTime === "number" ? currentTime : undefined,
      percent_watched: typeof percent === "number" ? percent : undefined,
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

  function safeNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  }

  function trackVideoEvent(name, payload) {
    if (window.analytics && typeof window.analytics.track === "function") {
      window.analytics.track(name, payload);
    }
  }

  function observeLightboxClose(iframe, player, playerStateByIframe) {
    const observer = new MutationObserver(() => {
      if (!document.body.contains(iframe)) {
        try {
          player.destroy();
        } catch (error) {
          console.warn("Failed to destroy YouTube player.", error);
        }
        playerStateByIframe.delete(iframe);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
})(window, document);
