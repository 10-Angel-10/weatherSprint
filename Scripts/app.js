import { APIKEY } from './environment.js';

let cityName = document.getElementById("cityName");
let todaysTmp = document.getElementById("todaysTmp");
let weekTime = document.getElementById("weekTime");
let Month = document.getElementById("Month");
let maxMinTmp = document.getElementById("maxMinTmp");

// Next 5 days elements
let nextDay1Tmp = document.getElementById("nextDay1Tmp");
let nextDay2Tmp = document.getElementById("nextDay2Tmp");
let nextDay3Tmp = document.getElementById("nextDay3Tmp");
let nextDay4Tmp = document.getElementById("nextDay4Tmp");
let nextDay5Tmp = document.getElementById("nextDay5Tmp");

let nextDay1Text = document.getElementById("nextDay1Text");
let nextDay2Text = document.getElementById("nextDay2Text");
let nextDay3Text = document.getElementById("nextDay3Text");
let nextDay4Text = document.getElementById("nextDay4Text");
let nextDay5Text = document.getElementById("nextDay5Text");

const searchInput = document.querySelector('.search');

// Function to format the current city date and time
function formatCityDateTime(timezoneOffset) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (1000 * timezoneOffset));
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[cityTime.getDay()];
    
    let hours = cityTime.getHours();
    const minutes = cityTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    
    weekTime.textContent = `${dayOfWeek}, ${timeString}`;
    
    return cityTime;
}

// Function to update the month and date
function updateMonthAndDate(timezoneOffset) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (1000 * timezoneOffset));
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const month = months[cityTime.getMonth()];
    const date = cityTime.getDate();
    
    Month.textContent = `${month}, ${date}`;
}

// Function to get the day of the week for the next 5 days
function getDayOfWeek(date, offset) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = (date.getDay() + offset) % 7; // Get the day of the week with the correct offset
    return daysOfWeek[dayIndex];
}

// Function to update the next day's temperature
function updateNextDaysTemperatures(forecastData, timezoneOffset) {
    if (forecastData.length >= 5) {
        nextDay1Tmp.textContent = `${forecastData[0].temp}°`; // Day 1 temperature
        nextDay2Tmp.textContent = `${forecastData[1].temp}°`; // Day 2 temperature
        nextDay3Tmp.textContent = `${forecastData[2].temp}°`; // Day 3 temperature
        nextDay4Tmp.textContent = `${forecastData[3].temp}°`; // Day 4 temperature
        nextDay5Tmp.textContent = `${forecastData[4].temp}°`; // Day 5 temperature

        const today = new Date();
        nextDay1Text.textContent = getDayOfWeek(today, 1); // Tomorrow
        nextDay2Text.textContent = getDayOfWeek(today, 2); // Day after tomorrow
        nextDay3Text.textContent = getDayOfWeek(today, 3); // 3 days later
        nextDay4Text.textContent = getDayOfWeek(today, 4); // 4 days later
        nextDay5Text.textContent = getDayOfWeek(today, 5); // 5 days later
    } else {
        // In case there are not enough forecast days, handle the fallback
        console.warn('Not enough forecast data available');
        [nextDay1Tmp, nextDay2Tmp, nextDay3Tmp, nextDay4Tmp, nextDay5Tmp].forEach(tmp => tmp.textContent = '--°');
        [nextDay1Text, nextDay2Text, nextDay3Text, nextDay4Text, nextDay5Text].forEach(day => day.textContent = 'N/A');
    }
}

// Function to fetch the 5-day forecast data
function fetchForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Forecast not found');
        }
        return response.json();
    })
    .then((forecastData) => {
        const dailyForecasts = [];
        forecastData.list.forEach(forecast => {
            const forecastDate = new Date(forecast.dt * 1000);
            const dateString = forecastDate.toDateString();

            // Ensure we capture only one entry per day and limit to 5 days
            if (dailyForecasts.length < 5 && !dailyForecasts.some(f => f.date === dateString)) {
                dailyForecasts.push({
                    date: dateString,
                    temp: Math.round(forecast.main.temp),
                    day: forecastDate.toLocaleString('en-us', { weekday: 'long' }) // Get the day of the week
                });
            }
        });

        // Debugging: Log the selected daily forecasts to ensure it's correct
        console.log('Selected Daily Forecasts:', dailyForecasts);

        // If we have at least 5 days of forecast data, update the temperatures
        if (dailyForecasts.length === 5) {
            updateNextDaysTemperatures(dailyForecasts, forecastData.city.timezone);
        } else {
            console.error('Insufficient forecast data to display for the next 5 days.');
        }
    })
    .catch((error) => {
        console.error('Forecast Error:', error);
        [nextDay1Tmp, nextDay2Tmp, nextDay3Tmp, nextDay4Tmp, nextDay5Tmp]
            .forEach(temp => temp.textContent = '--°');
    });
}

// Function to update the weather icon based on the weather condition
function updateWeatherIcon(weatherCondition) {
    const weatherIconContainer = document.querySelector('.weatherIcon');

    switch (weatherCondition) {
        case 'Clear':
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherClear.png.png)";
            break;
        case 'Clouds':
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherCloudy.png.png)";
            break;
        case 'Rain':
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherRain.png.png)";
            break;
        case 'Drizzle':
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherRain.png.png)";
            break;
        case 'Thunderstorm':
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherThunderstorm.png.png)";
            break;
        case 'Snow':
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherSnow.png.png)";
            break;
        case 'Mist':
        case 'Fog':
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherFog.png.png)";
            break;
        default:
            weatherIconContainer.style.backgroundImage = "url(../assets/WeatherPartlyCloudy.png.png)";
    }
}

// Function to fetch the current weather for the city
function apiCall(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
    })
    .then((data) => {
        // Current day's temperature
        todaysTmp.textContent = `${Math.round(data.main.temp)}°`;
        cityName.textContent = data.name;
        maxMinTmp.textContent = `Max: ${Math.round(data.main.temp_max)}° / Min: ${Math.round(data.main.temp_min)}°`;

        const cityDateTime = formatCityDateTime(data.timezone);
        updateMonthAndDate(data.timezone);
        
        // Get the weather condition from the API response and update the icon
        const weatherCondition = data.weather[0].main; // Weather condition, e.g., 'Clear', 'Clouds', etc.
        updateWeatherIcon(weatherCondition);

        // Fetch the forecast after current weather
        fetchForecast(city);
    })
    .catch((error) => {
        console.error('Error:', error);
        cityName.textContent = 'City not found';
        todaysTmp.textContent = '--°';
        weekTime.textContent = '--';
        Month.textContent = '--';
    });
}

// Success function for geolocation
function success(position){
    console.log(position);
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    console.log("Checking for weather of this area.");
    // Get the name of the city from the coordinates
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        apiCall(data.name);
    });
}

// Error function for geolocation
function error(err){
    console.log("Error: " + err);
    cityName.textContent = "City not found";
}

// Default city
apiCall("New York");

// Add event listener to search input
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value;
        apiCall(city);
    }
});
