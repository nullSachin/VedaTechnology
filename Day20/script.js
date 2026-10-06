/* =========================================
   ELEMENTS
========================================= */

const modal = document.getElementById("newsletterModal");
const closeModalButton = document.getElementById("closeModal");
const openSignupButton = document.getElementById("openSignup");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("errorMessage");

const successToast = document.getElementById("successToast");


/* =========================================
   SETTINGS
========================================= */

const MODAL_DELAY = 4000;

const MODAL_DISMISSED_KEY = "novaNewsletterDismissed";


/* =========================================
   OPEN MODAL
========================================= */

function openModal() {

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
        emailInput.focus();
    }, 300);
}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

    /*
        Store the dismissal so the modal does not
        automatically appear again during future visits.
    */
    localStorage.setItem(MODAL_DISMISSED_KEY, "true");
}


/* =========================================
   DELAYED MODAL
========================================= */

window.addEventListener("load", () => {

    const alreadyDismissed =
        localStorage.getItem(MODAL_DISMISSED_KEY);

    if (!alreadyDismissed) {

        setTimeout(() => {

            openModal();

        }, MODAL_DELAY);

    }

});


/* =========================================
   MANUAL OPEN
========================================= */

openSignupButton.addEventListener("click", () => {

    openModal();

});


/* =========================================
   CLOSE BUTTON
========================================= */

closeModalButton.addEventListener("click", () => {

    closeModal();

});


/* =========================================
   OVERLAY CLICK
========================================= */

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeModal();

    }

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {

        closeModal();

    }

});


/* =========================================
   EMAIL VALIDATION
========================================= */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================
   FORM SUBMISSION
========================================= */

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();


    /* Empty email */

    if (email === "") {

        errorMessage.textContent =
            "Please enter your email address.";

        emailInput.focus();

        return;

    }


    /* Invalid email */

    if (!validateEmail(email)) {

        errorMessage.textContent =
            "Please enter a valid email address.";

        emailInput.focus();

        return;

    }


    /* Clear error */

    errorMessage.textContent = "";


    /* Success */

    closeModal();

    newsletterForm.reset();

    showSuccessMessage();

});


/* =========================================
   SUCCESS MESSAGE
========================================= */

function showSuccessMessage() {

    successToast.classList.add("show");

    setTimeout(() => {

        successToast.classList.remove("show");

    }, 4000);

}