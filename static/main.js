// Simple form validation and interactivity for the flood prediction form

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (event) {
            const inputs = form.querySelectorAll("input[required]");
            let valid = true;

            inputs.forEach(function (input) {
                if (input.value.trim() === "") {
                    valid = false;
                    input.style.border = "2px solid red";
                } else {
                    input.style.border = "1px solid #ccc";
                }
            });

            if (!valid) {
                event.preventDefault();
                alert("Please fill in all fields before submitting.");
            }
        });
    }
});