// ==============================================
// COOKIE AND STORAGE UTILITIES
// ==============================================
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get or create anonymous ID
function getOrCreateAnonymousId() {
  let anonymousId = getCookie("anonymousId");
  if (!anonymousId) {
    anonymousId = "user_" + Math.random().toString(36).substr(2, 9);
    setCookie("anonymousId", anonymousId, 7); // Set cookie with 7 days expiration
  }
  return anonymousId;
}

// ==============================================
// GLOBAL VARIABLES AND CONSTANTS
// ==============================================
const keywordsInput = document.getElementById("Keywords");
const maxLimitText = document.getElementById("max-limit-text");
const companyDomainInput = document.getElementById("Company-Domain");
const companyNameInput = document.querySelector('input[name="Company-Name"]');
const submitButton = document.querySelector(".button.submit");
const MAX_TAGS = 5;
let tags = [];

// Get anonymous ID for storage keys
const anonymousId = getOrCreateAnonymousId();

// API Configuration
const API_BASE_URL = "https://growth-api.unifygtm.com/api/v1";
const API_ENDPOINTS = {
  generateQueries: "/generate-queries",
  perplexity: "/ai-seo/perplexity",
  gptsearch: "/ai-seo/gptsearch",
  gemini: "/ai-seo/gemini",
};

// Chart Configuration
const CHART_COLORS = {
  red: "#FF6D6D",
  yellow: "#FFB800",
  green: "#00CC88",
};

// Chart Instances
let gptMentionsChartInstance = null;
let gptCitedChartInstance = null;
let perplexityMentionsChartInstance = null;
let perplexityCitedChartInstance = null;
let geminiMentionsChartInstance = null;
let geminiCitedChartInstance = null;

// Results Data
let currentKeywordQueries = null;
let currentResults = {};

// Submission tracking
const STORAGE_KEYS = {
  submissionCount: "apiSeoHits_" + anonymousId,
  emailSubmitted: "hasSubmittedEmail",
  dailySubmissionDate: "apiSeoHitsDate_" + anonymousId,
};

const MAX_SUBMISSIONS = 2;
const MAX_DAILY_SUBMISSIONS = 10;

// ==============================================
// DOM ELEMENTS AND INITIALIZATION
// ==============================================
// Create a container for the tags
const tagContainer = document.createElement("div");
tagContainer.className = "tags-container";
keywordsInput.parentNode.insertBefore(tagContainer, keywordsInput);

// Style the container and input
const styles = `
    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding-left: 5px;
        background-color: #222;
        border: 1px solid #404040;
        border-radius: 4px;
        cursor: text;
        transition: border 0.2s;
        align-items: center;
        min-height: 2.75rem;
    }
    .tags-container.focused {
        border-color: #fffc;
    }
    .keyword-tag_wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
    }
    #Keywords {
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        flex: 1;
        min-width: 60px;
        min-height:2.75rem;
        background: transparent;
        color: #8b8b8b;
        font-size: 0.875rem;
        line-height: 1;
    }
    #Keywords::placeholder {
        color: var(--grey-text);
        letter-spacing: 0.28px;
    }
    #Keywords:focus {
        color: #dcdcdc;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Style additions for maxed-wrap and form blur
const additionalStyles = `
  .ai-seo_form-wrap {
    position: relative;
  }

  .maxed-wrap, .maxed-wrap-day-limit {
    display: none;
    position: absolute;
    z-index: 2;
    opacity: 0;
    transform: translateY(20px);
  }
  
  .maxed-wrap.active, .maxed-wrap-day-limit.active {
    display: flex;
    animation: slideUp 0.4s ease forwards;
  }

  .maxed-wrap.fade-out, .maxed-wrap-day-limit.fade-out {
    animation: slideDown 0.4s ease forwards;
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

  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
  
  .ai-seo_form-wrap.blurred {
    filter: blur(5px);
    pointer-events: none;
    user-select: none;
  }
`;

const maxedStyleSheet = document.createElement("style");
maxedStyleSheet.textContent = additionalStyles;
document.head.appendChild(maxedStyleSheet);

// Get template tag
const templateTag = document.querySelector(".keyword-tag");
if (templateTag) {
  templateTag.style.display = "none";
}

// Create and insert tag wrap
const tagWrap = document.createElement("div");
tagWrap.className = "keyword-tag_wrap";
tagContainer.appendChild(tagWrap);

// Move the input inside the container
tagContainer.appendChild(keywordsInput);

// ==============================================
// UTILITY FUNCTIONS
// ==============================================
function isValidUrl(string) {
  if (!string) return false;

  try {
    const url = new URL(
      string.startsWith("http") ? string : `https://${string}`
    );
    // Check if has valid hostname with at least one dot and valid TLD
    return (
      url.hostname.includes(".") &&
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
        url.hostname
      )
    );
  } catch (_) {
    return false;
  }
}

function validateForm() {
  const hasKeywords = tags.length > 0;
  const domainValue = companyDomainInput.value.trim();
  const isValidDomain = isValidUrl(domainValue);

  if (hasKeywords && isValidDomain) {
    submitButton.classList.remove("disabled");
  } else {
    submitButton.classList.add("disabled");
  }
}

function updateInputValue() {
  // Store the value but don't display it
  keywordsInput.dataset.value = tags.map((tag) => `"${tag}"`).join(", ");
  validateForm();
}

function showError() {
  document.querySelector(".sales-call_error").style.display = "block";
  submitButton.classList.remove("loading");
  submitButton.disabled = false;
}

