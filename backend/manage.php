<?php
  include "createDB.php";
  // Verifica si la solicitud es POST
  if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Se lee el contenido de la entrada de la solicitud HTTP (por ejemplo, el cuerpo de una solicitud POST) 
    // utilizando file_get_contents y php://input que permite leer datos crudos de la entrada.
    $data = file_get_contents("php://input");

    // Se decodifica el contenido JSON que se obtuvo de la entrada, convirtiéndolo en un array asociativo de PHP.
    // El segundo parámetro 'true' le indica a json_decode que debe devolver el resultado como un array asociativo,
    // en lugar de un objeto PHP.
    $data = json_decode($data, true);

    // Verifica que los datos se hayan enviado correctamente
    if(isset($data["title"]) && isset($data["body"])){
      // Inserta los datos en la base de datos
      $insert = $db->prepare("INSERT INTO posts (title, body) VALUES (:title, :body)");
      $insert->execute(array(
                        ":title" => $data["title"],
                        ":body" => $data["body"]
                      ));
      $select_post = $db->prepare("SELECT * FROM posts WHERE id = (SELECT MAX(id) FROM posts)");
      $select_post->execute();
      $post = $select_post->fetch();

      
      $response = array(
        "id" => $post["id"],
        "title" => $post["title"],
        "body" => $post["body"]
      );

      // Responde con el JSON que contiene el "title" y el "body"
      // Convierte la variable $response (que puede ser un array o un objeto en PHP) a formato JSON 
      // y la imprime como respuesta en la salida del servidor. Esto es útil cuando se quiere enviar
      // datos estructurados en formato JSON, por ejemplo, en una API o cuando el cliente espera una 
      // respuesta en este formato (como aplicaciones web o móviles).
      echo json_encode($response);
    }else {
      echo json_encode(["error" => "Faltan datos"]);
    }
  }else if($_SERVER["REQUEST_METHOD"] == "GET"){
    $url = parse_url($_SERVER["REQUEST_URI"]);
    $path = explode("/", $url['path']);
    $postId = end($path);
    if(intval($postId)){
      $select_posts = $db->prepare("SELECT * FROM posts WHERE id = :id");
      $select_posts->execute(array(
        ":id" => $postId
      ));
      $posts = $select_posts->fetchAll();
      // Recorremos el array de posts por referencia, lo que significa que los cambios que hagamos en cada post 
      // se aplicarán directamente en el array original $posts.
      echo json_encode($posts);
    }else {
      $select_posts = $db->prepare("SELECT * FROM posts");
      $select_posts->execute();
      $posts = $select_posts->fetchAll();
      // Recorremos el array de posts por referencia, lo que significa que los cambios que hagamos en cada post 
      // se aplicarán directamente en el array original $posts.
      echo json_encode($posts);
    }
  }else if($_SERVER["REQUEST_METHOD"] == "PATCH"){
    $url = parse_url($_SERVER["REQUEST_URI"]);
    $path = explode("/", $url['path']);
    $postId = end($path);
    // Se lee el contenido de la entrada de la solicitud HTTP (por ejemplo, el cuerpo de una solicitud POST) 
    // utilizando file_get_contents y php://input que permite leer datos crudos de la entrada.
    $data = file_get_contents("php://input");

    // Se decodifica el contenido JSON que se obtuvo de la entrada, convirtiéndolo en un array asociativo de PHP.
    // El segundo parámetro 'true' le indica a json_decode que debe devolver el resultado como un array asociativo,
    // en lugar de un objeto PHP.
    $data = json_decode($data, true);
    if(isset($data["title"]) && isset($data["body"])){
      $modify = $db->prepare("UPDATE posts SET title = :title, body = :body WHERE id = :id");
  
      $modify->execute(array(
        ":title" => $data["title"],
        ":body" => $data["body"],
      ));
      echo json_encode(['message' => 'Se modifico el post: '.$postId]);
    }
  }
  else if($_SERVER["REQUEST_METHOD"] == "DELETE"){
    $url = parse_url($_SERVER["REQUEST_URI"]);
    $path = explode("/", $url['path']);
    $postId = end($path);
    $delete = $db->prepare("DELETE FROM posts WHERE id = :id");
    $delete->execute(array(
      ":id" => $postId
    ));
    echo json_encode(['message' => 'Se elimina el post. ID: '.$postId]);
  }
  else {
        // Si el método no es ni GET ni POST, se responde con un código HTTP 405 (Método no permitido)
        header("HTTP/1.1 405 Method Not Allowed");
        echo json_encode(["error" => "Método no permitido"]);
    }
?>