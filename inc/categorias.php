<?php

require "conexion.php";

    class Categorias extends Conexion{
        public function __construct(){
            parent::__construct();
        }

        public function creaCategoria($data){   
                         
                    $sql="INSERT INTO categorias VALUES (null, '$data')";
                    $sentencia= $this->conexion_db->prepare($sql);
                    $sentencia->execute();
                    $sentencia->closeCursor(); 
        }

        public function modificarCategoria($nuevo_nombre, $id){
            $sql = "UPDATE categorias SET categoria = '$nuevo_nombre' WHERE id = '$id'";
            $sentencia= $this->conexion_db->prepare($sql);
            $sentencia->execute();
            $sentencia->closeCursor();
        }


        public function eliminarCategoria($id){
            $sql = "DELETE FROM categorias WHERE id = '$id'";
            $sentencia= $this->conexion_db->prepare($sql);
            $sentencia->execute();
            $sentencia->closeCursor();
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




    
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $operacion = $data->operacion;
    $objeto= new Categorias();

    switch($operacion){

        case "INS":
            $nombre= $data->categoria;
            $objeto->creaCategoria($nombre);
            echo $json;
            break;

        case "MOD":
            $nombre= $data->categoria;
            $id= $data->id;
            $objeto = $objeto->modificarCategoria($nombre, $id);
            $array_categorias= $objeto->getCategorias();
            break;

        case "DEL":
            $id= $data->id;
            $objeto->eliminarCategoria($id);
            $array_categorias= $objeto->getCategorias();
            break;
    }
    
    
?>