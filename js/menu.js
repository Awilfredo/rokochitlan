const $fetchasinc = document.getElementById('despliegue-menu'),
$fragment= document.createDocumentFragment();
var sesion;
sesionVerify();
getCategorias();
getData("all");
var acordeon_btn= document.getElementById("btn-acordeon");
acordeon_btn.addEventListener("click", acordeon);
const btn_buscar= document.getElementById("btn-buscar").addEventListener("click", buscar);
document.getElementById("txt-buscar").addEventListener("search", buscar);

function buscar(){
  var txt_buscar= document.getElementById("txt-buscar");
  getData(txt_buscar.value);
  txt_buscar.value="";
  //hideKeyboard(txt_buscar);
  txt_buscar.setAttribute('readonly', true);
  txt_buscar.setAttribute('disabled', true);
  txt_buscar.removeAttribute('disabled');
  txt_buscar.removeAttribute('readonly');
}


function ajust(data){ 
    var logindiv=document.getElementById("menu-login");
    var logoutdiv=document.getElementById('menu-logout');
    var agregar_menu=document.getElementById('agregar-menu');
    /*var menu_banner=document.getElementById('menu-banner');
    menu_banner.classList.toggle('d-none', data.activa);*/
    logindiv.classList.toggle('d-none', data.activa);
    logoutdiv.classList.toggle('d-none', !data.activa);
    agregar_menu.classList.toggle('d-none', !data.activa);

    if(data.activa){
      const btn_user= document.getElementById("btn-user");
      btn_user.innerHTML=data.usuario;
      sesion=true;
    } else{
      sesion=false;
    }
}


