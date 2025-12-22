(function (window, document) {
  "use strict";

  const ASHBY_JOB_BOARD_URL =
    "https://api.ashbyhq.com/posting-api/job-board/unify";
  const CAREER_ICON_SRC =
    "https://cdn.prod.website-files.com/65a7e0cdd5ac0838035bd1af/65a7e0cdd5ac0838035bd1e2_right-caret.svg";

  document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("job-board");
    if (!root) return;
    initializeJobBoard(root);
  });

  function initializeJobBoard(root) {
    setLoadingState(root);

    fetchJobs()
      .then((jobs) => {
        if (!jobs.length) {
          renderEmptyState(root);
          return;
        }
        renderDropdownJobBoard(root, jobs);
      })
      .catch((error) => {
        console.error("Failed to load jobs from Ashby:", error);
        renderErrorState(root);
      });
  }

  function fetchJobs() {
    return fetch(ASHBY_JOB_BOARD_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const jobs = Array.isArray(data?.jobs) ? data.jobs : [];
        return jobs.filter((job) => job && job.isListed);
      });
  }

  function setLoadingState(container) {
    container.textContent = "";

    const loading = document.createElement("p");
    loading.className = "job-board_loading";
    loading.textContent = "Loading roles…";
    container.appendChild(loading);
  }

  function renderDropdownJobBoard(root, jobs) {
    root.textContent = "";

    const departments = getDistinctDepartments(jobs);
    const grouped = groupJobsByDepartment(jobs);

    const wrapper = document.createElement("div");
    wrapper.className = "job-board_wrapper";

    const header = document.createElement("div");
    header.className = "job-board_filters";

    const selectWrapper = document.createElement("div");
    selectWrapper.className = "job-board_filter";

    const departmentSelect = document.createElement("select");
    departmentSelect.className = "job-board_filter-select";
    departmentSelect.setAttribute("aria-label", "Filter by department");

    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = "All departments";
    departmentSelect.appendChild(allOption);

    departments.forEach((department) => {
      const option = document.createElement("option");
      option.value = department;
      option.textContent = department;
      departmentSelect.appendChild(option);
    });

    selectWrapper.appendChild(departmentSelect);
    header.appendChild(selectWrapper);

    const listContainer = document.createElement("div");
    listContainer.className = "job-board_list";

    wrapper.appendChild(header);
    wrapper.appendChild(listContainer);
    root.appendChild(wrapper);

    const render = () => {
      const selectedDepartment = departmentSelect.value || null;
      renderJobSections(listContainer, grouped, selectedDepartment);
    };

    departmentSelect.addEventListener("change", render);
    render();
  }

  function getDistinctDepartments(jobs) {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.department)
          .filter((department) => typeof department === "string" && department)
      )
    ).sort((a, b) => a.localeCompare(b));
  }

  function groupJobsByDepartment(jobs) {
    const map = new Map();
    jobs.forEach((job) => {
      const department =
        typeof job.department === "string" && job.department
          ? job.department
          : "Other";
      if (!map.has(department)) {
        map.set(department, []);
      }
      map.get(department).push(job);
    });
    return map;
  }

  function renderJobSections(container, groupedJobs, selectedDepartment) {
    container.textContent = "";

    const departmentNames = Array.from(groupedJobs.keys()).sort((a, b) =>
      a.localeCompare(b)
    );

    let hasRenderedAny = false;

    const groupList = document.createElement("div");
    groupList.className = "career_group-list";

    departmentNames.forEach((department) => {
      if (selectedDepartment && department !== selectedDepartment) return;

      const deptJobs = groupedJobs.get(department);
      if (!deptJobs || !deptJobs.length) return;

      const wrapper = document.createElement("div");
      wrapper.className = "career_list-wrapper";

      const heading = document.createElement("div");
      heading.className = "text-color-greytext";
      heading.textContent = department;
      wrapper.appendChild(heading);

      const dynList = document.createElement("div");
      dynList.className = "w-dyn-list";
      dynList.setAttribute("data-tab", department);

      const list = document.createElement("div");
      list.className = "career_list w-dyn-items";
      list.setAttribute("role", "list");

      deptJobs.forEach((job) => {
        const item = document.createElement("div");
        item.className = "w-dyn-item";
        item.setAttribute("role", "listitem");

        const link = createCareerItem(job);
        if (link) {
          item.appendChild(link);
          list.appendChild(item);
          hasRenderedAny = true;
        }
      });

      dynList.appendChild(list);
      wrapper.appendChild(dynList);
      groupList.appendChild(wrapper);
    });

    if (hasRenderedAny) {
      container.appendChild(groupList);
      return;
    }

    const empty = document.createElement("p");
    empty.className = "job-board_empty";
    empty.textContent = "No roles found for this department.";
    container.appendChild(empty);
  }

  function createCareerItem(job) {
    if (!job || !job.title) return null;

    const url = job.jobUrl || job.applyUrl;
    const link = document.createElement("a");
    link.className = "career_item w-inline-block";
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#";
    }

    const row = document.createElement("div");
    row.className = "career_row";

    const titleWrapper = document.createElement("div");
    titleWrapper.className = "career_title";
    const titleInner = document.createElement("div");
    titleInner.textContent = job.title;
    titleWrapper.appendChild(titleInner);

    const locationWrapper = document.createElement("div");
    locationWrapper.className = "career_location";
    const locationInner = document.createElement("div");
    locationInner.className = "text-color-gray3";
    locationInner.textContent = buildLocationLabel(job);
    locationWrapper.appendChild(locationInner);

    row.appendChild(titleWrapper);
    row.appendChild(locationWrapper);

    const iconWrapper = document.createElement("div");
    iconWrapper.className = "career_icon-wrapper";
    const icon = document.createElement("img");
    icon.width = 20;
    icon.height = 20;
    icon.loading = "lazy";
    icon.alt = "Right caret";
    icon.className = "icon-1x1-xsmall";
    icon.src = CAREER_ICON_SRC;
    iconWrapper.appendChild(icon);

    link.appendChild(row);
    link.appendChild(iconWrapper);

    return link;
  }

  function buildLocationLabel(job) {
    const locations = [];

    const primaryLocation =
      typeof job.location === "string" && job.location ? job.location : "";

    const secondaryLocations = Array.isArray(job.secondaryLocations)
      ? job.secondaryLocations
          .map((loc) =>
            typeof loc?.location === "string" ? loc.location : ""
          )
          .filter(Boolean)
      : [];

    const uniqueLocations = Array.from(
      new Set(
        [primaryLocation, ...secondaryLocations].filter(
          (location) => typeof location === "string" && location
        )
      )
    );

    locations.push(...uniqueLocations);

    const hasSF = locations.some((loc) =>
      /san francisco/i.test(String(loc || ""))
    );
    const hasNYC = locations.some((loc) =>
      /new york/i.test(String(loc || ""))
    );

    let locationLabel = "";

    if (hasSF && hasNYC) {
      locationLabel = "SF or NYC";
    } else if (hasSF) {
      locationLabel = "SF";
    } else if (hasNYC) {
      locationLabel = "NYC";
    } else if (locations.length) {
      locationLabel = locations.join("; ");
    } else {
      locationLabel = "Location flexible";
    }

    const workMode =
      job.isRemote === true
        ? "Hybrid"
        : job.isRemote === false
        ? "On-site"
        : "";

    return workMode ? locationLabel + " • " + workMode : locationLabel;
  }

  function renderEmptyState(container) {
    container.textContent = "";
    const message = document.createElement("p");
    message.className = "job-board_empty";
    message.textContent = "There are currently no open roles.";
    container.appendChild(message);
  }

  function renderErrorState(container) {
    container.textContent = "";
    const message = document.createElement("p");
    message.className = "job-board_error";
    message.textContent =
      "We were unable to load open roles. Please refresh the page to try again.";
    container.appendChild(message);
  }
})(window, document);
