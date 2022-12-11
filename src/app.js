function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="row">
            <div class="col-sm-3">
              <div class="weather-forecast-temperature-max">
                <strong>${Math.round(forecastDay.temperature.maximum)}°</strong>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temperature.minimum
              )}°</div>
            </div>
            <div class="col-sm-3">
              <div class="weather-forecast-day">${formatDay(
                forecastDay.time
              )}</div>
            </div>
            <div class="col-sm-3">
              <img 
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png"
              width="40px" 
              />
            </div>
            <div><hr /></div>
          </div>
        `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "70dc5fao6aa0c646b8bdt32cc4f4e3f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsius = response.data.temperature.current;

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelElement = document.querySelector("#feel");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(celsius);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  feelElement.innerHTML = Math.round(response.data.temperature.feels_like);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "70dc5fao6aa0c646b8bdt32cc4f4e3f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let enterCityElement = document.querySelector("#enter-city");
  search(enterCityElement.value);
}

function showPosition(position) {
  let apiKey = "70dc5fao6aa0c646b8bdt32cc4f4e3f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", displayCurrentPosition);

search("Sydney");
