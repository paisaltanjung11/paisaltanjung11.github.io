"use strict";

/**
 * Page Loader
 */
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  setTimeout(() => {
    loader.classList.add("loaded");
  }, 1000);
});

/**
 * Utility function to toggle class "active"
 */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/** Sidebar toggle functionality for mobile */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

/** Testimonials modal functionality */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Open/close modal
const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to each testimonial item
for (const item of testimonialsItem) {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = item.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;
    toggleModal();
  });
}

modalCloseBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

/** Custom select functionality */
const selects = document.querySelectorAll("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValues = document.querySelectorAll("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle select dropdown for all select elements
selects.forEach((select) => {
  select.addEventListener("click", () => elementToggleFunc(select));
});

// Handle select item click
for (const item of selectItems) {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    // Find the closest select element and its associated value element
    const parentSelectBox = item.closest(".filter-select-box");
    const select = parentSelectBox.querySelector("[data-select]");
    const selectValue = parentSelectBox.querySelector("[data-selecct-value]");

    selectValue.innerText = item.innerText;
    elementToggleFunc(select);

    // Find the items in the same section
    const section = parentSelectBox.closest("section");
    const filterItems = section.querySelectorAll("[data-filter-item]");

    // Apply filtering within this section
    for (const filterItem of filterItems) {
      if (
        selectedValue === "all" ||
        selectedValue === filterItem.dataset.category
      ) {
        filterItem.classList.add("active");
      } else {
        filterItem.classList.remove("active");
      }
    }
  });
}

/** Filter functionality */
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
  for (const item of filterItems) {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
};

// Handle filter button click for all filter buttons
document.querySelectorAll("[data-filter-btn]").forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();

    // Find the closest section
    const section = this.closest("section");
    const selectValue = section.querySelector("[data-selecct-value]");
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }

    // Find all filter items in this section
    const filterItems = section.querySelectorAll("[data-filter-item]");

    // Apply filtering only to items in this section
    for (const item of filterItems) {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }

    // Update active state for buttons in this section
    const filterButtons = section.querySelectorAll("[data-filter-btn]");
    filterButtons.forEach((button) => button.classList.remove("active"));
    this.classList.add("active");
  });
});

/** Contact form validation */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Enable/disable submit button based on form validity
for (const input of formInputs) {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
}

/** Page navigation */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Handle navigation link click
for (const navLink of navigationLinks) {
  navLink.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (targetPage === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);

        // Reset filter to "All" when switching pages
        const filterButtons = pages[i].querySelectorAll("[data-filter-btn]");
        const filterItems = pages[i].querySelectorAll("[data-filter-item]");
        if (filterButtons.length > 0 && filterItems.length > 0) {
          // Activate the "All" button
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          filterButtons[0].classList.add("active");

          // Show all filter items
          filterItems.forEach((item) => item.classList.add("active"));
        }
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

/** Scroll to top button */
const scrollTopBtn = document.querySelector(".scroll-top-btn");

// Show/hide scroll-to-top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add animation to skill bars when they come into view
const animateSkillBars = () => {
  const skillSection = document.querySelector(".skills");
  if (!skillSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll(
            ".skill-progress-fill"
          );
          skillBars.forEach((bar) => {
            const width = bar.style.width;
            bar.style.setProperty("--width", width);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillSection);
};

// Call the function when the resume page is active
document
  .querySelector("[data-nav-link]:nth-child(2)")
  .addEventListener("click", () => {
    setTimeout(animateSkillBars, 300);
  });

// Initialize skill bars animation if resume is the default page
if (document.querySelector(".resume.active")) {
  setTimeout(animateSkillBars, 300);
}
