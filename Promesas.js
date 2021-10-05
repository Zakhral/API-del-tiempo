let Ubicacion=function(X,Y)
    {
        let url=('http://api.weatherstack.com/current?access_key=03a25ae1af4dc65dc2377c9b80ef6d39&query=');
        let completa=url+X+','+Y;
        fetch(completa)
        .then(response => response.json())
        .then(json =>
            {
                let data=json;
                let Ubicacion=document.getElementById('Resultado');
                Ubicacion.innerHTML="";
                if(data.location!=undefined && data.location!=undefined)
                    {
                    Ubicacion.innerHTML=`<h3>Las Coordenadas pertenecen a la ciudad de</h3>
                                        <h1><label id="ciudad" type="button" onclick="Clima()">${data.location.name}, ${data.location.region} (${data.location.country})</label></h1>
                                        `;
                    }
                else
                    {
                        Ubicacion.innerHTML=`<h3>En estas coordenadas NO existe una ciudad</h3>`;
                    }
            });  
    };

let Clima=function()
    {
        let ciudad=document.getElementById('ciudad').innerText;
        let url=('http://api.weatherstack.com/current?access_key=03a25ae1af4dc65dc2377c9b80ef6d39&query=');
        let completa=url+ciudad;
        fetch(completa)
        .then(response => response.json())
        .then(json =>
            {   
                let data=json;
                let Ubicacion=document.getElementById('Resultado');
                Ubicacion.innerHTML=`<a class="Texto"> La ciudad de <a class="Resaltado"> ${data.location.name}, ${data.location.region} (${data.location.country})</a></a><br><br>
                                    <a class="Texto"> Tiene una temperatura de <a class="Resaltado"> ${data.current.temperature} </a> grados centigrados.</a><br><br>
                                    `;
                for (let i=0;i<data.current.weather_descriptions.length;i++)
                {
                    let tiempo=data.current.weather_descriptions[i];
                    Ubicacion.innerHTML+=`<a class="Texto">El tiempo en estos momentos esta <a class="Resaltado"> ${tiempo} </a></a>`; 
                }
            }); 
    };


let btnMostrar=document.getElementById('btnMostrar');
btnMostrar.addEventListener('click',()=>
    { 
        let X=document.getElementById('IntroLat').value;
        let Y=document.getElementById('IntroLong').value;
        Ubicacion(X,Y);
    });