function hasValidData(response) {
  if (!response || !response.keyword_stats) return false;

  const firstKeyword = Object.keys(response.keyword_stats)[0];
  const keywordData = response.keyword_stats[firstKeyword];

  return (
    keywordData &&
    Array.isArray(keywordData.competitors_referenced) &&
    keywordData.competitors_referenced.length > 0
  );
}

function showResultsContainer() {
  const resultsContainer = document.querySelector(".ai-seo_results");
  const formContainer = document.querySelector(".ai-seo_form-wrap");
  formContainer.style.display = "none";
  resultsContainer.style.display = "flex";
}

function checkDailySubmissionCount() {
  const currentDate = new Date().toDateString();
  const lastSubmissionDate = localStorage.getItem(
    STORAGE_KEYS.dailySubmissionDate
  );
  const submissionCount = parseInt(
    localStorage.getItem(STORAGE_KEYS.submissionCount) || "0"
  );

  // Reset count if it's a new day
  if (lastSubmissionDate !== currentDate) {
    localStorage.setItem(STORAGE_KEYS.submissionCount, "0");
    localStorage.setItem(STORAGE_KEYS.dailySubmissionDate, currentDate);
    return 0;
  }

  return submissionCount;
}

function showDailyLimitState() {
  const formWrap = document.querySelector(".ai-seo_form-wrap");
  const dailyLimitWrap = document.querySelector(".maxed-wrap-day-limit");

  formWrap.classList.add("blurred");
  dailyLimitWrap.classList.add("active");
}

function hideDailyLimitState() {
  const formWrap = document.querySelector(".ai-seo_form-wrap");
  const dailyLimitWrap = document.querySelector(".maxed-wrap-day-limit");

  // Add fade-out animation
  dailyLimitWrap.classList.add("fade-out");

  // Wait for animation to complete before removing classes
  setTimeout(() => {
    formWrap.classList.remove("blurred");
    dailyLimitWrap.classList.remove("active", "fade-out");
  }, 400);
}

function checkAndHandleMaxedState() {
  const emailSubmitted =
    localStorage.getItem(STORAGE_KEYS.emailSubmitted) === "true";
  if (emailSubmitted) {
    hideMaxedState();
    hideDailyLimitState();
    return false;
  }

  const submissionCount = parseInt(
    localStorage.getItem(STORAGE_KEYS.submissionCount) || "0"
  );
  if (submissionCount >= MAX_SUBMISSIONS) {
    showMaxedState();
    return true;
  } else {
    hideMaxedState();
    return false;
  }
}

function checkAndHandleDailyLimit() {
  const dailyCount = checkDailySubmissionCount();
  if (dailyCount >= MAX_DAILY_SUBMISSIONS) {
    showDailyLimitState();
    return true;
  }
  hideDailyLimitState();
  return false;
}

function showMaxedState() {
  const formWrap = document.querySelector(".ai-seo_form-wrap");
  const maxedWrap = document.querySelector(".maxed-wrap");

  formWrap.classList.add("blurred");
  maxedWrap.classList.add("active");
}

function hideMaxedState() {
  const formWrap = document.querySelector(".ai-seo_form-wrap");
  const maxedWrap = document.querySelector(".maxed-wrap");

  // Add fade-out animation
  maxedWrap.classList.add("fade-out");

  // Wait for animation to complete before removing classes
  setTimeout(() => {
    formWrap.classList.remove("blurred");
    maxedWrap.classList.remove("active", "fade-out");
  }, 400); // Match the animation duration
}

function incrementSubmissionCount() {
  const currentDate = new Date().toDateString();
  const currentCount = parseInt(
    localStorage.getItem(STORAGE_KEYS.submissionCount) || "0"
  );
  const newCount = currentCount + 1;

  localStorage.setItem(STORAGE_KEYS.submissionCount, newCount.toString());
  localStorage.setItem(STORAGE_KEYS.dailySubmissionDate, currentDate);

  return checkAndHandleMaxedState();
}

// ==============================================
// TAG MANAGEMENT FUNCTIONS
// ==============================================
function createTag(text) {
  const tag = templateTag.cloneNode(true);
  tag.style.display = "flex";
  tag.querySelector("div").textContent = text;

  tag.querySelector(".close").onclick = (e) => {
    e.stopPropagation();
    removeTag(tag, text);
  };

  return tag;
}

