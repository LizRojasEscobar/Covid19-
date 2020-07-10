<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");
date_default_timezone_set('America/Lima');

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = new \Slim\App;
$app->get('/api/contagiados',function(Request $request, Response $response){
  $response = array();
  $contagios = array();
  $query = "SELECT * FROM infectado";
  try{
      $db = new db();
      $db = $db->connectDB();
      $result = $db->query($query);
      if($result->rowCount() > 0){
          $contagiados = $result->fetchAll(PDO::FETCH_OBJ);
          foreach ($contagiados as $contagiado) {
              array_push($contagios, array('type'=>'Contagiado', 'id'=>$contagiado->idInfectado, 'geometry'=>array('type'=>'Point','coordinates'=>[$contagiado->longitud, $contagiado->latitud])));
          }
          $response["conteo"] = "Numero de Contagios: " . count($contagios);
          $response["features"] = $contagios;
          echo json_encode($response);
          $result = null;
          $db = null;
      }
      else{
          echo json_encode("vacio");
      }
  }
  catch(PDOException $e){
      echo '{"error": {"text":'.$e->getMessage().'}}';
  }
});
//(click)="addTriaje(departamento.value, provincia.value, distrito.value, edad.value)"
$app->post('/api/triaje/new',function(Request $request, Response $response){
  $departamento = $request->getParam('departamento');
  $provincia = $request->getParam('provincia');
  $distrito = $request->getParam('distrito');
  $tos = $request->getParam('tos');
  $fiebre = $request->getParam('fiebre');
  $escalofrios = $request->getParam('escalofrios');
  $fluidosNasales = $request->getParam('fluidosNasales');
  $dolorCabeza = $request->getParam('dolorCabeza');
  $dolorEspalda = $request->getParam('dolorEspalda');
  $dificultadRespirar = $request->getParam('dificultadRespirar');
  $perdidaGustoOlfato = $request->getParam('perdidaGustoOlfato');
  $estado = 0;
  $edad = $request->getParam('edad');
  $sexo = $request->getParam('sexo');
  $sql = "INSERT INTO triaje (departamento,provincia,distrito,tos,fiebre,escalofrios,fluidosNasales,
  dolorCabeza,dolorEspalda,dificultadRespirar,perdidaGustoOlfato,estado,edad,sexo) VALUES
  (:departamento,:provincia,:distrito,:tos,:fiebre,:escalofrios,:fluidosNasales,:dolorCabeza,:dolorEspalda,:dificultadRespirar,:perdidaGustoOlfato,:estado,:edad,:sexo)";
  try {
    $db = new db();
    $db  = $db->connectDB();
    $resultado = $db->prepare($sql);
    $resultado->bindParam(':departamento', $departamento);
    $resultado->bindParam(':provincia', $provincia);
    $resultado->bindParam(':distrito', $distrito);
    $resultado->bindParam(':tos', $tos);
    $resultado->bindParam(':fiebre', $fiebre);
    $resultado->bindParam(':escalofrios', $escalofrios);
    $resultado->bindParam(':fluidosNasales', $fluidosNasales);
    $resultado->bindParam(':dolorCabeza', $dolorCabeza);
    $resultado->bindParam(':dolorEspalda', $dolorEspalda);
    $resultado->bindParam(':dificultadRespirar', $dificultadRespirar);
    $resultado->bindParam(':perdidaGustoOlfato', $perdidaGustoOlfato);
    $resultado->bindParam(':estado', $estado);
    $resultado->bindParam(':edad', $edad);
    $resultado->bindParam(':sexo', $sexo);
    $resultado->execute();
    $cont = $tos+$fiebre+$escalofrios+$fluidosNasales+$dolorCabeza+$dolorEspalda+$dificultadRespirar+$perdidaGustoOlfato;
    if(($cont*0.8)>=4)
    {
      $rpta["value"] = 1;
      $rpta["message"] = "Los datos fueron enviados con exito. \nLamentamos informarle que usted posiblemente tenga covid. Le recomendamos que se realice una prueba.";
    }
    else
    {
      $rpta["value"] = 1;
      $rpta["message"] = "Los datos fueron enviados con exito. \nPosiblemente Ud. solo tenga un malestar general. Le recomendamos que se realice una prueba de covid.";
    }
    echo json_encode($rpta);
    $resultado = null;
    $db = null;
  } catch (PDOException $e) {
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
});
$app->post('/api/infectado/new',function(Request $request, Response $response){
  $departamento = $request->getParam('departamento');
  $provincia = $request->getParam('provincia');
  $distrito = $request->getParam('distrito');
  $metododx = $request->getParam('metododx');
  $edad = $request->getParam('edad');
  $fechaResultado = strftime("%Y-%m-%d");
  $latitud = $request->getParam('latitud');
  $longitud = $request->getParam('longitud');
  $sql = "INSERT INTO infectado (departamento,provincia,distrito,metododx,edad,fechaResultado,latitud,longitud) VALUES
  (:departamento,:provincia,:distrito,:metododx,:edad,:fechaResultado,:latitud,:longitud)";
  try {
    $db = new db();
    $db  = $db->connectDB();
    $resultado = $db->prepare($sql);
    $resultado->bindParam(':departamento', $departamento);
    $resultado->bindParam(':provincia', $provincia);
    $resultado->bindParam(':distrito', $distrito);
    $resultado->bindParam(':metododx', $metododx);
    $resultado->bindParam(':edad', $edad );
    $resultado->bindParam(':fechaResultado', $fechaResultado);
    $resultado->bindParam(':latitud', $latitud);
    $resultado->bindParam(':longitud', $longitud);
    $resultado->execute();
    $rpta["value"] = 1;
    $rpta["message"] = "Los datos fueron enviados con exito.";
    echo json_encode($rpta);
    $resultado = null;
    $db = null;
  } catch (PDOException $e) {
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
});
$app->get('/api/login',function(Request $request, Response $response){
  $usuario = $request->getParam('usuario');
  $contrasena = $request->getParam('contrasena');
  $sql = "SELECT idusuario,nombres,apellidos FROM `usuario` WHERE usu='$usuario' AND contrasena='$contrasena'";
  try {
    $db = new db();
    $db  = $db->connectDB();
    $resultado = $db->query($sql);
    if($resultado->rowCount() > 0){
      $usuario = $resultado->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($usuario);
    }else {
      echo json_encode("El usuario no existe.");
    }
    $resultado = null;
    $db = null;
  } catch (PDOException $e) {
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
});
$app->get('/api/consultar',function(Request $request, Response $response){
  $fecha = $request->getParam('fecha');
  $sql = "SELECT departamento,provincia,distrito,edad,DATE_FORMAT(fechaResultado,'%d/%m/%Y') fechaResultado FROM infectado WHERE DATE_FORMAT(fechaResultado,'%d/%m/%Y')='$fecha'";
  try {
    $db = new db();
    $db  = $db->connectDB();
    $resultado = $db->query($sql);
    if($resultado->rowCount() > 0){
      $usuario = $resultado->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($usuario);
    }else {
      echo json_encode("El usuario no existe.");
    }
    $resultado = null;
    $db = null;
  } catch (PDOException $e) {
    echo '{"error" : {"text":'.$e->getMessage().'}';
  }
});
function echoResponse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response);
}
function authenticate(\Slim\Route $route) {
    $headers = apache_request_headers();
    $response = array();
    $app = \Slim\Slim::getInstance();

    if (isset($headers['Authorization'])) {
        $token = $headers['Authorization'];
        if (!($token == API_KEY)) {

            $response["error"] = true;
            $response["message"] = "Acceso denegado. Token inválido";
            echoResponse(401, $response);

            $app->stop();
        }
    } else {
        $response["error"] = true;
        $response["message"] = "Falta token de autorización";
        echoResponse(400, $response);
        $app->stop();
    }
}
