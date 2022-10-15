<?php
require "conexion.php";

    class DevuelveMenu extends Conexion{
        public function __construct(){
            parent::__construct();
        }

        public function getMenu($busqueda){     
            
            if($busqueda=="all"){
                $sql="SELECT * FROM menu";

            }else if(is_numeric($busqueda)){
                $sql="SELECT * FROM menu WHERE id_categoria = '$busqueda'";

            }else{
                $sql= "SELECT * FROM menu WHERE nombre LIKE  '%$busqueda%' OR descripcion LIKE  '%$busqueda%'";
                
            }
            return $this->getDatos($sql);
        }

        public function getArticulo($id){
            $sql="SELECT * FROM menu WHERE id='$id'";
            return $this->getDatos($sql);
        }

        private function getDatos($sentenciaSql){
            $sentencia= $this->conexion_db->prepare($sentenciaSql);
            $sentencia->execute(array());
            $resultado=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            $sentencia->closeCursor();
            return $resultado;
        }




    }
    

    
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $menu= new DevuelveMenu();

    if(isset($data->id)){
        $consulta_id=$data->id;
        $array_menu=$menu->getArticulo($consulta_id);
        $json= json_encode($array_menu);
        echo $json;

    }else{
        $consulta=$data->busqueda;
        $array_menu=$menu->getMenu($consulta);
        $json= json_encode($array_menu);
        echo $json;
    }


?>