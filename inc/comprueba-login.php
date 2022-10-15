<?php
require "conexion.php";

class CompruebaLogin extends Conexion{
    public function __construct(){
        parent::__construct();
    }

    public function verificarUsuario($user, $pass){

        $contador=0;
        $resultado;
        $sql= "SELECT * FROM usuarios WHERE usuario= :user";
        $sentencia= $this->conexion_db->prepare($sql);
        $sentencia->execute(array(":user"=>$user));
        
        
        while($resultado=$sentencia->fetch(PDO::FETCH_ASSOC)){
            if(password_verify($pass, $resultado["password"])){
                session_start();
                $_SESSION["usuario"]=$resultado["usuario"];
                $_SESSION["rol"]=$resultado['rol'];
                $contador++;
                $sentencia->closeCursor();
                $this->conexion_db=null;
                break;
            }
        }



       
        if($contador>0){
            return $resultado;
        }else{
            return 0;
        }



    }
}


$json = file_get_contents('php://input');
$data = json_decode($json);
$data_user=$data->user;
$data_pass=$data->pass;
/*$data_user="Awilfredo94";
$data_pass="Galadriel94*";*/
$usuario= new CompruebaLogin();
$usuario_log=$usuario->verificarUsuario($data_user, $data_pass);
$json= json_encode($usuario_log);
echo $json;

?> 