// ============================================
// RESTAURANTE 1 (OUR MENU 2) - INTERACTIVE JS & CAROUSELS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Category Filter & Category Hamburger Dropdown
    const tabButtons = document.querySelectorAll('#categoryTabs .category-tab-btn');
    const categoryHamburgerBtn = document.getElementById('categoryHamburgerBtn');
    const categoryDropdownList = document.getElementById('categoryDropdownList');
    const dropdownButtons = document.querySelectorAll('#categoryDropdownList button');
    const selectedCategoryLabel = document.getElementById('selectedCategoryLabel');

    const categoryBlocks = document.querySelectorAll('.category-carousel-block');

    // Mapeo de nombres para la etiqueta
    const categoryNames = {
        'all': 'TODAS LAS SESIONES',
        'entradas': 'ENTRADAS',
        'plato-fuerte': 'PLATO FUERTE',
        'bebidas': 'BEBIDAS',
        'postres': 'POSTRES'
    };

    function filterCategory(targetCategory) {
        // Actualizar clase activa en tabs desktop
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === targetCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Actualizar clase activa en dropdown móvil
        dropdownButtons.forEach(btn => {
            if (btn.getAttribute('data-category') === targetCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Actualizar etiqueta del botón hamburguesa móvil
        if (selectedCategoryLabel && categoryNames[targetCategory]) {
            selectedCategoryLabel.textContent = categoryNames[targetCategory];
        }

        // Filtrar bloques de carrusel por categoría
        categoryBlocks.forEach(block => {
            const blockCat = block.getAttribute('data-category-block');
            if (targetCategory === 'all' || blockCat === targetCategory) {
                block.style.display = 'block';
                block.style.opacity = '0';
                block.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    block.style.transition = 'all 0.4s ease';
                    block.style.opacity = '1';
                    block.style.transform = 'translateY(0)';
                }, 50);
            } else {
                block.style.display = 'none';
            }
        });
    }

    // Event listeners para tabs desktop
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-category');
            filterCategory(cat);
        });
    });

    // Toggle Dropdown Hamburguesa de Categorías
    if (categoryHamburgerBtn && categoryDropdownList) {
        categoryHamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryHamburgerBtn.classList.toggle('active');
            categoryDropdownList.classList.toggle('open');
        });

        dropdownButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-category');
                filterCategory(cat);
                categoryHamburgerBtn.classList.remove('active');
                categoryDropdownList.classList.remove('open');
            });
        });

        // Cerrar dropdown si se hace clic fuera
        document.addEventListener('click', (e) => {
            if (!categoryHamburgerBtn.contains(e.target) && !categoryDropdownList.contains(e.target)) {
                categoryHamburgerBtn.classList.remove('active');
                categoryDropdownList.classList.remove('open');
            }
        });
    }

    // 2. Carousel Navigation Arrows Logic (Adelantar / Devolverse)
    const prevBtns = document.querySelectorAll('.carousel-arrow-btn.prev-btn');
    const nextBtns = document.querySelectorAll('.carousel-arrow-btn.next-btn');

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const carouselId = btn.getAttribute('data-carousel');
            const track = document.getElementById(carouselId);
            if (track) {
                const cardWidth = track.querySelector('.rest1-food-card')?.offsetWidth || 300;
                track.scrollBy({
                    left: -(cardWidth + 24),
                    behavior: 'smooth'
                });
            }
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const carouselId = btn.getAttribute('data-carousel');
            const track = document.getElementById(carouselId);
            if (track) {
                const cardWidth = track.querySelector('.rest1-food-card')?.offsetWidth || 300;
                track.scrollBy({
                    left: cardWidth + 24,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
