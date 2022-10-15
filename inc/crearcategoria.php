<?php

require "conexion.php";

    class CrearCategoria extends Conexion{
        public function __construct(){
            parent::__construct();
        }

        public function creaCategoria($data){   
                         
                    $sql="INSERT INTO categorias VALUES (null, '$data')";
                    $sentencia= $this->conexion_db->prepare($sql);
                    $sentencia->execute();
                    $sentencia->closeCursor(); 

                    $sql="SELECT * FROM categorias ORDER BY id DESC LIMIT 1";
                    $sentencia= $this->conexion_db->prepare($sql);
                    $sentencia->execute(array());
                    $resultado=$sentencia->fetchAll(PDO::FETCH_ASSOC);
                    $sentencia->closeCursor();
                    return $resultado;
        }


    }
    
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $categoria= $data->categoria;
    $crear= new CrearCategoria();
    $array_crear=$crear->creaCategoria($categoria);
    $json= json_encode($array_crear);
    echo $json;



?>