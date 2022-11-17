function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelElement = document.querySelector("#feel");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelElement.innerHTML = Math.round(response.data.temperature.feels_like);
}
let apiKey = "70dc5fao6aa0c646b8bdt32cc4f4e3f5";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Brisbane&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
