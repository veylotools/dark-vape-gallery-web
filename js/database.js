// Módulo para manejar la base de datos JSON

const Database = {
    // Cargar usuarios desde el archivo JSON
    async loadUsers() {
        try {
            const response = await fetch('/data/users.json');
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo de usuarios');
            }
            const data = await response.json();
            return data.users || [];
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            // Fallback a localStorage si no se puede cargar el archivo
            return JSON.parse(localStorage.getItem('users')) || [];
        }
    },

    // Guardar usuario en localStorage (simulación de guardado en JSON)
    saveUser(user) {
        // Obtener usuarios actuales
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verificar si el usuario ya existe
        const existingUserIndex = users.findIndex(u => u.id === user.id);
        
        if (existingUserIndex !== -1) {
            // Actualizar usuario existente
            users[existingUserIndex] = user;
        } else {
            // Agregar nuevo usuario
            users.push(user);
        }
        
        // Guardar en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // En una aplicación real, aquí se enviaría una solicitud al servidor
        // para actualizar el archivo JSON
        console.log('Usuario guardado:', user);
        
        return user;
    },

    // Actualizar estado VIP de un usuario
    updateVipStatus(userId, status) {
        // Obtener usuarios actuales
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Encontrar el usuario
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            // Actualizar estado VIP
            users[userIndex].vipApproved = status;
            
            // Guardar en localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // En una aplicación real, aquí se enviaría una solicitud al servidor
            // para actualizar el archivo JSON
            console.log(`Estado VIP de usuario ${userId} actualizado a: ${status}`);
            
            return true;
        }
        
        return false;
    },

    // Obtener usuario por ID
    getUserById(userId) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(u => u.id === userId) || null;
    },

    // Obtener usuario por email
    getUserByEmail(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(u => u.email === email) || null;
    }
};