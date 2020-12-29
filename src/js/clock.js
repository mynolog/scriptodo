const time = document.querySelector(".clock__time");
const toggle = document.querySelector(".clock__btn--toggle");
const today = document.querySelector(".clock__date");

let is24hourMode = true;
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currentMonth = monthList[month];
  const dayOfWeek = week[date.getDay()];
  today.innerText = `${dayOfWeek} ${currentMonth} ${day}, ${year}`;
};

const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  time.innerText = is24hourMode
    ? `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
    : `${hours > 11 ? `PM ${hours - 12}` : `AM ${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

const loadClockMode = () => {
  const clockMode = localStorage.getItem("24hour");
  if (clockMode === "false") {
    is24hourMode = false;
    toggle.checked = false;
  } else {
    is24hourMode = true;
    toggle.checked = true;
  }
};

const handleToggle = () => {
  is24hourMode = !is24hourMode;
  is24hourMode ? (toggle.checked = true) : (toggle.checked = false);
  localStorage.setItem("24hour", is24hourMode);
};

function init() {
  loadClockMode();
  setInterval(() => {
    getCurrentDate();
    getCurrentTime();
  }, 1000);
}

toggle.addEventListener("click", handleToggle);
window.addEventListener("storage", handleToggle);
init();
