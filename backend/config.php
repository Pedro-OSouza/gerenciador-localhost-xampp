<?php
// caminho absoluto da pasta raiz (htdocs)
define("BASE_DIR", realpath(__DIR__ . "/../../") . DIRECTORY_SEPARATOR);

// caminho da pasta .hub
define("HUB_DIR", realpath(__DIR__ . "/..") . DIRECTORY_SEPARATOR);

define('DATA_DIR', HUB_DIR. 'backend/data' . DIRECTORY_SEPARATOR);

// caminho do arquivo de metadata (não usar realpath aqui)
define("METADATA_FILE", HUB_DIR . "backend/data/metadata.json");

define("CONFIG_DATA", HUB_DIR . 'backend/data/app.config.json');

// URL base do localhost (sem barra duplicada)
define("BASE_URL", "http://localhost/");

// debug
define("API_DEBUG", true);
if (API_DEBUG) {
    ini_set("display_errors", 1);
    error_reporting(E_ALL);
}
