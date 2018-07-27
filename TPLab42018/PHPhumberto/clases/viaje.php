<?php
include_once "AccesoDatos.php";
class viaje
{
    public $id;
    public $fecha;
    public $hora;
    public $tipo;
    public $pago;
    public $estado;
    public $cliente;
    public $chofer; //null
    public $precio; //null
    public $latOrigen;
    public $lngOrigen;
    public $latDestino;
    public $lngDestino;

    public function InsertarViajeParametros()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            //$cadenaConsulta = "INSERT into empleado (nombre,sexo,email,clave,turno,perfil)values('".$_POST["nombre"]."','".$_POST["sexo"]."','".$_POST["email"]."','".$_POST["clave"]."','".$_POST["turno"]."','".$_POST["perfil"]."')";
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into viajes (fecha,hora,tipo,pago,estado,cliente,latOrigen,lngOrigen,latDestino,lngDestino)values(:fecha,:hora,:tipo,:pago,:estado,:cliente,:latOrigen,:lngOrigen,:latDestino,:lngDestino)");
            //$consulta =$objetoAccesoDato->RetornarConsulta($cadenaConsulta);
            $consulta->bindValue(':fecha',$this->fecha, PDO::PARAM_STR);
            $consulta->bindValue(':hora', $this->hora, PDO::PARAM_STR);
            $consulta->bindValue(':tipo', $this->tipo, PDO::PARAM_STR);
            $consulta->bindValue(':pago', $this->pago, PDO::PARAM_STR);;
            $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
            $consulta->bindValue(':cliente', $this->cliente, PDO::PARAM_STR);
            $consulta->bindValue(':latOrigen', $this->latOrigen, PDO::PARAM_STR);
            $consulta->bindValue(':lngOrigen', $this->lngOrigen, PDO::PARAM_STR);;
            $consulta->bindValue(':latDestino', $this->latDestino, PDO::PARAM_STR);
            $consulta->bindValue(':lngDestino', $this->lngDestino, PDO::PARAM_STR);
            $consulta->execute();	
            return $objetoAccesoDato->RetornarUltimoIdInsertado();
			//return $consulta->fetchAll(PDO::FETCH_CLASS, "empleado");	
    }

    public static function TraerTodoLosViajes()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from viajes");
            $consulta->execute();	
            if($consulta->rowCount() == 0){
                return false;   
            }			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "viaje");		
    }
    public static function TraerTodoLosViajesPorCliente($auxID)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from viajes where cliente = '$auxID'");
            $consulta->execute();	
            if($consulta->rowCount() == 0){
                return false;   
            }			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "viaje");		
    }
    public static function TraerTodoLosViajesPorChofer($auxID)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from viajes where chofer = '$auxID'");
            $consulta->execute();	
            if($consulta->rowCount() == 0){
                return false;   
            }			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "viaje");		
    }

    public static function TraerViajeID($auxID) 
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from viajes where id = '$auxID'");
			$consulta->execute();
            $vehiculoAux = $consulta->fetchObject('viaje');
            if($consulta->rowCount() == 0){
                return false;   
            }
			return $vehiculoAux;		
    }

    public function tomarViaje($auxID,$choferAux,$estadoAux,$precioAux)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE viajes set chofer='$choferAux',estado='$estadoAux',precio='$precioAux' WHERE id='$auxID'");
            //$consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
            // $consulta->bindValue(':chofer', $this->chofer, PDO::PARAM_STR);
            // $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
            $consulta->execute();
            return $consulta->rowCount();
    }
    public function cancelarViaje($auxID,$estadoAux)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE viajes set estado='$estadoAux',chofer='sin chofer'  WHERE id='$auxID'");
        $consulta->execute();
        return $consulta->rowCount();
    }

    public function modificarViaje($auxID,$pagoAux,$tipoAux ,$latOrigenAux,$lngOrigenAux,$latDestinoAux,$lngDestinoAux)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE viajes set pago='$pagoAux',tipo='$tipoAux',latOrigen='$latOrigenAux',lngOrigen='$lngOrigenAux',latDestino='$latDestinoAux',lngDestino='$lngDestinoAux' WHERE id='$auxID'");
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function TraerCantidadviajesChofer()
    {
        $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT `chofer`, COUNT(`chofer`) cant FROM `viajes` WHERE `estado`='finalizado' GROUP BY `chofer` ORDER BY cant DESC");
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        $consulta->execute();
        if($consulta->rowCount() == 0){
            return false;   
        }
        return $consulta->fetchAll();
    }



}
