// The Web Storage API provides mechanisms by which browsers can securely store key/value pairs.
// Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads.

// localStorage.setItem()
// localStorage.getItem()
// localStorage.removeItem()
// localStorage.clear()

function findAll (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function find (todo) {
  console.log('find func worked')
  let localTodos = JSON.parse(localStorage.getItem('todos'))
  let idx = localTodos.findIndex(elem => elem.id == todo.id)
  return idx
}

function remove (todo) {
  console.log('remove func worked')
  let removalTodos = JSON.parse(localStorage.getItem('todos'))
  removalTodos.splice(find(todo), 1) // ÇALIŞMADI
  localStorage.setItem('todos', JSON.stringify(removalTodos))
}

function save (todo) {
  let addingTodos = JSON.parse(localStorage.getItem('todos'))
  addingTodos.push(todo)
  localStorage.setItem('todos', JSON.stringify(addingTodos))
}

// change in text and checked value
function update (todo, checkValue) {
  console.log('update func worked')
  let updatedTodos = JSON.parse(localStorage.getItem('todos'))
  let idx = find(todo)
  updatedTodos[idx].checked = checkValue
  localStorage.setItem('todos', JSON.stringify(updatedTodos))
}

function drop () {
  localStorage.clear()
}
