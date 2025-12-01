// ============================================
// GALLERY MODAL - Image Viewer
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    
    let currentImages = [];
    let currentIndex = 0;

    // Obtener todas las imágenes de la galería
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    // Convertir NodeList a array de imágenes
    galleryCards.forEach(card => {
        const imageSrc = card.getAttribute('data-image');
        if (imageSrc) {
            currentImages.push(imageSrc);
        }
    });

    // Actualizar total de imágenes
    totalImagesSpan.textContent = currentImages.length;

    // Abrir modal al hacer clic en una imagen
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            if (imageSrc) {
                currentIndex = index;
                openModal(imageSrc);
            }
        });
    });

    // Función para abrir el modal
    function openModal(imageSrc) {
        modalImage.src = imageSrc;
        
        // Esperar a que la imagen cargue para detectar orientación
        modalImage.onload = function() {
            const img = this;
            const isPortrait = img.naturalHeight > img.naturalWidth;
            
            // Agregar clase para imágenes verticales en móvil
            if (isPortrait && window.innerWidth <= 768) {
                img.classList.add('portrait-image');
            } else {
                img.classList.remove('portrait-image');
            }
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCounter();
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImage.src = '';
    }

    // Función para actualizar el contador
    function updateCounter() {
        currentImageSpan.textContent = currentIndex + 1;
    }

    // Función para mostrar la imagen anterior
    function prevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImage.src = currentImages[currentIndex];
        updateCounter();
    }

    // Función para mostrar la siguiente imagen
    function nextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImage.src = currentImages[currentIndex];
        updateCounter();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                prevImage();
                e.preventDefault();
                break;
            case 'ArrowRight':
                nextImage();
                e.preventDefault();
                break;
        }
    });
});