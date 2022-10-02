<?php
require_once 'RoomModel.php';
require_once 'RoomController.php';
require_once 'Response.php';

$data_json = file_get_contents("data.json");
$array_json = json_decode($data_json, true);
$url = parse_url($_SERVER['REQUEST_URI']);

$DB = new RoomModel($array_json);
$rooms = new RoomController($DB);
$response = new Response();

session_start();
$response->addHeaders();

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
      if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        unset($_SESSION['current_user']);
      } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response->resp200(["user" => $_SESSION['current_user']]);
      }
      break;
      
    default:
      $response->resp404();
      break;
  }
} else {
  $isLogin = $url['path'] === "$baseUrl/auth" && $_SERVER['REQUEST_METHOD'] === 'POST';

  if (!$isLogin) {
    $response->resp404();
  }

  $postData = json_decode(file_get_contents("php://input"), true);

  if (isset($postData['user'])) {
    $userEmail = filter_var($postData['user'], FILTER_VALIDATE_EMAIL);

    if (!$userEmail) {
      $response->resp400("wrong email");
    }

    $isExistEmail = in_array($userEmail, array_column($array_json, 'email'));

    if ($userEmail && $isExistEmail) {
      $_SESSION['current_user'] = $userEmail;
      $response->resp200(["user" => $userEmail]);
    } else {
      $response->resp400("user with this email does not exist");
    }   

  } else {
    $response->resp400("missing user email");
  }
}
