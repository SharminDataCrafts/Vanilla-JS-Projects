const btn = document.getElementById('btn');
const input = document.querySelector('input');
const msg = document.querySelector('#msg');
const citySpan = document.querySelector('span');
const countryCode =  document.querySelector('sup');
const tempDiv = document.querySelector('.temp');
const weatherInfo = document.querySelector('.weather-info');

window.onload = async function(){ 
    const defaultCity = 'chittagong'
    weatherData(defaultCity);
}

btn.addEventListener('click',()=>{
    const city = input.value;
    if(input.value===''){
        input.focus();
    }else{
        weatherData(city);
        input.value = '';
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

function showWeatherInfo(cityName, country, temp, weatherDesc){
 
    const iconCode =  weatherDesc.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    citySpan.innerText = cityName;
    countryCode.innerText = country;
    tempDiv.innerText = temp;
    weatherInfo.querySelector('img').src = iconUrl;
    weatherInfo.lastElementChild.innerHTML = weatherDesc.description;
}

