<?php
require_once 'models/RoomModel.php';
require_once 'models/UserModel.php';
require_once 'controllers/RoomController.php';
require_once 'controllers/UserController.php';
require_once 'Response.php';
require_once 'data/dataBase.php';

$response = new Response();
$DB = getData();
if (!$DB) $response->resp404();

$roomsData = new RoomModel($DB);
$userData = new UserModel($DB);
$rooms = new RoomController($roomsData);
$user = new UserController($userData);

session_start();
$response->addHeaders();

$url = parse_url($_SERVER['REQUEST_URI']);
$baseUrl = '/api';
$isLogged = isset($_SESSION['current_user']);

if ($isLogged) {
  switch ($url['path']) {
    case "$baseUrl/rooms":
      $rooms->getUserRooms($_SESSION['current_user']);
      break;

    case "$baseUrl/room":
      $rooms->getRoom($url['query']);
      break;

    case "$baseUrl/auth":
      switch ($_SERVER['REQUEST_METHOD']) {
        case 'DELETE': 
          $user->logout();
          break;
        case 'GET': 
          $user->getCurrentUser();
          break;
        default:
          $response->resp404();
      }
      break;
      
    default:
      $response->resp404();
  }
} else {
  switch ($url['path']) {
    case "$baseUrl/auth":
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $user->login();
      }
    default:
      $response->resp404();
  }
}
