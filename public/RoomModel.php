<?php
  class RoomModel {
    protected array $data;

    public function __construct(array $data) {
      $this->data = $data;
    }

    public function getUserRooms(string $user) {
      return array_filter($this->data, function($room) use($user) {
        return ($room['email'] === $user);
      });
    }

    public function getRoomById(string $id) {
      return array_filter($this->data, function($room) use($id) {
        return ($room['room'] === $id);
      });
    }

    public function getAllRooms() {
      return $this->data;
    }
  }
