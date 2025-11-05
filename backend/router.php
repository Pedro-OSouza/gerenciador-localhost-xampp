<?php

    require_once __DIR__ . "/config.php";

    header("Content-Type: application/json; charset=utf-8");

    $route = $_GET['route'] ?? null;

    if(!$route) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing route parameter']);
        exit;
    } 

    $endpointFile = __DIR__ . "/api/{$route}.php";

    if(!file_exists($endpointFile)){
        http_response_code(404);
        echo json_encode(['error' => 'Invalid route']);
        exit;
    }

    require_once __DIR__ . "/helpers.php";
    require_once $endpointFile;

?>