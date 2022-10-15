<?php
    require "inc/devuelveMenu.php";
    $menu= new DevuelveMenu();

    function imprimirMenu(){
      global $array_menu;
      foreach($array_menu as $elemento){
      echo "<h1 class='text-light'>" . " " . $elemento['nombre'] . "  $" . $elemento['precio'] . "</h1><br>";
  }

  echo "<h1> hola </h1>";
}



?>



<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>menu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/menu.css">

    <script src="js/menu.js"></script>
</head>
<body class="bg-dark" onLoad="document.menu_content.focus()">

<header>
                <div class="banner">
                    <img src="asset/image/banner.png" class="banner" alt="...">
                </div>

            </header>

    <div class="container-fluid container-main">
        <div class="container-xxl">

        
        <!-- navegador -->
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark border border-white">
              <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="index.html">Inicio</a>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="menu.php">Menu</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled">Disabled</a>
                    </li>
                  </ul>

                  <div class="d-flex align-items-center">
                    <button type="button" class="btn btn-link px-3 me-2">
                      Login
                    </button>
                  </div>

                  <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>


                </div>
              </div>
        </nav>

              <div class="contenedor">
                <div class="container-main">
                    <div class="container-carrusel2">

                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="asset/image/c1.jpg" class="d-block w-100 oscurecer" alt="...">
                                </div>
                                <div class="carousel-item">
                            <img src="asset/image/c2.jpg" class="d-block w-100 oscurecer" alt="...">
                          </div>
                          <div class="carousel-item">
                              <img src="asset/image/nuestro_menu.jpg" class="d-block w-100 oscurecer" alt="...">
                            </div>
                        </div>
                        </div>
                </div>
                    </div>

                <div class="texto-encima"><h1 class="text-light"></h1></div>
                <div class="centrado"><p class="text-light  text fw-bold  fs-4 text">Nuestro Menu</p></div>
              </div>

      
   
      <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" style="margin-top: 10px;">

        <div class="container-fluid">

            <div class="categorias">

              <div class="a">
                <button type="submit" class="btn btn-outline-success bt-categoria" name="menu_del_dia">Menu del dia</button>
              </div>

              <div class="b">
                <button type="submit" class="btn btn-outline-success bt-categoria" name="boquitas" >Boquitas</button>
              </div>

              <div class="c">
                <button type="submit" class="btn btn-outline-success bt-categoria" name="boquitas_especiales">Boquitas especiales</button>
              </div>

              <div class="d">
                <button type="submit" class="btn btn-outline-success bt-categoria" name="bebidas_alcoholicas">Bebidas Alcoholicas</button>
              </div>

              <div class="e">
                <button type="submit" class="btn btn-outline-success bt-categoria" name="bebidas">Bebidas no alcoholicas</button>
              </div>

            </div>
      </form>

      <div class="bg-ligth" id="menu_content" name="menu_content">
        <?php

          if(isset($_POST["menu_del_dia"])){
            $array_menu=$menu->getMenu("menu_del_dia");  
            imprimirMenu();            
          } elseif(isset($_POST["boquitas"])){
            $array_menu=$menu->getMenu("boquitas");
            imprimirMenu();  
          }elseif(isset($_POST["boquitas_especiales"])){
            $array_menu=$menu->getMenu("boquitas_especiales"); 
            imprimirMenu(); 
          }elseif(isset($_POST["bebidas_alcoholicas"])){
            $array_menu=$menu->getMenu("alcoholicas");
            imprimirMenu();  
          }elseif(isset($_POST["bebidas"])){
            $array_menu=$menu->getMenu("bebidas"); 
            imprimirMenu(); 
          }
        ?>
      </div>

      

      </div>


    </div>
    




          <!-- Boostrap script-->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossorigin="anonymous"></script>
</body>
</html>