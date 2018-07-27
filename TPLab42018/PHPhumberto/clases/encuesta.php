<?php
include_once "AccesoDatos.php";
class encuesta
{
    public $id;
    public $idViaje;
    public $estado_encuesta;
    public $chofer;
    public $puntos_chofer;//null
    public $estado_vehiculo;//null
    public $buena_persona;//null
    public $imagen_chofer;//null
    public $tiempo;//null
    public $recomendaria;//null
    public $dificultad;//null
    public $comentario;//null
    public $foto1;//null
    public $foto2;//null
    public $foto3;//null

    public function InsertarEncuestaParametros()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into encuesta (idViaje,estado_encuesta,chofer)values(:idViaje,:estado_encuesta,:chofer)");
            $consulta->bindValue(':idViaje',$this->idViaje, PDO::PARAM_STR);
            $consulta->bindValue(':estado_encuesta', $this->estado_encuesta, PDO::PARAM_STR);
            $consulta->bindValue(':chofer', $this->chofer, PDO::PARAM_STR);
            $consulta->execute();	
            return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function finalizarEncuestaID($auxID,$foto1Aux,$foto2Aux,$foto3Aux)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE encuesta set estado_encuesta=:estado_encuesta,puntos_chofer=:puntos_chofer,estado_vehiculo=:estado_vehiculo,buena_persona=:buena_persona,imagen_chofer=:imagen_chofer,tiempo=:tiempo,recomendaria=:recomendaria,dificultad=:dificultad,comentario=:comentario,foto1='$foto1Aux',foto2='$foto2Aux',foto3='$foto3Aux' WHERE idViaje=$auxID");
            $consulta->bindValue(':puntos_chofer', $this->puntos_chofer, PDO::PARAM_STR);
            $consulta->bindValue(':estado_encuesta', $this->estado_encuesta, PDO::PARAM_STR);
            $consulta->bindValue(':estado_vehiculo', $this->estado_vehiculo, PDO::PARAM_STR);
            $consulta->bindValue(':buena_persona', $this->buena_persona, PDO::PARAM_STR);
            $consulta->bindValue(':imagen_chofer', $this->imagen_chofer, PDO::PARAM_STR);
            $consulta->bindValue(':tiempo', $this->tiempo, PDO::PARAM_STR);
            $consulta->bindValue(':recomendaria', $this->recomendaria, PDO::PARAM_STR);
            $consulta->bindValue(':dificultad', $this->dificultad, PDO::PARAM_STR);
            $consulta->bindValue(':comentario', $this->comentario, PDO::PARAM_STR);
            // $consulta->bindValue(':foto1', $this->foto1, PDO::PARAM_STR);
            // $consulta->bindValue(':foto2', $this->foto2, PDO::PARAM_STR);
            // $consulta->bindValue(':foto3', $this->foto3, PDO::PARAM_STR);
            $consulta->execute();
            return $consulta->rowCount();
    }

    public static function TraerEncuestaID($id) 
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM encuesta WHERE idViaje = '$id'");
			$consulta->execute();
            $EmpAux= $consulta->fetchObject('encuesta');
            if($consulta->rowCount() == 0){
                return false;   
            }
			return $EmpAux;		
    }

    public static function TraerTodasLasEncuestas()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM encuesta");
            $consulta->execute();	
            if($consulta->rowCount() == 0){
                return false;   
            }			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "encuesta");		
    }
}