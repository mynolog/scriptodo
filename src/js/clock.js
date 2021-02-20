const clockContainer = document.querySelector(".js-clock");
const clockMode = document.querySelector(".js-clock-mode");
const clockTitle = clockContainer.querySelector("h1");
const dateTitle = clockContainer.querySelector("h2");

const CLOCK_MODE_LS = "is24Hours";
let is24HoursClock;

const loadClockMode = () => {
  const is24HourMode = JSON.parse(localStorage.getItem(CLOCK_MODE_LS));
  if (is24HourMode === null) {
    // 기본값 : 24시간 시계 모드
    clockMode.checked = true;
    return (is24HoursClock = true);
  } else {
    clockMode.checked = is24HourMode;
    return (is24HoursClock = is24HourMode);
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
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const currentDate = date.getDate();
  const day = date.getDay();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dateTitle.innerText = `${days[day]}, ${months[month]} ${currentDate}, ${year}`;
};

clockMode.addEventListener("click", handleClockMode);

const initClock = () => {
  loadClockMode();
  setInterval(getCurrentTime, 1000);
  getCurrentDate();
};

initClock();
