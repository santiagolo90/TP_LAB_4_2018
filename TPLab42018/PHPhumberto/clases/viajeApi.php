<?php
include_once "viaje.php";
include_once "encuesta.php";
//include_once "historico.php";

class viajeApi
{

    public function CargarUno($request, $response, $args)
    {
        $ArrayDeParametros = $request->getParsedBody();
        //$objDelaRespuesta= new stdclass();
        //Fecha
        //Hora
        if (!isset($ArrayDeParametros['tipo'])) {
            return $response->withJson("tipo no puede esta vacio",404);   
        }
        $tipo= strtolower($ArrayDeParametros['tipo']);
        
        if (!isset($ArrayDeParametros['pago'])) {
            return $response->withJson("pago no puede esta vacio",404);   
        }
        $pago= strtolower($ArrayDeParametros['pago']);

        if (!isset($ArrayDeParametros['estado'])) {
            return $response->withJson("estado no puede esta vacio",404);   
        }
        $estado= strtolower($ArrayDeParametros['estado']);

        if (!isset($ArrayDeParametros['cliente'])) {
            return $response->withJson("cliente no puede esta vacio",404);   
        }
        $cliente= strtolower($ArrayDeParametros['cliente']);

        if (!isset($ArrayDeParametros['latOrigen'])) {
            return $response->withJson("latOrigen no puede esta vacio",404);   
        }
        $latOrigen= strtolower($ArrayDeParametros['latOrigen']);

        if (!isset($ArrayDeParametros['lngOrigen'])) {
            return $response->withJson("lngOrigen no puede esta vacio",404);   
        }
        $lngOrigen= strtoupper($ArrayDeParametros['lngOrigen']);
        
        if (!isset($ArrayDeParametros['latDestino'])) {
            return $response->withJson("latDestino no puede esta vacio",404);   
        }
        $latDestino= strtolower($ArrayDeParametros['latDestino']);

        if (!isset($ArrayDeParametros['lngDestino'])) {
            return $response->withJson("lngDestino no puede esta vacio",404);   
        }
        $lngDestino= strtoupper($ArrayDeParametros['lngDestino']);

        if (!isset($ArrayDeParametros['fecha'])) {
            return $response->withJson("fecha no puede esta vacio",404);   
        }
        $fecha= ($ArrayDeParametros['fecha']);


        if (!isset($ArrayDeParametros['hora'])) {
            return $response->withJson("hora no puede esta vacio",404);   
        }
        $hora= ($ArrayDeParametros['hora']);
        
        //$alta= date("Y-m-d H:i:s");

        $viajeAux = new viaje();
        
        //$viajeAux->fecha = date("Y-m-d");
        //$viajeAux->hora = date("H:i:s");
        $viajeAux->fecha = $fecha;
        $viajeAux->hora = $hora;
        $viajeAux->tipo = $tipo;
        $viajeAux->pago = $pago;
        $viajeAux->estado = $estado;
        $viajeAux->cliente = $cliente;
        $viajeAux->latOrigen = $latOrigen;
        $viajeAux->lngOrigen = $lngOrigen;
        $viajeAux->latDestino = $latDestino;
        $viajeAux->lngDestino = $lngDestino;

        if ($viajeAux->InsertarViajeParametros()) {
            return $response->withJson("Se dio de alta el viaje para: ".$cliente,200);
        }else{
            return $response->withJson("Error al realizar el pedido ",404);
        }
        
    }

    public function traerTodos($request, $response, $args) 
	{
        $todosViajes = viaje::TraerTodoLosViajes();
        // for ($i=0; $i < count($todosViajes); $i++) 
        // {
        //     $todosViajes[$i]->cliente = empleado::TraerEmpleadoID($todosViajes[$i]->cliente)->nombre; 
        //     $todosViajes[$i]->chofer = empleado::TraerEmpleadoID($todosViajes[$i]->chofer)->nombre; 
        // }
        return $response->withJson($todosViajes, 200); 
    }

    public function traerTodosPorCliente($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
         if (!isset($ArrayDeParametros['cliente'])) {
             return $response->withJson("cliente no puede esta vacio",404);   
         }
        $cliente= strtolower($ArrayDeParametros['cliente']);

        $todosViajes = viaje::TraerTodoLosViajesPorCliente($cliente);
        return $response->withJson($todosViajes, 200); 
    }

    public function traerTodosPorChofer($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
         if (!isset($ArrayDeParametros['chofer'])) {
             return $response->withJson("chofer no puede esta vacio",404);   
         }
        $chofer= strtolower($ArrayDeParametros['chofer']);

        $todosViajes = viaje::TraerTodoLosViajesPorChofer($chofer);
        return $response->withJson($todosViajes, 200); 
    }

