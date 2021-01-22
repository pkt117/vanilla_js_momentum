const weather = document.querySelector(".js-weather");

const API_KEY = "452524ca7c2d7f37f9617f10ec11183f";
const COORDS = 'coords';

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}


function success(location){
   const latitude = location.coords.latitude;
   const longitude = location.coords.longitude;
   const coordsObj = {
       latitude,
       longitude
   };
   saveCoords(coordsObj); 
   getWeather(latitude,longitude);
}

function fail(msg){
    msg.code;
    console.log(22);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(success, fail);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();
