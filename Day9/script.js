// =====================================
// Get Elements
// =====================================

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const previewImage =
    document.getElementById("previewImage");

const previewTitle =
    document.getElementById("previewTitle");

const previewCounter =
    document.getElementById("previewCounter");

const closeButton =
    document.getElementById("closeButton");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


// =====================================
// Current Image
// =====================================

let currentIndex = 0;


// =====================================
// Open Image Preview
// =====================================

function openPreview(index) {

    currentIndex = index;

    const selectedItem =
        galleryItems[currentIndex];

    const image =
        selectedItem.querySelector("img");

    const title =
        selectedItem.dataset.title;


    previewImage.src = image.src;

    previewImage.alt = image.alt;

    previewTitle.textContent = title;

    previewCounter.textContent =
        `${currentIndex + 1} / ${galleryItems.length}`;


    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow = "hidden";
}


// =====================================
// Close Preview
// =====================================

function closePreview() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow = "";
}


// =====================================
// Show Next Image
// =====================================

function showNextImage() {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    openPreview(currentIndex);
}


// =====================================
// Show Previous Image
// =====================================

function showPreviousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    openPreview(currentIndex);
}


// =====================================
// Gallery Click Events
// =====================================

galleryItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            const index =
                Number(item.dataset.index);

            openPreview(index);
        }
    );

});


// =====================================
// Button Events
// =====================================

closeButton.addEventListener(
    "click",
    closePreview
);


nextButton.addEventListener(
    "click",
    showNextImage
);


previousButton.addEventListener(
    "click",
    showPreviousImage
);


// =====================================
// Close When Clicking Background
// =====================================

lightbox.addEventListener(
    "click",
    function (event) {

        if (event.target === lightbox) {
            closePreview();
        }

    }
);


// =====================================
// Keyboard Controls
// =====================================

document.addEventListener(
    "keydown",
    function (event) {

        // Do nothing if lightbox is closed

        if (!lightbox.classList.contains("active")) {
            return;
        }


        if (event.key === "Escape") {

            closePreview();

        }


        if (event.key === "ArrowRight") {

            showNextImage();

        }


        if (event.key === "ArrowLeft") {

            showPreviousImage();

        }

    }
);