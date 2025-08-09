document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && !nav.contains(event.target) && event.target !== menuToggle) {
            nav.classList.remove('active');
        }
    });

    // Animación de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Animación para las tarjetas de productos
    const productCards = document.querySelectorAll('.producto-card');
    if (productCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const productObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        productCards.forEach(card => {
            productObserver.observe(card);
        });
    }

    // Botones de productos
    const productButtons = document.querySelectorAll('.producto-btn');
    if (productButtons.length > 0) {
        productButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.parentElement.querySelector('h4').textContent;
                alert(`Has seleccionado: ${productName}. Pronto te mostraremos más detalles.`);
            });
        });
    }

    // Formulario de contacto
    const contactForm = document.querySelector('.contacto-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Te contactaremos pronto.');
            this.reset();
        });
    }

    // Formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por suscribirte a nuestro boletín!');
            this.reset();
        });
    }

    // Formulario de cotización
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Hemos recibido tu solicitud de cotización. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }

    // Añadir clase activa al enlace de navegación actual
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '#' && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
            if (linkPath === 'index.html' || linkPath === '#') {
                link.classList.add('active');
            }
        }
    });

    // Convertir imágenes a PNG si no lo son
    function ensurePngFormat() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.toLowerCase().endsWith('.png')) {
                // Extraer el nombre base de la imagen
                const baseName = src.split('/').pop().split('.')[0];
                // Reemplazar la extensión con .png
                img.setAttribute('src', src.replace(/\.[^\.]+$/, '.png'));
                console.log(`Converted image ${src} to PNG format`);
            }
        });
    }

    // Ejecutar la conversión de imágenes
    ensurePngFormat();
});