function addTag(text) {
  const trimmedText = text.trim().replace(/^["']|["']$/g, ""); // Remove quotes if they exist
  if (trimmedText && !tags.includes(trimmedText) && tags.length < MAX_TAGS) {
    tags.push(trimmedText);
    tagWrap.appendChild(createTag(trimmedText));
    keywordsInput.value = "";
    updateMaxLimitText();
    updateInputValue();
  }
}

function removeTag(tagElement, text) {
  tagWrap.removeChild(tagElement);
  tags = tags.filter((tag) => tag !== text);
  updateMaxLimitText();
  updateInputValue();
}

function updateMaxLimitText() {
  if (tags.length >= MAX_TAGS) {
    maxLimitText.style.display = "block";
    keywordsInput.style.display = "none";
  } else {
    maxLimitText.style.display = "none";
    keywordsInput.style.display = "block";
  }
}

function resetForm() {
  // Clear all tags
  while (tagWrap.firstChild) {
    tagWrap.removeChild(tagWrap.firstChild);
  }
  tags = [];

  // Reset inputs
  keywordsInput.value = "";
  keywordsInput.dataset.value = "";
  companyDomainInput.value = "";
  if (companyNameInput) {
    companyNameInput.value = "";
  }

  // Update UI state
  updateMaxLimitText();
  validateForm();
}

// ==============================================
// CHART FUNCTIONS
// ==============================================
function getChartColor(percentage) {
  if (percentage >= 70) return CHART_COLORS.green;
  if (percentage >= 40) return CHART_COLORS.yellow;
  return CHART_COLORS.red;
}

function initializeChart(canvasId, percentage) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with ID "${canvasId}" not found.`);
    return null; // Return null if canvas not found
  }
  const ctx = canvas.getContext("2d");
  const color = getChartColor(percentage);

  return new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: [color, "rgba(255, 255, 255, 0.12)"],
          borderWidth: 0,
          cutout: "92%",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      animation: {
        duration: 1500,
        easing: "easeInOutQuart",
      },
    },
  });
}

// ==============================================
// API FUNCTIONS
// ==============================================
async function makeApiCall(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("API request failed:", response.statusText);
      throw new Error("API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

async function fetchGeneratedQueries(keywords) {
  try {
    const requestBody = { keywords };
    console.log("Fetching generated queries with data:", requestBody);
    const response = await makeApiCall(
      API_ENDPOINTS.generateQueries,
      requestBody
    );
    console.log("Generated queries received:", response);
    return response;
  } catch (error) {
    console.error("Error fetching generated queries:", error);
    throw error;
  }
}

// ==============================================
// RESULTS UPDATE FUNCTIONS
// ==============================================
function updateCompanyDetails() {
  const companyName = companyNameInput.value.trim();
  const companyDomain = companyDomainInput.value.trim();

  // Update all company name elements
  document.querySelectorAll(".ai-seo_company-name").forEach((element) => {
    element.textContent = companyName;
  });

  // Update all company domain elements
  document.querySelectorAll(".ai-seo_company-domain").forEach((element) => {
    element.textContent = companyDomain;
  });
}

function updateResults(keywordData, keyword) {
  console.log(
    `updateResults called for keyword: "${keyword}". Received keywordData:`,
    keywordData
  );

  const resultsContainer = document.querySelector(".ai-seo_results");
  const formContainer = document.querySelector(".ai-seo_form-wrap");

  // Ensure the container is visible first and set to flex
  formContainer.style.display = "none";
  resultsContainer.style.display = "flex";

  // Update company details
  updateCompanyDetails();

  const tabContent = document.querySelector("#ai-gpt-results .ai-seo_tab-wrap");
  const rawUserDomain = companyDomainInput.value.trim();
  const userDomain = rawUserDomain.toLowerCase().replace(/^www\./, "");

  // --- Update scores and charts ---

  // Destroy previous GPT chart instances
  if (gptMentionsChartInstance) {
    gptMentionsChartInstance.destroy();
  }
  if (gptCitedChartInstance) {
    gptCitedChartInstance.destroy();
  }

  // Mentioned Score - cap at 100
  const rawMentionedScore = keywordData.percentage_mentioned || 0;
  const mentionedScore = Math.min(Math.round(rawMentionedScore), 100);
  const mentionedScoreElement = tabContent.querySelector(
    ".ai-seo_mentioned-wrap .overall-score-num"
  );
  if (mentionedScoreElement) {
    mentionedScoreElement.textContent = `${mentionedScore}%`;
    mentionedScoreElement.style.color = getChartColor(mentionedScore);
    mentionedScoreElement.style.fontSize = "22px";
  }
  gptMentionsChartInstance = initializeChart("mentioned-gpt", mentionedScore);

  // Cited Score - cap at 100
  const rawCitedScore = keywordData.percentage_referenced || 0;
  const citedScore = Math.min(Math.round(rawCitedScore), 100);
  const citedScoreElement = tabContent.querySelector(
    ".ai-seo_cited-wrap .overall-score-num"
  );
  if (citedScoreElement) {
    citedScoreElement.textContent = `${citedScore}%`;
    citedScoreElement.style.color = getChartColor(citedScore);
    citedScoreElement.style.fontSize = "22px";
  }
  gptCitedChartInstance = initializeChart("cited-score-gpt", citedScore);

  // --- Update competitors using the cloning method ---
  const referencesWrap = tabContent.querySelector(".ai-seo_references-wrap");
  const templateRow = referencesWrap.querySelector(
    ".ai-seo_reference-row.hide"
  );

  const existingRows = referencesWrap.querySelectorAll(
    ".ai-seo_reference-row:not(.hide)"
  );
  existingRows.forEach((row) => row.remove());

  // **Filter competitors first, normalizing domains**
  const filteredCompetitors = keywordData.competitors_referenced.filter(
    (competitor) => {
      const competitorDomain = (competitor.domain || "")
        .toLowerCase()
        .replace(/^www\./, "");
      return competitorDomain !== userDomain;
    }
  );

  filteredCompetitors.slice(0, 6).forEach((competitor) => {
    const newRow = templateRow.cloneNode(true);
    newRow.classList.remove("hide");

    const siteElement = newRow.querySelector(".ai-seo_reference-site");
    const percentElement = newRow.querySelector(".ai-seo_reference-percent");

    if (siteElement) {
      const domain = competitor.domain || "N/A";
      // Create link element
      const link = document.createElement("a");
      link.href = domain.startsWith("http") ? domain : `https://${domain}`;
      link.textContent = domain;
      link.target = "_blank"; // Open in new tab
      link.rel = "noopener noreferrer"; // Security best practice
      // Clear the site element and append the link
      siteElement.textContent = "";
      siteElement.appendChild(link);
    }
    if (percentElement) {
      const percentageValue = competitor.percentage;
      let roundedPercentage = Math.min(Math.round(percentageValue), 100);
      percentElement.textContent = `${roundedPercentage}%`;
    }
    referencesWrap.appendChild(newRow);
  });
}

