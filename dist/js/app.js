// variables
const navbarBtn = document.querySelector('.navbar-btn');
const navbarLinks = document.querySelector('.navbar-links');
const navbarOverlay = document.querySelector('.navbar-overlay');

const todoFeedback = document.querySelector('.todo-feedback');
const todoInput = document.querySelector('#todo-input');
const todoSubmit = document.querySelector('#todo-submit');
const todoDisplay = document.querySelector('#todo-display');
const todoBox = document.querySelector('#todo-box');
const formWrapper = document.querySelector('#form-wrapper');
const refreshBtn = document.querySelector('#refresh-btn');



let todoItemList = [];
let todoID = 0;



// navbar event listener
navbarBtn.addEventListener('click' , () => {
  let value = navbarLinks.classList.contains('navbar-collapse');

  if(value){
      navbarLinks.classList.remove('navbar-collapse');
      navbarBtn.classList.remove('change');
      navbarOverlay.classList.remove('transparent-background');
  }else{
      navbarLinks.classList.add('navbar-collapse');
      navbarBtn.classList.add('change');
      navbarOverlay.classList.add('transparent-background');
  }
})

navbarOverlay.addEventListener('click', (e)=> {
  console.log(e.target)
  console.log('navbar overlay has been clicked');
  let value = navbarLinks.classList.contains('navbar-collapse');
  if (value){
    navbarLinks.classList.remove('navbar-collapse');
    navbarBtn.classList.remove('change');
    navbarOverlay.classList.remove('transparent-background');
  }
})



//Submit TODO Form 
const submitTodoForm = () => {
  const todoValue = todoInput.value;
  //form validation
  if(todoValue === ""){
    todoFeedback.innerHTML = `<p>Value cannot be empty</p>`;
    todoFeedback.classList.add('error');

    setTimeout(() => {
      todoFeedback.remove('error');
    },3000)
  } else {
    // creates an object when validation is passed
    todoInput.value = '';

    let todo = {
      id: todoID,
      name: todoValue
    }

    todoID++;
    todoItemList.push(todo);
    addTodo(todo)
    saveTodo()

    console.log(todoItemList);
  }
  console.log(todoValue)
}


//adds a new todo div to the todo card
const addTodo = (todo) => {
  const div = document.createElement('div');
  div.classList.toggle('item');
  div.innerHTML = `
    <div class="item-check check-slave " data-id=${todo.id} >
      <input type="checkbox" class="todo-check" value="on"  >
    </div>

    <div class="item-text " >
      <p  class="item-text-p" id="todo-display">${todo.name}</p>
    </div>

    <div class="item-edit " >

      <div class="icon" id="icon-edit" data-id=${todo.id}>
        <i class="fas fa-edit" id="edit" ></i>
      </div>
      <div class="icon" id="icon-edit" data-id=${todo.id}>
        <i class="fas fa-trash" id="trash"></i>
      </div>

    </div>
  `;
  todoBox.insertBefore(div, formWrapper);
  // todoBox.appendChild(div);
}

//updates when the edit icon is clicked
const editTodo = (todoitem) => {
  let id = parseInt(todoitem.parentElement.dataset.id);
  let singleTodo = todoitem.parentElement.parentElement.parentElement;
  //remove from DOM
  todoBox.removeChild(singleTodo);
  //remove from todoItemList array
  let individualTodo = todoItemList.filter( (todo) => todo.id === id);
  //populate the removed todoItem from the array to the todoInput
  todoInput.value = individualTodo[0].name;
  //return the todo without the id & that gives us the updated todoItemList
  let tempTodo = todoItemList.filter(todo => todo.id !== id);
  todoItemList = tempTodo;

  console.log(id);
  console.log(singleTodo);
  console.log(individualTodo)
  console.log(tempTodo);
  console.log(todoItemList);
}

//updates when the delete icon is clicked
const deleteTodo = (todoItem) => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter( (todo) => todo.id === id);
  let tempTodo = todoItemList.filter(todo => todo.id !== id);
  todoItemList = tempTodo;
  saveTodo()

  console.log(individualTodo);
  console.log(tempTodo);
  console.log(singleTodo)
  console.log(todoItemList);
  console.log(id)

}


//updates when the checkbox is clicked
const checkTodo = (todoItem) => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement;

  let todoText = singleTodo.children[1].firstElementChild.textContent;
  let todoPtag = singleTodo.children[1].firstElementChild;

  todoPtag.classList.toggle('strike-through')

  
  console.log(id)
  console.log(singleTodo)
  console.log(todoPtag)
  console.log(singleTodo.children[0])
  console.log(todoText)
}



//to  reset the todo both from the todolist and from the local storage
const setReset = (e) => {
  console.log(e.target)
  console.log('refresh button has been clicked');
  const todoList = todoItemList.map((todo) => {
    return todo.id
  })

  todoList.forEach( id => deleteTodoById(id) )
  console.log(todoList)
  console.log(todoBox)
  console.log(todoBox.children)
  let todoBoxChildren = todoBox.children;
  let i ;
  for(i = 0; i < todoBoxChildren.length; i++){
    console.log(todoBoxChildren[i])
    //remove todos with class of item only leaving the todo-feedback and form-wrapper divs
    while(todoBoxChildren[i].classList.contains('item')){
      todoBox.removeChild(todoBoxChildren[i])
    }
  }
  console.log(todoBoxChildren)
}
refreshBtn.addEventListener('click', setReset)


const deleteTodoById = (id) => {
  console.log(id)
  console.log(todoItemList)
  todoItemList = todoItemList.filter(todo => todo.id !== id)
  saveTodo()
  console.log(todoItemList)
}




//todo submit button
todoSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  submitTodoForm()
})


const setupApp = () => {
  todoItemList = getTodos();
  console.log(todoItemList)
  populateTodo(todoItemList)
  getOneTodo()
  // setRefresh()
}

const populateTodo = (todoItemList) => {
  todoItemList.forEach(todo => addTodo(todo))
}






//functions for local-storage
const saveTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todoItemList));
  console.log(todoItemList)
}

//get one todo by ID
const getOneTodo = (id) => {
  let todos = JSON.parse(localStorage.getItem('todos'))
  return todos.find(function(todo){
    todo.id === id;
    console.log(todo.id, id)
  })
}

const getTodos = () => {
  return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
}






// executes all these functions on app load
document.addEventListener('DOMContentLoaded', () => {
  setupApp()

  //todo-box eventListener
  todoBox.addEventListener('click', (e)=> {
    console.log(e.target)
    if(e.target.classList.contains('fa-edit')){
      console.log('edit icon has been clicked')
      editTodo(e.target)
    } else if(e.target.classList.contains('fa-trash')){
      console.log('the trash icon has been clicked')
      deleteTodo(e.target)
    }
  })

  todoBox.addEventListener('change', (e)=> {
    if(e.target.classList.contains('todo-check')){
      console.log('you just clicked on the check-box')
      checkTodo(e.target)
    }
  })


})



