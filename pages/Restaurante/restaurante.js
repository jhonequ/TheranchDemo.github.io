// ============================================
// RESTAURANTE - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // HERO SLIDER
    // ============================================
    const heroSlider = document.querySelector('.events-hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    // Función para mostrar slide
    function showSlide(index) {
        // Remover clase active de todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Agregar clase active al slide actual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    // Navegación anterior
    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) {
            index = totalSlides - 1;
        }
        showSlide(index);
        resetAutoplay();
    }

    // Navegación siguiente
    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= totalSlides) {
            index = 0;
        }
        showSlide(index);
        resetAutoplay();
    }

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event Listeners - Hero Slider
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Indicators click
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            resetAutoplay();
        });
    });

    // Iniciar autoplay
    if (slides.length > 0) {
        startAutoplay();
    }

    // Pausar autoplay al hacer hover
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });

        heroSlider.addEventListener('mouseleave', function() {
            startAutoplay();
        });
    }

    // ============================================
    // MENU TABS - CATEGORÍAS
    // ============================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCards = document.querySelectorAll('.menu-card');

    // Función para filtrar platos por categoría
    function filterMenu(category) {
        menuCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Animación de entrada
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Event Listeners - Menu Tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todos los tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Agregar clase active al tab clickeado
            this.classList.add('active');
            
            // Obtener categoría y filtrar
            const category = this.getAttribute('data-category');
            filterMenu(category);
            
            // Scroll suave hacia el grid de menú
            const menuGrid = document.querySelector('.menu-grid');
            if (menuGrid) {
                const offset = 100;
                const elementPosition = menuGrid.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ANIMACIÓN DE CARDS AL HACER SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las cards del menú
    menuCards.forEach(card => {
        observer.observe(card);
    });

    // ============================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar enlaces vacíos o solo '#'
            if (href === '#' || href === '') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // BOTÓN "AGREGAR AL CARRITO" (Placeholder)
    // ============================================
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animación de feedback
            const card = this.closest('.menu-card');
            const title = card.querySelector('.menu-card-title').textContent;
            
            // Cambiar ícono temporalmente
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-check';
            this.style.backgroundColor = '#4CAF50';
            
            // Mostrar mensaje (opcional - puedes implementar un toast/notification)
            console.log(`✅ "${title}" agregado al carrito`);
            
            // Restaurar después de 1.5 segundos
            setTimeout(() => {
                icon.className = originalClass;
                this.style.backgroundColor = '';
            }, 1500);
        });
    });

    // ============================================
    // YEAR DINÁMICO EN FOOTER
    // ============================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // LAZY LOADING MANUAL (Fallback)
    // ============================================
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Forzar carga
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    console.log('✅ Restaurante JS initialized');
});