function updatePerplexityResults(keywordData, keyword) {
  console.log(
    `updatePerplexityResults called for keyword: "${keyword}". Received keywordData:`,
    keywordData
  );

  // Update company details
  updateCompanyDetails();

  const tabContent = document.querySelector(
    "#ai-perplexity-results .ai-seo_tab-wrap"
  );

  // Destroy previous Perplexity chart instances
  if (perplexityMentionsChartInstance) {
    perplexityMentionsChartInstance.destroy();
  }
  if (perplexityCitedChartInstance) {
    perplexityCitedChartInstance.destroy();
  }

  // Mentioned Score for Perplexity
  const perplexityMentionedScore = Math.min(
    Math.round(keywordData.percentage_mentioned || 0),
    100
  );
  const perplexityMentionedElement = tabContent.querySelector(
    ".ai-seo_mentioned-wrap .overall-score-num"
  );
  if (perplexityMentionedElement) {
    perplexityMentionedElement.textContent = `${perplexityMentionedScore}%`;
    perplexityMentionedElement.style.color = getChartColor(
      perplexityMentionedScore
    );
    perplexityMentionedElement.style.fontSize = "22px";
  }
  perplexityMentionsChartInstance = initializeChart(
    "mention-score-perplexity",
    perplexityMentionedScore
  );

  // Cited Score for Perplexity
  const perplexityCitedScore = Math.min(
    Math.round(keywordData.percentage_referenced || 0),
    100
  );
  const perplexityCitedElement = tabContent.querySelector(
    ".ai-seo_cited-wrap .overall-score-num"
  );
  if (perplexityCitedElement) {
    perplexityCitedElement.textContent = `${perplexityCitedScore}%`;
    perplexityCitedElement.style.color = getChartColor(perplexityCitedScore);
    perplexityCitedElement.style.fontSize = "22px";
  }
  perplexityCitedChartInstance = initializeChart(
    "cited-score-perplexity",
    perplexityCitedScore
  );

  // Update competitors
  const referencesWrap = tabContent.querySelector(".ai-seo_references-wrap");
  const templateRow = referencesWrap.querySelector(
    ".ai-seo_reference-row.hide"
  );

  const existingRows = referencesWrap.querySelectorAll(
    ".ai-seo_reference-row:not(.hide)"
  );
  existingRows.forEach((row) => row.remove());

  const rawUserDomain = companyDomainInput.value.trim();
  const userDomain = rawUserDomain.toLowerCase().replace(/^www\./, "");

  const filteredCompetitors = keywordData.competitors_referenced.filter(
    (competitor) => {
      const competitorDomain = (competitor.domain || "")
        .toLowerCase()
        .replace(/^www\./, "");
      return competitorDomain !== userDomain;
    }
  );

  filteredCompetitors.slice(0, 6).forEach((competitor) => {
    const newRow = templateRow.cloneNode(true);
    newRow.classList.remove("hide");

    const siteElement = newRow.querySelector(".ai-seo_reference-site");
    const percentElement = newRow.querySelector(".ai-seo_reference-percent");

    if (siteElement) {
      const domain = competitor.domain || "N/A";
      const link = document.createElement("a");
      link.href = domain.startsWith("http") ? domain : `https://${domain}`;
      link.textContent = domain;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      siteElement.textContent = "";
      siteElement.appendChild(link);
    }
    if (percentElement) {
      const percentageValue = competitor.percentage;
      let roundedPercentage = Math.min(Math.round(percentageValue), 100);
      percentElement.textContent = `${roundedPercentage}%`;
    }
    referencesWrap.appendChild(newRow);
  });
}

