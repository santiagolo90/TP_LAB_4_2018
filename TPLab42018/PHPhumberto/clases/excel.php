<?php
require_once 'AccesoDatos.php';
require_once 'viaje.php';
require_once 'empleado.php';
require_once 'vendor/PHPExcel-1.8/Classes/PHPExcel.php';
class excel{

    public function traerTodosEmpleadosExcel($request, $response, $args) 
	{
        $todosEmpleados = empleado::TraerTodoLosEmpleados();
        $objPHPExcel = new PHPExcel();
        $num = 1;
        //echo($todosEmpleados[1]->nombre);
        //var_dump($todosEmpleados);

        $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, "id");
        $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, "nombre");
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, "email");
        $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, "clave");
        $objPHPExcel->getActiveSheet()->setCellValue('E'.$num, "turno");
        $objPHPExcel->getActiveSheet()->setCellValue('F'.$num, "perfil");
        $objPHPExcel->getActiveSheet()->setCellValue('G'.$num, "foto");
        $objPHPExcel->getActiveSheet()->setCellValue('H'.$num, "alta");
        $objPHPExcel->getActiveSheet()->setCellValue('I'.$num, "estado");


        for ($i=0; $i < count($todosEmpleados); $i++) 
        {
            $num++;
            $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, $todosEmpleados[$i]->id);
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, $todosEmpleados[$i]->nombre);
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, $todosEmpleados[$i]->email);
            $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, $todosEmpleados[$i]->clave);
            $objPHPExcel->getActiveSheet()->setCellValue('E'.$num, $todosEmpleados[$i]->turno);
            $objPHPExcel->getActiveSheet()->setCellValue('F'.$num, $todosEmpleados[$i]->perfil);
            $objPHPExcel->getActiveSheet()->setCellValue('G'.$num, $todosEmpleados[$i]->foto);
            $objPHPExcel->getActiveSheet()->setCellValue('H'.$num, $todosEmpleados[$i]->alta);
            $objPHPExcel->getActiveSheet()->setCellValue('I'.$num, $todosEmpleados[$i]->estado);
        }
        $objPHPExcel->getActiveSheet()->setTitle('Empleados');
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        if ($objWriter == false) {
            throw new Exception('Error al exportar listado a xlsx');
        }
        else{
            $ahora = date("Ymd-His");
            $nombre = "Listado_Empleados-".$ahora.".xlsx";
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="'.$nombre.'');
            header('Cache-Control: max-age=0');
            $objWriter->save('php://output'); 
            exit;
        }
