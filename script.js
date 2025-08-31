(function() {
  "use strict";

  /**
   * Lightweight configuration to personalize links without editing HTML
   */
  const PROFILE = {
    fullName: "Alaa Ashraf",
    socials: {
      github: "#", // e.g., https://github.com/your-username
      linkedin: "#", // e.g., https://www.linkedin.com/in/your-username/
      email: "hello@example.com", // your Gmail address
      whatsapp: "" // digits only, e.g., 201234567890 for Egypt
    }
  };

  /**
   * Initialize mobile navigation toggle
   */
  function initializeMobileNavigation() {
    const navToggleButton = document.getElementById("navToggle");
    const navList = document.getElementById("navList");
    if (!navToggleButton || !navList) return;

    navToggleButton.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      navToggleButton.setAttribute("aria-expanded", String(isOpen));
      navToggleButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("open");
        navToggleButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /**
   * Initialize scroll reveal for elements with .reveal
   */
  function initializeScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * Initialize project tabs
   */
  function initializeTabs() {
    const uxTab = document.getElementById("uxTab");
    const uiTab = document.getElementById("uiTab");
    const uxPanel = document.getElementById("uxPanel");
    const uiPanel = document.getElementById("uiPanel");
    if (!uxTab || !uiTab || !uxPanel || !uiPanel) return;

    function activate(tab) {
      const isUx = tab === uxTab;
      uxTab.classList.toggle("is-active", isUx);
      uiTab.classList.toggle("is-active", !isUx);
      uxTab.setAttribute("aria-selected", String(isUx));
      uiTab.setAttribute("aria-selected", String(!isUx));
      uxPanel.classList.toggle("is-hidden", !isUx);
      uiPanel.classList.toggle("is-hidden", isUx);
    }

    uxTab.addEventListener("click", () => activate(uxTab));
    uiTab.addEventListener("click", () => activate(uiTab));
  }

  /**
   * Apply social links from PROFILE to anchors with data-social
   */
  function applySocialLinks() {
    const githubLink = document.querySelectorAll('[data-social="github"]');
    const linkedinLink = document.querySelectorAll('[data-social="linkedin"]');
    const emailLink = document.querySelectorAll('[data-social="email"]');
    const whatsappLink = document.querySelectorAll('[data-social="whatsapp"]');

    if (PROFILE.socials.github && PROFILE.socials.github !== "#") {
      githubLink.forEach(a => a.setAttribute("href", PROFILE.socials.github));
    }
    if (PROFILE.socials.linkedin && PROFILE.socials.linkedin !== "#") {
      linkedinLink.forEach(a => a.setAttribute("href", PROFILE.socials.linkedin));
    }
    if (PROFILE.socials.email && PROFILE.socials.email.includes("@")) {
      emailLink.forEach(a => a.setAttribute("href", `mailto:${PROFILE.socials.email}`));
    }
    if (PROFILE.socials.whatsapp && /^\d+$/.test(PROFILE.socials.whatsapp)) {
      whatsappLink.forEach(a => a.setAttribute("href", `https://wa.me/${PROFILE.socials.whatsapp}`));
    }
  }

  /**
   * Set dynamic year in footer
   */
  function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", () => {
    initializeMobileNavigation();
    initializeScrollReveal();
    initializeTabs();
    applySocialLinks();
    setYear();
  });
})(); 