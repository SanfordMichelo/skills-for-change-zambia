// script.js

// 1️⃣ Initialize AOS for fade-in animations
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000, // animation duration in ms
    once: true,     // animate only once on scroll
  });
});

// 2️⃣ Smooth scroll for internal links (navbar, buttons, etc.)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// 3️⃣ Navbar active link switching on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70; // navbar height offset
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// 4️⃣ Optional: stagger animation for program cards
const programCards = document.querySelectorAll("#programs .col-md-4");
programCards.forEach((card, index) => {
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", index * 150); // 150ms delay between cards
});

// 5️⃣ Optional: animate hero text on load
const heroText = document.querySelector(".hero-content");
if (heroText) {
  heroText.setAttribute("data-aos", "fade-up");
  heroText.setAttribute("data-aos-duration", "1200");
}

// ============================
// Smooth scroll on page load if there's a hash
// Handles slower scroll when coming from another page
// ============================
window.addEventListener("load", () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  // Check if coming from another page
  const isExternal = document.referrer && !document.referrer.includes(window.location.hostname);
  const start = window.scrollY;
  const end = target.offsetTop;
  const distance = end - start;

  if (isExternal) {
    // Slow, smooth scroll from other page
    const duration = Math.min(Math.max(Math.abs(distance) * 0.7, 400), 1200); // 400-1200ms
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      // ease-in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, start + distance * eased);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  } else {
    // Normal in-page reload or refresh
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }
});

/* Donation Javascript */
const methods = document.querySelectorAll(".method");
const details = document.getElementById("details");

// Payment info (bank & mobile money)
const paymentInfo = {

  bank: `
    <div class="details-box bank-details">
      <h4><i class="bi bi-bank"></i> Bank Transfer</h4>
      <p class="sub">Use the details below to complete your transfer</p>

      <div class="info-row">
        <span>Account Name</span>
        <strong>Skills for Change Zambia Limited</strong>
      </div>

      <div class="info-row">
        <span>USD Account</span>
        <strong>N/A</strong>
      </div>

      <div class="info-row highlight">
        <span>ZMW Account</span>
        <strong>0496479040013</strong>
      </div>

      <div class="info-row">
        <span>Branch</span>
        <strong>Acacia Branch</strong>
      </div>

      <div class="info-row">
        <span>Sort Code</span>
        <strong>350003</strong>
      </div>

      <div class="info-row">
        <span>SWIFT Code</span>
        <strong>AZAMZMLU</strong>
      </div>

      <div class="info-row">
        <span>Intermediary Bank</span>
        <strong>CITI BANK N.A (USA)</strong>
      </div>

      <div class="info-row">
        <span>Intermediary SWIFT</span>
        <strong>CITIUS33</strong>
      </div>
    </div>
  `,

  airtel: `
    <div class="details-box airtel-details">
      <h4><i class="fas fa-mobile-alt"></i> Airtel Money</h4>
      <p class="sub">Send your donation via Airtel Money</p>

      <div class="info-row">
        <span>Recipient</span>
        <strong>Loyd Simunchembu</strong>
      </div>

      <div class="info-row highlight airtel-highlight">
        <span>Mobile Number</span>
        <strong>+260 97 736 4174</strong>
      </div>
    </div>
  `,

  mtn: `
    <div class="details-box mtn-details">
      <h4><i class="fas fa-mobile-alt"></i> MTN Money</h4>
      <p class="sub">Send your donation via MTN Money</p>

      <div class="info-row">
        <span>Recipient</span>
        <strong>Loyd Simunchembu</strong>
      </div>

      <div class="info-row highlight mtn-highlight">
        <span>Mobile Number</span>
        <strong>+260 96 372 5062</strong>
      </div>
    </div>
  `
};
// Click handler
methods.forEach(method => {
  method.addEventListener("click", () => {

    // Remove active from all
    methods.forEach(m => m.classList.remove("active"));

    // Add active to clicked method
    method.classList.add("active");

    // Show payment details
    const selected = method.getAttribute("data-method");
    details.innerHTML = paymentInfo[selected];

    // 🔥 SCROLL FIX (THIS IS WHAT WAS MISSING)
    setTimeout(() => {
      const yOffset = -80; // adjust if navbar height is different
      const y = details.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }, 100); // small delay ensures content is rendered first

  });
});