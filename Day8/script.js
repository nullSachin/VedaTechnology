// =========================
// Quote Data
// =========================

const quotes = [

    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },

    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier"
    },

    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },

    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },

    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },

    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },

    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },

    {
        text: "Dream big and dare to fail.",
        author: "Norman Vincent Peale"
    },

    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },

    {
        text: "Do something today that your future self will thank you for.",
        author: "Sean Patrick Flanery"
    },

    {
        text: "Success is not final, failure is not fatal.",
        author: "Winston Churchill"
    }
];


// =========================
// Get HTML Elements
// =========================

const quoteElement = document.getElementById("quote");

const authorElement = document.getElementById("author");

const newQuoteButton = document.getElementById("newQuote");

const shareQuoteButton = document.getElementById("shareQuote");


// =========================
// Store Previous Quote
// =========================

let previousQuoteIndex = -1;


// =========================
// Generate Random Quote
// =========================

function generateQuote() {

    let randomIndex;


    // Generate a new random index
    // until it is different from
    // the previous quote.

    do {

        randomIndex = Math.floor(
            Math.random() * quotes.length
        );

    } while (
        randomIndex === previousQuoteIndex
    );


    // Store current index

    previousQuoteIndex = randomIndex;


    // Get selected quote

    const selectedQuote = quotes[randomIndex];


    // Update the webpage

    quoteElement.textContent =
        `"${selectedQuote.text}"`;

    authorElement.textContent =
        `— ${selectedQuote.author}`;
}


// =========================
// New Quote Button
// =========================

newQuoteButton.addEventListener(
    "click",
    generateQuote
);


// =========================
// Share Quote Button
// =========================

shareQuoteButton.addEventListener(
    "click",
    function () {

        const quoteText =
            quoteElement.textContent;

        const authorText =
            authorElement.textContent;


        const shareText =
            `${quoteText} ${authorText}`;


        // Check whether Web Share API
        // is available in the browser.

        if (navigator.share) {

            navigator.share({

                title: "Random Quote",

                text: shareText

            })
            .catch(function (error) {

                console.log(
                    "Sharing cancelled:",
                    error
                );

            });

        }

        else {

            // Fallback for browsers
            // that do not support sharing.

            navigator.clipboard.writeText(
                shareText
            );

            alert(
                "Quote copied to clipboard!"
            );
        }
    }
);


// =========================
// Generate First Quote
// =========================

generateQuote();