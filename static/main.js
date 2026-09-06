/**
 * Rising Waters — Flood Prediction System
 * Modern Client-Side Interactivity, Presets, and Animated Gauges
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Preset Scenarios for Rapid Testing
    const safeBtn = document.getElementById("btnPresetSafe");
    const dangerBtn = document.getElementById("btnPresetDanger");

    const cloudCoverInput = document.querySelector('input[name="cloud_cover"]');
    const annualInput = document.querySelector('input[name="annual"]');
    const janFebInput = document.querySelector('input[name="jan_feb"]');
    const marMayInput = document.querySelector('input[name="mar_may"]');
    const junSepInput = document.querySelector('input[name="jun_sep"]');

    if (safeBtn && dangerBtn) {
        // Safe Scenario Data (Historical no-flood record)
        safeBtn.addEventListener("click", function () {
            if (cloudCoverInput) cloudCoverInput.value = "30";
            if (annualInput) annualInput.value = "2550.0";
            if (janFebInput) janFebInput.value = "22.5";
            if (marMayInput) marMayInput.value = "280.0";
            if (junSepInput) junSepInput.value = "1720.0";
            pulseInputs();
        });

        // High Flood Risk Scenario Data (Historical flood record)
        dangerBtn.addEventListener("click", function () {
            if (cloudCoverInput) cloudCoverInput.value = "40";
            if (annualInput) annualInput.value = "3671.1";
            if (janFebInput) janFebInput.value = "23.7";
            if (marMayInput) marMayInput.value = "328.0";
            if (junSepInput) junSepInput.value = "2737.8";
            pulseInputs();
        });
    }

    function pulseInputs() {
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.style.transition = "background-color 0.3s ease, border-color 0.3s ease";
            input.style.backgroundColor = "rgba(6, 182, 212, 0.12)";
            input.style.borderColor = "var(--cyan-vibrant)";
            setTimeout(() => {
                input.style.backgroundColor = "white";
                input.style.borderColor = "#cbd5e1";
            }, 450);
        });
    }

    // 2. Form Submission Validation
    const form = document.querySelector("form.prediction-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            const inputs = form.querySelectorAll("input[required]");
            let firstInvalid = null;

            inputs.forEach(function (input) {
                if (input.value.trim() === "" || isNaN(parseFloat(input.value))) {
                    input.style.borderColor = "var(--danger-red)";
                    input.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.25)";
                    if (!firstInvalid) firstInvalid = input;
                } else {
                    input.style.borderColor = "#cbd5e1";
                    input.style.boxShadow = "none";
                }
            });

            if (firstInvalid) {
                event.preventDefault();
                firstInvalid.focus();
            } else {
                // Show loading state on submit button
                const submitBtn = form.querySelector('.btn-submit');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing Weather Dynamics...';
                    submitBtn.style.opacity = '0.9';
                    submitBtn.style.pointerEvents = 'none';
                }
            }
        });

        // Reset error style on input
        const allInputs = form.querySelectorAll("input");
        allInputs.forEach(input => {
            input.addEventListener("input", function () {
                this.style.borderColor = "var(--cyan-vibrant)";
                this.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.2)";
            });
        });
    }

    // 3. Progress Bar Fill & Counter Animation on Results Pages
    const progressBar = document.querySelector(".progress-bar-fill");
    const probNumberDisplay = document.querySelector(".prob-number-val");

    if (progressBar) {
        const targetPercent = parseFloat(progressBar.getAttribute("data-probability") || "0");

        // Animate width after a tiny delay so CSS transition triggers
        setTimeout(() => {
            progressBar.style.width = Math.min(Math.max(targetPercent, 3), 100) + "%";
        }, 150);

        // Counter animation for the probability percentage
        if (probNumberDisplay) {
            let start = 0;
            const duration = 1200; // ms
            const frameRate = 30; // ms
            const totalSteps = duration / frameRate;
            const stepIncrement = targetPercent / totalSteps;

            const timer = setInterval(() => {
                start += stepIncrement;
                if (start >= targetPercent) {
                    probNumberDisplay.textContent = targetPercent.toFixed(1) + "%";
                    clearInterval(timer);
                } else {
                    probNumberDisplay.textContent = start.toFixed(1) + "%";
                }
            }, frameRate);
        }
    }
});