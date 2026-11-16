const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

// Restore the visitor's chosen theme when the browser allows local storage.
try {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
} catch {
  // The site still works if storage is unavailable.
}

function updateThemeLabel() {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeButton.title = `Switch to ${nextTheme} theme`;
}

themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  updateThemeLabel();
  try {
    localStorage.setItem("portfolio-theme", root.dataset.theme);
  } catch {
    // Ignore storage errors; the selected theme remains active for this page.
  }
});
updateThemeLabel();

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  nav.classList.toggle("is-open", !isOpen);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Reveal sections as they enter view, while keeping content visible without JS.
const revealTargets = document.querySelectorAll(".section-heading, .about-body, .journey-card, .contact-card");
if ("IntersectionObserver" in window) {
  document.body.classList.add("js-ready");
  revealTargets.forEach((target) => target.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => observer.observe(target));
}
