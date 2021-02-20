const API_KEY = "9fad971fc1d3dda623de94b37ff07168";
const weather = document.querySelector(".weather");
const currentWeather = document.querySelector(".weather__active-text");
const activeBtn = weather.querySelector(".weather__active-button");

const ACTIVE_WEATHER = "activeGetWeather";

const getCurrentWeather = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((json) => {
      const temperture = Math.round(json.main.temp);
      const description = json.weather[0].description;
      const descCapitalized = description.charAt(0).toUpperCase() + description.slice(1);
      const city = json.name;
      const country = json.sys.country;
      currentWeather.innerText = `${temperture}°C, ${descCapitalized} @${city}, ${country}`;
    });
};

const saveLocation = (lat, lon) => {
  const coordsObj = {
    latitude: lat,
    longitude: lon,
  };
  localStorage.setItem("coords", JSON.stringify(coordsObj));
};

const geoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  saveLocation(latitude, longitude);
  getCurrentWeather(latitude, longitude);
};

const geoError = (error) => {
  console.log(`${error}: Something went wrong! Can't access to get your current locations..`);
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const loadLocation = () => {
  const coords = JSON.parse(localStorage.getItem("coords"));
  if (coords !== null) {
    getCurrentWeather(coords.latitude, coords.longitude);
  } else {
    getLocation();
  }
};

const handleActiveBtn = (e) => {
  e.preventDefault();
  loadLocation();
  const activeGetWeather = true;
  localStorage.setItem(ACTIVE_WEATHER, JSON.stringify(activeGetWeather));
};
activeBtn.addEventListener("click", handleActiveBtn);

const initWeather = () => {
  const activeGetWeather = JSON.parse(localStorage.getItem("activeGetWeather"));
  if (activeGetWeather === true) {
    const coords = JSON.parse(localStorage.getItem("coords"));
    getCurrentWeather(coords.latitude, coords.longitude);
  }
};

initWeather();
