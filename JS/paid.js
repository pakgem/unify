(function () {
  const FORM_ID = "wf-form-Schedule-a-live-demo";
  const FIELD_IDS = {
    firstName: "468363",
    lastName: "388880",
    email: "686533",
    employees: "394451",
    crm: "659886",
    referral: "539087",
  };

  function setEmailCookie(email) {
    document.cookie =
      "email=" + encodeURIComponent(email) + ";path=/;max-age=86400;";
  }

  function getValue(id) {
    const el = document.getElementById(id);
    if (!el) return "";
    const value = el.value || "";
    return typeof value === "string" ? value.trim() : value;
  }

  function buildParams(values) {
    const params = new URLSearchParams();

    const setIfPresent = (fieldId, value) => {
      if (!fieldId) return;
      const normalized =
        typeof value === "string" ? value.trim() : value;
      if (normalized) {
        params.set(fieldId, normalized);
      }
    };

    setIfPresent(FIELD_IDS.firstName, values.firstName);
    setIfPresent(FIELD_IDS.lastName, values.lastName);
    setIfPresent(FIELD_IDS.email, values.email);
    setIfPresent(FIELD_IDS.employees, values.employees);
    setIfPresent(FIELD_IDS.crm, values.crm);
    setIfPresent(FIELD_IDS.referral, values.referral);

    return params;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formValues = {
      email: getValue("business-email"),
      firstName: getValue("First-Name"),
      lastName: getValue("Last-Name"),
      employees: getValue("Company-Size"),
      crm: getValue("CRM-choice"),
      referral: getValue("Referral-Source"),
    };

    if (formValues.email) {
      setEmailCookie(formValues.email);
    }

    const queryString = buildParams(formValues).toString();
    const target = queryString ? `/get-started?${queryString}` : "/get-started";

    window.location.href = target;
  }

  function getLabel(wrapper) {
    return (
      wrapper.querySelector(
        ".fs-selectcustom_dropdown-toggle .fs-selectcustom_header > div:last-child"
      ) ||
      wrapper.querySelector(
        ".fs-selectcustom_dropdown-toggle .div-block-4 > div:last-child"
      ) ||
      wrapper.querySelector(".fs-selectcustom_dropdown-toggle .fs-selectcustom_header") ||
      wrapper.querySelector(".fs-selectcustom_dropdown-toggle")
    );
  }

  function setLabelText(wrapper, text) {
    const label = getLabel(wrapper);
    if (label && typeof text === "string") {
      label.textContent = text;
    }
  }

  function updateDropdownColor(wrapper, selectEl, placeholderText) {
    if (!wrapper) return;
    const label = getLabel(wrapper);
    if (!label) return;

    const labelText = label.textContent ? label.textContent.trim() : "";
    const selected = selectEl && selectEl.value ? selectEl.value.trim() : "";
    const hasValue =
      (!!selected && selected.length > 0) ||
      (labelText &&
        labelText.toLowerCase() !== "select an option" &&
        (!placeholderText ||
          labelText.toLowerCase() !== placeholderText.toLowerCase()));

    label.style.color = hasValue ? "#fff" : "#9b9b9b";
  }

  function initializeDropdownColors() {
    document.querySelectorAll(".fs-selectcustom_dropdown").forEach((wrapper) => {
      const selectEl = wrapper.querySelector("select");
      if (!selectEl) return;

      const placeholderOption =
        selectEl.querySelector('option[value=""]') || selectEl.options[0];
      const placeholderText = placeholderOption
        ? (placeholderOption.textContent || "").trim()
        : "Select an option";

      if (placeholderOption) {
        placeholderOption.hidden = true;
      }

      if (!selectEl.value) {
        selectEl.value = "";
        setLabelText(wrapper, placeholderText);
      }

      updateDropdownColor(wrapper, selectEl, placeholderText);

      if (selectEl) {
        selectEl.addEventListener("change", function () {
          const selectedOption = selectEl.options[selectEl.selectedIndex];
          const nextLabelText = selectedOption
            ? (selectedOption.textContent || "").trim()
            : placeholderText;
          setLabelText(wrapper, nextLabelText);
          updateDropdownColor(wrapper, selectEl, placeholderText);
        });
      }

      wrapper.querySelectorAll(".fs-select_link").forEach((link) => {
        link.addEventListener("click", function () {
          const selectInside = wrapper.querySelector("select");
          if (selectInside) {
            // Give the custom dropdown a moment to sync the select value
            setTimeout(() => {
              const selectedOption =
                selectInside.options[selectInside.selectedIndex];
              const nextLabelText = selectedOption
                ? (selectedOption.textContent || "").trim()
                : placeholderText;
              setLabelText(wrapper, nextLabelText);
              updateDropdownColor(wrapper, selectInside, placeholderText);
            }, 0);
          }
        });
      });

      const label = getLabel(wrapper);
      if (label) {
        const observer = new MutationObserver(() => {
          updateDropdownColor(wrapper, selectEl || null, placeholderText);
        });
        observer.observe(label, { childList: true, subtree: true, characterData: true });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById(FORM_ID);
    if (!form) return;

    initializeDropdownColors();
    form.addEventListener("submit", handleSubmit);
  });
})();
