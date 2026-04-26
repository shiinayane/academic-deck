(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const counter = document.getElementById("slide-count");
  const previousButton = document.querySelector('[data-action="prev"]');
  const nextButton = document.querySelector('[data-action="next"]');
  let index = 0;

  function scrollSafeArea() {
    const rawValue = getComputedStyle(document.documentElement)
      .getPropertyValue("--scroll-safe-area")
      .trim();
    const parsed = Number.parseFloat(rawValue);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function formatPageNumber(page, total) {
    const width = String(total).length;
    return `${String(page).padStart(width, "0")} / ${total}`;
  }

  function setCurrentSlide(nextIndex) {
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));

    if (counter) {
      counter.textContent = `${index + 1} / ${slides.length}`;
    }
  }

  function showSlide(nextIndex) {
    setCurrentSlide(nextIndex);
    const targetTop = slides[index].getBoundingClientRect().top + window.scrollY - scrollSafeArea();
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "auto"
    });
  }

  function populateSlidePages() {
    const total = slides.length;
    slides.forEach((slide, slideIndex) => {
      const marker = slide.querySelector(".slide-page");
      if (marker) {
        marker.textContent = formatPageNumber(slideIndex + 1, total);
      }
    });
  }

  function initNavigation() {
    if (!slides.length || !counter || !previousButton || !nextButton) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setCurrentSlide(slides.indexOf(visible.target));
      }
    }, {
      root: null,
      rootMargin: "-20% 0px -45% 0px",
      threshold: [0.35, 0.55, 0.75]
    });

    slides.forEach((slide) => observer.observe(slide));
    previousButton.addEventListener("click", () => showSlide(index - 1));
    nextButton.addEventListener("click", () => showSlide(index + 1));
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        showSlide(index + 1);
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        showSlide(index - 1);
      }
    });

    setCurrentSlide(0);
  }

  populateSlidePages();
  initNavigation();
}());
