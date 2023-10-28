// Get required elements from the DOM
const sendButton = document.querySelector(".send");
const inputField = document.querySelector('input[type="text"]');
const todoList = document.querySelector(".second");

// Array to store the todo items
let todos = [];

// Function to save todos to local storage
const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));

  if (storedTodos) {
    todos = storedTodos;

    todos.forEach((todo) => {
      const newTodo = createTodoElement(todo.text, todo.line2);
      todoList.appendChild(newTodo);
    });
  }
};

// Function to create a new todo element
const createTodoElement = (text, line2) => {
  const newTodo = document.createElement("div");
  newTodo.classList.add("list");
  newTodo.innerHTML = `
    <div><img class="delete-icon" src="icons/delete.png" alt=""></div>
    <div class="line1">${text}</div>
    <div class="line2">${line2}</div>
  `;

  // Attach event listener to the delete button
  const deleteButton = newTodo.querySelector(".delete-icon");
  deleteButton.addEventListener("click", () => {
    newTodo.remove();
    todos = todos.filter((todo) => todo.text !== text);
    saveTodosToLocalStorage();
  });

  return newTodo;
};

// Function to handle sending a new todo
const sendTodo = () => {
  const todoText = inputField.value.trim();
  const line2Text = `Added on ${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

  if (todoText !== "") {
    // Create a new todo element
    const newTodo = createTodoElement(todoText, line2Text);

    // Append the new todo to the todo list
    todoList.appendChild(newTodo);

    // Add the todo to the array
    todos.push({
      text: todoText,
      line2: line2Text,
    });

    // Clear the input field
    inputField.value = "";

    // Save todos to local storage
    saveTodosToLocalStorage();
  }
};

// Add event listener to the send button
sendButton.addEventListener("click", sendTodo);

// Add event listener to the input field for Enter keypress
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendTodo();
  }
});

// Load todos from local storage on page load
loadTodosFromLocalStorage();
