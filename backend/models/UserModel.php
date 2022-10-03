<?php
  class UserModel {
    protected array $data;

    public function __construct(array $data) {
      $this->data = $data;
    }

    public function isUserExist(string $email) {
      return in_array($email, array_column($this->data, 'email'));
      // return array_filter($this->data, function($item) use($email) {
      //   return ($item['email'] === $email);
      // });
    }
  }
