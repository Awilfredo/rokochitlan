sesionVerify();
getCategorias();

var valores= window.location.search;
const urlParams= new URLSearchParams(valores);
var id= urlParams.get('id');
document.getElementById('enviar').addEventListener("click", validarDatos);
var crear_categoria= document.getElementById("btn-crear-categoria");
crear_categoria.addEventListener("click", crearCategoria);

/* Boton cambiar imagen*/
document.getElementById("btn-seleccionar").addEventListener("click", ()=>{
  document.getElementById("archivo").click();
});

document.getElementById("archivo").onchange=function(e){
  let reader= new FileReader();
  if(e.target.files[0]){

    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
      let preview= document.getElementById("preview");
      preview.innerHTML="";
      imagen=document.createElement('img');
      imagen.className="img-nuevo";
      imagen.src=reader.result;
      preview.appendChild(imagen);
      document.getElementById("btn-seleccionar").innerHTML="Cambiar imágen";
    }
  }
}

if(id){

  document.getElementById("btn-seleccionar").innerHTML="Cambiar imágen";
  document.getElementById('txt-crear').innerHTML="Editar elemento del menú"
  document.getElementById('btn-cancelar').addEventListener("click", ()=>{
    window.location.assign("menu.html");       
  });

  let datos={
    id: id
  }

  sendGetData(datos, 'inc/devuelveMenu.php').then((data)=>{
    document.getElementById('id').value=id;
    data.forEach((element)=>{
      document.getElementById('nombre').value=element.nombre;
      document.getElementById('descripcion').value=element.descripcion;
      document.getElementById('selector-categorias').selectedIndex=element.id_categoria;
      
      

     /*selecciona la categoria que pertenece*/
      for(var option of document.getElementById('selector-categorias').options){
        if(option.value==element.id_categoria){
          document.getElementById('selector-categorias').selectedIndex=option.index;
          
          break;
        }
      }     
      document.getElementById('precio').value=element.precio;
      const $visible= document.getElementById('visible');
      const $del_dia= document.getElementById('del_dia');
      if(element.visible==1){
        $visible.checked=true;        
      }else{
        visible.checked=false;
      }
      if(element.del_dia==1){
        $del_dia.checked=true;        
      }else{
        $del_dia.checked=false;
      }



      


      const $preview=document.getElementById('preview');
      const $imagen= document.createElement('img');
      $imagen.className="img-nuevo";
      $imagen.src='asset/menu_fot/' + element.foto;
      $preview.appendChild($imagen);

    });//fin foreach

  });

}else{

  document.getElementById("preview").innerHTML="";
  document.getElementById('btn-cancelar').addEventListener("click", ()=>{
    document.getElementById("btn-seleccionar").innerHTML="Seleccionar imágen";
    document.getElementById('preview').innerHTML='';  
  });

}











async function getCategorias(){
    const $selector=document.getElementById('selector-categorias');
    try {
        let res=await fetch("inc/devuelveCategorias.php", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }}),

        json= await res.json();  
        if(!res.ok)throw {status:res.status, statusText:res.statusText};

        if(json.length>0){

            json.forEach((element)=>{
                const $opcion = document.createElement("option");
          $opcion.innerHTML=`${element.categoria}`
          $opcion.value=`${element.id}`;
          $selector.appendChild($opcion);
        });
    }

    } catch (error) {

    }finally{
        //console.log("se ejecutara independientemente");
    }


    
}


async function crearCategoria(){
  const { value: nueva_categoria } = await Swal.fire({
    title: 'Digite el nombre de la nueva categoría a crear.',
    input: 'text',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Debes escribir algo!'
      } 
    }
  })
  

  if(nueva_categoria){      
    Swal.fire({
    title: '¿Estás seguro que deseas crear la categoría "' + nueva_categoria + '"?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Crear',
    denyButtonText: `No crear`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

        let data={
            categoria: nueva_categoria
              };

        var respuesta= enviarData(data, "inc/crearcategoria.php");



      Swal.fire('Creado!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

}


}


  
async function enviarData(data, link){
    try {

        let res=await fetch(link, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)}),


        json= await res.json();
        console.log(json);
        const $selector=document.getElementById('selector-categorias');
        var agregado= json[0];
        const $opcion = document.createElement("option");
        $opcion.innerHTML=`${agregado.categoria}`;
        $opcion.value=`${agregado.id}`;
        $opcion.selected=true;
        $selector.appendChild($opcion);

        if(!res.ok)throw {status:res.status, statusText:res.statusText};
        //throw retorna el flujo al catch


    } catch (error) {

    }finally{
        //console.log("se ejecutara independientemente");
    }
}

function ajust(data){
    if(!data.activa){
    //no esta logueado
    window.location.replace("index.html");
    }
}


function validarDatos(){

  if(!id){
    var validacion=true;
    console.log('no hay id');
    const $archivo=document.getElementById('archivo');
    const $categoria=document.getElementById('selector-categorias');
    console.log($categoria.value);
    console.log($archivo.value);

    if(!$categoria.value){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes asignar una categoria!',
        footer: ''
      });

      return 0;
    }


    if($archivo.value){

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes asignar una imagen!',
        footer: ''
      });
      return 0;
    }
  }
  console.log("fin");
  document.getElementById('form-nuevo-menu').submit();
}

