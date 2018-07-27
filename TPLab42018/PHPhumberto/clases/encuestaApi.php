<?php
include_once "viaje.php";
include_once "encuesta.php";
//include_once "historico.php";

class encuestaApi
{

    public function traerTodos($request, $response, $args) 
	{
        $todasEncuestas = encuesta::TraerTodasLasEncuestas();
        return $response->withJson($todasEncuestas, 200); 
    }

    public function finalizarEncuesta($request, $response, $args) 
	{

        $ArrayDeParametros = $request->getParsedBody();
         if (!isset($ArrayDeParametros['idViaje'])) {
             return $response->withJson("idViaje no puede esta vacio",404);   
         }
        $idViaje= strtolower($ArrayDeParametros['idViaje']);

        if (!isset($ArrayDeParametros['puntos_chofer'])) {
            return $response->withJson("puntos_chofer no puede esta vacio",404);   
        }
       $puntos_chofer= strtolower($ArrayDeParametros['puntos_chofer']);

       if (!isset($ArrayDeParametros['estado_vehiculo'])) {
        return $response->withJson("estado_vehiculo no puede esta vacio",404);   
        }
        $estado_vehiculo= strtolower($ArrayDeParametros['estado_vehiculo']);

               if (!isset($ArrayDeParametros['buena_persona'])) {
        return $response->withJson("buena_persona no puede esta vacio",404);   
        }
        $buena_persona= strtolower($ArrayDeParametros['buena_persona']);

               if (!isset($ArrayDeParametros['imagen_chofer'])) {
        return $response->withJson("imagen_chofer no puede esta vacio",404);   
        }
        $imagen_chofer= strtolower($ArrayDeParametros['imagen_chofer']);

               if (!isset($ArrayDeParametros['tiempo'])) {
        return $response->withJson("tiempo no puede esta vacio",404);   
        }
        $tiempo= strtolower($ArrayDeParametros['tiempo']);

               if (!isset($ArrayDeParametros['recomendaria'])) {
        return $response->withJson("recomendaria no puede esta vacio",404);   
        }
        $recomendaria= strtolower($ArrayDeParametros['recomendaria']);

               if (!isset($ArrayDeParametros['dificultad'])) {
        return $response->withJson("dificultad no puede esta vacio",404);   
        }
        $dificultad= strtolower($ArrayDeParametros['dificultad']);

        if (!isset($ArrayDeParametros['comentario'])) {
        return $response->withJson("comentario no puede esta vacio",404);   
        }
        $comentario= strtolower($ArrayDeParametros['comentario']);

        
        if (!isset($ArrayDeParametros['foto1'])) {
        return $response->withJson("foto1 no puede esta vacio",404);   
        }
        $foto1= ($ArrayDeParametros['foto1']);

               if (!isset($ArrayDeParametros['foto2'])) {
        return $response->withJson("foto2 no puede esta vacio",404);   
        }
        $foto2= ($ArrayDeParametros['foto2']);

               if (!isset($ArrayDeParametros['foto3'])) {
        return $response->withJson("foto3 no puede esta vacio",404);   
        }
        $foto3= ($ArrayDeParametros['foto3']);
        

        $encuestaAux = encuesta::TraerEncuestaID($idViaje);

        if ($encuestaAux != false) {
            $encuestaAux->estado_encuesta = "finalizada";
            $encuestaAux->puntos_chofer = $puntos_chofer;
            $encuestaAux->estado_vehiculo = $estado_vehiculo;
            $encuestaAux->buena_persona = $buena_persona;
            $encuestaAux->imagen_chofer = $imagen_chofer;
            $encuestaAux->tiempo = $tiempo;
            $encuestaAux->recomendaria = $recomendaria;
            $encuestaAux->dificultad = $dificultad;
            $encuestaAux->comentario = $comentario;
            $encuestaAux->foto1 = $foto1;
            $encuestaAux->foto2 = $foto2;
            $encuestaAux->foto3 = $foto3;
            if ($encuestaAux->finalizarEncuestaID($idViaje,$encuestaAux->foto1,$encuestaAux->foto2,$encuestaAux->foto3)) {
                return $response->withJson("Gracias por completar la encuesta",200);
            }else {
                return $response->withJson("Error al generar la encuesta",404);
            }
        }else{
            return $response->withJson("No existe viaje - encuesta",404);
        }
    }
}