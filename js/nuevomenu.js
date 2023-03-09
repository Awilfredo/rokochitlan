sesionVerify();
getCategorias();

var valores= window.location.search;
const urlParams= new URLSearchParams(valores);
var id= urlParams.get('id');
document.getElementById('enviar').addEventListener("click", validarDatos);
var crear_categoria= document.getElementById("btn-crear-categoria");
crear_categoria.addEventListener("click", crearCategoria);
document.getElementById("btn-eliminar-categoria").addEventListener('click', ()=>{eliminarCategoria()});
document.getElementById("btn-editar-categoria").addEventListener('click', ()=>{editarCategoria()});


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
    $selector.innerHTML= "";
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





async function eliminarCategoria(){

  let id = document.getElementById('selector-categorias').value;
  let combo = document.getElementById('selector-categorias');
  let nombre_categoria= combo.options[combo.selectedIndex].text;
  alert(nombre_categoria + " " + id )
  Swal.fire({
    title: 'Estas seguro que deseas eliminar la categoría "' + nombre_categoria + '"?',
    text: "Al hacer esto deberás cambiar la categoría de los elementos que pertenecían a esta categoría de manera manual.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, Eliminarlo!'
  }).then((result) => {
    if (result.isConfirmed) {

      let data= {
        operacion: "DEL",
        id: id
      }

      var respuesta= enviarData(data, "inc/categorias.php");
      Swal.fire(
        'Categoría Eliminada!',
        'La categoría "' + nombre_categoria + '" se ha eliminado.',
        'success'

        
      )
      /*
      var a = setInterval(function(){
        location.reload();
         clearInterval(a);}, 4000);     */
    }
  })
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
            categoria: nueva_categoria,
            operacion: "INS"
              };

        var respuesta= enviarData(data, "inc/categorias.php");
        




      Swal.fire('Creado!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

}


}

async function editarCategoria(){
  let id = document.getElementById('selector-categorias').value;
  let combo = document.getElementById('selector-categorias');
  let nombre_categoria= combo.options[combo.selectedIndex].text;
  
  const { value: nueva_categoria } = await Swal.fire({
    title: 'Digite el nombre con el que deseas renombrar la categoría "' + nombre_categoria + '"',
    input: 'text',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'Debes escribir algo!'
      } 
    }
  })
  

  if(nueva_categoria){      
    Swal.fire({
    title: '¿Estás seguro que deseas renombrar "' + nombre_categoria + '" a "' + nueva_categoria +
    '"?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Sip!',
    denyButtonText: `Nop!`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

        let data={
            categoria: nueva_categoria,
            id: id,
            operacion: "MOD"
              };

        var respuesta= enviarData(data, "inc/categorias.php");
        




      Swal.fire('Modificado!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('No se guardaron los cambios', '', 'info')
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
            body: JSON.stringify(data)})



         /*   
        json= await res.json();
        console.log(json);
        const $selector=document.getElementById('selector-categorias');
        var i=json.length;
        var agregado=json[i-1];
        const $opcion = document.createElement("option");
        $opcion.innerHTML=`${agregado.categoria}`;
        $opcion.value=`${agregado.id}`;
        $opcion.selected=true;
        $selector.appendChild($opcion);*/

        if(!res.ok)throw {status:res.status, statusText:res.statusText};
        //throw retorna el flujo al catch


    } catch (error) {

    }finally{
        //console.log("se ejecutara independientemente");
        getCategorias();
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

