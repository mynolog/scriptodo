const greetingForm = document.querySelector(".greeting__form");
const greetingInput = document.querySelector(".greeting__input");
const greetingMsg = document.querySelector(".greeting__message");
const greetingEdit = document.querySelector(".greeting__btn--edit");
const greetingSave = document.querySelector(".greeting__btn--save");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function handleSubmit(evt) {
  evt.preventDefault();
  greetingSave.classList.remove(SHOWING_CN);
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  greetingForm.classList.remove(SHOWING_CN);
  greetingMsg.classList.add(SHOWING_CN);
  greetingEdit.classList.add(SHOWING_CN);
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
  greetingInput.focus();
  greetingInput.value = currentUser;
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
