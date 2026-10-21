/**
 * Althea J. Doherty - Resume Interactive JavaScript Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Download PDF Button Handler ---
    const downloadPdfBtn = document.getElementById("download-pdf-btn");
    
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener("click", () => {
            const element = document.getElementById("resume-content");
            const controls = document.getElementById("js-controls");

            // Temporarily hide controls bar before converting
            if (controls) controls.style.display = "none";

            const opt = {
                margin:       0.4,
                filename:     'Althea_Doherty_Resume.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak:    { mode: ['css', 'legacy'] }
            };

            // Generate and download PDF
            html2pdf().set(opt).from(element).save().then(() => {
                // Restore controls bar after download finishes
                if (controls) controls.style.display = "flex";
            }).catch(err => {
                console.error("PDF generation failed:", err);
                if (controls) controls.style.display = "flex";
            });
        });
    }

    // --- 2. Print Resume Button Handler ---
    const printBtn = document.getElementById("print-btn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            window.print();
        });
    }

    // --- 3. Interactive Skill Category Filters ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const skillItems = document.querySelectorAll(".skill-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            skillItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all") {
                    item.classList.remove("dimmed", "highlighted");
                } else if (category === filter) {
                    item.classList.remove("dimmed");
                    item.classList.add("highlighted");
                } else {
                    item.classList.remove("highlighted");
                    item.classList.add("dimmed");
                }
            });
        });
    });

});