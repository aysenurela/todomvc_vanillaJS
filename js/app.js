let todos = [
  {
    id: 1,
    text: '1asd',
    checked: true
  },
  {
    id: 2,
    text: '2qwdasd',
    checked: false
  },
  {
    id: 3,
    text: '3sdcdscds',
    checked: false
  },
  {
    id: 4,
    text: '4fdsvdsv',
    checked: true
  },
  {
    id: 5,
    text: '5asdas',
    checked: false
  }
]

// vanilla JS addEventListener() method can only listen for events on a single element so "querySelectorAll('sth').addEventListener" does not work

function getElemId (id) {
  return document.getElementById(id)
}
function querySelectorAll (qry) {
  return document.querySelectorAll(qry)
}

let todoList = getElemId('todo-list') // gives object
let inputEnter = getElemId('new-todo')
let clearButton = getElemId('clear-completed')
let togglebtn = getElemId('toggle-all')
let filterElements = querySelectorAll('.filter-element')
let filterLi = querySelectorAll('.filters li a')

togglebtn.addEventListener('click', toggleAllwithRemainingTodos)
todoList.addEventListener('click', deleteToDo)
todoList.addEventListener('click', checkWithRemainingTodos)
inputEnter.addEventListener('keydown', applyEnter)
clearButton.addEventListener('click', clearCompleted)
for (let i = 0; i < filterElements.length; i++) {
  filterElements[i].addEventListener('click', filterElem)
}
for (let i = 0; i < filterElements.length; i++) {
  filterElements[i].addEventListener('click', filterOpt)
}

function starterPack () {
  renderToDos()
  remainingToDos()
}
starterPack()

function renderToDos () {
  todos.reverse().map(function (todo) {
    createToDoDom(todo)
  })
}
function remainingToDos () {
  let counting = document.getElementsByClassName('todo-count')
  let countCompleted = querySelectorAll('.completed')
  counting[0].innerHTML = todos.length - countCompleted.length + ' items left'
}

function deleteToDo (event) {
  removeToDofromDom(event)
  removeToDofromArr(event)
}
function removeToDofromDom (event) {
  if (event.target.classList.contains('destroy')) {
    todoList.removeChild(event.target.parentElement.parentElement)
  }
}
function removeToDofromArr (event) {
  if (event.target.classList.contains('destroy')) {
    let idx = todos.findIndex(
      item => item.id == event.target.previousElementSibling.id
    )
    todos.splice(idx, 1)
  }
}

function clearCompleted () {
  removeTodoByFilter('.completed')
  removeCompletedTodos()
}

function removeTodoByFilter (selector) {
  let filteredTodos = querySelectorAll(selector)
  filteredTodos.forEach(event => event.parentNode.removeChild(event))
}

// ÇALIŞMIYOR
// function clearArr () {
//   let checkedToDos = querySelectorAll('.completed')
//   checkedToDos.forEach(function (i) {
//     let idx = todos.findIndex(item => item.id == i.firstChild.id)
//     todos.splice(idx, 1)
//   })
// }

function checkWithRemainingTodos (event) {
  let parentElem = event.target.parentNode.parentNode
  if (event.target.nodeName === 'INPUT') {
    checkToDoSecond(parentElem)
  }
  remainingToDos()
  checkedData(event)
  // checkToDo(event)
}

// function checkToDo (event) {
//   console.log('checkDOM event', event, typeof event) // object
//   // console.log('hsdbc:', event.target.parentNode.className) //her zaman div class'ı view veriyor
//   // let selfClass = event.target.parentNode.className
//   // let parentsClass = event.target.parentNode.parentNode.className
//   // if (selfClass === 'active') {
//   //   selfClass = 'completed'
//   //   event.target.parentNode.className = selfClass
//   // } else if (selfClass === 'completed') {
//   //   selfClass = 'active'
//   //   event.target.parentNode.className = selfClass}
//   if (
//     event.target.nodeName === 'INPUT' &&
//     event.target.parentNode.parentNode.className !== 'completed'
//   ) {
//     event.target.parentNode.parentNode.className = 'completed'
//   } else if (
//     event.target.nodeName === 'INPUT' &&
//     event.target.parentNode.parentNode.className === 'completed'
//   ) {
//     event.target.parentNode.parentNode.className = 'active'
//   }
// }

