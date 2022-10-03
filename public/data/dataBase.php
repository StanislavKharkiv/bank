<?php 
function getData() {
    $data = file_get_contents("data/data.json");
    return json_decode($data, true);
}
