document.addEventListener('DOMContentLoaded', () => {

    // Navegación suave al hacer clic en enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Desplazamiento suave
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Cierra el menú móvil si está abierto (después de hacer clic)
                const navMenu = document.querySelector('.nav-list');
                const navToggle = document.querySelector('.nav-toggle'); // Asegurarse de obtener el toggle
                if (navMenu && navToggle && navMenu.classList.contains('active')) {
                     navMenu.classList.remove('active');
                     navToggle.classList.remove('active');
                }
            }
        });
    });

    // Toggle para el menú de navegación en móviles
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-list');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active'); // Para animar la hamburguesa
        });
    }

    // Opcional: Cerrar el menú móvil al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        const navToggle = document.querySelector('.nav-toggle'); // Asegurarse de obtener el toggle aquí también
         const navMenu = document.querySelector('.nav-list'); // Asegurarse de obtener el menú aquí también

        // Verificar que los elementos existen y que el clic no fue dentro de ellos
        if (navMenu && navToggle && navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
             navMenu.classList.remove('active');
             navToggle.classList.remove('active');
        }
    });

    // NOTA: Si implementas tabs en Locaciones Destacadas, necesitarías JS adicional aquí.

});