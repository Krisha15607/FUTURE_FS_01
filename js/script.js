// Hide custom cursor on touch devices
const isTouchDevice = () =>
  window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
  "ontouchstart" in window;

const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

if (!isTouchDevice()) {
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  function animateCursor() {
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document
    .querySelectorAll("a, button, .skill-chip, .info-card, .contact-link")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        ring.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
        ring.classList.remove("hover");
      });
    });
} else {
  // Hide cursor elements on mobile
  cursor.style.display = "none";
  ring.style.display = "none";
}

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => revealObserver.observe(el));

// Active nav link highlight for bottom nav (mobile)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link-item");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          const href = link.getAttribute("href");
          if (href === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.35,
    rootMargin: "0px 0px -20% 0px",
  }
);

sections.forEach((sec) => sectionObserver.observe(sec));
