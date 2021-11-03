/*
⏰Feature #1
In your project, display the current date and time using JavaScript: Tuesday 16:00

🕵️‍♀️Feature #2
Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

🙀Bonus Feature
Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
*/

//Display current time and day
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let dayToday = document.querySelector("#day-now");
dayToday.innerHTML = `${day}`;

let hour = now.getHours();

if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}
let timeToday = document.querySelector("#time-now");
timeToday.innerHTML = `${hour}:${minutes}`;

//change name of city to input
//display name and current temp of searched city
function showCity(event) {
  event.preventDefault();
  let apiKey = "26862e90492f1d5a7f51cde5dcc0d83b";
  let units = "metric";
  let city = document.querySelector("#city-input");
  console.log(city.value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCityTemp);
}

function showCityTemp(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", showCity);

//get location button
function showCoordinates(position) {
  let apiKey = "26862e90492f1d5a7f51cde5dcc0d83b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCityTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCoordinates);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getPosition);

//Convert temperatures - buttons
function convertF() {
  let currentTemperature = document.querySelector("#current-temp");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertC() {
  let currentTemperature = document.querySelector("#current-temp");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let buttonFahrenheit = document.querySelector("#btnradio2");
buttonFahrenheit.addEventListener("click", convertF);

let buttonCelcius = document.querySelector("#btnradio1");
buttonCelcius.addEventListener("click", convertC);
