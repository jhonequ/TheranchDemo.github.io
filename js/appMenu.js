// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const body = document.body;

// Variable para prevenir múltiples clicks
let isAnimating = false;

// Toggle menú con protección anti-spam
function toggleMenu() {
    if (isAnimating) {
        console.log('⚠️ Animación en progreso, ignorando click');
        return;
    }
    
    isAnimating = true;
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        console.log('🔴 Cerrando menú');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    } else {
        console.log('🟢 Abriendo menú');
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        body.classList.add('menu-open');
    }
    
    // Liberar después de la animación
    setTimeout(() => {
        isAnimating = false;
        console.log('✅ Animación completada');
    }, 350);
}

// Abrir/Cerrar menú con botón hamburguesa
if (navToggle) {
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('🍔 Click en hamburguesa');
        toggleMenu();
    });
    console.log('✅ Event listener agregado a navToggle');
} else {
    console.error('❌ No se encontró #navToggle');
}

// Cerrar menú con botón X
if (navClose) {
    navClose.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('❌ Click en botón cerrar');
        toggleMenu();
    });
    console.log('✅ Event listener agregado a navClose');
} else {
    console.warn('⚠️ No se encontró #navClose (puede ser normal si no existe el botón)');
}

// Cerrar menú al hacer click en el overlay
if (navOverlay) {
    navOverlay.addEventListener('click', function() {
        console.log('🌑 Click en overlay');
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    console.log('✅ Event listener agregado a navOverlay');
} else {
    console.error('❌ No se encontró #navOverlay');
}

// ============================================
// NAVEGACIÓN Y SMOOTH SCROLL
// ============================================

const navLinks = document.querySelectorAll('.nav-menu a');
console.log(`📍 Links encontrados: ${navLinks.length}`);

navLinks.forEach((link, index) => {
    const href = link.getAttribute('href');
    const text = link.textContent.trim();
    
    console.log(`  ${index + 1}. "${text}" → ${href}`);
    
    link.addEventListener('click', function(e) {
        console.log(`🔗 Click en link: ${text}`);
        
        // Solo prevenir default para links internos (#)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            console.log(`   → Link interno detectado: ${href}`);
            
            // Cerrar menú en mobile
            if (window.innerWidth <= 900) {
                console.log('   → Cerrando menú (mobile)');
                toggleMenu();
            }
            
            // Smooth scroll
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                console.log(`   → Haciendo scroll a: ${href}`);
                // Esperar a que se cierre el menú antes de hacer scroll
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, window.innerWidth <= 900 ? 300 : 0);
            } else {
                console.warn(`   ⚠️ No se encontró la sección: ${href}`);
            }
        } else {
            console.log(`   → Link externo o sin href, permitiendo navegación normal`);
        }
    });
});

// Cerrar menú con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        console.log('⌨️ ESC presionado, cerrando menú');
        toggleMenu();
    }
});

// ============================================
// ACTIVE LINK ON SCROLL
// ============================================

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Agregar clase 'scrolled' cuando se hace scroll hacia abajo
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

console.log('✅ Header scroll effect initialized');
