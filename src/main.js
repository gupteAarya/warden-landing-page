const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.ag.warden";

const DISCORD_URL = "https://discord.gg/eW3CFQbnK";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Mobile nav */
const toggle = document.querySelector(".nav__toggle");
const drawer = document.getElementById("nav-drawer");
const backdrop = document.querySelector(".nav-backdrop");

function setNavOpen(isOpen) {
  if (!drawer || !toggle) return;

  drawer.hidden = !isOpen;
  if (backdrop) backdrop.hidden = !isOpen;
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  document.body.classList.toggle("nav-open", isOpen);
}

function closeNav() {
  setNavOpen(false);
}

toggle?.addEventListener("click", () => {
  setNavOpen(drawer.hidden);
});

backdrop?.addEventListener("click", closeNav);

drawer?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && drawer && !drawer.hidden) closeNav();
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 900px)").matches) closeNav();
});

/* Scroll reveal */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* Emergency countdown */
const DEMO_SEC = 12;
const timeEl = document.getElementById("emergency-time");
const barEl = document.getElementById("emergency-bar");
const btnEl = document.getElementById("emergency-btn");

let emergencyTimer = null;
let remaining = DEMO_SEC;

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTime(sec) {
  return `${pad(Math.floor(sec / 60))}:${pad(sec % 60)}`;
}

function runEmergencyCountdown() {
  if (!timeEl || !barEl || !btnEl) return;

  clearInterval(emergencyTimer);
  remaining = DEMO_SEC;
  btnEl.disabled = true;
  btnEl.classList.remove("is-ready");
  btnEl.textContent = "Confirm (locked)";
  barEl.style.width = "0%";
  timeEl.textContent = formatTime(remaining);

  emergencyTimer = setInterval(() => {
    remaining -= 1;
    const progress = ((DEMO_SEC - remaining) / DEMO_SEC) * 100;
    barEl.style.width = `${progress}%`;
    timeEl.textContent = formatTime(Math.max(remaining, 0));

    if (remaining <= 0) {
      clearInterval(emergencyTimer);
      btnEl.disabled = false;
      btnEl.classList.add("is-ready");
      btnEl.textContent = "Confirm";
    }
  }, 1000);
}

btnEl?.addEventListener("click", () => {
  if (!btnEl.disabled && btnEl.classList.contains("is-ready")) {
    btnEl.textContent = "DORMANT — 5 min";
    btnEl.disabled = true;
    btnEl.classList.remove("is-ready");
    setTimeout(runEmergencyCountdown, 2000);
  }
});

if (timeEl) runEmergencyCountdown();

/* Object pills */
const scanTag = document.getElementById("scan-tag");
const labels = {
  coffee: "SCANNING: COFFEE MAKER · 92%",
  shoe: "SCANNING: RUNNING SHOE · 88%",
  brush: "SCANNING: TOOTHBRUSH · 91%",
  journal: "SCANNING: JOURNAL · 85%",
};

const objectIcons = {
  coffee: "☕",
  shoe: "👟",
  brush: "🪥",
  journal: "📓",
};

const scanIconEl = document.querySelector(".scan-object-icon");

document.querySelectorAll(".object-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".object-pill").forEach((p) => p.classList.remove("is-active"));
    pill.classList.add("is-active");
    const key = pill.dataset.object;
    if (scanTag && labels[key]) scanTag.textContent = labels[key];
    if (scanIconEl && objectIcons[key]) scanIconEl.textContent = objectIcons[key];
  });
});

void PLAY_STORE;
void DISCORD_URL;
