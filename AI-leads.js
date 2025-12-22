// AI Leads Flow - Multi-Step Form with Mock API
class AILeadsFlow {
  constructor() {
    this.formId = null;
    this.statusPollingInterval = null;
    this.finalPollingInterval = null;
    this.touchedFields = new Set(); // Track which fields user has interacted with
    this.isProduction = window.location.hostname === "unifygtm.com";
    this.apiBaseUrl =
      "https://growth-api2.unifygtm.com/api/v1/agentic-list-builder"; // Production API endpoint
    this.init();
    this.testApiConnection();
  }

  init() {
    this.setupDefaultVisibility();

    // Check usage limit first - if maxed out, don't initialize the form
    if (this.checkUsageLimit()) {
      return; // Exit early if usage limit reached
    }

    this.bindEvents();
    this.setupValidation();
  }

  bindEvents() {
    // Step 1: Company Input
    const analyzeButton = document.getElementById("analyze-company");
    if (analyzeButton) {
      analyzeButton.addEventListener("click", () =>
        this.handleAnalyzeCompany()
      );
    }

    // Step 2: Context Edit
    const emailLeadsButton = document.getElementById("email-leads");
    if (emailLeadsButton) {
      emailLeadsButton.addEventListener("click", () => this.handleEmailLeads());
    }

    // Back button
    const backButton = document.getElementById("back-step-1");
    if (backButton) {
      backButton.addEventListener("click", () => this.goBackToStep1());
    }

    // Real-time validation for Step 2
    this.setupStep2Validation();
  }

  checkUsageLimit() {
    try {
      // Get session-based usage count from cookies
      const usageCount = this.getSessionUsageCount();

      if (usageCount >= 5) {
        this.showMaxedMessage();
        return true; // Return true if limit reached
      }

      return false; // Return false if limit not reached
    } catch (error) {
      console.error("Error checking usage limit:", error);
      return false; // Allow form to load if there's an error checking
    }
  }

  showMaxedMessage() {
    const aiLeadsWrap = document.querySelector(".ai-leads_wrap");
    const maxedWrap = document.querySelector(".maxed-wrap");

    if (aiLeadsWrap && maxedWrap) {
      // Hide the form with fade out
      aiLeadsWrap.style.transition = "opacity 0.5s ease-out";
      aiLeadsWrap.style.opacity = "0";

      setTimeout(() => {
        aiLeadsWrap.style.display = "none";

        // Show maxed message with fade in up
        maxedWrap.style.display = "flex";
        maxedWrap.style.opacity = "0";
        maxedWrap.style.transform = "translateY(20px)";
        maxedWrap.style.transition =
          "opacity 0.5s ease-out, transform 0.5s ease-out";

        // Trigger the animation
        setTimeout(() => {
          maxedWrap.style.opacity = "1";
          maxedWrap.style.transform = "translateY(0)";
        }, 50);
      }, 500);
    }
  }

  incrementUsage() {
    try {
      const currentCount = this.getSessionUsageCount();
      const newCount = currentCount + 1;

      // Set session cookie (expires when browser closes)
      this.setSessionCookie("ai-leads-usage", newCount);

      // Don't show maxed message during current submission
      // User should be able to complete their current flow
      // Maxed message will show on next page reload if limit reached
    } catch (error) {
      console.error("Error incrementing session usage:", error);
    }
  }

