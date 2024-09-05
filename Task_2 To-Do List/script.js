const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    const todoText = todoInput.value;
    
    // Create a unique ID for the todo item
    const todoId = Date.now().toString();
    
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    newTodo.setAttribute("data-id", todoId); // Set the unique ID
    newTodo.setAttribute("data-completed", false); // Set the initial completed status
    todoDiv.appendChild(newTodo);
    
    saveLocalTodos({ id: todoId, text: todoText, completed: false }); // Save todo with its ID and status
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        const todoItem = todo.querySelector(".todo-item");
        const isCompleted = todo.classList.contains("completed");
        todoItem.setAttribute("data-completed", isCompleted); // Update completion status
        updateLocalTodos(todoItem.dataset.id, { completed: isCompleted });
    }

    if (item.classList[0] === "edit-btn") {
        const todo = item.parentElement;
        editTodoItem(todo);
    }
}

function editTodoItem(todo) {
    const todoItem = todo.querySelector(".todo-item");
    const currentText = todoItem.innerText;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.classList.add("edit-input");

    // Replace the todo item with an input field
    todo.replaceChild(input, todoItem);

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const updatedText = input.value;
            todoItem.innerText = updatedText;

            // Replace input field with updated text
            todo.replaceChild(todoItem, input);

            // Update local storage with the new text
            updateLocalTodos(todoItem.dataset.id, { text: updatedText });
        }
    });
}

function filterTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (filterOption.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text;
        newTodo.classList.add("todo-item");
        newTodo.setAttribute("data-id", todo.id); // Set the unique ID
        newTodo.setAttribute("data-completed", todo.completed); // Set the completion status
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function updateLocalTodos(todoId, updatedFields) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
        todos[index] = { ...todos[index], ...updatedFields };
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoId = todo.querySelector(".todo-item").dataset.id; // Use the data-id to find the todo
    todos = todos.filter(todo => todo.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
}
