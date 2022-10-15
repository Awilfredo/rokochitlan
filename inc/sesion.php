<?php
session_start();
if(isset($_SESSION["usuario"])){
    $sesion['activa']=true;
    $sesion['usuario']= $_SESSION['usuario'];
    $sesion['rol']= $_SESSION['rol'];
    $json= json_encode($sesion);
    echo $json;
} else{
    $sesion['activa']=false;
    $sesion['usuario']= null;
    $sesion['rol']= null;
    $json= json_encode($sesion);
    echo $json;
}
?>