  async testApiConnection() {
    try {
      // Try a simple GET request to see if the API is reachable
      const response = await fetch(`${this.apiBaseUrl}/submit-input`, {
        method: "OPTIONS",
        headers: {
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("API connection test failed:", error);
    }
  }

  // Session cookie helper methods
  getSessionUsageCount() {
    const cookieValue = this.getCookie("ai-leads-usage");
    return cookieValue ? parseInt(cookieValue, 10) : 0;
  }

  setSessionCookie(name, value) {
    // Session cookie (no expires attribute means it expires when browser closes)
    document.cookie = `${name}=${value}; path=/; secure; samesite=strict`;
  }

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  handleApiError(status, errorData) {
    // Hide any existing errors first
    const allErrors = document.querySelectorAll('[id$="ErrorResponse"]');
    allErrors.forEach((error) => {
      error.style.display = "none";
    });

    // Determine which error to show based on errorData type or status
    let errorElementId = null;

    if (errorData && errorData.status) {
      // Map API status values to element IDs
      const statusToElementMapping = {
        invalid_email: "InvalidEmailErrorResponse",
        invalid_domain: "InvalidDomainErrorResponse",
        email_already_exists: "EmailAlreadyExistsErrorResponse",
        email_used_too_many_times: "EmailUsedTooManyTimesErrorResponse",
        email_and_domain_already_submitted:
          "EmailAndDomainAlreadySubmittedErrorResponse",
        invalid_status: "InvalidStatusErrorResponse",
        job_not_found: "JobNotFoundResponse",
        error: "InternalErrorResponse",
      };

      errorElementId =
        statusToElementMapping[errorData.status] || "InternalErrorResponse";
    } else {
      // Fallback based on status code
      switch (status) {
        case 400:
          errorElementId = "InvalidEmailErrorResponse"; // Default 400 error
          break;
        case 404:
          errorElementId = "JobNotFoundResponse";
          break;
        case 500:
          errorElementId = "InternalErrorResponse";
          break;
        default:
          errorElementId = "InternalErrorResponse";
      }
    }

    // Show the specific error toast with smooth fade-in from bottom
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      // Set initial state for animation
      errorElement.style.display = "block";
      errorElement.style.opacity = "0";
      errorElement.style.transform = "translateY(20px)";
      errorElement.style.transition =
        "opacity 0.4s ease-out, transform 0.4s ease-out";

      // Trigger the fade-in animation
      setTimeout(() => {
        errorElement.style.opacity = "1";
        errorElement.style.transform = "translateY(0)";
      }, 50);
    }
  }

  setupDefaultVisibility() {
    // Hide all step titles except step-1
    const allTitles = document.querySelectorAll(
      ".ai-leads_title.step-1, .ai-leads_title.step-2, .ai-leads_title.step-3, .ai-leads_title.step-4"
    );
    allTitles.forEach((title) => {
      title.style.display = "none";
    });

    // Show only step-1 title
    const step1Title = document.querySelector(".ai-leads_title.step-1");
    if (step1Title) {
      step1Title.style.display = "flex";
    }

    // Hide all steps except step-1
    const allSteps = document.querySelectorAll(
      ".ai-leads_step-1, .ai-leads_step-2, .ai-leads_step-3"
    );
    allSteps.forEach((step) => {
      step.style.display = "none";
    });

    // Show only step-1
    const step1 = document.querySelector(".ai-leads_step-1");
    if (step1) {
      step1.style.display = "flex";
    }

    // Ensure loading elements start hidden
    const loading = document.querySelector(".loading");
    const loadingText = document.querySelector(".loading-text");

    if (loading) {
      loading.style.display = "none";
    }
    if (loadingText) {
      loadingText.style.display = "none";
    }

    // Hide all error toast elements on init
    const allErrors = document.querySelectorAll(
      '[id$="ErrorResponse"], .sales-call_error'
    );
    allErrors.forEach((error) => {
      error.style.display = "none";
    });
  }

  setupValidation() {
    const fields = ["#work-email", "#company-name", "#company-domain"];

    fields.forEach((fieldSelector) => {
      const field = document.querySelector(fieldSelector);
      if (field) {
        // Validate individual field on blur (when user clicks off)
        field.addEventListener("blur", () => {
          this.touchedFields.add(fieldSelector); // Mark field as touched
          this.validateField(fieldSelector);
          this.updateButtonState(); // Update button state after field validation
        });
        // Only update button state on input, don't show error states while typing
        field.addEventListener("input", () => this.updateButtonState());
      }
    });
  }

  setupStep2Validation() {
    const step2Fields = [
      "#business-description",
      "#icp-description",
      "#value-prop",
    ];

    step2Fields.forEach((fieldSelector) => {
      const field = document.querySelector(fieldSelector);
      if (field) {
        field.addEventListener("input", () => this.validateStep2());
        field.addEventListener("blur", () => this.validateStep2());
      }
    });
  }

  validateField(fieldSelector) {
    const field = document.querySelector(fieldSelector);
    if (!field) {
      return;
    }

    const value = field.value.trim();
    let hasError = false;

    switch (fieldSelector) {
      case "#work-email":
        // Only show error if field has value AND it's invalid
        if (value.length > 0) {
          // First check if it's a valid email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmailFormat = emailRegex.test(value);

          if (!isValidEmailFormat) {
            hasError = true;
          } else {
            // If it's a valid email, check if it's from a common provider
            const commonProviders = [
              "gmail.com",
              "yahoo.com",
              "outlook.com",
              "aol.com",
              "hotmail.com",
            ];
            const emailProvider = value.split("@")[1]?.toLowerCase();
            hasError = commonProviders.includes(emailProvider);
          }
        }
        break;

      case "#company-name":
        // No error state for empty company name, just disable button
        hasError = false;
        break;

      case "#company-domain":
        // Only show error if field has value AND it's invalid
        if (value.length > 0) {
          hasError = !this.isValidUrl(value);
        }
        break;
    }

    this.updateFieldError(fieldSelector, hasError);
  }

  validateStep1() {
    const email = document.querySelector("#work-email")?.value || "";
    const companyName = document.querySelector("#company-name")?.value || "";
    const companyDomain =
      document.querySelector("#company-domain")?.value || "";

    // Check for common email providers
    const commonProviders = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "aol.com",
      "hotmail.com",
    ];
    const emailProvider = email.split("@")[1]?.toLowerCase();
    const isCommonProvider = commonProviders.includes(emailProvider);

    // Validate domain format - must be a valid URL
    const isValidDomain = this.isValidUrl(companyDomain);

    // Validate company name
    const isValidCompanyName = companyName.trim().length > 0;

    // Update field error states - only show errors for invalid values, not empty fields
    this.updateFieldError(
      "#work-email",
      email.trim().length > 0 && isCommonProvider
    );
    this.updateFieldError("#company-name", false); // Never show error for company name
    this.updateFieldError(
      "#company-domain",
      companyDomain.trim().length > 0 && !isValidDomain
    );

    // Enable/disable analyze button
    const allValid =
      !isCommonProvider &&
      isValidDomain &&
      isValidCompanyName &&
      email.trim().length > 0;

    this.updateButtonState();

    return allValid;
  }

  updateButtonState() {
    const email = document.querySelector("#work-email")?.value || "";
    const companyName = document.querySelector("#company-name")?.value || "";
    const companyDomain =
      document.querySelector("#company-domain")?.value || "";

    const analyzeButton = document.getElementById("analyze-company");

    // Check if email is valid and not from common providers
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmailFormat = emailRegex.test(email);

    let isValidWorkEmail = false;
    if (email.trim().length > 0 && isValidEmailFormat) {
      const commonProviders = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "aol.com",
        "hotmail.com",
      ];
      const emailProvider = email.split("@")[1]?.toLowerCase();
      const isCommonProvider = commonProviders.includes(emailProvider);
      isValidWorkEmail = !isCommonProvider;
    }

    // Validate domain format - must be a valid URL
    const isValidDomain = this.isValidUrl(companyDomain);

    // Validate company name
    const isValidCompanyName = companyName.trim().length > 0;

    // Enable/disable analyze button
    const allValid = isValidWorkEmail && isValidDomain && isValidCompanyName;

    if (analyzeButton) {
      if (allValid) {
        analyzeButton.classList.remove("disabled");
      } else {
        analyzeButton.classList.add("disabled");
      }
    }
  }