    public function tomarViaje($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
         if (!isset($ArrayDeParametros['id'])) {
             return $response->withJson("id no puede esta vacio",404);   
         }
        $id= strtolower($ArrayDeParametros['id']);

        if (!isset($ArrayDeParametros['chofer'])) {
            return $response->withJson("chofer no puede esta vacio",404);   
        }
       $chofer= strtolower($ArrayDeParametros['chofer']);

       if (!isset($ArrayDeParametros['estado'])) {
        return $response->withJson("estado no puede esta vacio",404);   
        }
        $estado= strtolower($ArrayDeParametros['estado']);
        
        if (!isset($ArrayDeParametros['precio'])) {
            $precio= 0;  
        }
        else {
            $precio= strtolower($ArrayDeParametros['precio']);
        }
        

        $viajeAux = new viaje();
        $viajeAux= viaje::TraerViajeID($id);
        
        $viajeAux->chofer = $chofer;
        $viajeAux->estado = $estado;
        $viajeAux->precio = $precio;
        if (viaje::tomarViaje($id,$chofer,$estado ,$precio)) {
            if ($viajeAux->estado == "finalizado") {
                $encuestaAux = new encuesta();
                $encuestaAux->idViaje = $id;
                $encuestaAux->estado_encuesta = "pendiente";
                $encuestaAux->chofer = $chofer;
                $encuestaAux->InsertarEncuestaParametros();
            }
            return $response->withJson("El viaje fue tomado ",200);
        }else{
            return $response->withJson("Error al tomar viaje",404);
        }
    }
    public function cancelarViaje($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
         if (!isset($ArrayDeParametros['id'])) {
             return $response->withJson("id no puede esta vacio",404);   
         }
        $id= strtolower($ArrayDeParametros['id']);

       if (!isset($ArrayDeParametros['estado'])) {
        return $response->withJson("estado no puede esta vacio",404);   
        }
        $estado= strtolower($ArrayDeParametros['estado']);

        $viajeAux = new viaje();
        $viajeAux= viaje::TraerViajeID($id);

        $viajeAux->estado = $estado;
        if (viaje::cancelarViaje($id,$estado)) {
            return $response->withJson("El viaje fue cancelado ",200);
        }else{
            return $response->withJson("Error al cacelar viaje",404);
        }

    }

    public function modificarViaje($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
        if (!isset($ArrayDeParametros['id'])) {
            return $response->withJson("id no puede esta vacio",404);   
        }
        $id= strtolower($ArrayDeParametros['id']);

        if (!isset($ArrayDeParametros['pago'])) {
            return $response->withJson("pago no puede esta vacio",404);   
        }
        $pago= strtolower($ArrayDeParametros['pago']);

        if (!isset($ArrayDeParametros['tipo'])) {
        return $response->withJson("tipo no puede esta vacio",404);   
        }
        $tipo= strtolower($ArrayDeParametros['tipo']);
        
        if (!isset($ArrayDeParametros['latOrigen'])) {
        return $response->withJson("latOrigen no puede esta vacio",404);   
        }
        $latOrigen= strtolower($ArrayDeParametros['latOrigen']);

        if (!isset($ArrayDeParametros['lngOrigen'])) {
        return $response->withJson("lngOrigen no puede esta vacio",404);   
        }
        $lngOrigen= strtolower($ArrayDeParametros['lngOrigen']);

        if (!isset($ArrayDeParametros['latDestino'])) {
        return $response->withJson("latDestino no puede esta vacio",404);   
        }
        $latDestino= strtolower($ArrayDeParametros['latDestino']);

        if (!isset($ArrayDeParametros['lngDestino'])) {
        return $response->withJson("lngDestino no puede esta vacio",404);   
        }
        $lngDestino= strtolower($ArrayDeParametros['lngDestino']);
        

        $viajeAux = new viaje();
        $viajeAux= viaje::TraerViajeID($id);
        
        $viajeAux->pago = $pago;
        $viajeAux->tipo = $tipo;
        $viajeAux->latOrigen = $latOrigen;
        $viajeAux->lngOrigen = $lngOrigen;
        $viajeAux->latDestino = $latDestino;
        $viajeAux->lngDestino = $lngDestino;
        if (viaje::modificarViaje($id,$pago,$tipo ,$latOrigen,$lngOrigen,$latDestino,$lngDestino)) {
            return $response->withJson("El viaje fue modificado ",200);
        }else{
            return $response->withJson("Error al modificar viaje",404);
        }
    }
        //operacionesSector
        public function operacionesSector($request, $response, $args)
        {
            $ArrayDeParametros = $request->getParsedBody();
            $objDelaRespuesta= new stdclass();
            $objDelaRespuesta= viaje::TraerCantidadviajesChofer();
            return $response->withJson($objDelaRespuesta, 200); 
        }
}