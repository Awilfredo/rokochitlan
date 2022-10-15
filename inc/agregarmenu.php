<?php

require "conexion.php";

    class CreaMenu extends Conexion{
        public function __construct(){
            parent::__construct();
        }

        public function nuevoMenu($categoria, $nombre, $descripcion, $precio, $nombre_imagen, $del_dia, $visible){  
            
                if($del_dia){
                    $dia=1;
                }else{
                
                    $dia=0;
                }
                

                if($visible){
                 $ver=1;
                }else{
                
                     $ver=0;
                 }

                    $sql="INSERT INTO menu VALUES (null, '$categoria', '$nombre', '$descripcion', '$precio', '$nombre_imagen', '$dia', '$ver')";
                    $this->ejecutarModificacion($sql);
                    

        }

        public function modificarMenu($id, $categoria, $nombre, $descripcion, $precio, $nombre_imagen, $del_dia, $visible){


            if(!$nombre_imagen){
                echo "<br>if de imagen";
                $sql="UPDATE menu SET id_categoria='$categoria', nombre='$nombre', descripcion='$descripcion', precio='$precio', del_dia='$del_dia', visible='$visible' WHERE id='$id'"; 
            }else{

                $sql="SELECT foto FROM menu WHERE id='$id'";
                $res=$this->ejecutarConsulta($sql);
            
                //echo "<br>else de imagen";
                while($resultado=$res->fetch(PDO::FETCH_ASSOC)){
                    
                    $imagen_actual='../asset/menu_fot/' . $resultado['foto'];
                }
                
                unlink($imagen_actual);
                //echo "<br>imagen actual" . $imagen_actual;
                
                $sql="UPDATE menu SET id_categoria='$categoria', nombre='$nombre', descripcion='$descripcion', precio='$precio', foto='$nombre_imagen', del_dia='$del_dia', visible='$visible' WHERE id='$id'";
            }

            $this->ejecutarModificacion($sql);

        }

        public function ejecutarModificacion($sentenciaSql){
            $sentencia= $this->conexion_db->prepare($sentenciaSql);
            $sentencia->execute();
            //$resultado=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            $sentencia->closeCursor();
            //return $resultado;
        }

        public function ejecutarConsulta($sentenciaSql){
            $sentencia= $this->conexion_db->prepare($sentenciaSql);
            $sentencia->execute(array());
            return $sentencia;
            $sentencia->closeCursor();

        }


    }

    session_start();
    if(isset($_SESSION["usuario"])){

        if(isset($_FILES['imagen']['name'])){

            $nombreimagen=$_FILES['imagen']['name'];
            $tipo_imagen=$_FILES['imagen']['type'];
            $size_imagen=$_FILES['imagen']['size'];
        } else{
            $nombreimagen=null;
        }
        $posid=$_POST['id'];    
        $posnombre=$_POST['nombre'];
        $posdescripcion=$_POST['descripcion'];
        $poscategoria=$_POST['categoria'];
        $posprecio=$_POST['precio'];



        
        if(isset($_POST['deldia'])){
            $posdel_dia=1;
        }else{
            $posdel_dia=0;
        }
 
        if(isset($_POST['visible'])){
            $posvisible=1;
        }else{
            $posvisible=0;
        }

        echo "<br>" . $posid;
        echo "<br>" . $posnombre;
        echo "<br>" . $posdescripcion;
        echo "<br>" . $poscategoria;
        echo "<br>" . $posprecio;
        echo "<br>" . $posdel_dia;
        echo "<br>" . $posvisible;
        echo "<br>" . $nombreimagen;

        //ruta de la carpeta destino del servidor
        //$carpeta_destino=$_SERVER['DOCUMENT_ROOT'] . '/rocko/asset/menu_fot/';
        $carpeta_destino=$_SERVER['DOCUMENT_ROOT'] . '/asset/menu_fot/';
        //moviendo imagen de carpeta temporal a destino
        move_uploaded_file($_FILES['imagen']['tmp_name'], $carpeta_destino.$nombreimagen);


    $crear= new CreaMenu();

    if($posid){
        echo "true";
        $crear->modificarMenu($posid, $poscategoria, $posnombre, $posdescripcion, $posprecio, $nombreimagen, $posdel_dia, $posvisible);
         header('Location: /menu.html');

    }else{
        echo "false";
        $crear->nuevoMenu($poscategoria, $posnombre, $posdescripcion, $posprecio, $nombreimagen, $posdel_dia, $posvisible);
       
        header('Location: /nuevomenu.html');
    }

    //header('Location: /rocko/nuevomenu.html');
    //header('Location: /nuevomenu.html');

    } else{

    }








?>