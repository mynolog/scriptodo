const clock = document.querySelector(".clock");

// TODO : 날짜 표기
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  //   console.log(`${year} ${month} ${day}`);
};

// 24시간 표기 시계
const getCurrentTime24 = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clock.innerText = `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

// 12시간 표기 시계 (AM, PM)
const getCurrentTime12 = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // TODO : 자정일 때 0시로 표시하는 로직 필요
  clock.innerText = `${hours > 11 ? `PM ${hours - 12}` : `AM 0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${
    seconds > 9 ? seconds : `0${seconds}`
  }`;
};

// TODO : 24시간 표기 / 12시간 표기 전환 토글 버튼
const init = () => {
  setInterval(() => {
    getCurrentDate();
    getCurrentTime24();
  }, 1000);
};

init();
