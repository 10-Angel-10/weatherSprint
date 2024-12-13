import { APIKEY } from './environment.js';

let cityName = document.getElementById("cityName");
let todaysTmp = document.getElementById("todaysTmp");
let weekTime = document.getElementById("weekTime");
let Month = document.getElementById("Month");
let maxMinTmp = document.getElementById("maxMinTmp");

let type1Icon = document.getElementById("type1Icon");
let type2Icon = document.getElementById("type2Icon");
let type3Icon = document.getElementById("type3Icon");
let type1IconText = document.getElementById("type1IconText");
let type2IconText = document.getElementById("type2IconText");
let type3IconText = document.getElementById("type3IconText");
let nextDay1Text = document.getElementById("nextDay1Text");
let nextDay2Text = document.getElementById("nextDay2Text");
let nextDay3Text = document.getElementById("nextDay3Text");
let nextDay4Text = document.getElementById("nextDay4Text");
let nextDay5Text = document.getElementById("nextDay5Text");
let nextDay1Icon = document.getElementById("nextDay1Icon");
let nextDay2Icon = document.getElementById("nextDay2Icon");
let nextDay3Icon = document.getElementById("nextDay3Icon");
let nextDay4Icon = document.getElementById("nextDay4Icon");
let nextDay5Icon = document.getElementById("nextDay5Icon");
let nextDay1Tmp = document.getElementById("nextDay1Tmp");
let nextDay2Tmp = document.getElementById("nextDay2Tmp");
let nextDay3Tmp = document.getElementById("nextDay3Tmp");
let nextDay4Tmp = document.getElementById("nextDay4Tmp");
let nextDay5Tmp = document.getElementById("nextDay5Tmp");


const searchInput = document.querySelector('.search');


function apiCall(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
    })
    .then((data) => {
        
        todaysTmp.textContent = `${Math.round(data.main.temp)}°`;
        
       
        cityName.textContent = data.name;

        
        maxMinTmp.textContent = `Max: ${Math.round(data.main.temp_max)}° / Min: ${Math.round(data.main.temp_min)}°`;


        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
        cityName.textContent = 'City not found';
        todaysTmp.textContent = '--°';
    });
}


searchInput.addEventListener('keypress', (event) => {
   
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        
        if (city) {
            apiCall(city);
        }
    }
});

apiCall('Stockton');