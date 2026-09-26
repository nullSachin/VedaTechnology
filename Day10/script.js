// =========================================
// FAQ ACCORDION
// =========================================

const faqItems = document.querySelectorAll(".faq-item");
const faqButtons = document.querySelectorAll(".faq-question");


// =========================================
// TOGGLE FAQ
// =========================================

function toggleFAQ(button) {

    const faqItem = button.closest(".faq-item");

    const isCurrentlyOpen =
        faqItem.classList.contains("active");


    // Toggle current item
    faqItem.classList.toggle("active");


    // Update accessibility state
    button.setAttribute(
        "aria-expanded",
        String(!isCurrentlyOpen)
    );

}


// =========================================
// BUTTON CLICK EVENTS
// =========================================

faqButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            toggleFAQ(button);

        }
    );

});