function updateGeminiResults(keywordData, keyword) {
  console.log(
    `updateGeminiResults called for keyword: "${keyword}". Received keywordData:`,
    keywordData
  );

  // Update company details
  updateCompanyDetails();

  const tabContent = document.querySelector(
    "#ai-gemini-results .ai-seo_tab-wrap"
  );

  // Destroy previous Gemini chart instances
  if (geminiMentionsChartInstance) {
    geminiMentionsChartInstance.destroy();
  }
  if (geminiCitedChartInstance) {
    geminiCitedChartInstance.destroy();
  }

  // Mentioned Score for Gemini
  const geminiMentionedScore = Math.min(
    Math.round(keywordData.percentage_mentioned || 0),
    100
  );
  const geminiMentionedElement = tabContent.querySelector(
    ".ai-seo_mentioned-wrap .overall-score-num"
  );
  if (geminiMentionedElement) {
    geminiMentionedElement.textContent = `${geminiMentionedScore}%`;
    geminiMentionedElement.style.color = getChartColor(geminiMentionedScore);
    geminiMentionedElement.style.fontSize = "22px";
  }
  geminiMentionsChartInstance = initializeChart(
    "mention-score-gemini",
    geminiMentionedScore
  );

  // Cited Score for Gemini
  const geminiCitedScore = Math.min(
    Math.round(keywordData.percentage_referenced || 0),
    100
  );
  const geminiCitedElement = tabContent.querySelector(
    ".ai-seo_cited-wrap .overall-score-num"
  );
  if (geminiCitedElement) {
    geminiCitedElement.textContent = `${geminiCitedScore}%`;
    geminiCitedElement.style.color = getChartColor(geminiCitedScore);
    geminiCitedElement.style.fontSize = "22px";
  }
  geminiCitedChartInstance = initializeChart(
    "cited-score-gemini",
    geminiCitedScore
  );

  // Update competitors
  const referencesWrap = tabContent.querySelector(".ai-seo_references-wrap");
  const templateRow = referencesWrap.querySelector(
    ".ai-seo_reference-row.hide"
  );

  const existingRows = referencesWrap.querySelectorAll(
    ".ai-seo_reference-row:not(.hide)"
  );
  existingRows.forEach((row) => row.remove());

  const rawUserDomain = companyDomainInput.value.trim();
  const userDomain = rawUserDomain.toLowerCase().replace(/^www\./, "");

  const filteredCompetitors = keywordData.competitors_referenced.filter(
    (competitor) => {
      const competitorDomain = (competitor.domain || "")
        .toLowerCase()
        .replace(/^www\./, "");
      return competitorDomain !== userDomain;
    }
  );

  filteredCompetitors.slice(0, 6).forEach((competitor) => {
    const newRow = templateRow.cloneNode(true);
    newRow.classList.remove("hide");

    const siteElement = newRow.querySelector(".ai-seo_reference-site");
    const percentElement = newRow.querySelector(".ai-seo_reference-percent");

    if (siteElement) {
      const domain = competitor.domain || "N/A";
      const link = document.createElement("a");
      link.href = domain.startsWith("http") ? domain : `https://${domain}`;
      link.textContent = domain;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      siteElement.textContent = "";
      siteElement.appendChild(link);
    }
    if (percentElement) {
      const percentageValue = competitor.percentage;
      let roundedPercentage = Math.min(Math.round(percentageValue), 100);
      percentElement.textContent = `${roundedPercentage}%`;
    }
    referencesWrap.appendChild(newRow);
  });
}

function updateKeywordDropdown(keywords) {
  const dropdownContent = document.querySelector(
    ".filters-dropdown_filters-modal.keyword"
  );
  const dropdownToggle = document.querySelector(".dropdown_toggle.keyword");
  const defaultInput = dropdownToggle.querySelector(".default-input");
  dropdownContent.innerHTML = "";

  // Create a temporary span to measure text width
  const measureSpan = document.createElement("span");
  measureSpan.style.visibility = "hidden";
  measureSpan.style.position = "absolute";
  measureSpan.style.whiteSpace = "nowrap";
  // Match the font properties of the dropdown
  measureSpan.style.font = window.getComputedStyle(defaultInput).font;
  document.body.appendChild(measureSpan);

  // Find the longest keyword width
  let maxWidth = 0;
  keywords.forEach((keyword) => {
    measureSpan.textContent = keyword;
    const width = measureSpan.getBoundingClientRect().width;
    maxWidth = Math.max(maxWidth, width);
  });

  // Set the width on the default input, which will control the dropdown width
  defaultInput.style.width = `${maxWidth}px`;

  // Clean up measurement span
  document.body.removeChild(measureSpan);

  // Create the dropdown options
  keywords.forEach((keyword) => {
    const option = document.createElement("div");
    option.className = "radio-btn-wrap";
    option.textContent = keyword;

    option.addEventListener("click", () => {
      defaultInput.textContent = keyword;

      // Get the currently active tab
      const activeTab = document.querySelector(".ai-seo_tab.w--current");
      const activeTabId = activeTab
        ? activeTab.getAttribute("data-w-tab")
        : null;

      // Update results based on the active tab
      if (activeTabId === "ChatGPT" && currentResults.gpt) {
        updateResults(currentResults.gpt.keyword_stats[keyword], keyword);
      } else if (activeTabId === "Perplexity" && currentResults.perplexity) {
        updatePerplexityResults(
          currentResults.perplexity.keyword_stats[keyword],
          keyword
        );
      } else if (activeTabId === "Google Gemini" && currentResults.gemini) {
        updateGeminiResults(
          currentResults.gemini.keyword_stats[keyword],
          keyword
        );
      }
    });
    dropdownContent.appendChild(option);
  });

  // Set initial selection
  const firstKeyword = keywords[0];
  defaultInput.textContent = firstKeyword;
}

// ==============================================
// SHARING AND URL HANDLING
// ==============================================
function generateShareUrl() {
  // Create a data object with all the necessary information
  const data = {
    company_name: companyNameInput.value,
    company_domain: companyDomainInput.value,
    keywords: tags,
    results: currentResults,
    available_tabs: {
      gpt: currentResults.gpt && hasValidData(currentResults.gpt),
      perplexity:
        currentResults.perplexity && hasValidData(currentResults.perplexity),
      gemini: currentResults.gemini && hasValidData(currentResults.gemini),
    },
  };

  // Generate the URL with the encoded data
  const shareUrl = `${window.location.origin}${
    window.location.pathname
  }?data=${encodeURIComponent(JSON.stringify(data))}`;
  return shareUrl;
}

