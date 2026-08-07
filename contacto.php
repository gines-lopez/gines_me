<?php
declare(strict_types=1);

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /contacto/');
    exit;
}

$destino = 'docentegineslopez@gmail.com';

function limpiar(string $valor): string
{
    $valor = trim($valor);
    return str_replace(["\r", "\n"], '', $valor);
}

function mostrarPagina(string $titulo, string $mensaje, bool $ok): void
{
    http_response_code($ok ? 200 : 400);
    ?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title><?= htmlspecialchars($titulo) ?> — Ginés López</title>
<style>
  :root { --bg:#FDFDFC; --ink:#14151A; --ink-muted:#5B5E66; --accent:#1D3557; --rule:#E7E7E3; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#121214; --ink:#F1F1EE; --ink-muted:#9A9CA3; --accent:#8FA8D9; --rule:#2A2A2E; }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--bg); color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    text-align: center; padding: 2rem;
  }
  .card { max-width: 480px; }
  h1 { font-size: 1.6rem; margin: 0 0 1rem; }
  p { color: var(--ink-muted); line-height: 1.6; }
  a { color: var(--accent); text-decoration: none; border-bottom: 1px solid var(--rule); }
  a:hover { border-color: var(--accent); }
</style>
</head>
<body>
  <div class="card">
    <h1><?= htmlspecialchars($titulo) ?></h1>
    <p><?= htmlspecialchars($mensaje) ?></p>
    <p><a href="/contacto/">&larr; Volver al formulario</a></p>
  </div>
</body>
</html>
<?php
    exit;
}

// Honeypot: si un bot rellena este campo oculto, fingimos éxito sin enviar nada.
if (!empty($_POST['asunto'] ?? '')) {
    mostrarPagina('¡Gracias!', 'Tu mensaje se ha enviado correctamente.', true);
}

// Palabra de verificación: no está en ningún sitio del envío salvo tecleada por la persona.
$verificacion = strtoupper(trim($_POST['verificacion'] ?? ''));
if ($verificacion !== 'HOLA') {
    mostrarPagina(
        'No hemos podido verificar tu mensaje',
        'La palabra de verificación no es correcta. Vuelve al formulario e inténtalo de nuevo.',
        false
    );
}

$nombre = limpiar((string) ($_POST['nombre'] ?? ''));
$email = limpiar((string) ($_POST['email'] ?? ''));
$mensaje = trim((string) ($_POST['mensaje'] ?? ''));

if ($nombre === '' || $email === '' || $mensaje === '') {
    mostrarPagina('Faltan datos', 'Rellena tu nombre, tu correo y el mensaje antes de enviarlo.', false);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    mostrarPagina('Correo no válido', 'Revisa el correo de contacto que has escrito.', false);
}

if (mb_strlen($nombre) > 80 || mb_strlen($mensaje) > 4000) {
    mostrarPagina('Mensaje demasiado largo', 'Acorta el nombre o el mensaje e inténtalo de nuevo.', false);
}

$asunto = '=?UTF-8?B?' . base64_encode('Nuevo mensaje de contacto — gines.me') . '?=';

$cuerpo = "Nombre: {$nombre}\n";
$cuerpo .= "Correo: {$email}\n\n";
$cuerpo .= "Mensaje:\n{$mensaje}\n";

$nombreCabecera = str_replace('"', '', $nombre);

$cabeceras = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: gines.me <no-reply@gines.me>',
    'Reply-To: "' . $nombreCabecera . '" <' . $email . '>',
];

$enviado = mail($destino, $asunto, $cuerpo, implode("\r\n", $cabeceras));

if ($enviado) {
    mostrarPagina('¡Gracias!', 'Tu mensaje se ha enviado correctamente. Te responderé lo antes posible.', true);
}

mostrarPagina(
    'Algo ha fallado',
    'No hemos podido enviar tu mensaje. Escríbeme directamente a docentegineslopez@gmail.com.',
    false
);
