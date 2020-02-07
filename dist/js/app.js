// variables
const navbarBtn = document.querySelector('.navbar-btn');
const navbarLinks = document.querySelector('.navbar-links');

const todoFeedback = document.querySelector('.todo-feedback');
const todoInput = document.querySelector('#todo-input');
const todoSubmit = document.querySelector('#todo-submit');
const todoDisplay = document.querySelector('#todo-display');
const todoBox = document.querySelector('#todo-box');
const formWrapper = document.querySelector('#form-wrapper');

let todoItemList = [];
let todoID = 0;



// navbar event listener
navbarBtn.addEventListener('click' , () => {
  let value = navbarLinks.classList.contains('navbar-collapse');

  if(value){
      navbarLinks.classList.remove('navbar-collapse');
      navbarBtn.classList.remove('change');
  }else{
      navbarLinks.classList.add('navbar-collapse');
      navbarBtn.classList.add('change');
  }
})

//Submit TODO Form
const submitTodoForm = () => {
  const todoValue = todoInput.value;
  if(todoValue === ""){
    todoFeedback.innerHTML = `<p>Value cannot be empty</p>`;
    todoFeedback.classList.add('error');

    setTimeout(() => {
      todoFeedback.remove('error');
    },3000)
  } else {
    // todoDisplay.textContent = todoValue;
    todoInput.value = '';

    let todo = {
      id: todoID,
      name: todoValue
    }

    todoID++;
    todoItemList.push(todo);
    addTodo(todo)

    console.log(todoItemList);
  }
  console.log(todoValue)
}

const addTodo = (todo) => {
  const div = document.createElement('div');
  div.classList.add('item');
  div.innerHTML = `
    <div class="item-check " data-id=${todo.id} >
      <input type="checkbox" class="todo-check" value="on" >
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

const editTodo = (todoitem) => {
  let id = parseInt(todoitem.parentElement.dataset.id);
  let singleTodo = todoitem.parentElement.parentElement.parentElement;
  //remove from DOM
  todoBox.removeChild(singleTodo);
  //remove from todoItemList array
  let individualTodo = todoItemList.filter( (todo) => todo.id === id);
  //populate the remove todoItem from the array to the todoInput
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

const deleteTodo = (todoItem) => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter( (todo) => todo.id === id);
  let tempTodo = todoItemList.filter(todo => todo.id !== id);
  todoItemList = tempTodo;

  console.log(individualTodo);
  console.log(tempTodo);
  console.log(todoItemList);
  console.log(id)

}

const checkTodo = (todoItem) => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  console.log(id)
}

//todo submit button
todoSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  submitTodoForm()
})

//todo-box eventListener
todoBox.addEventListener('click', (e)=> {
  console.log(e.target)
  if(e.target.classList.contains('fa-edit')){
    console.log('edit icon has been clicked')
    editTodo(e.target)
  } else if(e.target.classList.contains('fa-trash')){
    console.log('the trash icon has been clicked')
    deleteTodo(e.target)
  } else if (e.target.classList.contains('todo-check')){
    console.log('you just clicked on the check-box')
    checkTodo(e.target)
  }
})