// ==============================================
// FORM SUBMISSION AND API HANDLING
// ==============================================
async function handleFormSubmit(event) {
  event.preventDefault();

  console.log("Submit button clicked");
  submitButton.disabled = true;
  document.querySelector(".sales-call_error").style.display = "none";
  document.querySelector(".feedback-text").style.display = "none";
  document.querySelector(".loading").style.display = "block";

  // Check daily limit first
  if (checkAndHandleDailyLimit()) {
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".feedback-text").style.display = "block";
    submitButton.disabled = false;
    return;
  }

  // Then check if maxed before proceeding
  if (checkAndHandleMaxedState()) {
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".feedback-text").style.display = "block";
    submitButton.disabled = false;
    return;
  }

  try {
    const keywords = tags;
    const companyDomain = companyDomainInput.value.trim();
    const companyName = companyNameInput.value.trim();

    // Increment count before API calls
    incrementSubmissionCount();

    // Fetch generated queries first
    const generatedQueriesResponse = await fetchGeneratedQueries(keywords);
    console.log("Using generated queries response:", generatedQueriesResponse);

    const keywordQueriesData = generatedQueriesResponse.keyword_queries;

    const aiSeoData = {
      company_domain: companyDomain,
      company_name: companyName,
      keyword_queries: keywordQueriesData,
    };

    // Initialize results container
    currentResults = {
      gpt: null,
      perplexity: null,
      gemini: null,
    };

    // Hide all tab links initially
    document.querySelectorAll(".ai-seo_tab").forEach((tab) => {
      tab.style.display = "none";
    });

    // Track if we've shown the results container
    let resultsShown = false;
    let keywordsForDropdown = [];

    // Make API calls independently
    const apiCalls = [
      makeApiCall(API_ENDPOINTS.gptsearch, aiSeoData)
        .then((response) => {
          currentResults.gpt = response;
          if (hasValidData(response)) {
            // Show the GPT tab
            const gptTab = document.querySelector(".ai-seo_tab.gpt");
            gptTab.style.display = "inline-block";

            // If this is the first valid response, show results
            if (!resultsShown) {
              // Remove w--current from all tabs
              document.querySelectorAll(".ai-seo_tab").forEach((tab) => {
                tab.classList.remove("w--current");
              });
              // Add w--current to GPT tab
              gptTab.classList.add("w--current");

              // Hide form and show results container immediately
              document.querySelector(".ai-seo_form-wrap").style.display =
                "none";
              document.querySelector(".ai-seo_results").style.display = "flex";
              resultsShown = true;

              // Set initial keyword dropdown
              keywordsForDropdown = Object.keys(response.keyword_stats);
              updateKeywordDropdown(keywordsForDropdown);

              // Update results for the first keyword and simulate tab click
              const firstKeyword = keywordsForDropdown[0];
              updateResults(response.keyword_stats[firstKeyword], firstKeyword);

              // Show GPT tab pane and hide others
              document.querySelectorAll(".w-tab-pane").forEach((pane) => {
                pane.style.display = "none";
              });
              document.getElementById("ai-gpt-results").style.display = "block";

              // Hide loading and show feedback
              document.querySelector(".loading").style.display = "none";
              document.querySelector(".feedback-text").style.display = "block";
              submitButton.disabled = false;
            }
          }
        })
        .catch((error) => {
          console.error("GPT Search API Error:", error);
        }),

      makeApiCall(API_ENDPOINTS.perplexity, aiSeoData)
        .then((response) => {
          currentResults.perplexity = response;
          if (hasValidData(response)) {
            // Show the Perplexity tab
            const perplexityTab = document.querySelector(
              ".ai-seo_tab.perplexity"
            );
            perplexityTab.style.display = "inline-block";

            // Only show results if no other results shown yet
            if (!resultsShown) {
              // Remove w--current from all tabs
              document.querySelectorAll(".ai-seo_tab").forEach((tab) => {
                tab.classList.remove("w--current");
              });
              // Add w--current to Perplexity tab
              perplexityTab.classList.add("w--current");

              document.querySelector(".ai-seo_form-wrap").style.display =
                "none";
              document.querySelector(".ai-seo_results").style.display = "flex";
              resultsShown = true;

              keywordsForDropdown = Object.keys(response.keyword_stats);
              updateKeywordDropdown(keywordsForDropdown);

              const firstKeyword = keywordsForDropdown[0];
              updatePerplexityResults(
                response.keyword_stats[firstKeyword],
                firstKeyword
              );

              // Show Perplexity tab pane
              document.querySelectorAll(".w-tab-pane").forEach((pane) => {
                pane.style.display = "none";
              });
              document.getElementById("ai-perplexity-results").style.display =
                "block";

              document.querySelector(".loading").style.display = "none";
              document.querySelector(".feedback-text").style.display = "block";
              submitButton.disabled = false;
            }
          }
        })
        .catch((error) => {
          console.error("Perplexity API Error:", error);
        }),

      makeApiCall(API_ENDPOINTS.gemini, aiSeoData)
        .then((response) => {
          currentResults.gemini = response;
          if (hasValidData(response)) {
            // Show the Gemini tab
            const geminiTab = document.querySelector(".ai-seo_tab.gemini");
            geminiTab.style.display = "inline-block";

            // Only show results if no other results shown yet
            if (!resultsShown) {
              // Remove w--current from all tabs
              document.querySelectorAll(".ai-seo_tab").forEach((tab) => {
                tab.classList.remove("w--current");
              });
              // Add w--current to Gemini tab
              geminiTab.classList.add("w--current");

              document.querySelector(".ai-seo_form-wrap").style.display =
                "none";
              document.querySelector(".ai-seo_results").style.display = "flex";
              resultsShown = true;

              keywordsForDropdown = Object.keys(response.keyword_stats);
              updateKeywordDropdown(keywordsForDropdown);

              const firstKeyword = keywordsForDropdown[0];
              updateGeminiResults(
                response.keyword_stats[firstKeyword],
                firstKeyword
              );

              // Show Gemini tab pane
              document.querySelectorAll(".w-tab-pane").forEach((pane) => {
                pane.style.display = "none";
              });
              document.getElementById("ai-gemini-results").style.display =
                "block";

              document.querySelector(".loading").style.display = "none";
              document.querySelector(".feedback-text").style.display = "block";
              submitButton.disabled = false;
            }
          }
        })
        .catch((error) => {
          console.error("Gemini API Error:", error);
        }),
    ];

    // Wait for all API calls to complete in the background
    Promise.allSettled(apiCalls).then(() => {
      // If no results were shown by any API call, show an error
      if (!resultsShown) {
        showError();
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".feedback-text").style.display = "block";
      }
    });
  } catch (error) {
    console.error("Error during form submission:", error);
    showError();
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".feedback-text").style.display = "block";
  }
}

