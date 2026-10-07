const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

const mobileLinks = document.querySelectorAll(".mobile-link");
const desktopLinks = document.querySelectorAll(".nav-link");


/* =========================================
   OPEN MENU
========================================= */

function openMenu() {

    mobileMenu.classList.add("active");

    overlay.classList.add("active");

    hamburger.classList.add("open");

    hamburger.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE MENU
========================================= */

function closeMobileMenu() {

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

    hamburger.classList.remove("open");

    hamburger.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
}


/* =========================================
   HAMBURGER CLICK
========================================= */

hamburger.addEventListener("click", function () {

    const isOpen = mobileMenu.classList.contains("active");

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMenu();
    }

});


/* =========================================
   CLOSE BUTTON
========================================= */

closeMenu.addEventListener("click", closeMobileMenu);


/* =========================================
   OVERLAY CLICK
========================================= */

overlay.addEventListener("click", closeMobileMenu);


/* =========================================
   MOBILE NAVIGATION
========================================= */

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        closeMobileMenu();

    });

});


/* =========================================
   DESKTOP NAVIGATION
========================================= */

desktopLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        desktopLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (mobileMenu.classList.contains("active")) {
            closeMobileMenu();
        }

    }

});


/* =========================================
   CLOSE MENU WHEN SCREEN BECOMES DESKTOP
========================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 850) {
        closeMobileMenu();
    }

});