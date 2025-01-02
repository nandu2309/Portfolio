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