function acordeon(){
    acordeon_btn.classList.toggle("active");
    var txt_acordeon=document.getElementById("txt-acordeon");
    if(acordeon_btn.classList.contains("active")){
      txt_acordeon.innerHTML="Ocultar Categorías"
    }else{
      txt_acordeon.innerHTML="Ver Categorías";
    }
    var panel= document.getElementById("panel");
    var up= document.getElementById("up");
    var down= document.getElementById("down");
    panel.classList.toggle("d-none");
    up.classList.toggle("d-none");
    down.classList.toggle("d-none");

}

  async function getCategorias(){
    const $loading=document.getElementById('botones-categorias');
    try {
        let res=await fetch("inc/devuelveCategorias.php", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }}),

        json= await res.json();
        
        if(!res.ok)throw {status:res.status, statusText:res.statusText};

        const $botones_categorias=document.getElementById("botones-categorias");
        json.forEach((element)=>{
          const $boton_contenedor = document.createElement("div");
          const $boton=document.createElement("button");
          $boton.className="btn btn-outline-success bt-categoria";
          $boton.innerHTML=`${element.categoria}`;
          //cualquiera es valida
          //$boton.addEventListener("click", () =>obtenerTodo(`${element.categoria}`)); 
          $boton.addEventListener("click", function(){getData(`${element.id}`)});
          $boton_contenedor.appendChild($boton)
          $botones_categorias.appendChild($boton_contenedor);
      
        });

    } catch (error) {
      const $loading=document.getElementById('botones-categorias');
      const $advertencia= document.createElement("p");
      $advertencia.innerHTML="Ha ocurrido un error. No se han cargado las categorias.";
      $advertencia.className="pre text-light  text fw-bold text-center"
      $loading.appendChild($advertencia);

    }finally{
        //console.log("se ejecutara independientemente");
    }


    
}

    
    async function getData(clave){

        $fetchasinc.innerHTML="Cargando";
         let data={
                 busqueda: clave
                   };

        try {

            const $loading=document.getElementById('menu-loading');
            $loading.classList="container-loading mt-5 mb-5 d-none";          
            $fetchasinc.innerHTML="";
            $loading.classList.toggle('d-none');
            

            let res=await fetch("inc/devuelveMenu.php", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)}),

            json= await res.json();

            
            
            //if(!res.ok)throw new Error("Ocurrio un error al solicitar los datos");
            if(!res.ok)throw {status:res.status, statusText:res.statusText};
            //throw retorna el flujo al catch
            
            if(json.length>0){
            $loading.classList.toggle('d-none');
            
            json.forEach((element) => {

              if(sesion){
                const $salto=document.createElement('br');
                $fetchasinc.appendChild($salto);
                $fetchasinc.appendChild($salto);
                const $plato= document.createElement('div');
                $plato.className="plato border border-success";
                const $imagen=document.createElement('div');
                $imagen.className="im d-flex justify-content-center";
                const $img=document.createElement('img');
                $img.className="rounded";

                const $title=document.createElement('p');
                $title.className="ti text-light  text fw-bold text-center";
                const $descrip=document.createElement('p');
                $descrip.className="de text-light text-center";
                const $precio=document.createElement('p');
                $precio.className="pre text-light  text fw-bold text-center";
            
                $img.src=`asset/menu_fot/${element.foto}`;
                $imagen.appendChild($img);
                $plato.appendChild($imagen);
                $title.innerHTML=`${element.nombre}`;
                $plato.appendChild($title);
                $descrip.innerHTML=`${element.descripcion}`;
                $plato.appendChild($descrip);
                if(`${element.precio}`!=0){
                  $precio.innerHTML=`$  ${element.precio}`;
                }else{
                  $precio.innerHTML="";
                }
                $plato.appendChild($precio);

                
                  const $control= document.createElement('div');
                  $control.className="control-menu my-2 d-flex justify-content-around";
                  const $btn_editar= document.createElement('button');
                  $btn_editar.className="btn btn-success btn-control";
                  $btn_editar.innerHTML="Editar";

                  $btn_editar.addEventListener('click', ()=>{
                    editar(`${element.id}`);
                  })

                  const $btn_eliminar= document.createElement('button');
                  $btn_eliminar.className="btn btn-danger btn-control";
                  $btn_eliminar.innerHTML="Eliminar";

                  $btn_eliminar.addEventListener("click", ()=>{
                    eliminar(`${element.id}`);
                  });
                  const $ocultar=document.createElement("div");
                  $ocultar.className="form-check form-switch";
                  const $visible= document.createElement("input");
                  $visible.type="checkbox";
                  $visible.role="switch";
                  $visible.className="form-check-input";
                  $visible.id="visible" + element.id;        
                  const $checklabel= document.createElement("label");
                  $checklabel.for=$visible.id;
                  $checklabel.className='form-check-label';
                  $checklabel.innerHTML="Visible";

              
                  if(`${element.visible}`==1){
                    $visible.checked=true;
                  }

                  $visible.addEventListener('click', ()=>{
                    switchOperacion(2, `${element.id}`, $visible.checked);
                  })


                  const $dia=document.createElement("div");
                  $dia.className="form-check form-switch mb-2";
                  const $del_dia= document.createElement("input");
                  $del_dia.type="checkbox";
                  $del_dia.role="switch";
                  $del_dia.className="form-check-input";
                  $del_dia.id="del_dia" + element.id;        
                  const $dialabel= document.createElement("label");
                  $dialabel.for=$del_dia.id;
                  $dialabel.className='form-check-label';
                  $dialabel.innerHTML="Del dia";

                  if(`${element.del_dia}`==1){
                    $del_dia.checked=true;
                  }

                  $del_dia.addEventListener('click', ()=>{
                    switchOperacion(3, `${element.id}`, $del_dia.checked);
                  })
                  

                  $ocultar.appendChild($visible);
                  $ocultar.appendChild($checklabel);
                  $dia.appendChild($del_dia);
                  $dia.appendChild($dialabel);

                  const $checkcontrol= document.createElement("div");
                  $checkcontrol.appendChild($dia);
                  $checkcontrol.appendChild($ocultar);

                  $control.appendChild($btn_editar);
                  $control.appendChild($btn_eliminar);
                  $control.appendChild($checkcontrol);
                  $plato.appendChild($control);

                  $fetchasinc.appendChild($plato);
                  $fetchasinc.appendChild($salto);
                  $fetchasinc.appendChild($salto);

              }else if(`${element.visible}`==1){
                const $salto=document.createElement('br');
                $fetchasinc.appendChild($salto);
                $fetchasinc.appendChild($salto);
                const $plato= document.createElement('div');
                $plato.className="plato border border-success";
                const $imagen=document.createElement('div');
                $imagen.className="im d-flex justify-content-center";
                const $img=document.createElement('img');
                $img.className="rounded";
                const $title=document.createElement('p');
                $title.className="ti text-light  text fw-bold text-center";
                const $descrip=document.createElement('p');
                $descrip.className="de text-light text-center";
                const $precio=document.createElement('p');
                $precio.className="pre text-light  text fw-bold text-center";            
                $img.src=`asset/menu_fot/${element.foto}`;
                $imagen.appendChild($img);
                $plato.appendChild($imagen);
                $title.innerHTML=`${element.nombre}`;
                $plato.appendChild($title);
                $descrip.innerHTML=`${element.descripcion}`
                $plato.appendChild($descrip);
                if(`${element.precio}`!=0){
                  $precio.innerHTML=`$  ${element.precio}`;
                }else{
                  $precio.innerHTML="";
                }
                $plato.appendChild($precio);
                $fetchasinc.appendChild($plato);
                $fetchasinc.appendChild($salto);
                $fetchasinc.appendChild($salto);

              }
 
              });

          }else{
            const $advertencia= document.createElement("p");
            $advertencia.innerHTML="No se ha encontrado ningun elemento";
            $advertencia.className="ti text-light  text fw-bold text-center"
            $fetchasinc.appendChild($advertencia);

          }

        

        } catch (error) {
            console.log("estoy en el catch", error);
            let message= error.statusText || "Ocurrio un error con el servidor";
            $fetchasinc.innerHTML=`Error ${error.status}: ${message}`;

        }finally{
            //console.log("se ejecutara independientemente");
        }
    }


    function eliminar(art){

      Swal.fire({
        title: 'Estas seguro que quieres eliminarlo?',
        text: "No se puede revertir.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {

          let data={
            //consulta 1 elimina elemnto del menu
            consulta: 1,
            id: art,
            value: null
              };    
    
          sendGetData(data, "inc/modificarElementoMenu.php").then(data=>{
            window.location.reload();
          });

          Swal.fire(
            'Eliminado!',
            'El articulo se ha eliminado del menú.',
            'success'
          )
        }
      })

    }

    function switchOperacion(ope, art, x){

      var y;
      if(x){

        y=1;
      }
      else{
        y=0;
      }

      let data={

        // consulta 2 modifica la visivilidad
        consulta: ope,
        id: art,
        value: y 
          };

          console.log(data);


      sendGetData(data, "inc/modificarElementoMenu.php").then((data)=>{
          //window.location.reload();
          
      });    

      
    }

    function editar(id){
      window.location.assign("nuevomenu.html?id=" + id);
    }