<?php 
  class Response {
    public function addHeaders() {
      header("Access-Control-Allow-Origin: *");
      header("Content-Type: application/json; charset=UTF-8");
    }

    public function resp404() {
      header('HTTP/1.1 404 Not Found');
      http_response_code(404);
      echo json_encode(["error" => 'Not Found' ]);
      exit();
    }
    
    public function resp200(array $data) {
      http_response_code(200);
      echo json_encode($data);
      exit();
    }

    public function resp400(string $error_text) {
      header('HTTP/1.1 400 Bad Request');
      http_response_code(400);
      echo json_encode(["error" => $error_text]);
      exit();
    }

  }
