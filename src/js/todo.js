const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

const deleteToDo = (e) => {
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  saveToDos();
};

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

const paintToDo = (text) => {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);

  const newId = toDos.length + 1;
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
  toDoInput.placeholder = "Write a to do";
};

const handleSubmitToDo = (e) => {
  e.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue !== "") {
    paintToDo(currentValue);
    toDoInput.value = "";
  } else {
    toDoInput.placeholder = "할 일을 입력하세요!";
  }
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
};

const initTodo = () => {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmitToDo);
};

initTodo();
