document.addEventListener("DOMContentLoaded", () => {
    // --- ANIMACIONES AL HACER SCROLL ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- LÓGICA DEL CARRUSEL ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;
    let autoPlayInterval;

    // Crear los puntitos dinámicamente
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        // Quitar clase activa de la foto y puntito actual
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Actualizar el índice
        currentSlide = index;
        
        // Si nos pasamos del final, volvemos al principio
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        // Poner clase activa en la nueva foto y puntito
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Botones
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoPlay(); // Reinicia el temporizador si el usuario hace clic
    });
    
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
    });

    // Auto-play (pasa solo cada 4 segundos)
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Iniciar autoplay al cargar
    startAutoPlay();

    // Opcional: Pausar el autoplay si el mouse está encima (para PC)
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
});