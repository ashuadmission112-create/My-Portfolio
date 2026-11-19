
document.addEventListener("DOMContentLoaded", function () {

  /* ==================================
     1. DARK / LIGHT MODE
  ================================== */

  const themeButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");

  function applyTheme(isLight) {

    document.body.classList.toggle("light-mode", isLight);

    if (themeIcon) {
      themeIcon.textContent = isLight ? "🌙" : "☀️";
    }

    if (themeLabel) {
      themeLabel.textContent = isLight
        ? "Dark Mode"
        : "Light Mode";
    }

    if (themeButton) {
      themeButton.setAttribute(
        "aria-label",
        isLight
          ? "Switch to dark mode"
          : "Switch to light mode"
      );
    }

    try {
      localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
      );
    } catch (error) {
      console.log("Theme storage unavailable.");
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  } catch (error) {
    savedTheme = "dark";
  }

  if (themeButton) {

    applyTheme(savedTheme === "light");

    themeButton.addEventListener("click", function () {

      const isLight = document.body.classList.contains(
        "light-mode"
      );

      applyTheme(!isLight);

    });

  }


  /* ==================================
     2. MOBILE NAVIGATION MENU
  ================================== */

  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("primary-nav");

  function closeMenu() {

    if (!menuButton || !navLinks) return;

    menuButton.classList.remove("active");
    navLinks.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

  if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {

      const isOpen = navLinks.classList.toggle("active");

      menuButton.classList.toggle("active", isOpen);

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", function (event) {

      if (
        !menuButton.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        closeMenu();
      }

    });

    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

  }


  /* ==================================
     3. ACTIVE NAVIGATION LINKS
  ================================== */

  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  function updateActiveLink() {

    let currentSection = "home";

    sections.forEach(section => {

      if (window.scrollY >= section.offsetTop - 180) {
        currentSection = section.id;
      }

    });

    links.forEach(link => {

      const isActive =
        link.getAttribute("href") === "#" + currentSection;

      link.classList.toggle("active-link", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }

    });

  }

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });

  updateActiveLink();


  /* ==================================
     4. SCROLL REVEAL ANIMATIONS
  ================================== */

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {

    const observer = new IntersectionObserver(function (entries) {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");
          observer.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.1
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("show");
    });

  }


  /* ==================================
     5. CONTACT FORM VALIDATION
  ================================== */

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const messageError = document.getElementById("message-error");
      const formStatus = document.getElementById("form-status");

      // Clear old errors
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formStatus.textContent = "";

      let isValid = true;

      // Validate Name
      if (name.length < 2) {

        nameError.textContent =
          "Please enter at least 2 characters.";

        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {

        emailError.textContent =
          "Please enter a valid email address.";

        isValid = false;
      }

      // Validate Message
      if (message.length < 10) {

        messageError.textContent =
          "Message must contain at least 10 characters.";

        isValid = false;
      }

      // Stop if invalid
      if (!isValid) {

        formStatus.textContent =
          "Please correct the errors before submitting.";

        return;
      }

      /* ==================================
         6. OPEN EMAIL APPLICATION
      ================================== */

      const subject = encodeURIComponent(
        "Portfolio Contact from " + name
      );

      const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
      );

      const mailLink =
        "mailto:ashuadmission112@gmail.com" +
        "?subject=" + subject +
        "&body=" + body;

      formStatus.textContent =
        "Form validated successfully! " +
        "Your email application will open. " +
        "Please press Send to complete your message.";

      window.location.href = mailLink;

    });

  }


  /* ==================================
     7. JAVASCRIPT LOADED
  ================================== */

  console.log(
    "Ashutosh Portfolio - Module 3 JavaScript Loaded!"
  );

});
