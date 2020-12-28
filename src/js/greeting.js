const form = document.querySelector(".form");
const input = document.querySelector(".greeting__input");
const greetingMsg = document.querySelector(".greeting__message");
const greetingEdit = document.querySelector(".greeting__edit");
const greetingSave = document.querySelector(".greeting__save");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function handleSubmit(evt) {
  evt.preventDefault();
  greetingSave.classList.remove(SHOWING_CN);
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greetingMsg.classList.add(SHOWING_CN);
  greetingMsg.innerText = `Hello ${text}`;
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function editName() {
  const currentUser = localStorage.getItem(USER_LS);
  input.value = currentUser;
  greetingMsg.classList.remove(SHOWING_CN);
  greetingSave.classList.add(SHOWING_CN);
  askForName();
}

greetingEdit.addEventListener("click", editName);
greetingSave.addEventListener("click", handleSubmit);

function init() {
  loadName();
}

init();
