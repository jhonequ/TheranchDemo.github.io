// ============================================
// HERO BANNER SLIDER - EVENTOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.events-hero-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 segundos

    // Función para ir a un slide específico
    function goToSlide(index) {
        // Validar índice
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Agregar clase active al slide actual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        currentSlide = index;
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Función para iniciar autoplay
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    // Función para detener autoplay
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // Reiniciar autoplay después de interacción
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // Reiniciar autoplay después de interacción
        });
    }

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay(); // Reiniciar autoplay después de interacción
        });
    });

    // Pausar autoplay cuando el mouse está sobre el slider
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // Iniciar autoplay
    startAutoPlay();

    // Detener autoplay cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
});