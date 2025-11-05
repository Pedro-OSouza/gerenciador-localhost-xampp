<?php
    require_once __DIR__ .'/../helpers.php';
    header("Content-Type: application/json; charset=utf-8");

    $config = read_config();

    echo json_encode([
        'ok' => true,
        'data' => $config
    ]);

