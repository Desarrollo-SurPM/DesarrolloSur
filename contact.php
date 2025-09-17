<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de correo
$to_email = "info@desarrollosur.cl"; // Cambia por tu email
$from_email = "noreply@desarrollosur.cl"; // Email del dominio (debe existir en cPanel)
$subject_prefix = "Nuevo mensaje desde DesarrolloSur - ";

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Fallback para formularios normales
    $input = $_POST;
}

// Validar campos requeridos
$required_fields = ['name', 'email', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = "El campo " . ucfirst($field) . " es requerido";
    }
}

// Validar email
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "El email no es válido";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Sanitizar datos
$name = htmlspecialchars(trim($input['name']));
$email = htmlspecialchars(trim($input['email']));
$company = htmlspecialchars(trim($input['company'] ?? ''));
$message = htmlspecialchars(trim($input['message']));

// Crear el mensaje
$email_subject = $subject_prefix . "Mensaje de " . $name;

$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { background: white; padding: 10px; border-left: 4px solid #667eea; margin-top: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nuevo mensaje desde DesarrolloSur</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nombre:</div>
                <div class='value'>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>{$email}</div>
            </div>";

if (!empty($company)) {
    $email_body .= "
            <div class='field'>
                <div class='label'>Empresa:</div>
                <div class='value'>{$company}</div>
            </div>";
}

$email_body .= "
            <div class='field'>
                <div class='label'>Mensaje:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Fecha:</div>
                <div class='value'>" . date('d/m/Y H:i:s') . "</div>
            </div>
        </div>
    </div>
</body>
</html>";

// Headers del email
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $from_email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
);

// Intentar enviar el email
try {
    $mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        // Log del mensaje (opcional)
        $log_entry = date('Y-m-d H:i:s') . " - Mensaje enviado desde: {$email} - Nombre: {$name}\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true, 
            'message' => '¡Mensaje enviado correctamente! Te responderemos pronto.'
        ]);
    } else {
        throw new Exception('Error al enviar el email');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error interno del servidor. Por favor, intenta más tarde.'
    ]);
    
    // Log del error
    $error_log = date('Y-m-d H:i:s') . " - Error: " . $e->getMessage() . "\n";
    file_put_contents('contact_errors.txt', $error_log, FILE_APPEND | LOCK_EX);
}
?>