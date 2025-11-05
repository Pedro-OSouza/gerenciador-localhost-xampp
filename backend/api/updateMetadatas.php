<?php

require_once __DIR__ . '/../helpers.php';
header("Content-Type: application/json; charset=utf-8");

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$folderName = $_POST['folderName'] ?? null;
$description = $_POST['description'] ?? null;
$file = $_FILES['thumbnail'] ?? null;

if(!$folderName){
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing folderName']);
    exit;
}

create_data_dir();

create_metadata_archive();

/* le metadata */
$metadata = read_metadata();
/* inicializa dados se não existir */
if(!isset($metadata[$folderName])){
    $metadata[$folderName] = [
        "thumbnail" => null,
        "description" => null
    ];
}

/* atualiza a imagem se enviada */
if($file && $file['error'] === UPLOAD_ERR_OK){
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $folderName) . '.' . $ext;
    $uploadDir = HUB_DIR . 'backend/data/assets/thumbnails/';

    if(!is_dir($uploadDir)){
        mkdir($uploadDir, 0755, true);
    }
    $uploadPath = $uploadDir . $safeName;

    if(move_uploaded_file($file['tmp_name'], $uploadPath)){
        $metadata[$folderName]['thumbnail'] = to_url('hub/backend/data/assets/thumbnails/' . $safeName);
    }
}

/* atualiza a descrição se enviada */
if($description !== null){
    $metadata[$folderName]['description'] = $description;
}

/* gravar novamente no json */
file_put_contents(METADATA_FILE, json_encode($metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode([
    'ok' => true,
    'folder' => $folderName,
    'metadata' => $metadata[$folderName]
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);