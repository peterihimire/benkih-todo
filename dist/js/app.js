// variables
const navbarBtn = document.querySelector('.navbar-btn');
const navbarLinks = document.querySelector('.navbar-links');

const todoFeedback = document.querySelector('.todo-feedback');
const todoInput = document.querySelector('#todo-input');
const todoSubmit = document.querySelector('#todo-submit');
const todoDisplay = document.querySelector('#todo-display');
const todoBox = document.querySelector('#todo-box');
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
  todoBox.appendChild(div);
}

todoSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  submitTodoForm()
})