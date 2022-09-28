<?php
  class RoomController {
    protected object $data;

    public function __construct(object $data) {
      $this->data = $data;
    }

    public function addHeaders() {
      header("Access-Control-Allow-Origin: *");
      header("Content-Type: application/json; charset=UTF-8");
    }

    public function sendError($error_text) {
        header('HTTP/1.1 400 Bad Request');
        http_response_code(400);
        echo json_encode(["error" => $error_text]);
    }

    public function getUserRooms(string $userEmail) {
      $this->addHeaders();
      echo json_encode($this->data->getUserRooms($userEmail));
    }

    public function getRoom($query) {
      $this->addHeaders();
      parse_str($query, $params);
      if (isset($params['id'])) {
        echo json_encode($this->data->getRoomById($params['id']));
      } else {
        $this->sendError('missing room id query parameter');
      }
    }

    public function getAllRooms() {
      return $this->data;
    }
  }
