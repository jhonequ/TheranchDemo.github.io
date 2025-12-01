// ============================================
// LOCATION IMAGE CAROUSEL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.location-image');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.indicator');
        
        if (!images.length || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        const totalImages = images.length;
        
        function goToSlide(index) {
            if (index < 0) {
                index = totalImages - 1;
            } else if (index >= totalImages) {
                index = 0;
            }
            
            // Remover active
            images[currentIndex].classList.remove('active');
            if (indicators[currentIndex]) {
                indicators[currentIndex].classList.remove('active');
            }
            
            // Animación
            images[currentIndex].classList.add('flipping-out');
            
            setTimeout(() => {
                images[currentIndex].classList.remove('flipping-out');
                currentIndex = index;
                
                images[currentIndex].classList.add('flipping-in');
                
                setTimeout(() => {
                    images[currentIndex].classList.remove('flipping-in');
                    images[currentIndex].classList.add('active');
                }, 50);
                
                if (indicators[currentIndex]) {
                    indicators[currentIndex].classList.add('active');
                }
            }, 200);
        }
        
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(currentIndex + 1);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                if (index !== currentIndex) {
                    goToSlide(index);
                }
            });
        });
    });
});