// ==============================================
// EVENT LISTENERS
// ==============================================
// Event Listeners for tag management
keywordsInput.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === ",") && keywordsInput.value) {
    e.preventDefault();
    addTag(keywordsInput.value.replace(",", ""));
  } else if (e.key === "Backspace" && !keywordsInput.value && tags.length > 0) {
    const lastTag = tagWrap.lastChild;
    const lastTagText = lastTag.querySelector("div").textContent;
    removeTag(lastTag, lastTagText);
  }
});

keywordsInput.addEventListener("focus", () => {
  tagContainer.classList.add("focused");
});

keywordsInput.addEventListener("blur", () => {
  tagContainer.classList.remove("focused");
  if (keywordsInput.value) {
    addTag(keywordsInput.value);
  }
});

tagContainer.addEventListener("click", () => {
  keywordsInput.focus();
});

// Add validation for Company-Domain input
companyDomainInput.addEventListener("input", validateForm);
companyDomainInput.addEventListener("blur", validateForm);

// Add reset button functionality
const resetButton = document.querySelector(".button.is-reset");
if (resetButton) {
  resetButton.addEventListener("click", resetForm);
}

// Form submission event listener
submitButton.addEventListener("click", (event) => {
  if (submitButton.classList.contains("disabled")) {
    event.preventDefault();
    return;
  }
  handleFormSubmit(event);
});

// Edit inputs event listener
document.querySelector(".edit-inputs").addEventListener("click", () => {
  document.querySelector(".ai-seo_results").style.display = "none";
  document.querySelector(".ai-seo_form-wrap").style.display = "block";
});

// Share results button event listener
const shareButton = document.querySelector(".share-results");

