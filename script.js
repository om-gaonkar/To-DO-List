const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-Input");
const todoListUl = document.getElementById("todo-list");

let todoArray = getTodos();
console.log(todoArray);
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // addTask();
});

// adds task into array "todoList"
function addTask() {
  const inputText = todoInput.value.trim();
  if (inputText.length > 0) {
    const todoObject = {
      text: inputText,
      completed: false,
    };
    todoArray.push(todoObject);
    updateTodoList();
    saveToLocalStorage();
    todoInput.value = "";
  }
}
// function to update the todolist  UI
function updateTodoList() {
  todoListUl.innerHTML = "";
  todoArray.forEach((todo, index) => {
    todoItem = createList(todo, index);
    todoListUl.append(todoItem);
  });
}

// displays task on the UI in text and returns a list with todos
function createList(displaytext, index) {
  const todoId = "todo-" + index;
  const todoLi = document.createElement("li"); //creates new list
  const todoText = displaytext.text;

  todoLi.className = "todo"; //assign class name to access css properties
  todoLi.innerHTML = `
    <input type="checkbox" name="" id="${todoId}" />
    <label class="custom-checkbox" for="${todoId}"><i class="fa-solid fa-check"></i></label>
    <label class="todo-text" for="${todoId}">${todoText}</label>
    <button class="delete-Button"  >
      <i class="fa-solid fa-trash" style="color: #00ffc4"></i>
    </button>
  `;
  const deleteButtton = todoLi.querySelector(".delete-Button");
  deleteButtton.addEventListener("click", () => {
    deleteTodoItem(index);
  });

  const checkbox = todoLi.querySelector("input");

  checkbox.addEventListener("change", () => {
    todoArray[index].completed = checkbox.checked;
    saveToLocalStorage();
  });
  checkbox.checked = displaytext.completed;

  return todoLi;
}

function deleteTodoItem(todoIndex) {
  todoArray.splice(todoIndex, 1);
  // todoArray = todoArray.filter((_, i) => i !== todoIndex);
  updateTodoList();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const todoJson = JSON.stringify(todoArray) || "[]";
  localStorage.setItem("todos", todoJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
