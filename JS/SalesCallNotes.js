$(document).ready(function () {
  const $linkedinInput = $("#linkedin");
  const $getResultsButton = $(".get-results");
  const $errorText = $(".error-text");
  const $salesCallResults = $(".sales-call_results");
  const $salesCallError = $(".sales-call_error");
  const $loading = $(".loading");
  const $feedbackText = $(".feedback-text");
  const $resultText = $(".sales-results-text");
  const $copyNotesButton = $(".copy-notes");
  const $copySuccess = $(".copy-success");
  const $dismissCopy = $(".dismiss-copy");
  const $notesGenWrap = $(".notes-gen_wrap");

  let copySuccessTimer;

  // Add styles for maxed state
  const styles = `
      .notes-gen_wrap {
        position: relative;
      }
      .maxed-wrap {
        display: none;
        position: absolute;
        z-index: 2;
        opacity: 0;
        transform: translateY(20px);
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
      .notes-gen_inner-wrap.blurred {
        filter: blur(5px);
        pointer-events: none;
        user-select: none;
      }
    `;

  // Add styles to head
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Get the anonymousID from the cookie
  var anonymousID = getCookie("anonymousId");

  // Check if anonymousID exists; if not, handle it (log error, fallback, etc.)
  if (!anonymousID) {
    console.error("Anonymous ID not found.");
    getOrCreateAnonymousId();
  }

  // Get the current API hit count for this user from localStorage
  function getAPICount() {
    var apiCount = localStorage.getItem("apiSalesHits_" + anonymousID);
    return apiCount ? parseInt(apiCount) : 0;
  }

  // Increment the API hit count and store it back to localStorage
  function incrementAPICount() {
    var currentCount = getAPICount();
    localStorage.setItem("apiSalesHits_" + anonymousID, currentCount + 1);
  }

  function showMaxedState() {
    $(".notes-gen_inner-wrap").addClass("blurred");
    $(".maxed-wrap").addClass("active");
  }

  function hideMaxedState() {
    $(".notes-gen_inner-wrap").removeClass("blurred");
    $(".maxed-wrap").removeClass("active");
  }

  // Check if user has submitted email
  function hasSubmittedEmail() {
    return localStorage.getItem("hasSubmittedEmail") === "true";
  }

  // Initialize form submission handler
  function initializeForm() {
    $(".default-email_form").on("submit", function (e) {
      e.preventDefault();

      // Get the email value
      var emailValue = $(this).find('input[name="Email"]').val();

      // Set email in cookie
      document.cookie =
        "email=" + encodeURIComponent(emailValue) + ";path=/;max-age=86400;";

      // Mark user as having submitted email
      localStorage.setItem("hasSubmittedEmail", "true");

      // Hide maxed state and show results
      hideMaxedState();
      $(".sales-call_results").show();

      // Open get-started in new tab
      window.open("/get-started", "_blank");
    });
  }

  // Check the API hit count and show/hide elements with opacity
  function checkAPILimit() {
    // Skip maxed state if user has submitted email
    if (hasSubmittedEmail()) {
      hideMaxedState();
      return false;
    }

    // Force test state - always show maxed state
    showMaxedState();
    return true;

    // Comment out normal limit check for testing
    /*
    var apiCount = getAPICount();
    if (apiCount >= 5) {
      showMaxedState();
      return true;
    } else {
      hideMaxedState();
      return false;
    }
    */
  }

  // Initialize form and check API limit on page load
  $(document).ready(function () {
    initializeForm();
    checkAPILimit();
  });

  // Hide the error message initially
  $salesCallError.hide();

  // Enable/disable button based on input
  $linkedinInput.on("input", function () {
    $getResultsButton.toggleClass("disabled", !$(this).val());
  });

  $getResultsButton.on("click", function () {
    const url = $linkedinInput.val().trim();

    // Validate LinkedIn URL
    if (!isValidLinkedInUrl(url)) {
      $errorText.show();
      return;
    }

    // Check API limit before making the call
    if (checkAPILimit()) {
      return; // Exit if limit reached
    }

    // Increment count before API call
    incrementAPICount();

    // Disable the button
    $getResultsButton.prop("disabled", true);

    // Reset and prepare for API call
    $errorText.hide();
    $salesCallError.hide();
    $resultText.hide().empty();
    $feedbackText.hide();
    $loading.show();
    $salesCallResults.hide();

    // Make API call
    $.ajax({
      url: "https://growth-api.unifygtm.com/api/v1/call-researcher",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ linkedin_profile_url: url }),
      success: function (data) {
        console.log("API response data:", data);
        $getResultsButton.toggleClass("disabled");
        $loading.hide();
        $feedbackText.show();
        $salesCallResults.show();
        $resultText.show();
        if (data.call_notes) {
          // Convert markdown to HTML and update results
          let formattedHtml = markdownToHtml(data.call_notes);
          $resultText.html(formattedHtml);
        } else {
          throw new Error("No call notes received");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", errorThrown);
        $getResultsButton.toggleClass("disabled");
        $loading.hide();
        $feedbackText.show();
        $salesCallError
          .css("opacity", 0)
          .show()
          .animate({ opacity: 1 }, 600, "easeInOutQuad");
      },
    });
  });

  // Re-enable button when user edits the input
  $linkedinInput.on("input", function () {
    $getResultsButton.prop("disabled", false);
  });

  $copyNotesButton.on("click", function () {
    const cleanedNotes = cleanMarkup($resultText.html());
    copyToClipboard(cleanedNotes);
    showCopySuccess();
  });

  $dismissCopy.on("click", function () {
    hideCopySuccess();
  });

  function isValidLinkedInUrl(url) {
    return /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(url);
  }

  function markdownToHtml(markdown) {
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold conversion
      .replace(/\n/g, "<br>"); // New line to <br>

    // Handle bullet points with indentation
    let lines = html.split("<br>");
    let indentLevel = 0;
    html = lines
      .map((line) => {
        let trimmedLine = line.trim();

        if (/^-/.test(trimmedLine)) {
          // Handle bullet points by indenting them with non-breaking spaces
          let indent = "&nbsp;&nbsp;&nbsp;".repeat(indentLevel + 1);
          return `${indent}${trimmedLine}`;
        } else if (trimmedLine.endsWith(":")) {
          // Reset indent level for new sections
          indentLevel = 0;
          return trimmedLine;
        } else {
          // Non-bullet points, no extra indentation
          return trimmedLine;
        }
      })
      .join("<br>");

    // Handle links after indentation
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank">$1</a>'
    );

    return html;
  }

  function cleanMarkup(html) {
    // Create a temporary div to hold the HTML content
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Replace <br> tags with newline characters
    temp.innerHTML = temp.innerHTML.replace(/<br\s*\/?>/gi, "\n");

    // Get the text content, which will preserve line breaks
    let text = temp.textContent || temp.innerText;

    return text
      .replace(/\*\*/g, "") // Remove bold markdown
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Replace links with just the text
      .replace(/\n{3,}/g, "\n\n") // Replace triple or more newlines with double newlines
      .trim(); // Remove leading/trailing whitespace
  }

  function copyToClipboard(text) {
    // Use the Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      // Fallback to the older method
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // Avoid scrolling to bottom
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
      document.body.removeChild(textarea);
    }
  }

  function showCopySuccess() {
    // Clear any existing timer
    if (copySuccessTimer) {
      clearTimeout(copySuccessTimer);
    }

    $copySuccess
      .css({ opacity: 0, transform: "translateY(30px)", display: "flex" })
      .animate(
        { opacity: 1, transform: "translateY(0)" },
        {
          duration: 300,
          easing: "easeOutCubic",
          queue: false,
          complete: function () {
            // Set a timer to automatically hide after 5 seconds
            copySuccessTimer = setTimeout(hideCopySuccess, 5000);
          },
        }
      );
  }

  function hideCopySuccess() {
    // Clear the timer when manually hiding
    if (copySuccessTimer) {
      clearTimeout(copySuccessTimer);
    }

    $copySuccess.animate(
      { opacity: 0, transform: "translateY(30px)" },
      {
        duration: 300,
        easing: "easeInCubic",
        queue: false,
        complete: function () {
          $(this).css("display", "none");
        },
      }
    );
  }

  // Add easeInOutQuad easing function if not already available
  if (typeof $.easing.easeInOutQuad === "undefined") {
    $.easing.easeInOutQuad = function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    };
  }

  // Add easeOutCubic and easeInCubic easing functions if not already available
  $.extend($.easing, {
    easeOutCubic: function (x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
  });
});
