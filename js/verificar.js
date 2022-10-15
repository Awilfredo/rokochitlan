
async function sesionVerify(){
    try {

        
        let res=await fetch("inc/sesion.php", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }}),

        json= await res.json();
        ajust(json);
        
        if(!res.ok)throw {status:res.status, statusText:res.statusText};

    } catch (error) {
        let message= error.statusText || "Ocurrio un error";

    }finally{
        //console.log("se ejecutara independientemente");
    }


    
};