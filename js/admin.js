document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario es administrador (en una aplicación real, esto se verificaría en el servidor)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.email !== 'admin@provebebidas.com') {
        alert('No tienes permisos para acceder a esta página.');
        window.location.href = 'index.html';
        return;
    }

    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Cambio entre pestañas
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminContents = document.querySelectorAll('.admin-content');

    adminTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabTarget = this.getAttribute('data-tab');
            
            // Actualizar tabs
            adminTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Actualizar contenidos
            adminContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabTarget}-content`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Cargar solicitudes VIP pendientes
    loadPendingRequests();
    
    // Cargar todos los usuarios
    loadAllUsers();

    // Función para cargar solicitudes VIP pendientes
    function loadPendingRequests() {
        const pendingRequestsContainer = document.getElementById('pending-requests-container');
        const pendingUsers = users.filter(user => user.vipApproved === false);
        
        if (pendingUsers.length === 0) {
            pendingRequestsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <h4>No hay solicitudes pendientes</h4>
                    <p>Todas las solicitudes de acceso VIP han sido procesadas.</p>
                </div>
            `;
            return;
        }
        
        let tableHTML = `
            <table class="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha de Registro</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        pendingUsers.forEach(user => {
            const registrationDate = new Date(user.registrationDate).toLocaleDateString();
            
            tableHTML += `
                <tr data-user-id="${user.id}">
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${registrationDate}</td>
                    <td><span class="status-badge status-pending">Pendiente</span></td>
                    <td class="user-actions">
                        <button class="action-btn approve-btn" data-user-id="${user.id}">Aprobar</button>
                        <button class="action-btn reject-btn" data-user-id="${user.id}">Rechazar</button>
                    </td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        pendingRequestsContainer.innerHTML = tableHTML;
        
        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                approveVipRequest(userId);
            });
        });
        
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                rejectVipRequest(userId);
            });
        });
    }

    // Función para cargar todos los usuarios
    function loadAllUsers() {
        const allUsersContainer = document.getElementById('all-users-container');
        
        if (users.length === 0) {
            allUsersContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users-slash"></i>
                    <h4>No hay usuarios registrados</h4>
                    <p>Aún no hay usuarios registrados en el sistema.</p>
                </div>
            `;
            return;
        }
        
        let tableHTML = `
            <table class="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha de Registro</th>
                        <th>Estado VIP</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        users.forEach(user => {
            const registrationDate = new Date(user.registrationDate).toLocaleDateString();
            let statusBadge = '';
            
            if (user.vipApproved === true) {
                statusBadge = '<span class="status-badge status-approved">Aprobado</span>';
            } else if (user.vipApproved === false) {
                statusBadge = '<span class="status-badge status-pending">Pendiente</span>';
            } else {
                statusBadge = '<span class="status-badge status-rejected">Rechazado</span>';
            }
            
            tableHTML += `
                <tr data-user-id="${user.id}">
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${registrationDate}</td>
                    <td>${statusBadge}</td>
                    <td class="user-actions">
            `;
            
            if (user.vipApproved !== true) {
                tableHTML += `<button class="action-btn approve-btn" data-user-id="${user.id}">Aprobar</button>`;
            }
            
            if (user.vipApproved !== false) {
                tableHTML += `<button class="action-btn reject-btn" data-user-id="${user.id}">Rechazar</button>`;
            }
            
            tableHTML += `
                    </td>
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        allUsersContainer.innerHTML = tableHTML;
        
        // Agregar event listeners a los botones de acción
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                approveVipRequest(userId);
            });
        });
        
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                rejectVipRequest(userId);
            });
        });
    }

    // Función para aprobar una solicitud VIP
    function approveVipRequest(userId) {
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].vipApproved = true;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Actualizar la interfaz
            loadPendingRequests();
            loadAllUsers();
            
            alert('Solicitud VIP aprobada correctamente.');
        }
    }

    // Función para rechazar una solicitud VIP
    function rejectVipRequest(userId) {
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].vipApproved = null; // Usar null para indicar rechazo
            localStorage.setItem('users', JSON.stringify(users));
            
            // Actualizar la interfaz
            loadPendingRequests();
            loadAllUsers();
            
            alert('Solicitud VIP rechazada.');
        }
    }
});