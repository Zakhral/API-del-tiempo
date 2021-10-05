let Ubicacion=function(X,Y)
    {
        fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.bc893af2b414a68255b36a8419e1608d&lat='+X+'&lon='+Y+'&format=json')
        .then(response => response.json())
        .then(json =>
            {
                let data=json;
                document.getElementById('Form').reset();
                let Ubicacion=document.getElementById('Resultado');
                Ubicacion.innerHTML="";
                if(data.error)
                    {
                        Ubicacion.innerHTML='<h2>Las coordenadas son incorrectas</h2>';
                    }
                else
                    {
                        Ubicacion.innerHTML=`<a class="Texto">La información de las coordenadas es:</a>
                                        <h2>${data.display_name}</h2>
                                        <a class="Texto">Click en la cuidad para mostrar el tiempo</a>
                                        <h1><label id="Ciudad" type=button onclick="Clima()">${data.address.state}</label></h1>
                                        `;
                        console.log(data.display_name);
                    }
            });  
    };

let Clima=function()
    {
        let Ciudad=document.getElementById('Ciudad').innerText;
        let url=('http://api.weatherstack.com/current?access_key=03a25ae1af4dc65dc2377c9b80ef6d39&query=');
        let completa=url+Ciudad;
        fetch(completa)
        .then(response => response.json())
        .then(json =>
            {   
                let data=json;
                let Ubicacion=document.getElementById('Resultado');
                Ubicacion.innerHTML=`<a class="Texto"> La ciudad de <a class="Resaltado"> ${data.location.name}</a></a><br><br>
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
        let mensaje=document.getElementById('Resultado');
        
        if(X!="" && Y!="")
            Ubicacion(X,Y);
        else
            mensaje.innerHTML='<h2>Falta ingresar datos</h2>';
    });