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

const askName = () => {
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