  validateStep2() {
    const businessDescription =
      document.querySelector("#business-description")?.value || "";
    const icpDescription =
      document.querySelector("#icp-description")?.value || "";
    const valueProp = document.querySelector("#value-prop")?.value || "";

    const emailLeadsButton = document.getElementById("email-leads");

    // Update field error states
    this.updateFieldError(
      "#business-description",
      businessDescription.trim().length === 0
    );
    this.updateFieldError(
      "#icp-description",
      icpDescription.trim().length === 0
    );
    this.updateFieldError("#value-prop", valueProp.trim().length === 0);

    // Enable/disable email leads button
    const allValid =
      businessDescription.trim().length > 0 &&
      icpDescription.trim().length > 0 &&
      valueProp.trim().length > 0;

    if (emailLeadsButton) {
      if (allValid) {
        emailLeadsButton.classList.remove("disabled");
      } else {
        emailLeadsButton.classList.add("disabled");
      }
    }

    return allValid;
  }

  isValidUrl(string) {
    if (!string || string.trim().length === 0) {
      return false;
    }

    let input = string.trim();

    // Check if it's a full URL with protocol
    if (input.match(/^https?:\/\//)) {
      try {
        const url = new URL(input);
        // Extract hostname and validate it as a domain
        const domain = url.hostname;
        return this.isValidDomain(domain);
      } catch (error) {
        return false;
      }
    }

    // If no protocol, treat as domain and validate
    return this.isValidDomain(input);
  }

  isValidDomain(domain) {
    if (!domain || domain.trim().length === 0) {
      return false;
    }

    // Remove www. if present
    let cleanDomain = domain.trim();
    if (cleanDomain.startsWith("www.")) {
      cleanDomain = cleanDomain.substring(4);
    }

    // Basic domain validation - must have at least one dot and valid characters
    const domainRegex =
      /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

    return domainRegex.test(cleanDomain);
  }

  updateFieldError(fieldSelector, hasError) {
    const field = document.querySelector(fieldSelector);
    if (!field) {
      return;
    }

    const fieldWrap = field.closest(".field-wrap");
    if (!fieldWrap) {
      return;
    }

    // Only show error if field has been touched by user
    const shouldShowError = hasError && this.touchedFields.has(fieldSelector);

    if (shouldShowError) {
      fieldWrap.classList.add("error");
    } else {
      fieldWrap.classList.remove("error");
    }
  }

  showAnalyzeLoadingState() {
    // Hide all error toasts when starting new request
    const allErrors = document.querySelectorAll(
      '[id$="ErrorResponse"], .sales-call_error'
    );
    allErrors.forEach((error) => {
      error.style.display = "none";
    });

    document.querySelector(".analyze-text").style.display = "none";
    document.querySelector(".loading").style.display = "block";
    // Don't show loading-text yet - only show it if API succeeds
  }

  hideAnalyzeLoadingState() {
    document.querySelector(".analyze-text").style.display = "flex";
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".loading-text").style.display = "none";
  }

