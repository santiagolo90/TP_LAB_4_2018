<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once 'vendor/autoload.php';
require_once 'clases/AccesoDatos.php';
require_once 'clases/empleadoApi.php';
require_once 'clases/vehiculoApi.php';
require_once 'clases/viajeApi.php';
require_once 'clases/encuestaApi.php';
//require_once 'clases/cocheraApi.php';
//require_once 'clases/estacionamientoApi.php';
require_once 'clases/loginApi.php';
require_once 'clases/MWparaCORS.php';
require_once 'clases/MWparaAutentificar.php';
require_once 'clases/excel.php';
require_once 'clases/pdf.php';
require_once 'clases/foto.php';


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*
¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);
$app->add(function($request, $response, $next){
  $response = $next($request, $response);

  return $response
          ->withHeader('Access-Control-Allow-Origin', '*')
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST');
});


$app->get('[/]', function (Request $request, Response $response) {    
  $response->getBody()->write("Bienvenido!!!");
  return $response;

})->add(\MWparaCORS::class . ':HabilitarCORSTodos');
//(POST email y clave)
$app->post('/Login[/]', \loginApi::class . ':login')->add(\MWparaCORS::class . ':HabilitarCORSTodos');
$app->post('/datosToken[/]', \loginApi::class . ':datosToken')->add(\MWparaAutentificar::class . ':VerificarUser')->add(\MWparaCORS::class . ':HabilitarCORSTodos');


$app->group('/empleado', function () {

    //7-De​ los empleados c- alta suspenderlos​ y borrarlos (POST nombre sexo email clave turno perfil estado) (FILES foto)
    $this->post('/alta[/]', \empleadoApi::class . ':CargarUno');
    //Trae todo ( si le agrega una letra a args trae solo los suspendidos)
    $this->get('/[{suspendidos}]', \empleadoApi::class . ':traerTodos');
    $this->get('/empleados/', \empleadoApi::class . ':traerEmpleados');
    $this->get('/clientes/', \empleadoApi::class . ':traerClientes');
    $this->get('/choferes/', \empleadoApi::class . ':traerChoferes');
    $this->post('/traerUno[/]', \empleadoApi::class . ':traerUno');
    $this->post('/asignarPatente[/]', \empleadoApi::class . ':asignarPatente');
    //(POST id)
    $this->post('/borrar[/]', \empleadoApi::class . ':BorrarUno');
    //para buscar (POST id) a modificar cualquer dato del alta por post
    $this->post('/modificar[/]', \empleadoApi::class . ':modificarUno');
    //(POST id)
    $this->post('/suspender[/]', \empleadoApi::class . ':suspenderUno');
    //(POST id)
    $this->post('/activar[/]', \empleadoApi::class . ':activarUno');
    //7-b- Cantidad de operaciones por cada uno (POST desde, hasta args email)
    $this->post('/cantidadOperaciones/[{email}]', \empleadoApi::class . ':operacionesEmpleado');
    //7-a-los​ días y horarios​ que se Ingresaron​ al sistema (POST desde, hasta args email)
    $this->post('/historicoLogin/[{email}]', \empleadoApi::class . ':loginEmpleado');
    $this->get('/verImagen/[{email}]', \foto::class . ':verImagen');

})->add(\MWparaCORS::class . ':HabilitarCORSTodos');
//})->add(\MWparaAutentificar::class . ':VerificarAdmin')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->group('/vehiculos', function () {

  $this->post('/alta[/]', \vehiculoApi::class . ':CargarUno');
  $this->get('/', \vehiculoApi::class . ':traerTodos');
  $this->get('/disponibles/', \vehiculoApi::class . ':traerDisponibles');
  $this->post('/cambiarEstado[/]', \vehiculoApi::class . ':cambiarEstado');
  $this->post('/traerUno[/]', \vehiculoApi::class . ':traerUno');



})->add(\MWparaCORS::class . ':HabilitarCORSTodos');
//})->add(\MWparaAutentificar::class . ':VerificarAdmin')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->group('/viaje', function () {

  $this->post('/alta[/]', \viajeApi::class . ':CargarUno');
  $this->get('/', \viajeApi::class . ':traerTodos');
  $this->post('/porCliente[/]', \viajeApi::class . ':traerTodosPorCliente');
  $this->post('/porChofer[/]', \viajeApi::class . ':traerTodosPorChofer');
  $this->post('/tomarViaje[/]', \viajeApi::class . ':tomarViaje');
  $this->post('/cancelarViaje[/]', \viajeApi::class . ':cancelarViaje');
  $this->post('/modificarViaje[/]', \viajeApi::class . ':modificarViaje');
  $this->get('/operacionesSector[/]', \viajeApi::class . ':operacionesSector');


})->add(\MWparaCORS::class . ':HabilitarCORSTodos');
//})->add(\MWparaAutentificar::class . ':VerificarAdmin')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->group('/encuesta', function () {

  $this->get('/', \encuestaApi::class . ':traerTodos');
  $this->post('/finalizar[/]', \encuestaApi::class . ':finalizarEncuesta');

})->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->group('/excel', function () {
  // $this->get('/empleados[/]', \excel::class . ':traerTodosEmpleadosExcel');
  // $this->get('/login[/]', \excel::class . ':loginExcel');
  $this->get('/viajes[/]', \excel::class . ':viajesExcel');
  $this->get('/encuestas[/]', \excel::class . ':encuestasExcel');
})->add(\MWparaCORS::class . ':HabilitarCORSTodos');
//})->add(\MWparaAutentificar::class . ':VerificarAdmin')->add(\MWparaCORS::class . ':HabilitarCORSTodos');


/**no los use */

$app->group('/pdf', function () {
  //https://www.youtube.com/watch?v=u0j6U0uRhQQ FPDF
  $this->get('/ubicar/[{patente}]', \epdf::class . ':ubicaAutoPDF');
  
})->add(\MWparaAutentificar::class . ':VerificarAdmin')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->group('/loginExport', function () {
  $this->get('/excel/[{id}]', \excel::class . ':loginUsurioExcel');
  $this->get('/pdf/[{id}]', \epdf::class . ':loginUsuarioPDF');
  
})->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->group('/foto', function () {

  $this->post('/backup[/]', \foto::class . ':backupFoto');
  $this->post('/renombrarFoto[/]', \foto::class . ':reNombrarFoto');
  $this->post('
  /marcaDeAgua[/]', \foto::class . ':marcaDeAgua');
  //$this->get('/verImagen/[{email}]', \foto::class . ':verImagen');
  //$this->get('/verImagenAuto/[{patente}]', \foto::class . ':verImagenAuto');
  $this->get('/vaciarPapelera', \foto::class . ':vaciarPapelera');
  
})->add(\MWparaAutentificar::class . ':VerificarAdmin')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->run();