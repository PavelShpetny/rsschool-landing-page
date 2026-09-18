const slides = document.querySelectorAll(".slide");
const previousButton = document.querySelector(".slider-button-previous");
const nextButton = document.querySelector(".slider-button-next");
const indicators = document.querySelectorAll(".slider-indicator");
const slider = document.querySelector(".slider");
const sliderWindow = document.querySelector(".slider-window");

const slideDuration = 5000;

let activeSlideIndex = 0;
let autoplayTimer;
let touchStartX = 0;

function stopAutoplay() {
    clearTimeout(autoplayTimer);
}

function startAutoplay() {
    stopAutoplay();

    autoplayTimer = setTimeout(() => {
        showSlide(activeSlideIndex + 1);
    }, slideDuration);
}

function showSlide(index) {
    activeSlideIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== activeSlideIndex;
    });

    indicators.forEach((indicator) => {
        indicator.classList.remove("slider-indicator-active");
        indicator.removeAttribute("aria-current");
    });

    const activeIndicator = indicators[activeSlideIndex];

    // Перезапускает CSS-анимацию индикатора.
    void activeIndicator.offsetWidth;

    activeIndicator.classList.add("slider-indicator-active");
    activeIndicator.setAttribute("aria-current", "true");

    startAutoplay();
}

previousButton.addEventListener("click", () => {
    showSlide(activeSlideIndex - 1);
});

nextButton.addEventListener("click", () => {
    showSlide(activeSlideIndex + 1);
});

indicators.forEach((indicator, indicatorIndex) => {
    indicator.addEventListener("click", () => {
        showSlide(indicatorIndex);
    });
});

slider.addEventListener("mouseenter", () => {
    stopAutoplay();
    slider.classList.add("slider-paused");
});

slider.addEventListener("mouseleave", () => {
    slider.classList.remove("slider-paused");
    showSlide(activeSlideIndex);
});

sliderWindow.addEventListener(
    "touchstart",
    (event) => {
        touchStartX = event.touches[0].clientX;

        stopAutoplay();
        slider.classList.add("slider-paused");
    },
    { passive: true }
);

sliderWindow.addEventListener(
    "touchend",
    (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        slider.classList.remove("slider-paused");

        if (Math.abs(swipeDistance) < 50) {
            showSlide(activeSlideIndex);
            return;
        }

        if (swipeDistance > 0) {
            showSlide(activeSlideIndex - 1);
        } else {
            showSlide(activeSlideIndex + 1);
        }
    },
    { passive: true }
);

showSlide(0);