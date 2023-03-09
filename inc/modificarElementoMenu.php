<?php
require "conexion.php";

class ModificarElemento extends Conexion{
    public function __construct(){
        parent::__construct();
    }

    public function eliminar($id){
        
                $sql="SELECT foto FROM menu WHERE id='$id'";
                $sentencia= $this->conexion_db->prepare($sql);
                $sentencia->execute(array());

                /* obteniendo nombre de imagen*/
                while($resultado=$sentencia->fetch(PDO::FETCH_ASSOC)){
                    $imagen='../asset/menu_fot/' . $resultado['foto'];
                }

                //elimina imagen
                unlink($imagen);
                
                

                $sql="DELETE FROM menu WHERE id='$id'";
                $sentencia= $this->conexion_db->prepare($sql);
                $sentencia->execute();
                $sentencia->closeCursor();
                return true;
    }


    public function visible($id, $valor){
        $sql="UPDATE menu SET visible='$valor' WHERE id='$id'";
                $sentencia= $this->conexion_db->prepare($sql);
                $sentencia->execute();
                $sentencia->closeCursor();
                return true;

    }

    public function delDia($id, $valor){
        $sql="UPDATE menu SET del_dia='$valor' WHERE id='$id'";
                $sentencia= $this->conexion_db->prepare($sql);
                $sentencia->execute();
                $sentencia->closeCursor();
                return true;

    }


}

session_start();
if(isset($_SESSION["usuario"])){
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $operacion_menu=$data->consulta;
    $id_menu=$data->id;
    $modificar=new ModificarElemento();
    switch($operacion_menu){
        case 1:
            $json= json_encode($modificar->eliminar($id_menu));
        
            break;
    
        case 2:
            $visible_menu=$data->value;
            $json= json_encode($modificar->visible($id_menu, $visible_menu));
            break;
    
        case 3:
            $del_dia_menu=$data->value;
            $json= json_encode($modificar->delDia($id_menu, $del_dia_menu));
            break;

}

echo $json;

} else{

}





?>