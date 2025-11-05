<?php
require_once __DIR__ . '/../helpers.php';

header('Content-Type: application/json; charset=utf-8');

$requestedPath = $_GET['path'] ?? '/';
$path = safe_path($requestedPath);

if (!$path || !is_dir($path)) {
    echo json_encode([
        'ok' => false,
        'error' => 'invalid_path',
        'path' => $requestedPath
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

$folders = list_dir($path);
$metadata = read_metadata();

foreach ($folders as &$folder) {
    $name = $folder['name'];
    $folder['metadata'] = get_metadata_for($name);
    $folder['url'] = to_url($folder['path']);
}
unset($folder);

echo json_encode([
    'ok' => true,
    'path' => $requestedPath,
    'items' => $folders
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
