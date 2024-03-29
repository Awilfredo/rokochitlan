<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-dark">
    <div class="container-fluid container-main">
        <div class="container-xxl">

        <nav class="navbar navbar-expand-lg bg-dark navbar-dark border border-white">
              <div class="container-fluid">


                <div>
                  <a class="navbar-brand" href="index.html"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></a>
                </div>

                <div class="iconos-navegador">
                  <a class="navbar-brand" href="menu.html">Menu</a>
                </div>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>


          






                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="menu.html">link1</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled">Disabled</a>
                    </li>
                  </ul>

                  <div class="d-flex align-items-center">
                    <a href="login.php"><button type="button" class="btn btn-link px-3 me-2">
                      Iniciar secion
                    </button></a>
                  </div>


                </div>
              </div>
            </nav>

           
           
           
              <div class="container-main">
                <div class="container-login-form">
                    
                    <img src="asset/image/logico.jpg" class="rounded mx-auto d-block log-ico" alt="...">
                    
                    <div style="width: 80%;">
                        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control border border-primary border-2" id="floatingInput" placeholder="Usuario" name="user"> 
                                <label for="floatingInput">Usuario</label>
                            </div>
                            
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control border border-primary border-2" id="floatingPassword" placeholder="Password" name="pass">
                                <label for="floatingPassword">Password</label>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" name="continuar" type="submit">Continuar</button>
                            </div>
                        </form>
                    </div>
                    
                </div>          
                
                <br>




            </div>
            <div style="width=100%;">
                    
                    <?php

                        require "inc/comprueba-login.php";

                        if(isset($_POST["continuar"])){
                            $user_name=htmlentities(addslashes($_POST["user"]));
                            $user_pass=htmlentities(addslashes($_POST["pass"]));
    
                            $iniciar=new CompruebaLogin();
                            $iniciar->verificarUsuario($user_name, $user_pass);
    
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