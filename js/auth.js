document.addEventListener('DOMContentLoaded', function() {
    // Base de datos simulada para usuarios (en una aplicación real, esto estaría en el servidor)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Crear usuario administrador si no existe
    if (!users.some(u => u.email === 'admin@provebebidas.com')) {
        users.push({
            id: 'admin-' + Date.now().toString(),
            name: 'Administrador',
            email: 'admin@provebebidas.com',
            password: 'admin123', // En una aplicación real, usar contraseñas seguras y hash
            registrationDate: new Date().toISOString(),
            isAdmin: true,
            vipApproved: true
        });
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuario administrador creado.');
    }
    
    // Verificar si hay un usuario en sesión
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateUIForAuthState(currentUser);

    // Cambio entre formularios de login y registro
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabTarget = this.getAttribute('data-tab');
                
                // Actualizar tabs
                authTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Actualizar formularios
                authForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${tabTarget}-form`) {
                        form.classList.add('active');
                    }
                });
            });
        });
    }

    // Mostrar/ocultar contraseña
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    if (togglePasswordButtons.length > 0) {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        });
    }

    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const remember = document.getElementById('remember').checked;
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Guardar sesión
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    remember: remember,
                    vipApproved: user.vipApproved // Guardar el estado de aprobación VIP
                }));
                
                alert('¡Inicio de sesión exitoso!');
                // Redirigir a la página principal en lugar de directamente a productos VIP
                window.location.href = 'index.html';
            } else {
                alert('Correo electrónico o contraseña incorrectos.');
            }
        });
    }

    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Validaciones
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            
            if (!terms) {
                alert('Debes aceptar los términos y condiciones.');
                return;
            }
            
            // Verificar si el usuario ya existe
            if (users.some(u => u.email === email)) {
                alert('Este correo electrónico ya está registrado.');
                return;
            }
            
            // Crear nuevo usuario
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                password: password,
                registrationDate: new Date().toISOString(),
                vipApproved: false // Por defecto, el usuario no tiene acceso VIP aprobado
            };
            
            // Guardar en la base de datos local
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Iniciar sesión automáticamente
            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                remember: true,
                vipApproved: false // El usuario nuevo no tiene acceso VIP aprobado
            }));
            
            alert('¡Registro exitoso! Tu solicitud de acceso VIP será revisada por nuestro equipo.');
            window.location.href = 'index.html';
        });
    }

    // Botón de cerrar sesión
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            alert('Has cerrado sesión correctamente.');
            window.location.href = 'index.html';
        });
    }

    // Función para actualizar la interfaz según el estado de autenticación
    function updateUIForAuthState(user) {
        const userMenus = document.querySelectorAll('.user-menu');
        const loginBtns = document.querySelectorAll('.login-btn');
        
        if (user) {
            // Usuario autenticado
            document.querySelectorAll('.user-name').forEach(el => {
                el.textContent = user.name.split(' ')[0] + ' ';
                el.innerHTML += '<i class="fas fa-chevron-down"></i>';
            });
            
            // Agregar enlace al panel de administración si es admin
            const userDropdowns = document.querySelectorAll('.user-dropdown');
            userDropdowns.forEach(dropdown => {
                // Eliminar enlace de admin si existe
                const adminLink = dropdown.querySelector('.admin-link');
                if (adminLink) {
                    adminLink.remove();
                }
                
                // Agregar enlace si es admin
                if (user.email === 'admin@provebebidas.com') {
                    const adminLinkElement = document.createElement('a');
                    adminLinkElement.href = 'admin.html';
                    adminLinkElement.className = 'admin-link';
                    adminLinkElement.innerHTML = '<i class="fas fa-cog"></i> Panel de Administración';
                    
                    // Insertar al principio del dropdown
                    if (dropdown.firstChild) {
                        dropdown.insertBefore(adminLinkElement, dropdown.firstChild);
                    } else {
                        dropdown.appendChild(adminLinkElement);
                    }
                }
            });
            
            userMenus.forEach(menu => menu.style.display = 'block');
            loginBtns.forEach(btn => btn.style.display = 'none');
            
            // Redirigir si está en la página de login
            if (window.location.pathname.includes('login.html')) {
                window.location.href = 'index.html';
            }
        } else {
            // Usuario no autenticado
            userMenus.forEach(menu => menu.style.display = 'none');
            loginBtns.forEach(btn => btn.style.display = 'block');
            
            // Redirigir si está en la página de productos VIP o admin
            if (window.location.pathname.includes('productos-vip.html') || 
                window.location.pathname.includes('admin.html')) {
                window.location.href = 'login.html';
            }
        }
    }

    // Verificar acceso a páginas protegidas
    function checkProtectedPages() {
        const protectedPages = ['perfil.html', 'pedidos.html'];
        const vipProtectedPages = ['productos-vip.html'];
        const currentPath = window.location.pathname;
        
        // Verificar páginas que requieren solo inicio de sesión
        const isProtectedPage = protectedPages.some(page => currentPath.includes(page));
        if (isProtectedPage && !currentUser) {
            window.location.href = 'login.html';
            return;
        }
        
        // Verificar páginas que requieren aprobación VIP
        const isVipProtectedPage = vipProtectedPages.some(page => currentPath.includes(page));
        if (isVipProtectedPage) {
            if (!currentUser) {
                window.location.href = 'login.html';
                return;
            }
            
            if (!currentUser.vipApproved) {
                alert('No tienes acceso a la sección VIP. Tu solicitud está pendiente de aprobación.');
                window.location.href = 'index.html';
                return;
            }
        }
    }
    
    // Ejecutar verificación de páginas protegidas
    checkProtectedPages();
});