function checkToDoSecond (elem) {
  if (elem.className !== 'completed') {
    elem.className = 'completed'
  } else {
    elem.className = 'active'
  }
}

function checkedData (event) {
  let matchDatawithElem = todos.filter(function (elem) {
    if (elem.id == event.target.id) {
      return elem
    }
  })
  matchDatawithElem.map(elem => (elem.checked = event.target.checked))
}

function filterOpt (event) {
  var elems = querySelectorAll('[data-filter]')
  for (i = 0; i < elems.length; i++) {
    elems[i].classList.remove('selected')
  }
  event.target.classList.add('selected')
  console.log('elems and type', elems, typeof elems)
}

function filterElem (event) {
  let filterValue = event.target.attributes['data-filter'].value

  removeTodoByFilter('.todo-item')

  switch (filterValue) {
    case 'completed':
      filterTodos({ filter: filterValue, checked: true })
      break
    case 'active':
      filterTodos({ filter: filterValue, checked: false })
      break
    default:
      addTodosToDom(todos)
  }
}

function filterTodos (options) {
  addTodosToDom(todos.filter(elem => elem.checked === options.checked))
}

function addTodosToDom (_todos) {
  _todos.map(elem => createToDoDom(elem))
}

function removeCompletedTodos () {
  todos = todos.filter(elem => elem.checked === false)
}

function toggleAllwithRemainingTodos () {
  toggleAll()
  remainingToDos()
  toggleDataCheckedValue(true)
}

function toggleAll () {
  let domTodos = querySelectorAll('.todo-list li')
  let completedTodos = querySelectorAll('.todo-list li.completed')
  let allInputs = querySelectorAll('.todo-list li input')
  // Array.from(domTodos[1].children[0].children)[0].checked = true

  domTodos.forEach(elem => elem.classList.remove('completed', 'active')) // hepsinden çıkar

  if (domTodos.length !== completedTodos.length) {
    domTodos.forEach(elem => elem.classList.add('completed'))
    allInputs.forEach(elem => (elem.checked = true))
  } else {
    domTodos.forEach(elem => elem.classList.add('active'))
    allInputs.forEach(elem => (elem.checked = false))
  }
}

// parametre ile çalıştır
function toggleDataCheckedValue (val) {
  let controlVal = todos.filter(elem => elem.checked === val)
  if (controlVal.length == todos.length) {
    todos.map(elem => (elem.checked = !val))
  } else {
    todos.map(elem => (elem.checked = val))
  }
}

// ADDING ONE NEW TODO
function clearInput () {
  let todoInput = getElemId('new-todo')
  todoInput.value = ''
}

function applyEnter (event) {
  if (event.keyCode === 13) {
    finalNewToDo()
  }
}

// CREATE AN OBJECT
function createToDo (value) {
  return {
    id: new Date().getTime(),
    text: value,
    checked: false
  }
}

// PUSH NEW OBJECT INTO DATA ARRAY
function pushNewToDo (text) {
  todos.push(createToDo(text))
}

// CREATE  NEW DOM ELEMENTS FOR INCOMING OBJECT
function createToDoDom (todo) {
  let todoListContainer = document.createElement('li')

  todoListContainer.className = todo.checked ? 'completed' : 'active'
  todoListContainer.className += ' todo-item'

  const checkAtt = todo.checked ? ' checked>' : '>'

  todoListContainer.innerHTML =
    "<div class='view'>" +
    "<input type='checkbox' class='toggle' id=" +
    todo.id +
    checkAtt +
    '<label id=' +
    todo.id +
    ' for=' +
    todo.id +
    '>' +
    todo.text +
    '</label>' +
    "<button class='destroy'></button>" +
    '</div>'
  todoList.insertBefore(todoListContainer, todoList.firstChild)
}

// CALL ALL TO FINAL ADDING

function finalNewToDo () {
  let enteredText = getElemId('new-todo').value
  pushNewToDo(enteredText)
  createToDoDom(createToDo(enteredText))
  clearInput()
  remainingToDos()
  console.log('todos:', todos)
}
