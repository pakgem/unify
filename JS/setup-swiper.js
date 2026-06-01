(function (window, document) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    setupSwiper();
  });

  function setupSwiper() {
    const swiperElement = document.querySelector(".basic-swiper");
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

        new Swiper(swiperElement, {
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
})(window, document);
