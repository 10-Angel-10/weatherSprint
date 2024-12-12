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



//Geo location is a built in API that allows the user to share there location apon request.

//navigator.geolocation this return geolocation object
//getCurrentPosition method lets the web app get the current position

navigator.geolocation.getCurrentPosition(success, errorFunc);
//You can think of this as an if statment if user accepts we run success else we run errorFunc

//Example of the geolocation Object below
{
    coords: {
        latitude: 32.1234;
        longitude: 13.1234;
    }
}

//If the user accepts we run success function
function success(position){
    console.log(position);
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    console.log("We know where you are!");

}

//If the user denies we run errorFunc
function errorFunc(error){
    console.log(error.message);
}




//Create the apiCall while using the APIKEY from the environment.js file

function apiCall () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=stockton,ca,us&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
}

apiCall();


