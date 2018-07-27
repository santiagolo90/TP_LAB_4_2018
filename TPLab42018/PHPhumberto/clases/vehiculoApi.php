<?php
include_once "vehiculo.php";
//include_once "historico.php";

class vehiculoApi
{
    //CargoUno
    public function CargarUno($request, $response, $args)
    {
        $ArrayDeParametros = $request->getParsedBody();
        //$objDelaRespuesta= new stdclass();
        
        if (!isset($ArrayDeParametros['patente'])) {
            return $response->withJson("patente no puede esta vacio",404);   
        }
        $patente= strtoupper($ArrayDeParametros['patente']);
        
        if (!isset($ArrayDeParametros['tipo'])) {
            return $response->withJson("tipo no puede esta vacio",404);   
        }
        $tipo= strtolower($ArrayDeParametros['tipo']);

        if (!isset($ArrayDeParametros['marca'])) {
            return $response->withJson("marca no puede esta vacio",404);   
        }
        $marca= strtolower($ArrayDeParametros['marca']);

        if (!isset($ArrayDeParametros['color'])) {
            return $response->withJson("color no puede esta vacio",404);   
        }
        $color= strtolower($ArrayDeParametros['color']);

        if (!isset($ArrayDeParametros['estado'])) {
            return $response->withJson("estado no puede esta vacio",404);   
        }
        $estado= strtolower($ArrayDeParametros['estado']);
        
        //$alta= date("Y-m-d H:i:s");

        $vehiculoAux = new vehiculo();
        

        $vehiculoAux->patente = $patente;
        $vehiculoAux->tipo = $tipo;
        $vehiculoAux->marca = $marca;
        $vehiculoAux->color = $color;
        $vehiculoAux->estado = $estado;

        //$foto = $_FILES['foto'];
        $e = vehiculo::TraerVehiculoPatente($vehiculoAux->patente);

        if ($e == null) {
            $vehiculoAux->InsertarVehiculoParametros();
            return $response->withJson("Se dio de alta a: ".$patente,200);

        }
        else {
            return $response->withJson("El vehiculo ya existe ",404);
        }

        return $response;
    }

    public function traerTodos($request, $response, $args) 
	{
        $todosVehiculos = vehiculo::TraerTodoLosVehiculos();
        return $response->withJson($todosVehiculos, 200);  
    }
    public function traerDisponibles($request, $response, $args) 
	{
        $todosVehiculos = vehiculo::TraerTodoLosDisponibles();
        return $response->withJson($todosVehiculos, 200);  
    }

    public function cambiarEstado($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
        if (!isset($ArrayDeParametros['patente'])) {
            return $response->withJson("patente no puede esta vacio",404);   
        }
        $patente= strtoupper($ArrayDeParametros['patente']);

        if ($patente== "SIN PATENTE") {
            return $response->withJson("estaba sin patente",200); 
        }

        if (!isset($ArrayDeParametros['estado'])) {
            return $response->withJson("estado no puede esta vacio",404);   
        }
        $estado= strtolower($ArrayDeParametros['estado']);

        if (vehiculo::CambiarEstadoVehiculo($patente,$estado)) {
            return $response->withJson($patente. " ahora esta con estado ".$estado,200); 
        }else {
            return $response->withJson("no se pudo cambiar el estado",404);  
        }
        
    }

    public function traerUno($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
        if (!isset($ArrayDeParametros['patente'])) {
            return $response->withJson("patente no puede esta vacio",404);   
        }
        $patente= strtoupper($ArrayDeParametros['patente']);
        $vehiculoBuscado = vehiculo::TraerVehiculoPatente($patente);
        return $response->withJson($vehiculoBuscado, 200);  
    }
}