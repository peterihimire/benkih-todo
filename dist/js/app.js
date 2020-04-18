// variables
const navbarBtn = document.querySelector(".navbar-btn");
const navbarLinks = document.querySelector(".navbar-links");
const navbarOverlay = document.querySelector(".navbar-overlay");
const todoFeedback = document.querySelector(".todo-feedback");
const todoInput = document.querySelector("#todo-input");
const todoSubmit = document.querySelector("#todo-submit");
const todoDisplay = document.querySelector("#todo-display");
const todoBox = document.querySelector("#todo-box");
const formWrapper = document.querySelector("#form-wrapper");
const refreshBtn = document.querySelector("#refresh-btn");
let todoItemList = [];
let todoID = 0;

navbarBtn.addEventListener("click", () => {
  let value = navbarLinks.classList.contains("navbar-collapse");

  if (value) {
    navbarLinks.classList.remove("navbar-collapse");
    navbarBtn.classList.remove("change");
    navbarOverlay.classList.remove("transparent-background");
  } else {
    navbarLinks.classList.add("navbar-collapse");
    navbarBtn.classList.add("change");
    navbarOverlay.classList.add("transparent-background");
  }
});

navbarOverlay.addEventListener("click", e => {
  let value = navbarLinks.classList.contains("navbar-collapse");
  if (value) {
    navbarLinks.classList.remove("navbar-collapse");
    navbarBtn.classList.remove("change");
    navbarOverlay.classList.remove("transparent-background");
  }
});

const submitTodoForm = () => {
  const todoValue = todoInput.value;
  if (todoValue === "") {
    todoFeedback.innerHTML = `<p>Value cannot be empty</p>`;
    todoFeedback.classList.add("error");

    setTimeout(() => {
      todoFeedback.remove("error");
    }, 3000);
  } else {
    todoInput.value = "";
    let todo = {
      id: todoID,
      name: todoValue
    };

    todoID++;
    todoItemList.push(todo);
    addTodo(todo);
    saveTodo();
  }
};

const addTodo = todo => {
  const div = document.createElement("div");
  div.classList.toggle("item");
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
};

const editTodo = todoitem => {
  let id = parseInt(todoitem.parentElement.dataset.id);
  let singleTodo = todoitem.parentElement.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter(todo => todo.id === id);
  todoInput.value = individualTodo[0].name;
  let tempTodo = todoItemList.filter(todo => todo.id !== id);
  todoItemList = tempTodo;
};

const deleteTodo = todoItem => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement.parentElement;
  todoBox.removeChild(singleTodo);
  let individualTodo = todoItemList.filter(todo => todo.id === id);
  let tempTodo = todoItemList.filter(todo => todo.id !== id);
  todoItemList = tempTodo;
  saveTodo();
};

const checkTodo = todoItem => {
  let id = parseInt(todoItem.parentElement.dataset.id);
  let singleTodo = todoItem.parentElement.parentElement;
  let todoText = singleTodo.children[1].firstElementChild.textContent;
  let todoPtag = singleTodo.children[1].firstElementChild;
  todoPtag.classList.toggle("strike-through");
};

const setReset = e => {
  const todoList = todoItemList.map(todo => {
    return todo.id;
  });

  todoList.forEach(id => deleteTodoById(id));
  let todoBoxChildren = todoBox.children;
  let i;
  for (i = 0; i < todoBoxChildren.length; i++) {
    while (todoBoxChildren[i].classList.contains("item")) {
      todoBox.removeChild(todoBoxChildren[i]);
    }
  }
};
refreshBtn.addEventListener("click", setReset);

const deleteTodoById = id => {
  todoItemList = todoItemList.filter(todo => todo.id !== id);
  saveTodo();
};

todoSubmit.addEventListener("click", e => {
  e.preventDefault();
  submitTodoForm();
});

const setupApp = () => {
  todoItemList = getTodos();
  populateTodo(todoItemList);
  getOneTodo();
};

const populateTodo = todoItemList => {
  todoItemList.forEach(todo => addTodo(todo));
};

const saveTodo = () => {
  localStorage.setItem("todos", JSON.stringify(todoItemList));
};

const getOneTodo = id => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  return todos.find(function(todo) {
    todo.id === id;
  });
};

const getTodos = () => {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
};

document.addEventListener("DOMContentLoaded", () => {
  setupApp();

  todoBox.addEventListener("click", e => {
    if (e.target.classList.contains("fa-edit")) {
      editTodo(e.target);
    } else if (e.target.classList.contains("fa-trash")) {
      deleteTodo(e.target);
    }
  });

  todoBox.addEventListener("change", e => {
    if (e.target.classList.contains("todo-check")) {
      checkTodo(e.target);
    }
  });
});
