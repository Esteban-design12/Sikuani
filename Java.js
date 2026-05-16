// --- 1. COMPORTAMIENTO INTERACTIVO DEL NAVBAR ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- 2. CONTROL ANIMADO DE LA SECCIÓN APARTE DE RESERVAS (SPA) ---
const bookingOverlay = document.getElementById('booking-overlay');
const closeBookingBtn = document.getElementById('close-booking');
const triggerButtons = document.querySelectorAll('.trigger-booking');
const mainContent = document.getElementById('main-content');

// Abrir sección de reservas con animación fluida
triggerButtons.forEach(button => {
    button.addEventListener('click', () => {
        bookingOverlay.classList.add('active');
        // Suavizamos el fondo principal ralentizando el foco visual
        mainContent.style.filter = "blur(4px)";
        mainContent.style.transition = "filter 0.5s ease";
    });
});

// Cerrar sección de reservas y volver al contenido principal
closeBookingBtn.addEventListener('click', () => {
    bookingOverlay.classList.remove('active');
    mainContent.style.filter = "none";
});

// Cerrar al presionar la tecla Esc
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingOverlay.classList.contains('active')) {
        bookingOverlay.classList.remove('active');
        mainContent.style.filter = "none";
    }
});


// --- 3. EFECTO SCROLL REVEAL EN LAS SECCIONES (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12 // Se ejecuta cuando el 12% de la sección entra en el campo visual
};

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Deja de observar una vez hecha la animación
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, observerOptions);

// Aplicar el observador a todas las secciones que tengan la clase 'oculto'
document.querySelectorAll('.oculto').forEach(section => {
    sectionObserver.observe(section);
});