  async handleAnalyzeCompany() {
    if (!this.validateStep1()) {
      return;
    }

    const email = document.querySelector("#work-email")?.value || "";
    const companyName = document.querySelector("#company-name")?.value || "";
    const companyDomain =
      document.querySelector("#company-domain")?.value || "";

    // Show loading state
    this.showAnalyzeLoadingState();

    const analyzeButton = document.getElementById("analyze-company");
    if (analyzeButton) {
      analyzeButton.disabled = true;
      // Don't change textContent as it overwrites child elements
    }

    try {
      // Submit initial input
      const response = await this.submitInitialInput({
        email,
        companyDomain,
        companyName,
      });

      // Store the form ID for polling
      this.formId = response.id;

      // Show loading text now that API succeeded
      document.querySelector(".loading-text").style.display = "block";

      // Update company name tags
      this.updateCompanyNameTags(companyName);

      // Increment usage count after successful API request
      this.incrementUsage();

      // Start polling for status
      this.startStatusPolling();
    } catch (error) {
      console.error("Error submitting initial input:", error);
      // Reset loading state on error
      this.hideAnalyzeLoadingState();
      if (analyzeButton) {
        analyzeButton.disabled = false;
        // Don't change textContent as it overwrites child elements
      }
    }
  }

  async submitInitialInput(data) {
    const response = await fetch(`${this.apiBaseUrl}/submit-input`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      this.handleApiError(response.status, errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  populateStep2Fields(companyContext) {
    const businessDescriptionField = document.querySelector(
      "#business-description"
    );
    const icpDescriptionField = document.querySelector("#icp-description");
    const valuePropField = document.querySelector("#value-prop");

    // Try different possible field names from the API
    const businessDescription =
      companyContext.businessDescription ||
      companyContext.business_description ||
      companyContext.description ||
      "";
    const icp =
      companyContext.icp ||
      companyContext.icpDescription ||
      companyContext.icp_description ||
      "";
    const valueProposition =
      companyContext.valueProposition ||
      companyContext.value_proposition ||
      companyContext.valueProp ||
      "";

    if (businessDescriptionField && businessDescription) {
      businessDescriptionField.value = businessDescription;
    }
    if (icpDescriptionField && icp) {
      icpDescriptionField.value = icp;
    }
    if (valuePropField && valueProposition) {
      valuePropField.value = valueProposition;
    }

    // Auto-resize textareas to fit content (with small delay to ensure content is rendered)
    setTimeout(() => {
      this.autoResizeTextareas();
    }, 100);

    // Trigger validation after populating
    this.validateStep2();
  }

  autoResizeTextareas() {
    const textareas = [
      "#business-description",
      "#icp-description",
      "#value-prop",
    ];

    textareas.forEach((selector) => {
      const textarea = document.querySelector(selector);
      if (textarea && textarea.value.trim().length > 0) {
        this.resizeTextarea(textarea);
      }
    });
  }

  resizeTextarea(textarea) {
    // Store current styles
    const originalHeight = textarea.style.height;
    const originalOverflow = textarea.style.overflow;

    // Reset height and overflow to calculate proper scrollHeight
    textarea.style.height = "auto";
    textarea.style.overflow = "hidden";

    // Force a reflow to ensure we get accurate scrollHeight
    textarea.offsetHeight;

    // Set height to content height plus a small buffer
    const newHeight = Math.max(textarea.scrollHeight + 2, 60); // Minimum 60px height
    textarea.style.height = newHeight + "px";

    // Optional: Set a max height to prevent it from getting too tall
    const maxHeight = 300; // Increased max height
    if (newHeight > maxHeight) {
      textarea.style.height = maxHeight + "px";
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  }

  scrollToAILeadsSection() {
    const aiLeadsSection = document.getElementById("ai-leads-wrap");
    if (aiLeadsSection) {
      aiLeadsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  updateCompanyNameTags(companyName) {
    const companyNameTags = document.querySelectorAll(".company-name_tag");
    companyNameTags.forEach((tag) => {
      tag.textContent = companyName;
    });
  }

  handleEmailLeads() {
    if (!this.validateStep2()) {
      return;
    }

    // Get the email from Step 1
    const email = document.querySelector("#work-email")?.value || "";

    // Update all elements with .lead-email class
    const leadEmailElements = document.querySelectorAll(".lead-email");
    leadEmailElements.forEach((element) => {
      element.textContent = email;
    });

    // Submit company context
    this.submitCompanyContext();

    // Scroll to top of the AI leads section
    this.scrollToAILeadsSection();
  }

  async submitCompanyContext() {
    const businessDescription =
      document.querySelector("#business-description")?.value || "";
    const icp = document.querySelector("#icp-description")?.value || "";
    const valueProposition = document.querySelector("#value-prop")?.value || "";

    // Always navigate to loading screen first
    this.navigateToStep(3);

    try {
      await this.updateCompanyContext({
        companyContext: {
          businessDescription,
          icp,
          valueProposition,
        },
      });
    } catch (error) {
      console.error("Error submitting company context:", error);
      // Suppress UI error; we'll still proceed with polling/completion
    }

    // Start polling for final completion regardless of PUT outcome
    this.startFinalPolling();
  }

  async updateCompanyContext(data) {
    const response = await fetch(
      `${this.apiBaseUrl}/submit-input/${this.formId}/company-context`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      // For Step 2 → Step 3, suppress UI errors here and let polling decide next step
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  navigateToStep(stepNumber) {
    // Hide all steps
    const allSteps = document.querySelectorAll(
      ".ai-leads_step-1, .ai-leads_step-2, .ai-leads_step-3"
    );
    allSteps.forEach((step) => {
      step.style.display = "none";
    });

    // Hide all titles
    const allTitles = document.querySelectorAll(
      ".ai-leads_title.step-1, .ai-leads_title.step-2, .ai-leads_title.step-3, .ai-leads_title.step-4"
    );
    allTitles.forEach((title) => {
      title.style.display = "none";
    });

    // Show current step
    const currentStep = document.querySelector(`.ai-leads_step-${stepNumber}`);
    if (currentStep) {
      currentStep.style.display = "flex";
    }

    // Show current title
    const currentTitle = document.querySelector(
      `.ai-leads_title.step-${stepNumber}`
    );
    if (currentTitle) {
      currentTitle.style.display = "flex";
    }

    // Reset button states
    if (stepNumber === 1) {
      this.validateStep1();
    } else if (stepNumber === 2) {
      this.validateStep2();
    } else if (stepNumber === 3) {
      // Trigger Webflow animation for Step 3
      this.triggerStep3Animation();
      // Update domain text
      this.updateDomainText();
    }
  }

  triggerStep3Animation() {
    try {
      const wfIx = Webflow.require("ix3");
      wfIx.emit("AI Leads scroll");
    } catch (error) {
      console.error("Error triggering Webflow animation:", error);
    }
  }

  updateDomainText() {
    // Get the domain from Step 1
    const domain = document.querySelector("#company-domain")?.value || "";

    // Update the leads-domain text element
    const leadsDomainElement = document.querySelector("#leads-domain");
    if (leadsDomainElement) {
      leadsDomainElement.textContent = domain;
    }
  }

  goBackToStep1() {
    this.navigateToStep(1);

    // Hide loading text
    const loadingText = document.querySelector(".loading-text");
    if (loadingText) {
      loadingText.style.display = "none";
    }

    // Reset loading state to show normal button content
    this.hideAnalyzeLoadingState();

    // Reset the analyze button state
    const analyzeButton = document.getElementById("analyze-company");
    if (analyzeButton) {
      analyzeButton.disabled = false;
      // Don't change textContent as it overwrites child elements
    }

    // Stop polling if active
    if (this.statusPollingInterval) {
      clearInterval(this.statusPollingInterval);
      this.statusPollingInterval = null;
    }
    if (this.finalPollingInterval) {
      clearInterval(this.finalPollingInterval);
      this.finalPollingInterval = null;
    }
  }

  startStatusPolling() {
    if (!this.formId) {
      console.error("No formId available for polling");
      return;
    }

    // Set start time for initial polling
    this.statusStartTime = Date.now();

    // Poll every 10 seconds for status updates
    this.statusPollingInterval = setInterval(async () => {
      try {
        const statusResponse = await this.checkStatus(this.formId);

        if (
          statusResponse.status === "WAITING_FOR_COMPANY_CONTEXT_USER_INPUT" &&
          statusResponse.companyContext
        ) {
          // Stop polling and populate Step 2
          clearInterval(this.statusPollingInterval);
          this.statusPollingInterval = null;

          this.populateStep2Fields(statusResponse.companyContext);
          this.navigateToStep(2);
        } else if (statusResponse.status === "COMPLETED") {
          // Stop polling and go to final step
          clearInterval(this.statusPollingInterval);
          this.statusPollingInterval = null;

          this.handleJobComplete();
        }
      } catch (error) {
        console.error("Error polling status:", error);
        // Don't proceed if API fails - stay on current step
      }
    }, 10000); // 10 seconds

    // Also poll immediately
    this.checkStatus(this.formId);
  }

  startFinalPolling() {
    if (!this.formId) {
      console.error("No formId available for polling");
      return;
    }

    // Reset timing for final polling - clear the old start time
    this.statusStartTime = null;
    this.completionStartTime = Date.now();

    // Poll every 10 seconds for final completion
    this.finalPollingInterval = setInterval(async () => {
      try {
        const statusResponse = await this.checkStatus(this.formId, false);

        if (statusResponse.status === "COMPLETED") {
          // Stop polling and go to final step
          clearInterval(this.finalPollingInterval);
          this.finalPollingInterval = null;

          this.handleJobComplete();
        }
      } catch (error) {
        console.error("Error polling final status:", error);
        // For Step 3 polling errors, stay on loading and try again next tick
        // Do not immediately complete; transient network failures shouldn't finalize the flow
      }
    }, 10000); // 10 seconds

    // Also poll immediately
    this.checkStatus(this.formId, false);
  }

  async checkStatus(formId, showErrors = true) {
    const response = await fetch(`${this.apiBaseUrl}/status/${formId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (showErrors) {
        const errorData = await response.json().catch(() => null);
        this.handleApiError(response.status, errorData);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const statusResponse = await response.json();
    return statusResponse;
  }

  handleJobComplete() {
    // Hide Step 3 content
    const step3Inner = document.querySelector(".ai-leads_inner");
    const step3Title = document.querySelector(".ai-leads_title.step-3");

    if (step3Inner) {
      step3Inner.style.display = "none";
    }
    if (step3Title) {
      step3Title.style.display = "none";
    }

    // Ensure all titles except step-4 are hidden to avoid double headers
    const allTitles = document.querySelectorAll(
      ".ai-leads_title.step-1, .ai-leads_title.step-2, .ai-leads_title.step-3"
    );
    allTitles.forEach((title) => (title.style.display = "none"));

    // Show Step 4 title
    const step4Title = document.querySelector(".ai-leads_title.step-4");
    if (step4Title) {
      step4Title.style.display = "flex";
    }
  }
}

// Initialize the AI Leads Flow when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new AILeadsFlow();
});

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = AILeadsFlow;
}
