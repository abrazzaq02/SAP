const state = {
  authenticated: false,
  activeSection: "Dashboard",
  student: {
    name: "Abdul Razaque",
    id: "5000000147",
    program: "BSc. Artificial Intelligence",
    semester: "Fall 2026"
  }
};

const dashboardData = {
  nav: [
    { label: "Dashboard", icon: "layout-dashboard", section: "Dashboard" },
    { label: "My Results", icon: "graduation-cap", section: "My Results" },
    { label: "Courses", icon: "book-open", section: "Courses" },
    { label: "Timetable", icon: "calendar-days", section: "Timetable" },
    { label: "Fee Voucher", icon: "receipt", section: "Fee Voucher" },
    { label: "Hostel", icon: "building-2", section: "Hostel" },
    { label: "Transcript", icon: "file-text", section: "Transcript" },
    { label: "Attendance", icon: "clipboard-check", section: "Attendance" },
    { label: "Complaints", icon: "message-square-plus", section: "Complaints" }
  ],
  stats: [
    { label: "Current GPA", value: "3.78", meta: "Top 12% of cohort", tone: "blue", icon: "award" },
    { label: "Registered courses", value: "7", meta: "Fall 2026 semester", tone: "cyan", icon: "book-open" },
    { label: "Attendance", value: "92%", meta: "Above 85% requirement", tone: "green", icon: "clipboard-check" },
    { label: "Upcoming events", value: "4", meta: "Next: Quiz · Tomorrow", tone: "orange", icon: "calendar-clock" }
  ],
  services: [
    { title: "Timetable", description: "View your weekly class schedule", icon: "calendar-days", tone: "blue" },
    { title: "Fee Voucher", description: "Download and pay your dues", icon: "receipt", tone: "purple" },
    { title: "Hostel", description: "Room, mess and hostel services", icon: "building-2", tone: "cyan" },
    { title: "Transcript", description: "View your academic transcript", icon: "file-text", tone: "blue" },
    { title: "Transport", description: "Bus routes and seat booking", icon: "bus", tone: "green" },
    { title: "Exam Card", description: "Download your exam admit card", icon: "id-card", tone: "purple" },
    { title: "Student File", description: "Refunds, scholarships and requests", icon: "folder-open", tone: "cyan" },
    { title: "Course registration", description: "Register for next semester", icon: "sparkles", tone: "blue" }
  ],
  sections: {
    Dashboard: {
      hero: {
        eyebrow: "FALL 2026 · WEEK 7",
        title: "Good morning, Abdul.",
        text: "Here’s what’s happening with your academic journey today.",
        primary: "Register for courses"
      }
    },
    "My Results": {
      eyebrow: "ACADEMIC RECORD",
      title: "My Results",
      text: "Review your latest semester performance and grades.",
      cards: [
        { label: "Fall 2026 GPA", value: "3.78", meta: "Excellent standing" },
        { label: "Completed credits", value: "84", meta: "12 credits in progress" },
        { label: "Latest result", value: "A-", meta: "Artificial Intelligence" }
      ]
    },
    Courses: {
      eyebrow: "COURSE REGISTRATION",
      title: "Register Subjects",
      text: "Choose subjects for your BS Artificial Intelligence degree.",
      list: [
        { name: "Artificial Intelligence", detail: "BS AI · 3 credits · Core subject" },
        { name: "Machine Learning", detail: "BS AI · 3 credits · Core subject" },
        { name: "Data Structures and Algorithms", detail: "BS AI · 3 credits · Core subject" }
      ]
    },
    "Fee Voucher": {
      eyebrow: "PAYMENTS",
      title: "Fee Voucher",
      text: "View your current semester dues and payment status.",
      amount: "PKR 145,000",
      due: "Due date: 30 September 2026"
    },
    Timetable: {
      eyebrow: "WEEKLY SCHEDULE",
      title: "Timetable",
      text: "Your classes for Fall 2026, Week 7.",
      schedule: [
        { time: "09:00", title: "Artificial Intelligence", meta: "Room B-204 · Monday" },
        { time: "11:00", title: "Machine Learning", meta: "Lab 3 · Tuesday" },
        { time: "14:00", title: "Data Structures and Algorithms", meta: "Room A-110 · Wednesday" }
      ]
    },
    Hostel: {
      eyebrow: "CAMPUS LIVING",
      title: "Hostel",
      text: "Room and residence services for your student accommodation.",
      info: "Room A-204",
      meta: "Block A · Semester residence active"
    },
    Transcript: {
      eyebrow: "ACADEMIC DOCUMENTS",
      title: "Transcript",
      text: "Access your official academic record.",
      info: "Official transcript",
      meta: "Updated after Fall 2026 Week 6"
    },
    Attendance: {
      eyebrow: "CLASS PARTICIPATION",
      title: "Attendance",
      text: "Track attendance across your registered subjects.",
      cards: [
        { label: "Overall attendance", value: "92%", meta: "Above 85% requirement" },
        { label: "Best attendance", value: "98%", meta: "Data Structures" },
        { label: "Classes attended", value: "46/50", meta: "Fall 2026" }
      ]
    },
    Settings: {
      eyebrow: "PORTAL PREFERENCES",
      title: "Settings",
      text: "Manage your student portal preferences.",
      info: "Account settings",
      meta: "Language: English · Notifications: Enabled"
    },
    Complaints: {
      eyebrow: "STUDENT SUPPORT",
      title: "Submit a Complaint",
      text: "Send an issue or request to the student support team.",
      form: true
    }
  }
};

