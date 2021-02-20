const clockContainer = document.querySelector(".js-clock");
const clockMode = document.querySelector(".js-clock-mode");
const clockTitle = clockContainer.querySelector("h1");
const dateTitle = clockContainer.querySelector("h2");

const CLOCK_MODE_LS = "is24Hours";
let is24HoursClock;

const loadClockMode = () => {
  is24HoursClock = JSON.parse(localStorage.getItem(CLOCK_MODE_LS));
  if (is24HoursClock === null) {
    clockMode.checked = true;
    return is24HoursClock;
  } else {
    clockMode.checked = is24HoursClock;
    return is24HoursClock;
  }
};

const saveClockMode = (status) => {
  localStorage.setItem(CLOCK_MODE_LS, status);
};

const handleClockMode = (e) => {
  const isChecked = e.target.checked;
  saveClockMode(isChecked);
};

const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (is24HoursClock) {
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  } else {
    clockTitle.innerText = `${hours > 11 ? `PM ${hours - 12}` : `AM ${hours}`}:${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`;
  }
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  const day = currentDate.getDay();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dateTitle.innerText = `${days[day]}, ${months[month]} ${date}, ${year}`;
};

clockMode.addEventListener("click", handleClockMode);

const initClock = () => {
  loadClockMode();
  setInterval(() => {
    getCurrentTime();
    getCurrentDate();
  }, 1000);
};

initClock();
