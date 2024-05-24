//DOM Selectors 
let month = document.querySelector('#month');  
let day = document.querySelector('#day');
let year = document.querySelector('#year'); 
let inputElement = document.querySelector('.input');
let locationDisplay = document.querySelector('#location');
let tempInput = document.querySelector('#temp');


//Sets Current Date
let todaysDate = new Date(); 
month.innerText = (todaysDate.getMonth() + 1);
day.innerText = todaysDate.getDate(); 
year.innerText = todaysDate.getFullYear(); 


//API Information 
let paramobj = {
    params: {
        appid: 'fa843e030e7871950d5d1cb4047c871b',
        units: 'imperial'
    }
}; 

//Weather Object 
const weatherObj = {}; 

//Load Map 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZW5tYW5tZWNoMCIsImEiOiJja3F1bm1hem8wNjdrMm9uMzVuMGllbXJqIn0.vHf_Kyj0YQgU124FVLoFyg';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
})


function setWeatherMap() {
    map.setCenter([weatherObj.coord.lon,weatherObj.coord.lat]);
    map.setZoom(7);
}

function displayweather() {
    locationDisplay.innerText = weatherObj.location;
    tempInput.innerHTML = weatherObj.tempData.temp + "<sup>o</sup>" + "F"; 
}

async function getWeatherData() {
    try {
        const res =  await axios.get(`http://api.openweathermap.org/data/2.5/weather`,paramobj);
        weatherObj.location = res.data.name; 
        weatherObj.tempData = res.data.main;
        weatherObj.coord = res.data.coord; 
        displayweather();
        setWeatherMap();
    }
    catch(err) {
        alert("Error cannot find city");
        console.log("Error"); 
        console.log(err);
    }
}

inputElement.addEventListener('keyup', e => {
    if(e.code === "Enter"){
        paramobj.params.q = e.target.value; 
        getWeatherData();
    }
})

