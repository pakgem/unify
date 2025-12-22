$("#sales-rep-demo").on("click", function (e) {
  e.preventDefault(); // optional: prevent jump if it's an anchor
  $("#sales-demo")
    .stop(true, true)
    .slideDown(500) // smooth vertical reveal
    .css("display", "flex"); // if your target uses flexbox layout
});
$(document).on("keydown", function (e) {
  if (e.key === "Escape" && $("#sales-demo").is(":visible")) {
    $("#sales-demo").slideUp(300);
  }
});
$(".background-close_exit-btn, .background-close").on("click", function () {
  $("#sales-demo").slideUp(300);
});

function setupPlyr() {
  $(".plyr_component").each(function (index) {
    let thisComponent = $(this);
    // create plyr settings with autoplay explicitly disabled
    let player = new Plyr(thisComponent.find(".plyr_video")[0], {
      controls: ["play", "progress", "current-time", "mute", "fullscreen"],
      resetOnEnd: true,
      autoplay: false, // Disable autoplay explicitly
      muted: false, // Ensure videos are not muted for silent autoplay
    });
    // Listen to the 'play' event
    player.on("play", function () {
      // Send Segment track call when the video starts playing
      if (window.analytics && typeof window.analytics.track === "function") {
        window.analytics.track("Video Played");
      }
    });
    // Ensure the video is paused on page load
    setTimeout(() => {
      if (!player.paused) {
        player.pause();
        thisComponent.removeClass("hide-cover");
      }
    }, 100); // Small timeout to ensure player state is checked after initialization
    // Pause the video when the page becomes hidden and reset on visibility change
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        player.pause();
      }
    });
    // custom video cover
    thisComponent.find(".plyr_cover").on("click", function () {
      player.play();
    });
    player.on("ended", (event) => {
      thisComponent.removeClass("hide-cover");
    });
    // pause other playing videos when this one starts playing
    player.on("play", (event) => {
      $(".plyr_component").removeClass("hide-cover");
      thisComponent.addClass("hide-cover");
      let prevPlayingComponent = $(".plyr--playing")
        .closest(".plyr_component")
        .not(thisComponent);
      if (prevPlayingComponent.length > 0) {
        prevPlayingComponent.find(".plyr_pause-trigger")[0].click();
      }
    });
    thisComponent.find(".plyr_pause-trigger").on("click", function () {
      player.pause();
    });
    // exit full screen when video ends
    player.on("ended", (event) => {
      if (player.fullscreen.active) {
        player.fullscreen.exit();
      }
    });
    // set video to contain instead of cover when in full screen mode
    player.on("enterfullscreen", (event) => {
      thisComponent.addClass("contain-video");
    });
    player.on("exitfullscreen", (event) => {
      thisComponent.removeClass("contain-video");
    });
    // autoplay video on click of .plyr_explore-cta
    $(".hero_preview-vid").on("click", function () {
      player.play();
      thisComponent.addClass("hide-cover");
    });
    // stop video on click of .background-close
    $(".background-close").on("click", function () {
      player.pause();
      thisComponent.removeClass("hide-cover");
    });

    // Add escape key listener for this video
    $(document).on("keydown", function (e) {
      // Check if Escape key is pressed and this video is currently playing
      if (e.key === "Escape" && !player.paused) {
        $(".background-close").click();
        player.pause();
        thisComponent.removeClass("hide-cover");
      }
    });
  });
}
// Wait for the window load event to ensure all resources are loaded
document.addEventListener("DOMContentLoaded", () => {
  setupPlyr();
});
