const API_KEY = "9fad971fc1d3dda623de94b37ff07168";
const weather = document.querySelector(".weather");
const activeBtn = weather.querySelector(".weather__active-button");

console.log(API_KEY);

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
};

const geoError = (error) => {
  console.log(`${error}`);
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const loadLocation = () => {
  const coords = localStorage.getItem("coords");
  if (coords !== null) {
  } else {
    getLocation();
  }
};

const handleActiveBtn = (e) => {
  e.preventDefault();
  loadLocation();
};

activeBtn.addEventListener("click", handleActiveBtn);
