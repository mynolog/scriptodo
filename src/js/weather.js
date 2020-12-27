const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".wicon");
const weatherDescription = document.querySelector(".wdesc");

const API_KEY = "9fad971fc1d3dda623de94b37ff07168";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const temp = Math.round(temperature);
      const city = json.name;
      const country = json.sys.country;
      const tempMax = json.main.temp_max;
      const tempMin = json.main.temp_min;
      const iconCode = json.weather[0].icon;
      const iconURI = `http://openweathermap.org/img/w/${iconCode}.png`;
      const weatherDesc = json.weather[0].description;
      weatherIcon.setAttribute("src", iconURI);
      weatherDescription.innerText = weatherDesc;
      weather.innerText = `${city}, ${country}의 현재 온도는 ${temp}°C 입니다. 오늘의 최고 기온은 ${tempMax}°C, 최저 기온은 ${tempMin}°C 입니다.`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const lodedCoords = localStorage.getItem(COORDS);
  if (!lodedCoords) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(lodedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
