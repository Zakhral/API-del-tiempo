let Ubicacion=function(X,Y)
    {
        fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.3e0679bd56cc92f2106d1f0a3403498c&lat='+X+'&lon='+Y+'&format=json')
        .then(response => response.json())
        .then(json =>
            {
                document.getElementById("Form").reset();
                let data=json;
                console.log(data.display_name)
                let Ubicacion=document.getElementById('Resultado');
                Ubicacion.innerHTML="";
                Ubicacion.innerHTML=`<a>La información en las coordenadas es de:</a>
                                        <h2>${data.display_name}</h2>
                                        <a>Click en la cuidad para mostrar el tiempo</a>
                                        <h1 id="Ciudad"><label type=button onclick="Clima()">${data.address.state}</label></h1>
                                        `;
            });  
    };

let Clima=function()
    {
        let ciudad=document.getElementById('Ciudad').innerText;
        let url=('http://api.weatherstack.com/current?access_key=e86811a8ef4cf35f19cef656578e650c&query=');
        let completa=url+ciudad;
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
        Ubicacion(X,Y);
    });