if (shareButton) {
  const originalButtonText =
    shareButton.querySelector("div:last-child").textContent; // Store original text

  shareButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default link navigation

    const urlToCopy = generateShareUrl(); // Get the URL

    try {
      await navigator.clipboard.writeText(urlToCopy);
      console.log("Share URL copied to clipboard:", urlToCopy);

      // Show "Copied!" message briefly
      const textElement = shareButton.querySelector("div:last-child");
      if (textElement) {
        textElement.textContent = "Copied!";
        setTimeout(() => {
          textElement.textContent = originalButtonText; // Revert after 2 seconds
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy share URL: ", err);
      // Optionally show an error message to the user
      const textElement = shareButton.querySelector("div:last-child");
      if (textElement) {
        textElement.textContent = "Copy Failed";
        setTimeout(() => {
          textElement.textContent = originalButtonText;
        }, 2000);
      }
    }
  });
} else {
  console.error("Could not find the '.share-results' element.");
}

// ==============================================
// INITIALIZATION AND SHARED URL HANDLING
// ==============================================
// Initialize
updateMaxLimitText();
validateForm();

// Check for shared URL data on page load
const urlParams = new URLSearchParams(window.location.search);
const sharedData = urlParams.get("data");

if (sharedData) {
  try {
    const data = JSON.parse(decodeURIComponent(sharedData));
    console.log("Loading shared data:", data);

    // Populate form fields
    if (data.company_name) {
      companyNameInput.value = data.company_name;
    }
    if (data.company_domain) {
      companyDomainInput.value = data.company_domain;
    }

    // Add tags
    if (data.keywords && Array.isArray(data.keywords)) {
      data.keywords.forEach((keyword) => addTag(keyword));
    }

    // Update results directly
    if (data.results) {
      currentResults = data.results;

      // Show results container
      document.querySelector(".ai-seo_form-wrap").style.display = "none";
      document.querySelector(".ai-seo_results").style.display = "flex";

      // Hide all tabs initially
      document.querySelectorAll(".ai-seo_tab").forEach((tab) => {
        tab.style.display = "none";
      });

      // Show only the tabs that have valid data
      if (data.available_tabs) {
        if (data.available_tabs.gpt && currentResults.gpt) {
          const gptTab = document.querySelector(".ai-seo_tab.gpt");
          if (gptTab) {
            gptTab.style.display = "inline-block";
            gptTab.classList.add("w--current");
          }
        }

        if (data.available_tabs.perplexity && currentResults.perplexity) {
          const perplexityTab = document.querySelector(
            ".ai-seo_tab.perplexity"
          );
          if (perplexityTab) {
            perplexityTab.style.display = "inline-block";
            if (!data.available_tabs.gpt) {
              perplexityTab.classList.add("w--current");
            }
          }
        }

        if (data.available_tabs.gemini && currentResults.gemini) {
          const geminiTab = document.querySelector(".ai-seo_tab.gemini");
          if (geminiTab) {
            geminiTab.style.display = "inline-block";
            if (!data.available_tabs.gpt && !data.available_tabs.perplexity) {
              geminiTab.classList.add("w--current");
            }
          }
        }
      }

      // Get keywords from the first available result set
      let keywords = [];
      if (
        currentResults.gpt &&
        Object.keys(currentResults.gpt.keyword_stats).length > 0
      ) {
        keywords = Object.keys(currentResults.gpt.keyword_stats);
      } else if (
        currentResults.perplexity &&
        Object.keys(currentResults.perplexity.keyword_stats).length > 0
      ) {
        keywords = Object.keys(currentResults.perplexity.keyword_stats);
      } else if (
        currentResults.gemini &&
        Object.keys(currentResults.gemini.keyword_stats).length > 0
      ) {
        keywords = Object.keys(currentResults.gemini.keyword_stats);
      }

      // Update keyword dropdown and show first keyword results
      if (keywords.length > 0) {
        updateKeywordDropdown(keywords);

        // Get the first keyword
        const firstKeyword = keywords[0];

        // Update results for each tab if data is available
        if (currentResults.gpt) {
          updateResults(
            currentResults.gpt.keyword_stats[firstKeyword],
            firstKeyword
          );
        }
        if (currentResults.perplexity) {
          updatePerplexityResults(
            currentResults.perplexity.keyword_stats[firstKeyword],
            firstKeyword
          );
        }
        if (currentResults.gemini) {
          updateGeminiResults(
            currentResults.gemini.keyword_stats[firstKeyword],
            firstKeyword
          );
        }

        // Show the appropriate tab pane
        document.querySelectorAll(".w-tab-pane").forEach((pane) => {
          pane.style.display = "none";
        });

        if (data.available_tabs.gpt && currentResults.gpt) {
          document.getElementById("ai-gpt-results").style.display = "block";
        } else if (
          data.available_tabs.perplexity &&
          currentResults.perplexity
        ) {
          document.getElementById("ai-perplexity-results").style.display =
            "block";
        } else if (data.available_tabs.gemini && currentResults.gemini) {
          document.getElementById("ai-gemini-results").style.display = "block";
        }
      }
    }
  } catch (error) {
    console.error("Error parsing shared data:", error);
    // Optionally hide results and show form/error if parsing fails
    document.querySelector(".ai-seo_form-wrap").style.display = "block";
    document.querySelector(".ai-seo_results").style.display = "none";
    showError();
  }
}

// Add tab click event listeners
document.querySelectorAll(".ai-seo_tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabName = tab.classList.contains("gpt")
      ? "gpt"
      : tab.classList.contains("perplexity")
      ? "perplexity"
      : tab.classList.contains("gemini")
      ? "gemini"
      : null;

    if (tabName && currentResults[tabName]) {
      // Update tab classes for visual highlighting
      document.querySelectorAll(".ai-seo_tab").forEach((t) => {
        t.classList.remove("w--current");
      });
      tab.classList.add("w--current");

      // Get the currently selected keyword from the dropdown text
      const selectedKeyword = document.querySelector(
        ".dropdown_toggle.keyword .default-input"
      ).textContent;

      if (selectedKeyword) {
        // Get the correct tab pane container based on the tab name
        const tabPaneId =
          tabName === "gpt"
            ? "ai-gpt-results"
            : tabName === "perplexity"
            ? "ai-perplexity-results"
            : "ai-gemini-results";

        // Update tab pane classes for visibility
        document.querySelectorAll(".w-tab-pane").forEach((pane) => {
          pane.classList.remove("w--tab-active");
          pane.style.display = "none";
        });
        const activePane = document.getElementById(tabPaneId);
        activePane.classList.add("w--tab-active");
        activePane.style.display = "block";

        // Update results for the selected tab
        switch (tabName) {
          case "gpt":
            updateResults(
              currentResults.gpt.keyword_stats[selectedKeyword],
              selectedKeyword
            );
            break;
          case "perplexity":
            updatePerplexityResults(
              currentResults.perplexity.keyword_stats[selectedKeyword],
              selectedKeyword
            );
            break;
          case "gemini":
            updateGeminiResults(
              currentResults.gemini.keyword_stats[selectedKeyword],
              selectedKeyword
            );
            break;
        }
      }
    }
  });
});

// ==============================================
// INITIALIZATION AND EMAIL FORM HANDLING
// ==============================================
$(document).ready(function () {
  // Initialize form and check maxed state
  checkAndHandleMaxedState();
  initializeForm();
});

// Initialize form submission handler
function initializeForm() {
  $(".maxed-wrap .resources-form_form-tools")
    .off("submit")
    .on("submit", function (e) {
      // Don't prevent default - let Webflow handle the submission and success state
      var emailValue = $(this).find('input[name="Business-Email"]').val();
      document.cookie =
        "email=" + encodeURIComponent(emailValue) + ";path=/;max-age=86400;";
      localStorage.setItem("hasSubmittedEmail", "true");
    });

  // Add click handler for the continue button in success state
  $(document).on("click", ".continue-tool", function (e) {
    e.preventDefault();
    hideMaxedState();
  });
}
