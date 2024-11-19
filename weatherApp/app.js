const btn = document.getElementById('btn');
const input = document.querySelector('input');
const msg = document.querySelector('#msg');

// btn.addEventListener('click',()=>{
//     const city = input.value;
//     console.log( input.value);
//     if(input.value===''){
//         input.focus();
//     }else{
//         weatherData(city);
//     }
// });

// async function weatherData(city){
//    try{
//     const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=2b82c13682ce3cc217ff7359e03e192d`);
//     // console.log(res);
//     if(!res.ok){
//         console.log('Error');
//         // throw new Error(`HTTP ERROR! status: ${res.status}`);
//     }
//     const data = await res.json();
//     const temp =  data.main.temp;
//     // console.log(data);
//     const weatherInfo = data.weather[0];
//     const country = data.sys.country;
//     // console.log(country);
//     console.log(temp);
//     // console.log(weatherInfo.description);
//     }
//     catch(e){
//     //    msg.innerHTML = `Please search for a valid city 😩`;
//      console.log(e);
//    }
// }

// btn

