const nameForm = document.querySelector(".js-nameForm");
const input = nameForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING = "showing";

const getCurrentHour = () => {
  const date = new Date();
  return date.getHours();
};

const saveName = (userName) => {
  localStorage.setItem(USER_LS, userName);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
};

const askName = () => {
  nameForm.classList.add(SHOWING);
  nameForm.addEventListener("submit", handleSubmit);
};

const paintGreeting = (userName) => {
  nameForm.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  const currentHour = getCurrentHour();
  console.log(currentHour);
  if (currentHour > 6 && currentHour <= 12) {
    greeting.innerText = `Good morning, ${userName}`;
  } else if (currentHour > 12 && currentHour <= 18) {
    greeting.innerText = `Good afternoon, ${userName}`;
  } else if (currentHour > 18 && currentHour <= 20) {
    greeting.innerText = `Good evening, ${userName}`;
  } else {
    greeting.innerText = `Hello, ${userName}`;
  }
};

const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askName();
  } else {
    paintGreeting(currentUser);
  }
};

// Todo : 이름 변경, 이름 삭제 기능

// const editBtn = document.querySelector(".js-edit-button");
// const deleteBtn = document.querySelector(".js-delete-button");

// const editName = () => {};

// const deleteName = () => {};

// editBtn.addEventListener("click", editName);
// deleteBtn.addEventListener("click", deleteName);

const initGreeting = () => {
  loadName();
};

initGreeting();
