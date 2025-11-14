(function (window, document) {
  "use strict";

  const ROTATE_TEXT_SELECTORS = {
    headings: ".rotate-text",
    wrapper: ".heading-rotate-wrap",
  };

  const ROTATE_CONFIG = {
    animationDuration: 1,
    staggerDelay: 0.03,
    timeBetweenWords: 1,
    desktopMinWidth: 992,
  };

  document.addEventListener("DOMContentLoaded", () => {
    initializeRotatingHeadlines();
    setupSwiper();
    setupPlyr();
  });

  function initializeRotatingHeadlines() {
    if (!window.gsap || !window.SplitType) return;

    const headings = Array.from(
      document.querySelectorAll(ROTATE_TEXT_SELECTORS.headings)
    );
    if (!headings.length) return;

    const headingWrap = document.querySelector(ROTATE_TEXT_SELECTORS.wrapper);
    if (!headingWrap) return;

    const { animationDuration, staggerDelay, timeBetweenWords, desktopMinWidth } =
      ROTATE_CONFIG;

    let splitTextInstances = [];
    let currentViewport =
      window.innerWidth >= desktopMinWidth ? "desktop" : "mobile";

    const resetHeadings = () => {
      headings.forEach((heading) => {
        gsap.set(heading, { opacity: 0, y: 0, clearProps: "all" });
      });
    };

    const runSplitType = (heading) =>
      new SplitType(heading, { types: "lines, words, chars" });

    const animateTextRotation = () => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0 });

      headings.forEach((heading, index) => {
        const splitTextInstance = splitTextInstances[index];

        timeline
          .to(heading, {
            opacity: 1,
            y: 0,
            duration: animationDuration,
            ease: "power2.out",
            onStart: () => {
              if (!splitTextInstance) return;
              gsap.from(splitTextInstance.chars, {
                opacity: 0,
                y: 50,
                stagger: staggerDelay,
                duration: animationDuration,
                ease: "power2.out",
              });
            },
          })
          .to(
            heading,
            {
              opacity: 0,
              y: -50,
              duration: animationDuration,
              ease: "power2.in",
            },
            "+=" + timeBetweenWords
          );
      });
    };

    const applyAlignment = (viewport) => {
      headingWrap.style.justifyContent =
        viewport === "mobile" ? "center" : "flex-start";
    };

    const adjustAlignment = () => {
      const newViewport =
        window.innerWidth >= desktopMinWidth ? "desktop" : "mobile";

      if (newViewport === currentViewport) return;

      gsap.killTweensOf(headings);
      splitTextInstances.forEach((instance) => instance?.revert());
      resetHeadings();
      applyAlignment(newViewport);
      splitTextInstances = headings.map(runSplitType);
      animateTextRotation();
      currentViewport = newViewport;
    };

    resetHeadings();
    applyAlignment(currentViewport);
    splitTextInstances = headings.map(runSplitType);
    animateTextRotation();
    window.addEventListener("resize", adjustAlignment);
  }

  function setupSwiper() {
    if (window.jQuery) {
      if (window.jQuery(".empty-state.w-dyn-empty").length) {
        window.jQuery(".section_related-items").hide();
      }
    }

    if (typeof window.Swiper === "undefined") {
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
  }

  function setupPlyr() {
    if (!window.Plyr || !window.jQuery) {
      console.error("Plyr or jQuery missing.");
      return;
    }

    const $ = window.jQuery;

    $(".plyr_component").each(function () {
      const thisComponent = $(this);
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
    });
  }
})(window, document);
