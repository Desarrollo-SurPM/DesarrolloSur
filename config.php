<?php
/**
 * Configuración de correo para cPanel
 * 
 * INSTRUCCIONES PARA CONFIGURAR:
 * 1. Reemplaza los valores de ejemplo con tus credenciales reales de cPanel
 * 2. Asegúrate de que este archivo tenga permisos 644 (lectura/escritura para propietario, solo lectura para grupo y otros)
 * 3. Por seguridad, considera mover este archivo fuera del directorio público si es posible
 */

// Configuración del servidor de correo
define('MAIL_HOST', 'mail.desarrollosur.cl'); // Servidor de correo de cPanel
define('MAIL_PORT', 465); // Puerto SMTP SSL
define('MAIL_ENCRYPTION', 'ssl'); // Usando SSL según tu configuración

// Credenciales de autenticación
define('MAIL_USERNAME', 'info@desarrollosur.cl'); // Tu dirección de correo completa
define('MAIL_PASSWORD', 'G9eUKes3cw2ndrB'); // Tu contraseña de correo

// Configuración del remitente
define('MAIL_FROM_EMAIL', 'info@desarrollosur.cl'); // Dirección del remitente
define('MAIL_FROM_NAME', 'DesarrolloSur'); // Nombre del remitente

// Configuración del destinatario
define('MAIL_TO_EMAIL', 'info@desarrollosur.cl'); // Dirección donde recibirás los mensajes
define('MAIL_TO_NAME', 'DesarrolloSur'); // Nombre del destinatario

// Configuración adicional
define('MAIL_REPLY_TO', 'info@desarrollosur.cl'); // Dirección de respuesta
define('MAIL_SUBJECT_PREFIX', '[DesarrolloSur] '); // Prefijo para el asunto

// Configuración de seguridad
define('ALLOWED_ORIGINS', [
    'http://localhost:8000',
    'https://desarrollosur.cl',
    'https://www.desarrollosur.cl'
]); // Dominios permitidos para enviar formularios

// Configuración de logging
define('LOG_EMAILS', true); // true para guardar log de emails enviados
define('LOG_FILE', __DIR__ . '/email_log.txt'); // Ruta del archivo de log

// Configuración de límites
define('MAX_EMAIL_LENGTH', 500); // Máximo de caracteres en el mensaje
define('MAX_NAME_LENGTH', 100); // Máximo de caracteres en el nombre
define('RATE_LIMIT_MINUTES', 5); // Minutos entre envíos desde la misma IP

?>

<!-- 
INSTRUCCIONES PARA OBTENER LA CONFIGURACIÓN DE cPanel:

1. ACCEDER A cPanel:
   - Inicia sesión en tu cPanel
   - Busca la sección "Email" o "Correo electrónico"

2. CONFIGURACIÓN DEL SERVIDOR:
   - En cPanel, ve a "Email Accounts" o "Cuentas de correo"
   - Busca "Configure Mail Client" o "Configurar cliente de correo"
   - Anota los siguientes datos:
     * Servidor de correo saliente (SMTP): generalmente mail.tudominio.com
     * Puerto: 587 (TLS) o 465 (SSL)
     * Tipo de cifrado: TLS o SSL

3. CREAR CUENTA DE CORREO:
   - En "Email Accounts", crea una cuenta como contacto@tudominio.com
   - Anota la contraseña que asignes

4. INFORMACIÓN NECESARIA:
   - Dominio de tu sitio web
   - Credenciales de la cuenta de correo creada
   - Configuración SMTP de tu proveedor de hosting

5. VERIFICAR CONFIGURACIÓN:
   - Algunos proveedores requieren habilitar "Less secure app access"
   - Verifica que el puerto SMTP esté abierto en tu hosting
   - Confirma que tu hosting soporte el envío de correos via PHP

EJEMPLO DE CONFIGURACIÓN TÍPICA:
- MAIL_HOST: 'mail.tudominio.com'
- MAIL_PORT: 587
- MAIL_ENCRYPTION: 'tls'
- MAIL_USERNAME: 'contacto@tudominio.com'
- MAIL_PASSWORD: 'contraseña_segura'
-->