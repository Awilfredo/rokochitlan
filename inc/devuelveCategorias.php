<?php
require "conexion.php";

    class DevuelveCategorias extends Conexion{
        public function __construct(){
            parent::__construct();
        }

        public function getCategorias(){                       
                    $sql="SELECT * FROM categorias";
                    $sentencia= $this->conexion_db->prepare($sql);
                    $sentencia->execute(array());
                    $resultado=$sentencia->fetchAll(PDO::FETCH_ASSOC);
                    $sentencia->closeCursor();
                    return $resultado;
        }


    }
    

    $menu= new DevuelveCategorias();
    $array_menu=$menu->getCategorias();
    $json= json_encode($array_menu);
    echo $json;
?>