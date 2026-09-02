// ===============================
// НАВИГАЦИЯ
// ===============================

const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("nav__link--active");
    });

    link.classList.add("nav__link--active");
  });
});


// ===============================
// БУРГЕР-МЕНЮ
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
    menuToggle.classList.toggle("menu-toggle--open");
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav--open");
      menuToggle.classList.remove("menu-toggle--open");
    });
  });
}


// ===============================
// КАРУСЕЛИ ПОРТФОЛИО
// ===============================

const portfolioSliders = document.querySelectorAll(".portfolio__slider");

portfolioSliders.forEach((slider) => {
  const portfolioSection = slider.closest(".portfolio");

  if (!portfolioSection) {
    return;
  }

  const projectNumber = portfolioSection.dataset.project;

  const mainImage = slider.querySelector(".portfolio__image--main");
  const smallImages = slider.querySelectorAll(".portfolio__image--small");

  const leftArrow = slider.querySelector(".portfolio__arrow--left");
  const rightArrow = slider.querySelector(".portfolio__arrow--right");

  const dots = slider.querySelectorAll(".portfolio__dot");

  if (
    !projectNumber ||
    !mainImage ||
    smallImages.length < 2 ||
    !leftArrow ||
    !rightArrow
  ) {
    return;
  }

const slides = [
  {
    main: `url("images/portfolio-${projectNumber}-slide-1-bottom.jpg")`,
    top: `url("images/portfolio-${projectNumber}-slide-1-top.jpg")`,
    bottom: `url("images/portfolio-${projectNumber}-slide-1-main.jpg")`
  },

  {
    main: `url("images/portfolio-${projectNumber}-slide-2-bottom.jpg")`,
    top: `url("images/portfolio-${projectNumber}-slide-2-top.jpg")`,
    bottom: `url("images/portfolio-${projectNumber}-slide-2-main.jpg")`
  },

  {
    main: `url("images/portfolio-${projectNumber}-slide-3-bottom.jpg")`,
    top: `url("images/portfolio-${projectNumber}-slide-3-top.jpg")`,
    bottom: `url("images/portfolio-${projectNumber}-slide-3-main.jpg")`
  }
];

  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = index;

    mainImage.style.backgroundImage =
      slides[currentSlide].main;

    smallImages[0].style.backgroundImage =
      slides[currentSlide].top;

    smallImages[1].style.backgroundImage =
      slides[currentSlide].bottom;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle(
        "portfolio__dot--active",
        dotIndex === currentSlide
      );
    });
  }

  rightArrow.addEventListener("click", () => {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);
  });

  leftArrow.addEventListener("click", () => {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  showSlide(0);
});


// ===============================
// СВАЙП НА МОБИЛЬНОМ
// ===============================

document.querySelectorAll(".portfolio__slider").forEach((slider) => {
  let touchStartX = 0;
  let touchEndX = 0;

  const leftArrow = slider.querySelector(".portfolio__arrow--left");
  const rightArrow = slider.querySelector(".portfolio__arrow--right");

  if (!leftArrow || !rightArrow) {
    return;
  }

  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance > 0) {
      rightArrow.click();
    } else {
      leftArrow.click();
    }
  });
});


// ===============================
// ВОЗВРАТ НАВЕРХ ПРИ ОБНОВЛЕНИИ
// ===============================

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});