/*
        $objWriter->save("Listado_Empleados.xlsx");
        if ($objWriter) {
            $ahora = date("Ymd-His");
            $extension = pathinfo("Listado_Empleados.xlsx", PATHINFO_EXTENSION);
            rename("Listado_Empleados.xlsx" , "exportados/excel/"."Listado_Empleados"."-".$ahora.".".$extension);
            echo "Listado de emplados exportado correctamente";
        }
*/

        
    }

    public function loginExcel($request, $response, $args) 
	{
        $login = historico::traerTodosLogin();
        $objPHPExcel = new PHPExcel();
        $num = 1;

        $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, "id");
        $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, "email");
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, "fecha");
        $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, "hora");


        for ($i=0; $i < count($login); $i++) 
        {
            $num++;
            $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, $login[$i]['id']);
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, empleado::TraerEmpleadoID($login[$i]['idEmpleado'])->email);
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, $login[$i]['fecha']);
            $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, $login[$i]['hora']);

        }
        $objPHPExcel->getActiveSheet()->setTitle('login');
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        if ($objWriter == false) {
            throw new Exception('Error al exportar listado a xlsx');
        }
        else{
            $ahora = date("Ymd-His");
            $nombre = "Listado_Login-".$ahora.".xlsx";
            //$objWriter->save("Listado_Login.xlsx");
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="'.$nombre.'');
            header('Cache-Control: max-age=0');
            $objWriter->save('php://output'); 
            exit;
        }
            //$extension = pathinfo("Listado_Login.xlsx", PATHINFO_EXTENSION);
            //rename("Listado_Login.xlsx" , "exportados/excel/"."Listado_Login"."-".$ahora.".".$extension);
            //echo "Listado de login exportado correctamente";
            //$objWriter->save('php://output'); 
            //exit;
    }

    public function loginUsurioExcel($request, $response, $args) 
	{
        //$ArrayDeParametros = $request->getParsedBody();
        //$id= $ArrayDeParametros['id'];
        $id = $args['id'];
        $login = historico::loginUsuario($id);
        $objPHPExcel = new PHPExcel();
        $num = 1;

        $objPHPExcel->getActiveSheet()->setCellValue('A1',"Email");
        $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, "Fecha");
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, "Hora");


        for ($i=0; $i < count($login); $i++) 
        {
            $num++;
            $objPHPExcel->getActiveSheet()->setCellValue('A2', empleado::TraerEmpleadoID($id)->email);
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, $login[$i]['fecha']);
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, $login[$i]['hora']);

        }
        $objPHPExcel->getActiveSheet()->setTitle('login');
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        if ($objWriter == false) {
            throw new Exception('Error al exportar listado a xlsx');
        }
        else{
            $ahora = date("Ymd-His");
            $nombre = "Listado_Login-".$ahora.".xlsx";
            //$objWriter->save("Listado_Login.xlsx");
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="'.$nombre.'');
            header('Cache-Control: max-age=0');
            $objWriter->save('php://output'); 
            exit;
        }
            //$extension = pathinfo("Listado_Login.xlsx", PATHINFO_EXTENSION);
            //rename("Listado_Login.xlsx" , "exportados/excel/"."Listado_Login"."-".$ahora.".".$extension);
            //echo "Listado de login exportado correctamente";
            //$objWriter->save('php://output'); 
            //exit;
    }

    public function viajesExcel($request, $response, $args) 
	{
        $todosEmpleados = viaje::TraerTodoLosViajes();
        $objPHPExcel = new PHPExcel();
        $num = 1;
        //echo($todosEmpleados[1]->nombre);
        //var_dump($todosEmpleados);

        $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, "id");
        $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, "fecha");
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, "hora");
        $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, "tipo");
        $objPHPExcel->getActiveSheet()->setCellValue('E'.$num, "pago");
        $objPHPExcel->getActiveSheet()->setCellValue('F'.$num, "cliente");
        $objPHPExcel->getActiveSheet()->setCellValue('G'.$num, "chofer");
        $objPHPExcel->getActiveSheet()->setCellValue('H'.$num, "precio");
        $objPHPExcel->getActiveSheet()->setCellValue('I'.$num, "latOrigen");
        $objPHPExcel->getActiveSheet()->setCellValue('J'.$num, "lngOrigen");
        $objPHPExcel->getActiveSheet()->setCellValue('K'.$num, "latDestino");
        $objPHPExcel->getActiveSheet()->setCellValue('L'.$num, "lngDestino");


        for ($i=0; $i < count($todosEmpleados); $i++) 
        {
            if ($todosEmpleados[$i]->precio == null) {
                $todosEmpleados[$i]->precio =0;
            }

            $num++;
            $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, $todosEmpleados[$i]->id);
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, $todosEmpleados[$i]->fecha);
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, $todosEmpleados[$i]->hora);
            $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, $todosEmpleados[$i]->tipo);
            $objPHPExcel->getActiveSheet()->setCellValue('E'.$num, $todosEmpleados[$i]->pago);
            $objPHPExcel->getActiveSheet()->setCellValue('F'.$num, $todosEmpleados[$i]->cliente);
            $objPHPExcel->getActiveSheet()->setCellValue('G'.$num, $todosEmpleados[$i]->chofer);
            $objPHPExcel->getActiveSheet()->setCellValue('H'.$num, $todosEmpleados[$i]->precio);
            $objPHPExcel->getActiveSheet()->setCellValue('I'.$num, $todosEmpleados[$i]->latOrigen);
            $objPHPExcel->getActiveSheet()->setCellValue('J'.$num, $todosEmpleados[$i]->lngOrigen);
            $objPHPExcel->getActiveSheet()->setCellValue('K'.$num, $todosEmpleados[$i]->latDestino);
            $objPHPExcel->getActiveSheet()->setCellValue('L'.$num, $todosEmpleados[$i]->lngDestino);
        }
        $objPHPExcel->getActiveSheet()->setTitle('Viajes');
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        if ($objWriter == false) {
            throw new Exception('Error al exportar listado a xlsx');
        }
        else{
            $ahora = date("Ymd-His");
            $nombre = "Listado_Viajes-".$ahora.".xlsx";
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="'.$nombre.'');
            header('Cache-Control: max-age=0');
            $objWriter->save('php://output'); 
            exit;
        }

    }

    public function encuestasExcel($request, $response, $args) 
	{
        $todosEmpleados = encuesta::TraerTodasLasEncuestas();
        $objPHPExcel = new PHPExcel();
        $num = 1;
        //echo($todosEmpleados[1]->nombre);
        //var_dump($todosEmpleados);

        $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, "id");
        $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, "idViaje");
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, "estado_encuesta");
        $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, "chofer");
        $objPHPExcel->getActiveSheet()->setCellValue('E'.$num, "puntos_chofer");
        $objPHPExcel->getActiveSheet()->setCellValue('F'.$num, "estado_vehiculo");
        $objPHPExcel->getActiveSheet()->setCellValue('G'.$num, "buena_persona");
        $objPHPExcel->getActiveSheet()->setCellValue('H'.$num, "imagen_chofer");
        $objPHPExcel->getActiveSheet()->setCellValue('I'.$num, "tiempo");
        $objPHPExcel->getActiveSheet()->setCellValue('J'.$num, "recomendaria");
        $objPHPExcel->getActiveSheet()->setCellValue('K'.$num, "dificultad");
        $objPHPExcel->getActiveSheet()->setCellValue('L'.$num, "comentario");

        for ($i=0; $i < count($todosEmpleados); $i++) 
        {

            
            $num++;
            $objPHPExcel->getActiveSheet()->setCellValue('A'.$num, $todosEmpleados[$i]->id);
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$num, $todosEmpleados[$i]->idViaje);
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$num, $todosEmpleados[$i]->estado_encuesta);
            $objPHPExcel->getActiveSheet()->setCellValue('D'.$num, $todosEmpleados[$i]->chofer);
            $objPHPExcel->getActiveSheet()->setCellValue('E'.$num, $todosEmpleados[$i]->puntos_chofer);
            $objPHPExcel->getActiveSheet()->setCellValue('F'.$num, $todosEmpleados[$i]->estado_vehiculo);
            $objPHPExcel->getActiveSheet()->setCellValue('G'.$num, $todosEmpleados[$i]->buena_persona);
            $objPHPExcel->getActiveSheet()->setCellValue('H'.$num, $todosEmpleados[$i]->imagen_chofer);
            $objPHPExcel->getActiveSheet()->setCellValue('I'.$num, $todosEmpleados[$i]->tiempo);
            $objPHPExcel->getActiveSheet()->setCellValue('J'.$num, $todosEmpleados[$i]->recomendaria);
            $objPHPExcel->getActiveSheet()->setCellValue('K'.$num, $todosEmpleados[$i]->dificultad);
            $objPHPExcel->getActiveSheet()->setCellValue('L'.$num, $todosEmpleados[$i]->comentario);
        }
        $objPHPExcel->getActiveSheet()->setTitle('Encuestas');
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        if ($objWriter == false) {
            throw new Exception('Error al exportar listado a xlsx');
        }
        else{
            $ahora = date("Ymd-His");
            $nombre = "Listado_Encuestas-".$ahora.".xlsx";
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="'.$nombre.'');
            header('Cache-Control: max-age=0');
            $objWriter->save('php://output'); 
            exit;
        }

    }

    

}
?>