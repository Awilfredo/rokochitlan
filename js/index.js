
function onloadpage(){
sesionVerify();   
};

document.getElementById("btn_ver_menu").addEventListener("click", ()=>{
  window.location.assign("menu.html");
})

function ajust(data){
    var logindiv=document.getElementById("login");
    var logoutdiv=document.getElementById('logout');
    logindiv.classList.toggle('d-none', data.activa);
    logoutdiv.classList.toggle('d-none', !data.activa);
    if(data.activa){
        const btn_user= document.getElementById("btn-user");
        btn_user.innerHTML=data.usuario;
      }
}

