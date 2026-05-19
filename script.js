// --- 1. COMPORTAMIENTO INTERACTIVO DEL NAVBAR ---
const navbar = document.getElementById('navbar');

if (navbar) {
    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

// --- 2. EFECTO SCROLL REVEAL EN LAS SECCIONES (repite al entrar y salir del viewport) ---
const revealObserverOptions = {
    root: null,
    rootMargin: '-10% 0px -12% 0px',
    threshold: [0, 0.15, 0.35]
};

const revealSection = (entries) => {
    entries.forEach(entry => {
        const show = entry.intersectionRatio >= 0.15;
        entry.target.classList.toggle('visible', show);
    });
};

const sectionObserver = new IntersectionObserver(revealSection, revealObserverOptions);

function initRevealAnimations() {
    document.querySelectorAll('.oculto').forEach(section => {
        sectionObserver.observe(section);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealAnimations);
} else {
    initRevealAnimations();
}

// --- 3. PÁGINA DE RESERVAS: preseleccionar habitación desde URL ---
const roomSelector = document.getElementById('room-selector');
if (roomSelector) {
    const params = new URLSearchParams(window.location.search);
    const habitacion = params.get('habitacion');
    const mapa = {
        mirador: '300000',
        campestre: '250000',
        montana: '200000',
        palafito: '300000',
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