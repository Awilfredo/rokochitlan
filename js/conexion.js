async function sendGetData(data, link){

    try {
            let res=await fetch(link, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(data)}),

        json= await res.json();

        if(!res.ok)throw {status:res.status, statusText:res.statusText};


        return json;

    } catch (error) {
      return error;

    }finally{
        //console.log("se ejecutara independientemente");
    }
  }
