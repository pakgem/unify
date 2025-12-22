$(document).ready(function () {
  // When a .w-radio element is clicked
  $(".w-radio").on("click", function () {
    // Find the corresponding form-dropdown-label text inside this .w-radio
    var selectedText = $(this).find(".form-dropdown-label").text();

    // Find the closest dropdown wrapper
    var dropdownWrapper = $(this).closest(".filters-dropdown_button-wrapper");

    // Find the corresponding default input div within this dropdown wrapper
    var defaultInput = dropdownWrapper.find(".default-input");

    // Update the default input div's text with the selected label text
    defaultInput.text(selectedText);
  });
});

$(document).ready(function () {
  // Cache selectors for various elements
  const $loading = $(".loading");
  const $feedbackText = $(".feedback-text");
  const $roiForm = $(".roi_form");
  const $roiResults = $(".roi_results");
  const $aiNotes = $("#ai-notes");

  // Initially hide ROI results
  $roiResults.hide();

  // Function to update ROI input text values
  function updateRoiInputText() {
    $(
      ".roi_field-wrap input[type='text'], .roi_field-wrap input[type='number']"
    ).each(function () {
      const inputId = $(this).attr("id"); // Get the ID of the input
      const inputValue = $(this).val(); // Get the value of the input
      $("." + inputId).text(inputValue); // Update the corresponding .roi-input-text
    });
  }

  // Function to check if all required inputs are filled
  function checkInputs() {
    var inputsFilled = true;

    // Check all text and number input fields
    $(
      ".roi_field-wrap input[type='text'], .roi_field-wrap input[type='number']"
    ).each(function () {
      if ($(this).val().trim() === "") {
        inputsFilled = false;
        return false; // Exit the loop if any input is empty
      }
    });

    // Check if all radio groups have a selected value
    var radioGroups = [
      "time_prospecting_unit",
      "time_writing_per_message_unit",
      "time_inputting_crm_data_per_week_unit",
    ];
    radioGroups.forEach(function (group) {
      if ($('input[name="' + group + '"]:checked').length === 0) {
        inputsFilled = false;
        return false; // Exit the loop if any radio group has no selection
      }
    });

    // Enable or disable the button based on the inputs being filled
    if (inputsFilled) {
      $("#calculate-roi").removeClass("disabled").prop("disabled", false);
    } else {
      $("#calculate-roi").addClass("disabled").prop("disabled", true);
    }
  }

  // Attach event listeners to all input fields and radio buttons
  $(
    ".roi_field-wrap input[type='text'], .roi_field-wrap input[type='number']"
  ).on("input", function () {
    checkInputs();
    updateRoiInputText();
  });
  $(".roi_field-wrap input[type='radio']").on("change", function () {
    checkInputs();
  });

  // Initial check and update when the page loads
  checkInputs();
  updateRoiInputText();

  // Event listener for the calculate ROI button
  $("#calculate-roi").on("click", function (event) {
    event.preventDefault();

    // Helper function to get the checked value of a radio group by its name and convert to lowercase
    function getCheckedRadioValue(name) {
      var value = $('input[name="' + name + '"]:checked').val();
      return value ? value.toLowerCase() : "";
    }

    // Collect values from input fields and radio buttons
    var data = {
      number_of_sdrs: parseInt(getInputValue("#number_of_sdrs")),
      time_prospecting: parseInt(getInputValue("#time_prospecting")),
      time_prospecting_unit: getCheckedRadioValue("time_prospecting_unit"),
      prospects_per_sdr_per_week: parseInt(
        getInputValue("#prospects_per_sdr_per_week")
      ),
      time_writing_per_message: parseInt(
        getInputValue("#time_writing_per_message")
      ),
      time_writing_per_message_unit: getCheckedRadioValue(
        "time_writing_per_message_unit"
      ),
      messages_per_sdr_per_week: parseInt(
        getInputValue("#messages_per_sdr_per_week")
      ),
      time_inputting_crm_data_per_week: parseInt(
        getInputValue("#time_inputting_crm_data_per_week")
      ),
      time_inputting_crm_data_per_week_unit: getCheckedRadioValue(
        "time_inputting_crm_data_per_week_unit"
      ),
    };

    // Show loading and hide feedback text
    $feedbackText.hide();
    $loading.show();

    // Make the API call
    $.ajax({
      url: "https://growth-api.unifygtm.com/api/v1/roi-calculator",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // Hide loading and show feedback text
        $loading.hide();
        $feedbackText.show();
        // Update the HTML elements with the results
        $("#hours_saved_per_sdr_per_week").text(
          response.hours_saved_per_sdr_per_week
        );
        $("#roi_on_unify").text(response.roi_on_unify);

        // Smoothly hide the form and show results
        $roiForm.fadeOut(300, function () {
          $roiResults.fadeIn(300);
        });
      },
      error: function (error) {
        console.error("Error:", error);
        $loading.hide(); // Ensure loading is hidden on error
        $feedbackText.show(); // Optionally show feedback text or error message
      },
    });
  });

  // Event listener for the edit inputs button
  $(".edit-inputs").on("click", function () {
    // Smoothly hide results and show the form
    $roiResults.fadeOut(300, function () {
      $roiForm.fadeIn(300);
    });
  });

  // Event listener for the reset button
  $(".reset-calc").on("click", function () {
    // Reset all inputs to default values
    $(
      ".roi_field-wrap input[type='text'], .roi_field-wrap input[type='number']"
    ).val("");
    $(".roi_field-wrap input[type='radio']").prop("checked", false);

    // Clear checked classes from all elements in each group
    $(".w-radio-input").removeClass("w--redirected-checked");

    // Set the "Minutes" radio inputs correctly
    $('input[name="time_prospecting_unit"][value="Minutes"]')
      .prop("checked", true)
      .closest(".radio-btn-wrap")
      .find(".w-radio-input")
      .addClass("w--redirected-checked");
    $('input[name="time_writing_per_message_unit"][value="Minutes"]')
      .prop("checked", true)
      .closest(".radio-btn-wrap")
      .find(".w-radio-input")
      .addClass("w--redirected-checked");
    $('input[name="time_inputting_crm_data_per_week_unit"][value="Minutes"]')
      .prop("checked", true)
      .closest(".radio-btn-wrap")
      .find(".w-radio-input")
      .addClass("w--redirected-checked");

    // Trigger click event to update text
    $('input[name="time_prospecting_unit"][value="Minutes"]')
      .closest(".radio-btn-wrap")
      .trigger("click");
    $('input[name="time_writing_per_message_unit"][value="Minutes"]')
      .closest(".radio-btn-wrap")
      .trigger("click");
    $('input[name="time_inputting_crm_data_per_week_unit"][value="Minutes"]')
      .closest(".radio-btn-wrap")
      .trigger("click");

    updateRoiInputText();
    checkInputs();
  });

  // Event listener for the share results button
  $(".share-results").on("click", function () {
    var queryParams = "?";
    gsap.fromTo(
      ".copy-success",
      { opacity: 0, y: 10, display: "block" }, // Initial state
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: function () {
          // After 5 seconds, hide it with another animation
          gsap.to(".copy-success", {
            opacity: 0,
            y: -10,
            duration: 0.2,
            delay: 3,
            ease: "power2.in",
            onComplete: function () {
              $(".copy-success").css("display", "none");
            },
          });
        },
      }
    );
    // Append all input values to query parameters
    $(
      ".roi_field-wrap input[type='text'], .roi_field-wrap input[type='number']"
    ).each(function () {
      var inputId = $(this).attr("id");
      var inputValue = $(this).val();
      queryParams +=
        encodeURIComponent(inputId) +
        "=" +
        encodeURIComponent(inputValue) +
        "&";
    });

    // Append all radio button values to query parameters
    $(".roi_field-wrap input[type='radio']:checked").each(function () {
      var radioName = $(this).attr("name");
      var radioValue = $(this).val().toLowerCase(); // Use lowercase for API
      queryParams +=
        encodeURIComponent(radioName) +
        "=" +
        encodeURIComponent(radioValue) +
        "&";
    });

    // Remove the trailing '&' from the query parameters string
    queryParams = queryParams.slice(0, -1);

    // Generate the new URL with query parameters
    var newUrl =
      window.location.origin + window.location.pathname + queryParams;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(newUrl).then(
      function () {},
      function (err) {
        console.error("Failed to copy URL: ", err);
      }
    );
  });

  // Function to load query parameters and populate fields
  function loadFromQueryParams() {
    var queryParams = new URLSearchParams(window.location.search);

    queryParams.forEach(function (value, key) {
      // Set input fields
      var $input = $("#" + key);
      if ($input.length) {
        $input.val(value);
      }

      // Clear checked classes from all elements in each group
      $('input[name="' + key + '"]')
        .closest(".radio-btn-wrap")
        .find(".w-radio-input")
        .removeClass("w--redirected-checked");

      // Set radio buttons (capitalize first letter for display)
      var $radio = $(
        'input[name="' +
          key +
          '"][value="' +
          value.charAt(0).toUpperCase() +
          value.slice(1) +
          '"]'
      );
      if ($radio.length) {
        $radio
          .prop("checked", true)
          .closest(".radio-btn-wrap")
          .find(".w-radio-input")
          .addClass("w--redirected-checked") // Ensure correct checked class is added
          .closest(".radio-btn-wrap")
          .trigger("click"); // Trigger click to update default text
      }
    });

    // If query params exist, show results
    if (queryParams.toString() !== "") {
      $roiForm.hide();
      $roiResults.show();
      updateRoiInputText();
      $("#calculate-roi").click(); // Trigger the API call to load results

      // Scroll to the #ai-notes section
      $("html, body").animate(
        {
          scrollTop: $aiNotes.offset().top,
        },
        500
      ); // Smooth scroll to #ai-notes
    }
  }

  // Load query parameters if they exist on page load
  loadFromQueryParams();

  // Helper function to get input field value
  function getInputValue(selector) {
    return $(selector).val() || "";
  }
});
