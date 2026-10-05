<?php
/**
 * API Dinámica de Planeamientos 2027 - MEP DDC
 * Escanea físicamente las carpetas en el servidor y devuelve los archivos en tiempo real.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Cache-Control: no-cache, no-store, must-revalidate');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Determinar directorios base
$publicDir = realpath(__DIR__ . '/..');
$baseStorageDir = realpath($publicDir . '/aplicativo-planeamientos-2027');

// 2. Cargar catálogo taxonómico base
$catalogFile = null;
$possibleCatalogPaths = [
    $publicDir . '/data/planes2027.json',
    realpath(__DIR__ . '/../../src/data/planes2027.json'),
    $publicDir . '/planes2027.json'
];

foreach ($possibleCatalogPaths as $path) {
    if ($path && file_exists($path)) {
        $catalogFile = $path;
        break;
    }
}

if (!$catalogFile) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'mensaje' => 'No se encontró el archivo base de taxonomía planes2027.json'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$rawCatalog = file_get_contents($catalogFile);
$planes = json_decode($rawCatalog, true);

if (!is_array($planes)) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'mensaje' => 'Error al decodificar planes2027.json'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. Función auxiliar para formatear tamaños de archivo
function formatBytes($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 1) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 1) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 1) . ' KB';
    } elseif ($bytes > 0) {
        return $bytes . ' B';
    }
    return '0 KB';
}

// 4. Escanear el sistema de archivos real para cada planeamiento
$resultado = [];

foreach ($planes as $plane) {
    $item = $plane;
    $archivosEncontrados = [];
    
    // Ruta relativa normalizada
    $relPath = str_replace(['\\', '/'], DIRECTORY_SEPARATOR, $plane['rutaRelativa'] ?? '');
    $fullFolderPath = $baseStorageDir ? ($baseStorageDir . DIRECTORY_SEPARATOR . $relPath) : null;
    
    if ($fullFolderPath && is_dir($fullFolderPath)) {
        $entries = scandir($fullFolderPath);
        if ($entries !== false) {
            foreach ($entries as $file) {
                // Ignorar directorios y archivos de sistema
                if ($file === '.' || $file === '..' || substr($file, 0, 1) === '.') {
                    continue;
                }
                
                $filePath = $fullFolderPath . DIRECTORY_SEPARATOR . $file;
                if (is_file($filePath)) {
                    $sizeBytes = filesize($filePath);
                    $ext = strtoupper(pathinfo($file, PATHINFO_EXTENSION));
                    $urlRuta = '/aplicativo-planeamientos-2027/' . str_replace('\\', '/', $plane['rutaRelativa']) . '/' . rawurlencode($file);
                    
                    $archivosEncontrados[] = [
                        'nombre' => $file,
                        'tipo' => $ext ?: 'ZIP',
                        'ruta' => $urlRuta,
                        'tamanoBytes' => $sizeBytes,
                        'tamanoLegible' => formatBytes($sizeBytes)
                    ];
                }
            }
        }
    }
    
    // Actualizar archivos y accesos directos
    $item['archivos'] = $archivosEncontrados;
    if (count($archivosEncontrados) > 0) {
        $item['archivoPrincipal'] = $archivosEncontrados[0]['nombre'];
        $item['rutaDescarga'] = $archivosEncontrados[0]['ruta'];
    } else {
        $item['archivoPrincipal'] = null;
        $item['rutaDescarga'] = null;
    }
    
    $resultado[] = $item;
}

echo json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
