
document.addEventListener("DOMContentLoaded", function () {

  // 1. DARK / LIGHT MODE
  const themeButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");

  function applyTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);

    themeIcon.textContent = isLight ? "🌙" : "☀️";
    themeLabel.textContent = isLight ? "Dark Mode" : "Light Mode";

    themeButton.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    try {
      localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
      );
    } catch (error) {
      console.log("Theme storage unavailable");
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  } catch (error) {
    savedTheme = "dark";
  }

  if (themeButton && themeIcon && themeLabel) {
    applyTheme(savedTheme === "light");

    themeButton.addEventListener("click", function () {
      const isLight = document.body.classList.contains("light-mode");
      applyTheme(!isLight);
    });
  }

  // 2. MOBILE NAVIGATION
  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("primary-nav");

  function closeMenu() {
    if (!menuButton || !navLinks) return;

    menuButton.classList.remove("active");
    navLinks.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("active");

      menuButton.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
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
      if (event.key === "Escape") closeMenu();
    });
  }

  // 3. ACTIVE NAVIGATION
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  function updateActiveLink() {
    let current = "home";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 180) {
        current = section.id;
      }
    });

    links.forEach(link => {
      const active = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active-link", active);
    });
  }

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });
  updateActiveLink();

  // 4. SCROLL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("show"));
  }

  // 5. CONTACT FORM VALIDATION
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const messageError = document.getElementById("message-error");
      const status = document.getElementById("form-status");

      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      status.textContent = "";

      let valid = true;

      if (name.length < 2) {
        nameError.textContent =
          "Please enter at least 2 characters.";
        valid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        emailError.textContent =
          "Please enter a valid email address.";
        valid = false;
      }

      if (message.length < 10) {
        messageError.textContent =
          "Message must contain at least 10 characters.";
        valid = false;
      }

      if (!valid) {
        status.textContent =
          "Please correct the errors before submitting.";
        return;
      }

      const subject = encodeURIComponent(
        "Portfolio Contact from " + name
      );

      const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
      );

      status.textContent =
        "Form validated! Opening your email app. " +
        "Please press Send to complete your message.";

      window.location.href =
        "mailto:ashuadmission112@gmail.com" +
        "?subject=" + subject +
        "&body=" + body;
    });
  }

  // 6. PREVENT PLACEHOLDER PROJECT LINKS
  document.querySelectorAll(
    '[data-placeholder="true"]'
  ).forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Add your actual GitHub repository URL first.");
    });
  });

  console.log("Codomax Module 4 Portfolio Loaded!");
});
