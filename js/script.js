"use strict";

const adjustRoleTitleSize = () => {
  const roleTitle = document.querySelector(".info-content .title");
  if (!roleTitle) return;

  const text = roleTitle.textContent.trim();
  const textLength = text.length;

  const baseLength = 19;
  const maxLength = 35;

  let fontSize;
  let paddingVertical, paddingHorizontal;

  if (textLength <= baseLength) {
    fontSize = "var(--fs-6)";
    paddingVertical = "0.5rem";
    paddingHorizontal = "1rem";
  } else if (textLength <= maxLength) {
    const ratio = (maxLength - textLength) / (maxLength - baseLength);
    const fs6Size = 1.125;
    const fs7Size = 0.813;
    const calculatedSize = fs6Size - (fs6Size - fs7Size) * (1 - ratio);
    fontSize = `${calculatedSize}rem`;

    paddingVertical = `${0.375 + (0.5 - 0.375) * ratio}rem`;
    paddingHorizontal = `${0.75 + (1 - 0.75) * ratio}rem`;
  } else {
    fontSize = "var(--fs-7)";
    paddingVertical = "0.375rem";
    paddingHorizontal = "0.75rem";
  }

  roleTitle.style.fontSize = fontSize;
  roleTitle.style.padding = `${paddingVertical} ${paddingHorizontal}`;
};

window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  setTimeout(() => {
    loader.classList.add("loaded");
  }, 1000);
  adjustRoleTitleSize();
});

const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

const handleResize = () => {
  const isDesktop = window.innerWidth >= 1250;
  if (isDesktop && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  }
};

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 150);
});

handleResize();

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

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

selects.forEach((select) => {
  select.addEventListener("click", () => elementToggleFunc(select));
});

for (const item of selectItems) {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase().trim();
    const parentSelectBox = item.closest(".filter-select-box");
    const select = parentSelectBox.querySelector("[data-select]");
    const selectValue = parentSelectBox.querySelector("[data-selecct-value]");

    selectValue.innerText = item.innerText;
    elementToggleFunc(select);

    const section = parentSelectBox.closest("section");
    const filterItems = section.querySelectorAll("[data-filter-item]");
    for (const filterItem of filterItems) {
      const category = filterItem.dataset.category
        ? filterItem.dataset.category.toLowerCase().trim()
        : "";
      if (selectedValue === "all" || selectedValue === category) {
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

document.querySelectorAll("[data-filter-btn]").forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase().trim();

    const section = this.closest("section");
    const selectValue = section.querySelector("[data-selecct-value]");
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }

    const filterItems = section.querySelectorAll("[data-filter-item]");

    for (const item of filterItems) {
      const category = item.dataset.category
        ? item.dataset.category.toLowerCase().trim()
        : "";
      if (selectedValue === "all" || selectedValue === category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
    const filterButtons = section.querySelectorAll("[data-filter-btn]");
    filterButtons.forEach((button) => button.classList.remove("active"));
    this.classList.add("active");
  });
});

/** Contact form validation */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (const input of formInputs) {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
}

/** Page navigation */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (const navLink of navigationLinks) {
  navLink.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (targetPage === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);

        const filterButtons = pages[i].querySelectorAll("[data-filter-btn]");
        const filterItems = pages[i].querySelectorAll("[data-filter-item]");
        if (filterButtons.length > 0 && filterItems.length > 0) {
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          filterButtons[0].classList.add("active");

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

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

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

document
  .querySelector("[data-nav-link]:nth-child(2)")
  .addEventListener("click", () => {
    setTimeout(animateSkillBars, 300);
  });

if (document.querySelector(".resume.active")) {
  setTimeout(animateSkillBars, 300);
}

let roleResizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(roleResizeTimeout);
  roleResizeTimeout = setTimeout(adjustRoleTitleSize, 150);
});
