var continuar_btn= document.getElementById("continuar");
let usuario=document.getElementById("user");
let password=document.getElementById("password");
var isValidUser;

const $login_error= document.getElementById('login-error');

var onkeyUp = function(){
    var expRegUser=new RegExp("^([A-Za-z0-9!#$%&'*+/=?^_`{|}~-]{5,15}){1}$");
    isValidUser=expRegUser.test(usuario.value);
        usuario.classList.toggle("is-valid", isValidUser);
        usuario.classList.toggle("is-invalid", !isValidUser);
        $login_error.classList.toggle('d-none', true);
};

var onkeyUpPass= function(){
    $login_error.classList.toggle('d-none', true);
}







var onClickButton= function(){
    if (isValidUser){
            let dat={
                user: usuario.value,
                pass: password.value
            };
            //console.log(dat);
            iniciarSesion(dat);
        }
    }


    async function iniciarSesion(data){

        try {

            const $loading=document.getElementById('login-loading');
            $loading.classList.toggle('d-none');
            let res=await fetch("inc/comprueba-login.php", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)}),

            json= await res.json();
            console.log(json);
            var json_user= `${json.usuario}`;
            console.log(json_user);

            if(json==0){
                //swal("Oops!", "El usuario o la contra son incorrectas!", "error");
                $loading.classList.toggle('d-none');
                password.value="";
                $login_error.classList.toggle('d-none');
            }else{
                
                const d = new Date();
                d.setTime(d.getTime() + (12*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = "username="+ json_user + ";" + expires;
                window.location.replace("menu.html");
              /* if (document.referrer.indexOf(window.location.host) !== -1) { 
                window.history.back();
                } 
                else { 
                  window.location.href = 'index.html'; 
                }*/
    
                
            }

            if(!res.ok)throw {status:res.status, statusText:res.statusText};

        } catch (error) {
            let message= error.statusText || "Ocurrio un error";
            

        }finally{
            //console.log("se ejecutara independientemente");
        }
    }


continuar_btn.addEventListener("click", onClickButton);
usuario.addEventListener("keyup", onkeyUp);
password.addEventListener('keyup', onkeyUpPass);
