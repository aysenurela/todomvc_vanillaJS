// The Web Storage API provides mechanisms by which browsers can securely store key/value pairs.
// Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads.

// localStorage.setItem()
// localStorage.getItem()
// localStorage.removeItem()
// localStorage.clear()

function findAll () {
  if (localStorage.getItem('todos') !== null) {
    return JSON.parse(localStorage.getItem('todos'))
  } else {
    return []
  }
}

function find (todo) {
  console.log('find func worked')
  let localTodos = JSON.parse(localStorage.getItem('todos'))
  return localTodos.filter(elem => elem.id == todo.id)
}

function remove (todo) {
  console.log('remove func worked')
  let removalTodos = findAll()
  // The filter() method creates a new array with all elements that pass the test
  let newArr = removalTodos.filter(elem => elem.id !== todo.id)

  // let idx = removalTodos.findIndex(item => item.id === todo.id)
  // removalTodos.splice(idx, 1)

  localStorage.setItem('todos', JSON.stringify(newArr))
}

function save (todo) {
  let addingTodos = findAll()
  addingTodos.push(todo)
  localStorage.setItem('todos', JSON.stringify(addingTodos))
}

// change in text and checked value
function update (todo) {
  let updatedTodos = findAll()
  // The map() method creates a new array
  updatedTodos = updatedTodos.map(elem => {
    return elem.id === todo.id ? todo : elem
  })

  localStorage.setItem('todos', JSON.stringify(updatedTodos))
}

function drop () {
  localStorage.clear()
}
