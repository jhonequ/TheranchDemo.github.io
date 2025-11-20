// ============================================
// ROOM CAROUSEL FUNCTIONALITY
// ============================================

class RoomCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.room-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        
        this.init();
    }

    init() {
        // Event Listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Auto-play (opcional)
        // this.startAutoPlay();
    }

    showSlide(index) {
        // Remove active class from all
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');

        // Update current slide
        this.currentSlide = index;

        // Update button states
        this.updateButtons();
    }

    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0; // Loop to first
        }
        this.showSlide(nextIndex);
    }

    previousSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1; // Loop to last
        }
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    updateButtons() {
        // Opcional: Deshabilitar botones en los extremos (sin loop)
        // this.prevBtn.disabled = this.currentSlide === 0;
        // this.nextBtn.disabled = this.currentSlide === this.slides.length - 1;
    }

    startAutoPlay(interval = 5000) {
        setInterval(() => {
            this.nextSlide();
        }, interval);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.room-carousel')) {
        new RoomCarousel();
    }
});