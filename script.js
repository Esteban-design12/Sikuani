// --- 1. COMPORTAMIENTO INTERACTIVO DEL NAVBAR ---
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- 2. EFECTO SCROLL REVEAL EN LAS SECCIONES ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
};

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, observerOptions);

document.querySelectorAll('.oculto').forEach(section => {
    sectionObserver.observe(section);
});

// --- 3. PÁGINA DE RESERVAS: preseleccionar habitación desde URL ---
const roomSelector = document.getElementById('room-selector');
if (roomSelector) {
    const params = new URLSearchParams(window.location.search);
    const habitacion = params.get('habitacion');
    const mapa = {
        palafito: '300000',
        mirador: '250000',
        cabana: '200000'
    };
    if (mapa[habitacion]) {
        roomSelector.value = mapa[habitacion];
    }
}

// --- 4. GALERÍA: lightbox simple ---
const lightbox = document.getElementById('gallery-lightbox');
if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('[data-gallery]').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.gallery;
            if (src && lightboxImg) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const cerrarLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', cerrarLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) cerrarLightbox();
    });
}