const loginForm = document.querySelector("#loginForm");
const userId = document.querySelector("#userId");
const password = document.querySelector("#password");
const submitButton = document.querySelector(".submit-button");
const formStatus = document.querySelector("#formStatus");
const toast = document.querySelector("#toast");
const dashboardSidebar = document.querySelector("#dashboardSidebar");
const dashboardContent = document.querySelector(".dashboard-content");
const notificationPanel = document.querySelector("#notificationPanel");
const profilePanel = document.querySelector("#profilePanel");
let toastTimer;

function showToast(message) {
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
}

function setError(input, errorId, message) {
  const error = document.querySelector(`#${errorId}`);
  input.closest(".field-group").querySelector(".input-wrap").classList.toggle("has-error", Boolean(message));
  error.textContent = message;
}

function validateForm() {
  setError(userId, "userIdError", "");
  setError(password, "passwordError", "");
  return true;
}

function updateDashboardNavigation() {
  const nav = document.querySelector(".dashboard-nav");
  nav.innerHTML = dashboardData.nav
    .map((item) => `
      <button class="dashboard-nav__item ${item.section === state.activeSection ? "is-active" : ""}" data-section="${item.section}">
        <i data-lucide="${item.icon}"></i>
        <span>${item.label}</span>
      </button>
    `)
    .join("");

  const footerButtons = [
    `<button class="dashboard-nav__item" data-section="Settings"><i data-lucide="settings"></i><span>Settings</span></button>`,
    `<button class="dashboard-nav__item" data-action="logout"><i data-lucide="log-out"></i><span>Log out</span></button>`
  ];

  const footer = document.querySelector(".dashboard-sidebar__footer");
  footer.innerHTML = `${footerButtons.join("")}
    <button class="dashboard-collapse" id="dashboardCollapse"><i data-lucide="panel-left-close"></i><span>Collapse menu</span></button>`;

  attachDashboardNavigation();
  attachSidebarActions();
  lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function renderMainDashboard() {
  const sectionData = dashboardData.sections[state.activeSection] || dashboardData.sections.Dashboard;
  const serviceTiles = dashboardData.services
    .map((service) => `
      <button class="service-tile" data-service="${service.title}">
        <span class="service-tile__icon ${service.tone}"><i data-lucide="${service.icon}"></i></span>
        <b>${service.title}</b>
        <small>${service.description}</small>
        <i data-lucide="arrow-up-right"></i>
      </button>
    `)
    .join("");

  const statsMarkup = dashboardData.stats
    .map((stat) => `
      <article>
        <div class="dashboard-stat-icon ${stat.tone}"><i data-lucide="${stat.icon}"></i></div>
        <p>${stat.label}</p>
        <strong>${stat.value}</strong>
        <small>${stat.meta}</small>
      </article>
    `)
    .join("");

  const detailMarkup = sectionData.cards ? sectionData.cards
    .map((item) => `
      <article>
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        <small>${item.meta}</small>
      </article>
    `)
    .join("") : "";

  const listMarkup = sectionData.list ? sectionData.list
    .map((item) => `
      <button class="subject-row">
        <span><b>${item.name}</b><small>${item.detail}</small></span>
        <strong>Register</strong>
      </button>
    `)
    .join("") : "";

  const scheduleMarkup = sectionData.schedule ? sectionData.schedule
    .map((item) => `
      <div>
        <b>${item.time}</b>
        <span>${item.title} <small>${item.meta}</small></span>
      </div>
    `)
    .join("") : "";

  const contentView = state.activeSection === "Dashboard"
    ? `
      <div class="dashboard-hero">
        <div>
          <p class="dashboard-eyebrow">${sectionData.hero.eyebrow}</p>
          <h1>${sectionData.hero.title}</h1>
          <p>${sectionData.hero.text}</p>
        </div>
        <button class="dashboard-primary" data-action="register"><i data-lucide="sparkles"></i> ${sectionData.hero.primary}</button>
      </div>
      <div class="dashboard-stats">${statsMarkup}</div>
      <div class="dashboard-section-heading">
        <div>
          <p class="dashboard-eyebrow">YOUR TOOLS</p>
          <h2>Student services</h2>
        </div>
        <span id="serviceCount">${dashboardData.services.length} services</span>
      </div>
      <div class="service-grid" id="serviceGrid">${serviceTiles}</div>
    `
    : `
      <div class="dashboard-view is-visible" data-view="${state.activeSection}">
        <div class="dashboard-page-heading">
          <p class="dashboard-eyebrow">${sectionData.eyebrow}</p>
          <h1>${sectionData.title}</h1>
          <p>${sectionData.text}</p>
        </div>
        ${sectionData.cards ? `<div class="dashboard-detail-grid">${detailMarkup}</div>` : ""}
        ${sectionData.list ? `<div class="subject-list">${listMarkup}</div>` : ""}
        ${sectionData.amount ? `
          <div class="voucher-panel">
            <div>
              <span>Fall 2026 semester voucher</span>
              <strong>${sectionData.amount}</strong>
              <small>${sectionData.due}</small>
            </div>
            <button class="dashboard-primary"><i data-lucide="download"></i> Download voucher</button>
          </div>
        ` : ""}
        ${sectionData.schedule ? `<div class="schedule-list">${scheduleMarkup}</div>` : ""}
        ${sectionData.info ? `
          <div class="single-detail">
            <i data-lucide="${state.activeSection === "Hostel" ? "building-2" : state.activeSection === "Transcript" ? "file-text" : state.activeSection === "Settings" ? "settings" : "file-text"}"></i>
            <strong>${sectionData.info}</strong>
            <span>${sectionData.meta}</span>
          </div>
        ` : ""}
        ${sectionData.form ? `
          <div class="complaint-panel">
            <label>Subject<input type="text" placeholder="Enter complaint subject" /></label>
            <label>Details<textarea rows="4" placeholder="Describe your issue"></textarea></label>
            <button class="dashboard-primary"><i data-lucide="send"></i> Submit complaint</button>
          </div>
        ` : ""}
      </div>
    `;

  dashboardContent.innerHTML = contentView;
  const serviceCount = document.querySelector("#serviceCount");
  if (serviceCount) serviceCount.textContent = `${dashboardData.services.length} services`;

  attachServiceTiles();
  attachDashboardActions();
  lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function attachDashboardNavigation() {
  document.querySelectorAll(".dashboard-nav__item[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const { section } = button.dataset;
      state.activeSection = section;
      updateDashboardNavigation();
      renderMainDashboard();
      dashboardSidebar.classList.remove("is-mobile-open");
      showToast(`${section} opened.`);
    });
  });
}

