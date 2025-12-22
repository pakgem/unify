(function (window, document) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    setupSwiper();
    setupPlyr();
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
})(window, document);
