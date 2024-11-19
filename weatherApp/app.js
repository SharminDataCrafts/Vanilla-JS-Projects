const btn = document.getElementById('btn');
const input = document.querySelector('.inp-field');
const msg = document.querySelector('#msg');
const cityDiv = document.querySelector('.city');
const tempDiv = document.querySelector('.temp');
const weatherInfo = document.querySelector('.weather-info');
const checkbox = document.getElementById('checkbox');


// default weather
window.onload = async function(){ 
    const defaultCity = 'chittagong'
    weatherData(defaultCity);
}

// search weather from input field
btn.addEventListener('click',()=>{
    const city = input.value;
    if(input.value===''){
        msg.innerHTML = `Enter place name to know about weather 😃`
        input.focus();
    }else{
        weatherData(city);
        input.value = '';
        msg.innerHTML ='';
    }
});

// Current location weather
checkbox.addEventListener('change',()=>{
    if(checkbox.checked){
        if(navigator.geolocation.getCurrentPosition(async function showLocation(position){
            const {latitude, longitude} = position.coords;
            const accessToken = 'pk.eyJ1Ijoic2hhcm1pbi0xMjMiLCJhIjoiY20wMG1hNzlrMTF4dTJsb3E1aThkZ2Z3ciJ9.t6xd4A1iwqFqcx7EoCDJzA';
            const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error(`HTTP ERROR! status: ${res.status}`);
                }
                const data = await response.json();
                const features = data.features;
                const cityFeature = features.find((feature) => feature.place_type.includes('place'));
                
                if (cityFeature) {
                    // Access the city name
                    const city = cityFeature.text;
                    weatherData(city);
                } else {
                    msg.innerHTML = `location not found 😩`
                }
            }catch(e){
                throw e;
            }
        }));

    }
});



// weatherData Function
async function weatherData(searchedCity){
   try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=2b82c13682ce3cc217ff7359e03e192d`);
    if(!res.ok){
        throw new Error(`HTTP ERROR! status: ${res.status}`);
    }
    const data = await res.json();
    const temp =  data.main.temp;
    const weatherDesc = data.weather[0];
    const country = data.sys.country;
    const cityName = data.name;

    const tempInCel = KalvinToCelsius(temp);

    showWeatherInfo(cityName, country, tempInCel, weatherDesc);

    }
    catch(e){
      msg.innerHTML = `Please search for a valid city 😩`;
      throw e;
   }
}

//KalvinToCelsius function
function KalvinToCelsius(temp){
    const celcius = temp-273.15;
    return celcius.toFixed(2)+'\u00B0 C';
}

// show Weather in page
function showWeatherInfo(cityName, country, temp, weatherDesc){
    const iconCode =  weatherDesc.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    cityDiv.firstElementChild.innerText = cityName;
    cityDiv.lastElementChild.innerText = country;
    tempDiv.innerText = temp;
    weatherInfo.querySelector('img').src = iconUrl;
    weatherInfo.lastElementChild.innerHTML = weatherDesc.description;
}