function attachSidebarActions() {
  const collapseButton = document.querySelector("#dashboardCollapse");
  if (collapseButton) {
    collapseButton.addEventListener("click", () => {
      dashboardSidebar.classList.toggle("is-collapsed");
    });
  }

  document.querySelectorAll("[data-action='logout']").forEach((button) => {
    button.addEventListener("click", () => {
      showLogin();
      showToast("Logged out successfully.");
    });
  });
}

function attachServiceTiles() {
  document.querySelectorAll(".service-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      const serviceName = tile.dataset.service;
      const sectionMap = {
        Timetable: "Timetable",
        "Fee Voucher": "Fee Voucher",
        Hostel: "Hostel",
        Transcript: "Transcript",
        Transport: "Hostel",
        "Exam Card": "Transcript",
        "Student File": "Settings",
        "Course registration": "Courses"
      };

      const target = sectionMap[serviceName] || "Dashboard";
      state.activeSection = target;
      updateDashboardNavigation();
      renderMainDashboard();
      showToast(`${serviceName} opened.`);
    });
  });

  document.querySelectorAll("[data-action='register']").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeSection = "Courses";
      updateDashboardNavigation();
      renderMainDashboard();
      showToast("Course registration is open for Fall 2026.");
    });
  });
}

function attachDashboardActions() {
  const profileButton = document.querySelector("#profileButton");
  const notificationButton = document.querySelector("#notificationButton");

  if (profileButton) {
    profileButton.addEventListener("click", (event) => {
      event.stopPropagation();
      profilePanel.classList.toggle("is-open");
      notificationPanel.classList.remove("is-open");
    });
  }

  if (notificationButton) {
    notificationButton.addEventListener("click", (event) => {
      event.stopPropagation();
      notificationPanel.classList.toggle("is-open");
      profilePanel.classList.remove("is-open");
    });
  }

  document.querySelectorAll(".dashboard-dropdown [data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const { action } = button.dataset;
      if (action === "logout") {
        showLogin();
        showToast("Logged out successfully.");
        return;
      }
      closeDashboardDropdowns();
      showToast(action === "profile" ? "My profile selected." : `${action} selected.`);
    });
  });

  const search = document.querySelector("#serviceSearch");
  if (search) {
    search.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      let visibleCount = 0;
      document.querySelectorAll(".service-tile").forEach((service) => {
        const matches = service.textContent.toLowerCase().includes(query);
        service.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      const serviceCount = document.querySelector("#serviceCount");
      if (serviceCount) serviceCount.textContent = `${visibleCount} service${visibleCount === 1 ? "" : "s"}`;
    });
  }

  document.querySelector("#dashboardMenu")?.addEventListener("click", () => {
    dashboardSidebar.classList.toggle("is-mobile-open");
  });
}

