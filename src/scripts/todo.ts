interface Todo {
  text: string
  id: string
}

const toDoForm = document.querySelector<HTMLFormElement>('.js-toDoForm')!
const toDoInput = toDoForm.querySelector<HTMLInputElement>('input')!
const toDoList = document.querySelector<HTMLUListElement>('.js-toDoList')!
const TODOS_LS = 'toDos'

let toDos: Todo[] = []

const deleteToDo = (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement
  const li = target.parentElement

  if (li) {
    toDoList.removeChild(li)
    const cleanToDos = toDos.filter((toDo) => toDo.id !== li.id)
    toDos = cleanToDos
    saveToDos()
  }
}

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

const paintToDo = (text: string) => {
  const li = document.createElement('li')
  const delBtn = document.createElement('button')
  delBtn.innerHTML = '❌'
  delBtn.addEventListener('click', deleteToDo)
  const span = document.createElement('span')
  span.innerText = text
  li.appendChild(span)
  li.appendChild(delBtn)

  const newId = toDos.length + 1
  li.id = newId.toString()
  const newTodo: Todo = {
    text,
    id: newId.toString(),
  }
  if (toDos.length < 7) {
    toDoList.appendChild(li)
    toDos.push(newTodo)
    saveToDos()
  } else {
    alert('할 일은 최대 7개까지만 등록할 수 있어요. :)')
  }
  toDoInput.placeholder = 'Write a to do'
}

const handleSubmitToDo = (e: Event) => {
  e.preventDefault()
  const currentValue = toDoInput.value
  if (currentValue !== '') {
    paintToDo(currentValue)
    toDoInput.value = ''
  } else {
    toDoInput.placeholder = '할 일을 입력하세요!'
  }
}

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS)
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos)
    parsedToDos.forEach((toDo: Todo) => {
      paintToDo(toDo.text)
    })
  }
}

const initTodo = () => {
  loadToDos()
  toDoForm.addEventListener('submit', handleSubmitToDo)
}

initTodo()
