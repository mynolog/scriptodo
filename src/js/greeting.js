const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING = "showing";

const saveName = (userName) => {
  localStorage.setItem(USER_LS, userName);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
};

const askForName = () => {
  form.classList.add(SHOWING);
  form.addEventListener("submit", handleSubmit);
};

const paintGreeting = (userName) => {
  form.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  greeting.innerText = `Hello ${userName}`;
};

const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
};

const initGreeting = () => {
  loadName();
};

initGreeting();
