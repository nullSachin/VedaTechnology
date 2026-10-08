const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const carousel = document.getElementById("carousel");

let currentSlide = 0;

const AUTO_PLAY_TIME = 5000;

let autoPlay;


/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    if (index >= slides.length) {
        currentSlide = 0;
    }
    else if (index < 0) {
        currentSlide = slides.length - 1;
    }
    else {
        currentSlide = index;
    }


    // Remove active state
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });


    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });


    // Add active state
    slides[currentSlide].classList.add("active");

    indicators[currentSlide].classList.add("active");
}


/* =========================================
   NEXT SLIDE
========================================= */

function nextSlide() {

    showSlide(currentSlide + 1);

}


/* =========================================
   PREVIOUS SLIDE
========================================= */

function previousSlide() {

    showSlide(currentSlide - 1);

}


/* =========================================
   START AUTOPLAY
========================================= */

function startAutoPlay() {

    stopAutoPlay();

    autoPlay = setInterval(() => {

        nextSlide();

    }, AUTO_PLAY_TIME);
}


/* =========================================
   STOP AUTOPLAY
========================================= */

function stopAutoPlay() {

    clearInterval(autoPlay);

}


/* =========================================
   NEXT BUTTON
========================================= */

nextBtn.addEventListener("click", () => {

    nextSlide();

    startAutoPlay();

});


/* =========================================
   PREVIOUS BUTTON
========================================= */

previousBtn.addEventListener("click", () => {

    previousSlide();

    startAutoPlay();

});


/* =========================================
   INDICATORS
========================================= */

indicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {

        showSlide(index);

        startAutoPlay();

    });

});


/* =========================================
   PAUSE ON HOVER
========================================= */

carousel.addEventListener("mouseenter", () => {

    stopAutoPlay();

});


/* =========================================
   RESUME AFTER HOVER
========================================= */

carousel.addEventListener("mouseleave", () => {

    startAutoPlay();

});


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextSlide();

        startAutoPlay();

    }


    if (event.key === "ArrowLeft") {

        previousSlide();

        startAutoPlay();

    }

});


/* =========================================
   INITIALIZE
========================================= */

showSlide(0);

startAutoPlay();