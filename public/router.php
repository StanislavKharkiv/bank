<?php
require_once 'RoomModel.php';
require_once 'RoomController.php';

$data_json = file_get_contents("data.json");
$array_json = json_decode($data_json, true);

$data = new RoomModel($array_json);
$rooms = new RoomController($data);

$url = parse_url($_SERVER['REQUEST_URI']);
$baseUrl = '/api';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();

if (isset($_SESSION['current_user'])) {
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
        http_response_code(200);
        echo json_encode(["user" => $_SESSION['current_user']]);
      }
      break;

    default:
      header('HTTP/1.1 404 Not Found');
      http_response_code(404);
      echo json_encode(["error" => "Not Found"]);
      break;
  }
} else {
  if ($url['path'] === "$baseUrl/auth") {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
      http_response_code(403);
      echo json_encode(["error" => 'permission is denied' ]);
      exit();
    }

    $postData = json_decode(file_get_contents("php://input"), true);

    if (isset($postData['user'])) {
      $userEmail = filter_var($postData['user'], FILTER_VALIDATE_EMAIL);
      if (!$userEmail) {
        http_response_code(400);
        echo json_encode(["error" => "wrong email"]);
        exit();
      }

      $isExistEmail = in_array($userEmail, array_column($array_json, 'email'));
      if ($userEmail && $isExistEmail) {
        $_SESSION['current_user'] = $userEmail;
        http_response_code(200);
        echo json_encode(["user" => $userEmail]);
      } else {
        http_response_code(400);
        echo json_encode(["error" => "user with this email does not exist"]);
      }   
    } else {
      http_response_code(400);
      echo json_encode(["error" => "missing user email"]);
    }

  } else {
    header('HTTP/1.1 404 Not Found');
    http_response_code(404);
    echo json_encode(["error" => 'Not Found' ]);
  }
}
