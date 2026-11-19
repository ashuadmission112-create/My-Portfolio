
document.addEventListener("DOMContentLoaded", () => {

  // 1. Mobile Hamburger Menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Active Navigation Links
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - 180) {
        currentSection = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.toggle(
        "active-link",
        link.getAttribute("href") === "#" + currentSection
      );
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // 3. Scroll Reveal Animation
  const revealElements = document.querySelectorAll(
    ".about-card, .skill-card, .contact-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
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
      element.classList.add("reveal");
      observer.observe(element);
    });
  }

  // 4. Close Menu When Clicking Outside
  document.addEventListener("click", event => {
    if (
      menuToggle &&
      navLinks &&
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  console.log("Portfolio JavaScript Loaded Successfully!");

});
