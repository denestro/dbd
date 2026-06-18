const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

/* ================= SHOW SLIDE ================= */

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove("active_slide");
    });

    slides[index].classList.add("active_slide");
}


/* ================= NEXT ================= */

function nextSlide() {
    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);
}


/* ================= PREV ================= */

function prevSlide() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    showSlide(currentIndex);
}


/* ================= BUTTONS ================= */

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});


/* ================= AUTO SLIDE ================= */

let autoSlide = setInterval(nextSlide, 10000); // 10 секунд

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 10000);
}