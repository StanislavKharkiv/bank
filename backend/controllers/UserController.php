<?php
  require_once 'Response.php';

  class UserController extends Response {
    protected object $data;

    public function __construct(object $data) {
      $this->data = $data;
    }
    
    public function login() {
      $formData = json_decode(file_get_contents("php://input"), true);
        
      if (!isset($formData['user'])) $this->resp400("missing user email");

      $userEmail = filter_var($formData['user'], FILTER_VALIDATE_EMAIL);
      if (!$userEmail) $this->resp400("wrong email");
  
      if ($this->data->isUserExist($userEmail)) {
        $_SESSION['current_user'] = $userEmail;
        $this->resp200(["user" => $userEmail]);
      } else {
        $this->resp400("user with this email does not exist");
      }   
    }

    public function logout() {
      unset($_SESSION['current_user']);
    }

    public function getCurrentUser() {
      $this->resp200(["user" => $_SESSION['current_user']]);
    }
  }
