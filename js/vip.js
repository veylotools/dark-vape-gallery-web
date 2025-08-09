document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Actualizar nombre de usuario en la interfaz
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(element => {
        element.textContent = currentUser.name.split(' ')[0] + ' ';
        element.innerHTML += '<i class="fas fa-chevron-down"></i>';
    });

    // Botones de productos VIP
    const vipProductButtons = document.querySelectorAll('.producto-card.vip .producto-btn');
    if (vipProductButtons.length > 0) {
        vipProductButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.parentElement;
                const productId = productCard.getAttribute('data-product-id');
                const productName = productCard.querySelector('h4').textContent;
                const productDesc = productCard.querySelector('p').textContent;
                const productImg = productCard.querySelector('img').getAttribute('src');
                const productNumber = productImg.replace('images/', '').replace('.png', '');
                const productPrice = productCard.querySelector('.producto-precio').textContent;
                
                // Crear modal para mostrar detalles del producto
                showProductDetails(productNumber, productName, productDesc, productPrice);
            });
        });
    }
    
    // Función para mostrar detalles del producto
    function showProductDetails(productNumber, productName, productDesc, productPrice) {
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
                        <p class="product-price">${productPrice}</p>
                        <div class="product-description">
                            <h4>Descripción:</h4>
                            <p>${productDesc}</p>
                        </div>
                        <div class="product-actions">
                            <a href="https://wa.me/573206609029?text=Hola, estoy interesado en ${productName} (Producto VIP)" target="_blank" class="cta-button whatsapp-btn">
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

    // Formulario de cotización
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        // Pre-llenar campos con información del usuario
        const contactNameInput = document.getElementById('contact-name');
        if (contactNameInput) {
            contactNameInput.value = currentUser.name;
        }

        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const businessName = document.getElementById('business-name').value;
            const businessType = document.getElementById('business-type').value;
            const contactName = document.getElementById('contact-name').value;
            const contactPhone = document.getElementById('contact-phone').value;
            const quoteMessage = document.getElementById('quote-message').value;
            
            // En una aplicación real, estos datos se enviarían al servidor
            console.log('Solicitud de cotización:', {
                userId: currentUser.id,
                userEmail: currentUser.email,
                businessName,
                businessType,
                contactName,
                contactPhone,
                quoteMessage,
                date: new Date().toISOString()
            });
            
            alert('¡Gracias por tu solicitud de cotización! Un representante de ventas se pondrá en contacto contigo en breve.');
            this.reset();
            
            // Pre-llenar nuevamente el nombre después del reset
            if (contactNameInput) {
                contactNameInput.value = currentUser.name;
            }
        });
    }

    // Función para asegurar que todas las imágenes estén en formato PNG
    function ensurePngFormat() {
        const images = document.querySelectorAll('.producto-card img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.toLowerCase().endsWith('.png')) {
                // Extraer el nombre base de la imagen
                const baseName = src.split('/').pop().split('.')[0];
                // Reemplazar la extensión con .png
                img.setAttribute('src', src.replace(/\.[^\.]+$/, '.png'));
                console.log(`Converted VIP product image ${src} to PNG format`);
            }
        });
    }

    // Ejecutar la conversión de imágenes
    ensurePngFormat();

    // Animación para las tarjetas de productos VIP
    const vipCards = document.querySelectorAll('.producto-card.vip');
    if (vipCards.length > 0) {
        // Añadir animación de entrada con delay progresivo
        vipCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, 100 * index);
        });
    }

    // Animación para las tarjetas de beneficios
    const benefitCards = document.querySelectorAll('.benefit-card');
    if (benefitCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const benefitObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 100 * index);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        benefitCards.forEach(card => {
            benefitObserver.observe(card);
        });
    }
});