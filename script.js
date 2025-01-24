document.addEventListener('DOMContentLoaded', function () {
    const typingText = document.querySelector('.typing-text span');
    const words = [
        "MIS Executive",
        "Frontend Developer",
        "App Script Writer",
        "Google Sheet Automator",
        "AI User"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = words[wordIndex];
    let typingInterval;

    function type() {
        typingInterval = setInterval(() => {
            typingText.textContent += currentWord[letterIndex];
            letterIndex++;
            if (letterIndex === currentWord.length) {
                clearInterval(typingInterval);
                setTimeout(deleteWord, 1000); // Wait 1 second before deleting the word
            }
        }, 150); // Speed of typing
    }

    function deleteWord() {
        setTimeout(() => {
            const deletingInterval = setInterval(() => {
                typingText.textContent = typingText.textContent.slice(0, -1);
                if (typingText.textContent === '') {
                    clearInterval(deletingInterval);
                    wordIndex = (wordIndex + 1) % words.length; // Cycle through words
                    currentWord = words[wordIndex];
                    letterIndex = 0;
                    type(); // Start typing the next word
                }
            }, 100); // Speed of deleting
        }, 500); // Wait 0.5 second before deleting
    }

    type(); // Start typing effect
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById("contactForm");

    // Send form data via fetch
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
        .then((response) => {
            if (response.ok) {
                // Show success popup
                document.getElementById("successPopup").style.display = "flex";

                // Clear the form
                form.reset();

                // Hide the popup after 3 seconds
                setTimeout(() => {
                    document.getElementById("successPopup").style.display = "none";
                }, 3000);
            } else {
                alert("Failed to submit form. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Failed to submit form. Please try again.");
        });

    return false;
}
// Burger 
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const header = document.querySelector('header');

// Toggle Burger Menu
burger.addEventListener('click', (e) => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
    e.stopPropagation(); // Prevent click from propagating to window
});

// Close Burger Menu on Outside Click
window.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    }
});

// Prevent Close When Clicking Inside Nav
nav.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from propagating to window
});

// Add Scroll Effect on Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});