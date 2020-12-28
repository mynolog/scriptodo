const clock = document.querySelector(".clock");
const toggle = document.querySelector(".clock__toggle-btn");
const today = document.querySelector(".date");
let is24hourMode = true;

// TODO : 날짜 표기
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthList[month];
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = week[date.getDay()];
  today.innerText = `${dayOfWeek} ${currentMonth} ${day}, ${year}`;
};

// 24시간 표기 시계
const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clock.innerText = is24hourMode
    ? `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
    : `${hours > 11 ? `${hours - 12}` : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

const loadClockMode = () => {
  const clockMode = localStorage.getItem("24hour");
  if (clockMode == "false") {
    is24hourMode = false;
    toggle.value = "24 Hour";
  } else {
    is24hourMode = true;
    toggle.value = "12 Hour";
  }
};

const handleToggle = () => {
  is24hourMode = !is24hourMode;
  !is24hourMode ? (toggle.value = "24 Hour") : (toggle.value = "12 Hour");
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

init();