function closeDashboardDropdowns() {
  document.querySelectorAll(".dashboard-dropdown.is-open").forEach((panel) => panel.classList.remove("is-open"));
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".dashboard-dropdown-wrap")) closeDashboardDropdowns();
});

function showDashboard() {
  const loginShell = document.querySelector(".login-shell");
  const dashboardShell = document.querySelector("#dashboardShell");

  loginShell.hidden = true;
  loginShell.style.display = "none";
  dashboardShell.hidden = false;
  dashboardShell.style.display = "block";
  document.body.classList.add("dashboard-active");
  document.body.classList.remove("login-active");
  document.body.style.overflow = "hidden";
  document.title = "SAP Student Portal | Dashboard";
  state.authenticated = true;
  localStorage.setItem("sapPortalAuth", "true");
  updateDashboardNavigation();
  renderMainDashboard();
  lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function showLogin() {
  const loginShell = document.querySelector(".login-shell");
  const dashboardShell = document.querySelector("#dashboardShell");

  dashboardShell.hidden = true;
  dashboardShell.style.display = "none";
  loginShell.hidden = false;
  loginShell.style.display = "grid";
  document.body.classList.remove("dashboard-active");
  document.body.classList.add("login-active");
  document.body.style.overflow = "auto";
  document.title = "SAP Student Portal | Sign in";
  state.authenticated = false;
  localStorage.removeItem("sapPortalAuth");
  loginForm.reset();
  formStatus.textContent = "";
  document.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
  document.querySelectorAll(".input-wrap").forEach((input) => input.classList.remove("has-error"));
  window.scrollTo(0, 0);
}

function initializeAuthState() {
  const savedAuth = localStorage.getItem("sapPortalAuth");
  if (savedAuth === "true") {
    showDashboard();
    return;
  }
  showLogin();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  if (!validateForm()) {
    showToast("Please check the highlighted fields.");
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Signing in...";
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Sign in";
    showDashboard();
    showToast("Signed in successfully.");
  }, 700);
});

[userId, password].forEach((input) => {
  input.addEventListener("input", () => {
    if (input === userId && userId.value.trim()) setError(userId, "userIdError", "");
    if (input === password && password.value) setError(password, "passwordError", "");
  });
});

document.querySelector('[data-action="toggle-password"]').addEventListener("click", (event) => {
  const button = event.currentTarget;
  const icon = button.querySelector("svg");
  const visible = password.type === "text";
  password.type = visible ? "password" : "text";
  button.setAttribute("aria-label", visible ? "Show password" : "Hide password");
  button.setAttribute("title", visible ? "Show password" : "Hide password");
  icon.setAttribute("data-lucide", visible ? "eye" : "eye-off");
  lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const actions = {
      forgot: "Password recovery instructions would be sent to your registered email.",
      "change-password": "Password change is available after identity verification.",
      support: "Portal support is ready to help with your sign-in.",
      help: "Use your student ID and portal password to sign in."
    };
    const { action } = button.dataset;
    if (action !== "toggle-password" && actions[action]) showToast(actions[action]);
  });
});

document.querySelector("#languageSelect").addEventListener("change", (event) => {
  const language = event.target.options[event.target.selectedIndex].text;
  showToast(`Language set to ${language}.`);
});

initializeAuthState();
lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
