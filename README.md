# ProveBebidas - Sitio Web de Proveedor de Bebidas

## Descripción

ProveBebidas es un sitio web para un proveedor de bebidas que ofrece jugos, aguas, bebidas energéticas y otros productos. El sitio incluye una sección VIP exclusiva para clientes registrados, con productos premium y beneficios especiales.

## Características

- Diseño responsive adaptable a dispositivos móviles y de escritorio
- Catálogo de productos estándar accesible para todos los visitantes
- Sección VIP con productos exclusivos para clientes registrados
- Sistema de autenticación de usuarios (registro e inicio de sesión)
- Sistema de aprobación VIP para usuarios registrados
- Panel de administración para gestión de usuarios
- Almacenamiento local de datos de usuario
- Formularios de contacto y solicitud de cotización
- Conversión automática de imágenes a formato PNG

## Estructura del Proyecto

```
provedor/
├── index.html              # Página principal
├── login.html              # Página de inicio de sesión y registro
├── productos-vip.html      # Página de productos VIP (acceso restringido)
├── admin.html              # Panel de administración (acceso restringido)
├── css/
│   └── styles.css          # Estilos del sitio
├── js/
│   ├── script.js           # Funcionalidad general
│   ├── auth.js             # Sistema de autenticación
│   ├── vip.js              # Funcionalidad específica para productos VIP
│   └── admin.js            # Funcionalidad del panel de administración
├── images/                  # Imágenes del sitio (todas en formato PNG)
│   ├── 1.png               # Jugo Hit
│   ├── 2.png               # Agua Mineral
│   ├── 3.png               # Bebidas Energéticas
│   ├── 4.png               # Refrescos
│   ├── 5.png               # Jugo Premium Orgánico (VIP)
│   ├── 6.png               # Agua Mineral Importada (VIP)
│   ├── 7.png               # Bebida Energética Premium (VIP)
│   ├── 8.png               # Té Helado Gourmet (VIP)
│   ├── 9.png               # Smoothie Premium (VIP)
│   ├── 10.png              # Bebida Detox Exclusiva (VIP)
│   ├── hero-bg.jpg         # Fondo de la sección hero
│   └── vip-bg.jpg          # Fondo de la sección VIP
└── README.md               # Documentación del proyecto
```

## Instalación y Uso

1. Clona o descarga este repositorio en tu servidor web o entorno de desarrollo local.
2. No se requieren dependencias adicionales, ya que el proyecto utiliza JavaScript puro.
3. Abre el archivo `index.html` en tu navegador para acceder al sitio.

## Acceso a la Sección VIP 

Para acceder a la sección VIP, debes registrarte y esperar la aprobación de un administrador:

1. Haz clic en "Iniciar Sesión" en la barra de navegación.
2. Si ya tienes una cuenta, ingresa tus credenciales.
3. Si eres nuevo, haz clic en la pestaña "Registrarse" y completa el formulario.
4. Después de registrarte, tu solicitud de acceso VIP quedará pendiente de aprobación.
5. Un administrador deberá aprobar tu solicitud antes de que puedas acceder a los productos VIP.
6. Una vez aprobada tu solicitud, verás un enlace a la sección VIP en la página principal.

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS para una fácil personalización)
- JavaScript (ES6+)
- LocalStorage para la persistencia de datos de usuario
- SVG para las imágenes de productos

## Personalización

Puedes personalizar fácilmente el sitio modificando las variables CSS en el archivo `styles.css`. Las principales variables se encuentran al inicio del archivo:

```css
:root {
    --primary-color: #0056b3;
    --secondary-color: #ff9800;
    --accent-color: #4caf50;
    --text-color: #333;
    --light-text: #fff;
    --dark-bg: #222;
    --light-bg: #f5f5f5;
    --border-color: #ddd;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
    --border-radius: 5px;
    --vip-color: #ffc107;
    --vip-bg: rgba(255, 193, 7, 0.1);
}
```

## Notas Importantes

- Este proyecto utiliza LocalStorage para almacenar datos de usuario, lo que significa que los datos se guardan en el navegador del cliente. En un entorno de producción, se recomienda implementar un backend con una base de datos real.
- Las imágenes se generan como SVG y se convierten automáticamente a PNG mediante JavaScript.
- El sistema crea automáticamente un usuario administrador predeterminado con las siguientes credenciales:
  - Email: admin@provebebidas.com
  - Contraseña: admin123
- Por seguridad, se recomienda cambiar estas credenciales en un entorno de producción.
- Los formularios están configurados para simular el envío de datos, pero no realizan envíos reales. En un entorno de producción, deberás implementar la lógica de backend correspondiente.

## Mejoras Futuras

- Implementación de un backend real con base de datos para usuarios y productos
- Carrito de compras y sistema de pedidos
- Panel de administración para gestionar productos y usuarios
- Integración con pasarelas de pago
- Optimización de rendimiento y accesibilidad

## Licencia

Este proyecto está disponible para uso libre. Puedes modificarlo y adaptarlo según tus necesidades.