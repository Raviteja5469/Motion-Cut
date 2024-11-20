let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.style.animation = 'zoomIn 1s ease-in-out, fadeIn 1s ease-in-out, none 1s forwards';
            slide.style.opacity = 1;
        } else {
            slide.style.animation = 'blurOut 1s ease-in-out';
            slide.style.opacity = 0;
        }
    });

    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    updateThumbnails();
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === currentSlide);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            showSlide(index);
        });
    });

    showSlide(currentSlide);

    let startX;

    document.querySelector('.slider').addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    document.querySelector('.slider').addEventListener('touchmove', (e) => {
        if (!startX) {
            return;
        }

        let diffX = startX - e.touches[0].clientX;

        if (diffX > 50) {
            moveSlide(1);
            startX = null;
        } else if (diffX < -50) {
            moveSlide(-1);
            startX = null;
        }
    });
});

