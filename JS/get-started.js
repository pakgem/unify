function getDecodedCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function initDefaultForm() {
  // Only run this code if there's a Default form on the page.
  const formEl = document.getElementById("default-form");
  if (!formEl) return;

  const FIELD_IDS = {
    firstName: "468363",
    lastName: "388880",
    email: "686533",
    employees: "394451",
    crm: "659886",
    referral: "539087",
  };
  const selectedUrl = "https://forms.default.com/390869";
  const searchParams = new URLSearchParams(window.location.search);
  const defaultFormParams = new URLSearchParams();

  const setIfPresent = (fieldId, value) => {
    if (!fieldId) return;
    const trimmed = typeof value === "string" ? value.trim() : value;
    if (trimmed) {
      defaultFormParams.set(fieldId, trimmed);
    }
  };

  setIfPresent(FIELD_IDS.firstName, searchParams.get(FIELD_IDS.firstName));
  setIfPresent(FIELD_IDS.lastName, searchParams.get(FIELD_IDS.lastName));
  setIfPresent(FIELD_IDS.employees, searchParams.get(FIELD_IDS.employees));
  setIfPresent(FIELD_IDS.crm, searchParams.get(FIELD_IDS.crm));
  setIfPresent(FIELD_IDS.referral, searchParams.get(FIELD_IDS.referral));

  const emailFromQuery =
    searchParams.get(FIELD_IDS.email) || searchParams.get("email");
  const emailFromCookie = emailFromQuery ? null : getDecodedCookie("email");
  const emailValue = emailFromQuery || emailFromCookie;

  setIfPresent(FIELD_IDS.email, emailValue);
  if (emailValue) {
    defaultFormParams.set("email", emailValue);
  }

  const query = defaultFormParams.toString();
  formEl.setAttribute("src", query ? `${selectedUrl}?${query}` : selectedUrl);

  if (emailValue && window.analytics && typeof window.analytics.identify === "function") {
    window.analytics.identify(emailValue, { email: emailValue });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDefaultForm, {
    once: true,
  });
} else {
  initDefaultForm();
}

(function () {
  const ALLOWED_ORIGIN = "https://forms.default.com";

  let firstName, lastName, email, crm, employees;

  function safeParseMaybeJSON(v) {
    if (typeof v !== "string") return v;
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }

  function track(name, props) {
    if (window.analytics && typeof window.analytics.track === "function") {
      const merged = { ...(props || {}) };
      if (window.__unifyNavCtaExperiment) {
        merged.cta_experiment = window.__unifyNavCtaExperiment;
      }
      if (window.__unifyNavCtaVariant) {
        merged.cta_variant = window.__unifyNavCtaVariant;
      }
      window.analytics.track(name, merged);
    }
  }

  window.addEventListener(
    "message",
    function (event) {
      try {
        if (event.origin !== ALLOWED_ORIGIN) return;

        const data = safeParseMaybeJSON(event.data);
        if (!data || typeof data !== "object" || !data.event) return;

        const payload = data.payload || {};
        const responses = payload.responses || {};

        switch (data.event) {
          case "default.form_completed":
            firstName = responses.first_name || firstName || null;
            lastName = responses.last_name || lastName || null;
            email = responses.work_email || payload.email || email || null;
            crm = responses["what_crm_does_your_company_use?"] || crm || null;
            employees =
              responses["how_many_employees_does_your_company_have?"] ||
              employees ||
              null;

            track("default_get_started_form_completed", payload);

            if (
              email &&
              window.analytics &&
              typeof window.analytics.identify === "function"
            ) {
              window.analytics.identify(email, payload);
            }
            break;

          case "default.form_page_submitted":
            email = responses.work_email || payload.email || email || null;
            if (email && window.analytics && typeof window.analytics.identify === "function") {
              window.analytics.identify(email, { email });
            }
            track("Default Form Page Submitted", payload);
            break;

          case "default.scheduler_displayed":
            track("Default Scheduler Displayed", payload);
            break;

          case "default.meeting_booked":
            track("Default Meeting Booked", payload);

            if (window.twq && typeof window.twq === "function") {
              window.twq("event", "tw-q4sy6-q4sy8", {
                status: "meeting_booked",
                email: responses.work_email || payload.email || email || null,
              });
            }

            if (typeof window.trackFormSubmission === "function") {
              window.trackFormSubmission({
                id: "1e0691b0-a20f-4132-acb4-494287e2d7af",
                submission: {
                  firstName: firstName || responses.first_name || null,
                  lastName: lastName || responses.last_name || null,
                  email: email || responses.work_email || payload.email || null,
                  custom: [
                    { key: "crm", value: crm || null },
                    { key: "employees", value: employees || null },
                  ],
                },
              });
            } else {
              console.warn("trackFormSubmission unavailable");
            }

            // Fire pixel safely.
            try {
              const img = new Image();
              img.src =
                "https://trkn.us/pixel/conv/ppt=25951;g=conversion;gid=66241;ord=" +
                Date.now();
              img.width = img.height = 0;
              img.style.display = "none";
              document.body.appendChild(img);
            } catch (_) {}
            break;
        }
      } catch (err) {
        console.error("Default form message handler error:", err);
      }
    },
    false,
  );
})();
