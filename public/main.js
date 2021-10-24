const server = 'http://localhost:5000/api/'

// Add Item to do
const userObject = {};
const addItemBtn = document.querySelector("#addItem");


addItemBtn.addEventListener("click", () => {
  let newTask = {
    title: document.querySelector("#userTask").value,
    category: "",
    id: 0,
    complete: false
  }

  const addTodo = async (data) => {
    const response = await fetch(`${server}/todosAdd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  addTodo(newTask);
  DisplayItems();

  document.querySelector("#userTask").value = "";
});

//Deletes list item
let fullListItem = document.querySelector('#toDoList');// ul saved as a variable 
fullListItem.addEventListener("click", (event) => { // Event listener listening on the ul
  if (event.target.matches(".delete-item-btn") || event.target.matches(".fa-trash")) {
    //seeing if target matches what is clicked
    const deleteTodo = async (id) => {
      const response = await fetch(`${server}/delete/${id}`, {
        method: 'DELETE'
      })
    }
    deleteTodo(event.target.id)
    DisplayItems(); //re-calls displayItems
  }
})

//Mark as complete
document.addEventListener("click", (event) => {
  let element = event.target;
  if (
    element.tagName == "INPUT" &&
    element.classList.contains("form-check-input")
  ) {
    for (const item of todoList) {
      if (parseInt(event.target.id) === item.id) {
        switch (event.target.checked) {
          case true:
            item.complete = true;
            break;
          case false:
            item.complete = false;
            break;
        }
      }
    }
  }
});

async function FetchTodos() {
  let todos = {}
  
  await fetch(`${server}/todos`)
    .then(response => response.json())
    .then(data => todos = data);
  return todos
}

// Displays todo items
async function DisplayItems() {
  document.querySelector("#toDoList").innerHTML = "";

  let todos = await FetchTodos();

  todos.forEach((element, index) => {
    // Creates li container for each todo item
    const itemDiv = document.createElement("li");
    itemDiv.classList.add("item-div");

    // Creates input for checkmark and appends to item-div
    const itemCheckmark = document.createElement("input");
    itemCheckmark.classList.add("form-check-input");
    itemCheckmark.type = "checkbox";
    itemCheckmark.setAttribute("id", `${element.id}`);
    itemDiv.appendChild(itemCheckmark);

    // Creates p for todo item and appends to item-div
    const item = document.createElement("p");
    item.appendChild(document.createTextNode(`${element.title}`));
    item.classList.add("todo-item");
    itemDiv.appendChild(item);

    // Creates edit task input
    const editTaskInput = document.createElement("input");
    editTaskInput.classList.add("form-control", "edit-user-task-input");
    editTaskInput.type = "text";
    editTaskInput.value = element.title;

    // Creates edit button and appends to item-div
    const itemEditBtn = document.createElement("button");
    itemEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
    itemEditBtn.classList.add("edit-item-btn", "btn", "btn-light");
    itemDiv.appendChild(itemEditBtn);

    // Creates save button
    const itemSaveBtn = document.createElement("button");
    itemSaveBtn.innerHTML = "<span>Save</span>";
    itemSaveBtn.classList.add("btn", "btn-light");
    itemSaveBtn.setAttribute('id', `${element.id}`)

    // Creates delete button and appends to item-div
    const itemDeleteBtn = document.createElement("button");
    itemDeleteBtn.innerHTML = '<i class="fas fa-trash" id=' + `${element.id}` + '></i>'; //gives garbage can button unique id, *this might be kind of ghetto
    itemDeleteBtn.classList.add("delete-item-btn", "btn", "btn-danger");
    itemDeleteBtn.setAttribute('id', `${element.id}`) //gives delete button a somewhat unique delete button

    itemDiv.appendChild(itemDeleteBtn);


    // Append itemDiv to todo list
    let list = document.querySelector("#toDoList");
    list.appendChild(itemDiv);

    // Edit button click event handler
    itemEditBtn.addEventListener("click", () => {
      // Replaces edit button with save button
      itemEditBtn.replaceWith(itemSaveBtn);

      // Replaces item with editTaskInput
      item.replaceWith(editTaskInput);
    });

    // Save button click event handler
    itemSaveBtn.addEventListener("click", (event) => {
      // Finds todo item id from todo list and updates the value from edit task
      const updateTodo = async (data) => {
          let response = await fetch(`${server}/todosEdit`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // JSON.stringify(data)
          })

      }

      let updatedTask = {
        title: document.querySelector(".edit-user-task-input").value,
        category: "",
        id: event.currentTarget.id,
        complete: false
      }
    
        updateTodo(updatedTask)
      // Refreshes todoList with edited task/item
      DisplayItems();
    });
  });
}

DisplayItems();