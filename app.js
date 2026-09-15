const loginForm = document.querySelector("#loginForm");
const userId = document.querySelector("#userId");
const password = document.querySelector("#password");
const submitButton = document.querySelector(".submit-button");
const formStatus = document.querySelector("#formStatus");
const toast = document.querySelector("#toast");
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

function showDashboard() {
  document.querySelector(".login-shell").hidden = true;
  document.querySelector("#dashboardShell").hidden = false;
  document.title = "SAP Student Portal | Dashboard";
  window.scrollTo({ top: 0, behavior: "smooth" });
  lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function showLogin() {
  document.querySelector("#dashboardShell").hidden = true;
  document.querySelector(".login-shell").hidden = false;
  document.title = "SAP Student Portal | Sign in";
  loginForm.reset();
  formStatus.textContent = "";
  document.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
  document.querySelectorAll(".input-wrap").forEach((input) => input.classList.remove("has-error"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeDashboardDropdowns() {
  document.querySelectorAll(".dashboard-dropdown.is-open").forEach((panel) => panel.classList.remove("is-open"));
}

document.querySelector("#dashboardMenu").addEventListener("click", () => {
  document.querySelector("#dashboardSidebar").classList.toggle("is-mobile-open");
});

document.querySelector("#dashboardCollapse").addEventListener("click", () => {
  document.querySelector("#dashboardSidebar").classList.toggle("is-collapsed");
});

document.querySelectorAll(".dashboard-nav__item[data-section]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".dashboard-nav__item").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    document.querySelectorAll(".dashboard-nav__item[data-section]").forEach((item) => item.removeAttribute("aria-current"));
    button.setAttribute("aria-current", "page");
    document.querySelector("#dashboardSidebar").classList.remove("is-mobile-open");

    const { section } = button.dataset;
    document.querySelector(".dashboard-content").classList.toggle("has-section-view", section !== "Dashboard");
    document.querySelectorAll(".dashboard-view").forEach((view) => {
      view.classList.toggle("is-visible", view.dataset.view === section);
    });
    document.querySelector(".dashboard-content").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`${section} opened.`);
  });
});

document.querySelector("#notificationButton").addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector("#notificationPanel").classList.toggle("is-open");
  document.querySelector("#profilePanel").classList.remove("is-open");
});

document.querySelector("#profileButton").addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector("#profilePanel").classList.toggle("is-open");
  document.querySelector("#notificationPanel").classList.remove("is-open");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".dashboard-dropdown-wrap")) closeDashboardDropdowns();
});

document.querySelectorAll(".service-tile").forEach((service) => {
  service.addEventListener("click", () => showToast(`${service.dataset.service} opened.`));
});

document.querySelector("[data-action=register]").addEventListener("click", () => showToast("Course registration is open for Fall 2026."));
document.querySelectorAll(".dashboard-dropdown [data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const { action } = button.dataset;
    closeDashboardDropdowns();
    if (action === "logout") showLogin();
    else showToast(`${action === "profile" ? "My profile" : action} selected.`);
  });
});

document.querySelectorAll(".dashboard-nav__item[data-action=logout]").forEach((button) => button.addEventListener("click", showLogin));

document.querySelector("#serviceSearch").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  let visibleCount = 0;
  document.querySelectorAll(".service-tile").forEach((service) => {
    const matches = service.textContent.toLowerCase().includes(query);
    service.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  document.querySelector("#serviceCount").textContent = `${visibleCount} service${visibleCount === 1 ? "" : "s"}`;
});

lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
