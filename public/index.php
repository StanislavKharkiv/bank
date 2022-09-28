<?php 
  require_once 'RoomModel.php';
  // define(USER_LIST, ['bl@wamoco.de', 'nr@wamoco.de']);

  session_start();
  // if (!isset($_SESSION['currentUser'])) {
  //   header('HTTP/1.0 403 Forbidden');
  //   echo json_encode(["error" => "You are forbidden!"]);
  //   exit();
  // }

  $data_json = file_get_contents("data.json");
  $array_json = json_decode($data_json, true);

  $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
  $uri = explode( '/', $uri );
  
  $roomsData = new RoomModel($array_json);

  if(isset($uri[2])) {
    if ($uri[2] == 'rooms') {
      echo json_encode($roomsData->getUserRooms('bl@wamoco.de'));
    } elseif ($uri[2] == 'login' && $_POST['user']) {
      $_SESSION['currentUser'] == $_POST['user'];
    }
  } else {
    echo json_encode($roomsData->getAllRooms());
  }
  
