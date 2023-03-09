<?php

    class Conexion{
        protected $conexion_db;
        public function __construct(){
            try{
                /*$this->conexion_db=new PDO('mysql:host=localhost; dbname=id19290816_rockochitlan', 'id19290816_awilfredo94', 'Galadriel94*');*/
                $this->conexion_db=new PDO('mysql:host=localhost; dbname=rockochitlan', 'root', 'Galadriel94*');

                $this->conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->conexion_db->exec("SET CHARACTER SET utf8");

                return $this->conexion_db;
            }catch(Exception $e){
                echo "error de conexion linea " . $e->getLine();
            }
        }

    }
?>