<?php

    require_once __DIR__ . "/config.php";

    
    function safe_path($relativePath = '/'){
        $path = realpath(BASE_DIR . DIRECTORY_SEPARATOR . ltrim($relativePath, '/\\'));
        if($path == false || strpos($path, BASE_DIR) !== 0){
            return BASE_DIR;
        }
        return $path;
    }

    function create_data_dir(){
        if(!is_dir(DATA_DIR)){
            mkdir(DATA_DIR, 0777, true);
        }
    }

    function create_metadata_archive(){
        if(!file_exists(METADATA_FILE)){
            file_put_contents(METADATA_FILE, '');
        }
    }

    function list_dir($path){
        $result = [];
        if(!$path){
            return $result;
        }

        $items = scandir($path);

        foreach($items as $item){
            if($item === "." || $item === "..") continue;

            $fullpath = $path . DIRECTORY_SEPARATOR . $item;
            $isdir = is_dir($fullpath);

            if($isdir && substr($item, 0, 1) !== "."){
                $result[] = [
                    'name' => $item,
                    'type' => 'folder',
                    'path' => '/' . ltrim(str_replace('\\','/', str_replace(BASE_DIR, '', $fullpath)), '/'),
                    'has_index' => has_index_file($fullpath)
                ];
            }
        }

        return $result;
    }

    function has_index_file($dir){
        $indexFiles = ['index.php', 'index.html', 'index.htm'];

        foreach($indexFiles as $file){
            if(file_exists($dir . DIRECTORY_SEPARATOR . $file)){
                return true;
            }
        }
        return false;
    }

    function read_metadata(){
        if(!file_exists(METADATA_FILE)){
            return [];
        }

            $json = file_get_contents(METADATA_FILE);
            $data = json_decode($json, true);

            return is_array($data) ? $data : [];
    }

    function read_config(){
        if(!file_exists(CONFIG_DATA)){
            return [];
        }

            $json = file_get_contents(CONFIG_DATA);
            $data = json_decode($json, true);

            return is_array($data) ? $data : [];
    }

    function get_metadata_for($folderName){
        $metadata = read_metadata();

        return $metadata[$folderName] ?? [
            'thumbnail' => null,
            'description' => null
        ];
    }

    function to_url($relativePath){
        $normalized = str_replace('\\', '/', $relativePath);
        return BASE_URL . ltrim($normalized, '/');
    }