<?php
  require_once 'Response.php';

  class RoomController extends Response {
    protected object $data;

    public function __construct(object $data) {
      $this->data = $data;
    }

    public function getUserRooms(string $userEmail) {
      $user_rooms = $this->data->getUserRooms($userEmail);
      $rooms = array_reduce($user_rooms, function($total, $current) {
        ['room' => $room, 'price' => $price, 'qty' => $qty] = $current;
        $total[$room] = round(($total[$room] ?? 0) + $price * $qty, 4);
        return $total;
      }, []);
      
      echo json_encode($rooms);
    }

    public function getRoom($query) {
      parse_str($query, $params);
      if (isset($params['id'])) {
        echo json_encode($this->data->getRoomById($params['id']));
      } else {
        $this->resp400('missing room id query parameter');
      }
    }

    public function getAllRooms() {
      return $this->data;
    }
  }
