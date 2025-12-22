$(document).ready(function () {
  console.log("Email Coach");

  // Add toast HTML to the body
  $("body").append(`
    <div id="error-toast" class="toast" style="
      display: none;
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff4d4f;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      font-size: 14px;
      min-width: 200px;
      text-align: center;
    ">
      <span class="toast-message"></span>
      <button class="close-toast" style="
        background: none;
        border: none;
        color: white;
        margin-left: 12px;
        cursor: pointer;
        opacity: 0.8;
        padding: 0 4px;
      ">×</button>
    </div>
  `);

  // Add styles for maxed state
  const styles = `
      .pos-rel {
        position: relative;
      }
      .maxed-wrap {
        display: none;
        position: absolute;
        z-index: 2;
        opacity: 0;
        transform: translateY(20px);
        width: 100%;
      }
      .maxed-wrap.active {
        display: flex;
        animation: slideUp 0.4s ease forwards;
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .email-coach-wrap.blurred {
        filter: blur(5px);
        pointer-events: none;
        user-select: none;
      }
      .section_email-coach .maxed-wrap form.default-email_form {
        display: flex;
        width: 100%;
        max-width: none;
        margin-bottom: 0;
        justify-content: center;
        align-items: center;
      }
    `;

  // Add styles to head
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Toast functions
  function showToast(message, duration = 5000) {
    const $toast = $("#error-toast");
    $toast.find(".toast-message").text(message);
    $toast.fadeIn(300);

    // Auto hide after duration
    setTimeout(() => {
      hideToast();
    }, duration);
  }

  function hideToast() {
    $("#error-toast").fadeOut(300);
  }

  // Close toast on click
  $(document).on("click", ".close-toast", function () {
    hideToast();
  });

  $("#linkedin").on("submit", function (event) {
    event.preventDefault();
    // Add your custom form submission logic here
  });

  // Function to get cookie value by name
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Function to set cookie with expiration in days
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Get the anonymousID from the cookie
  var anonymousID = getCookie("anonymousId");

  // Check if anonymousID exists; if not, handle it (log error, fallback, etc.)
  if (!anonymousID) {
    console.error("Anonymous ID not found.");
    anonymousID = getOrCreateAnonymousId();
    setCookie("anonymousId", anonymousID, 7); // Set cookie with 7 days expiration
  }

  // Get the current API hit count for this user from localStorage
  function getAPICount() {
    var apiCount = localStorage.getItem("apiEmailHits_" + anonymousID);
    return apiCount ? parseInt(apiCount) : 0;
  }

  // Increment the API hit count and store it back to localStorage
  function incrementAPICount() {
    var currentCount = getAPICount();
    localStorage.setItem("apiEmailHits_" + anonymousID, currentCount + 1);
  }

  function showMaxedState() {
    $(".email-coach-wrap").addClass("blurred");
    $(".maxed-wrap").addClass("active");
    $(".feedback-ctas").addClass("invis");
  }

  function hideMaxedState() {
    $(".email-coach-wrap").removeClass("blurred");
    $(".maxed-wrap").removeClass("active");
    $(".feedback-ctas").removeClass("invis");
  }

  // Check if user has submitted email
  function hasSubmittedEmail() {
    return localStorage.getItem("hasSubmittedEmail") === "true";
  }

  // Initialize form submission handler
  function initializeForm() {
    $(".maxed-wrap .default-email_form")
      .off("submit")
      .on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var emailValue = $(this).find('input[name="Email"]').val();

        document.cookie =
          "email=" + encodeURIComponent(emailValue) + ";path=/;max-age=86400;";

        localStorage.setItem("hasSubmittedEmail", "true");

        hideMaxedState();

        var newWindow = window.open(
          "/get-started",
          "_blank",
          "noopener,noreferrer"
        );
        if (newWindow) {
          newWindow.focus();
        }

        return false;
      });
  }

  // Check the API hit count and show/hide elements with opacity
  function checkAPILimit() {
    if (hasSubmittedEmail()) {
      hideMaxedState();
      return false;
    }

    var apiCount = getAPICount();
    if (apiCount >= 5) {
      showMaxedState();
      return true;
    } else {
      hideMaxedState();
      return false;
    }
  }

  // Initialize form and check API limit on page load
  setTimeout(function () {
    initializeForm();
    checkAPILimit();
  }, 0);

  $("#email-input").on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter key

      // Get the cursor position
      var start = this.selectionStart;
      var end = this.selectionEnd;

      // Get the current value of the text area
      var text = $(this).val();

      // Insert a newline character at the cursor position
      $(this).val(text.substring(0, start) + "\n" + text.substring(end));

      // Move the cursor to the new position after the newline character
      this.selectionStart = this.selectionEnd = start + 1;
    }
  });
  var $emailInput = $("#email-input");
  var $feedbackText = $(".feedback-text");
  var $loading = $(".loading");
  var ctx = document.getElementById("overallScoreChart").getContext("2d");
  var overallScoreChart;
  var $feedbackValuesWrap = $(".feedback-values-wrap");
  var $feedbackPlaceholder = $(".feedback-placeholder");
  var $resetFeedback = $(".reset-feedback");

  var $toneSummary = $(".tone-summary");

  $(document).on("click", ".reset-feedback", function () {
    // Hide feedback values with fade out animation
    $feedbackValuesWrap.animate(
      {
        opacity: 0,
      },
      300,
      function () {
        // After the fade-out animation is complete, hide the feedback values
        $feedbackValuesWrap.css("display", "none");

        // Show feedback placeholder with fade in animation
        $feedbackPlaceholder.fadeIn(300);

        // Clear the tone summary and feedback text
        $toneSummary.text("");
        $(".overall-score-num").text("");
        $(".overall-score-text").text("");
      }
    );
    $resetFeedback.css("display", "none");
  });

  // Function to check if the input has value and toggle the disabled class
  function toggleFeedbackButtons() {
    if ($emailInput.val().trim() !== "") {
      $(".get-feedback").removeClass("disabled");
    } else {
      $(".get-feedback").addClass("disabled");
    }
  }

  // Initial check for the input value
  toggleFeedbackButtons();

  // Listener for input change on #email-input
  $emailInput.on("input", function () {
    toggleFeedbackButtons();
  });

  // Event listener for each .get-feedback button
  $(document).on("click", ".get-feedback", function () {
    var $getFeedbackButton = $(this);
    if ($getFeedbackButton.hasClass("disabled")) return;

    // Increment count before checking limit
    incrementAPICount();

    // Check API limit after incrementing
    if (checkAPILimit()) {
      return; // Exit if limit reached
    }

    // Show loading element and hide feedback text
    $loading.show();
    $feedbackText.hide();

    // Get the value from the email input
    var emailContent = $emailInput.val();

    // Make the API call
    $.ajax({
      url: "https://growth-api.unifygtm.com/api/v1/email-coach",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email: emailContent }),
      timeout: 30000, // 30 second timeout
      success: function (response) {
        // Hide loading element and show feedback text
        $loading.hide();
        $feedbackText.show();
        $feedbackPlaceholder.hide();
        // Show the feedback values and animate the transition
        $feedbackValuesWrap
          .css({
            opacity: 0,
            display: "block",
          })
          .animate(
            {
              opacity: 1,
            },
            300
          );

        $resetFeedback
          .css({
            opacity: 0,
            display: "flex",
          })
          .animate(
            {
              opacity: 1,
            },
            300
          );

        // Clear previous feedback
        $(".feedback-tags-list.needs-work").empty();
        $(".feedback-tags-list.looks-good").empty();

        // Update Overall Score Text
        var overallScore = response.overall_score;
        var scoreText = overallScore <= 69 ? "Needs Work" : "Looks Good";
        var scoreColor = overallScore <= 69 ? "#FF6384" : "#81E47C";
        $(".overall-score-num").text(overallScore);
        $(".overall-score-text").text(scoreText);

        if (response.overall_tone) {
          $toneSummary.text(response.overall_tone);
        }

        // Create or Update Donut Chart
        if (overallScoreChart) {
          overallScoreChart.data.datasets[0].data = [
            overallScore,
            100 - overallScore,
          ];
          overallScoreChart.data.datasets[0].backgroundColor = [
            scoreColor,
            "#E0E0E0",
          ];
          overallScoreChart.update();
        } else {
          overallScoreChart = new Chart(ctx, {
            type: "doughnut",
            data: {
              datasets: [
                {
                  data: [overallScore, 100 - overallScore],
                  backgroundColor: [scoreColor, "#E0E0E0"],
                  borderWidth: 0, // Remove the border
                },
              ],
              labels: ["Score", ""],
            },
            options: {
              cutout: "80%",
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false, // Disable the tooltip on hover
                },
                beforeDraw: function (chart) {
                  var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
                  ctx.restore();
                  var fontSize = (height / 114).toFixed(2);
                  ctx.font = fontSize + "em sans-serif";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = scoreColor; // Set the color based on score
                  var text = overallScore.toString(),
                    textX = Math.round(
                      (width - ctx.measureText(text).width) / 2
                    ),
                    textY = height / 2;
                  ctx.fillText(text, textX, textY);
                  ctx.save();
                },
              },
            },
          });
        }

        // Process and Display Feedback Tags
        var feedback = response.email_metrics_feedback;

        $.each(feedback, function (key, value) {
          var displayText = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, function (l) {
              return l.toUpperCase();
            });

          // Determine color based on score
          var tagColor = value.score > 6 ? "#81E47C" : "#FF6384";

          // Create tag element
          var tagElement = $("<div></div>")
            .text(displayText)
            .addClass("feedback-tag");

          // Create popup element
          var popupElement = $(`
              <div class="tag-popup">
                <div class="tag-score-wrapper code-embed">
                  <canvas class="tag-score"></canvas>
                  <div class="tag-score-num">${value.score}/10</div>
                </div>
                <div class="tag-popup-text">${value.suggestion}</div>
              </div>
            `);

          // Append the popup to the tag
          tagElement.append(popupElement);

          // Create donut chart for the tag
          var tagCtx = popupElement.find(".tag-score")[0].getContext("2d");
          new Chart(tagCtx, {
            type: "doughnut",
            data: {
              datasets: [
                {
                  data: [value.score, 10 - value.score],
                  backgroundColor: [tagColor, "#E0E0E0"],
                  borderWidth: 0, // No border
                },
              ],
              labels: ["Score", ""],
            },
            options: {
              cutout: "80%",
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false, // Disable the tooltip
                },
                beforeDraw: function (chart) {
                  var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
                  ctx.restore();
                },
              },
            },
          });

          // Add to the correct list
          if (value.score <= 6) {
            tagElement.addClass("red");
            $(".feedback-tags-list.needs-work").append(tagElement);
          } else if (value.score > 6) {
            $(".feedback-tags-list.looks-good").append(tagElement);
          }
        });
      },
      error: function (error) {
        // Hide loading element and show feedback text
        $loading.hide();
        $feedbackText.show();

        let errorMessage;
        if (error.status === 0) {
          errorMessage =
            "Network error. Please check your internet connection.";
        } else if (error.statusText === "timeout") {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.status === 429) {
          errorMessage =
            "Too many requests. Please wait a moment and try again.";
        } else {
          errorMessage = "Something went wrong. Please try again later.";
        }

        showToast(errorMessage);
      },
    });
  });
});
