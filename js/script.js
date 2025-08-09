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
                const productCard = this.parentElement;
                const productId = productCard.getAttribute('data-product-id');
                const productName = productCard.querySelector('h4').textContent;
                const productDesc = productCard.querySelector('p').textContent;
                const productImg = productCard.querySelector('img').getAttribute('src');
                const productNumber = productImg.replace('images/', '').replace('.png', '');
                
                // Crear modal para mostrar detalles del producto
                showProductDetails(productNumber, productName, productDesc);
            });
        });
    }
    
    // Función para mostrar detalles del producto
    function showProductDetails(productNumber, productName, productDesc) {
        // Precios ficticios para demostración
        const prices = {
            '1': '$25.000 / Caja x 12 unidades',
            '2': '$18.000 / Paquete x 24 unidades',
            '3': '$35.000 / Caja x 6 unidades',
            '4': '$22.000 / Paquete x 12 unidades'
        };
        
        // Crear el modal
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        
        // Verificar si existen imágenes adicionales
        let additionalImagesHTML = '';
        const imagesToCheck = ['.1.png', '.2.png', '.3.png'];
        
        // Crear el contenido del modal
        let modalContent = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="product-details">
                    <div class="product-images">
                        <div class="main-image">
                            <img src="images/${productNumber}.png" alt="${productName}">
                        </div>
                        <div class="additional-images">
        `;
        
        // Comprobar y agregar imágenes adicionales si existen
        imagesToCheck.forEach(suffix => {
            const imgPath = `images/${productNumber}${suffix}`;
            const img = new Image();
            img.src = imgPath;
            img.onload = function() {
                // La imagen existe, agregarla al modal
                const thumbnailContainer = modal.querySelector('.additional-images');
                if (thumbnailContainer) {
                    const thumbnail = document.createElement('div');
                    thumbnail.className = 'thumbnail';
                    thumbnail.innerHTML = `<img src="${imgPath}" alt="${productName} vista adicional">`;
                    thumbnail.addEventListener('click', function() {
                        modal.querySelector('.main-image img').src = imgPath;
                    });
                    thumbnailContainer.appendChild(thumbnail);
                }
            };
        });
        
        modalContent += `
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${productName}</h3>
                        <p class="product-price">${prices[productNumber] || 'Precio a consultar'}</p>
                        <div class="product-description">
                            <h4>Descripción:</h4>
                            <p>${productDesc}</p>
                        </div>
                        <div class="product-actions">
                            <a href="https://wa.me/573206609029?text=Hola, estoy interesado en ${productName}" target="_blank" class="cta-button whatsapp-btn">
                                <i class="fab fa-whatsapp"></i> Solicitar Cotización
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Mostrar el modal con animación
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Cerrar el modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Cerrar el modal al hacer clic fuera del contenido
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
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