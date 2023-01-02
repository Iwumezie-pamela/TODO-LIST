// "use strict";// in strict mode,todos is not defined because a variable like var ,let or const isnt assigned to it

//on  load, whatever written in the browser would remainn the same
window.addEventListener("load", () => {
  //let,var or const isn't used here so that i  can reference the todos outside the scope
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  //this gets a single string from a database
  const username = localStorage.getItem("username") || ""; //to get the username to the local storage

  nameInput.value = username; //add the saved usename to the name input

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value); //sets the key to the new value inputed
  });

  //this gets json code from database
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //prevents the browser from loading

    const todo = {
      content: e.target.elements.content.value, //the content is the name in our input
      category: e.target.elements.category.value, //the category is the name in our input
      done: false,
      createdAt: new Date().getTime(), //to get the number representation of the current date and time
    };

    todos.push(todo)
    //store our todo in our local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    //to reset our form input when its submitted
    e.target.reset();

    //edit and delete the todolist
    DisplayTodos();
  });
  DisplayTodos(); //it can also  be declared at the end of the window event listener and this calls it as soon  as my page is loaded
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = ""; //this clears the todolist element

  //loop over our todos and display them
  //sort according to  created date

  todos
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach((todoEl) => {
      console.log(todoEl);
      //we would maake use of divs instead of lis
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      //similar to what  was created in my html
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");

      //to check if my input checkbox is done or undone
      input.type = "checkbox";
      //tells if the input is done or not
      input.checked = todoEl.done;
      span.classList.add("bubble");

      //check if the category is equal to the current category i.e it would tell it if it's blue or pink
      if (todoEl.category === "business") {
        span.classList.add("business");
      } else {
        span.classList.add("personal");
      }

      //to get the to-do content class
      content.classList.add("todo-content");

      //to  change the inner html of our content
      content.innerHTML = `<input type="text" value="${todoEl.content}" readonly>`;
      //action buttons
      actions.classList.add("actions");
      //edit button
      edit.classList.add("edit");
      //change the inner html of our edit button
      edit.innerHTML = "Edit";

      //delete button
      deleteButton.classList.add("delete");
      //change the inner html of our delete button
      deleteButton.innerHTML = "Delete";

      // append the elements to the DOM,follow the html structure
      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      todoList.appendChild(todoItem);

      if (todoEl.done) {
        todoItem.classList.add("done");
      }

      input.addEventListener("click", (e) => {
        //check if what  we click  is checked
        todoEl.done = e.target.checked;

        //everytime we update the todoEl.done,we want to call the setItem localstorage and set it here
        localStorage.setItem("todos", JSON.stringify(todos));

        //toggle between the done and not done
        if (todoEl.done) {
          todoItem.classList.add("done");
        } else {
          todoItem.classList.remove("done");
        }
        //redisplay our todo cause any change we make we would redisplay and resave it to our loacalStorage
        DisplayTodos();
      });

      //edit button functionality
      edit.addEventListener("click", (e) => {
        const editInput = content.querySelector("input"); //get the edit input inorder to edit our input

        //remove the readonly value
        editInput.removeAttribute("readonly");

        //to highlight the edit input content
        editInput.focus();

        //if outside the edit input is clicked ,it would stop
        editInput.addEventListener("blur", (e) => {
          //set readonly to true when the cursor is outside the content
          editInput.setAttribute("readonly", true);

          todoEl.content = e.target.value;

          localStorage.setItem("todos", JSON.stringify(todos));

          //redisplay our todos
          DisplayTodos();
        });
      });
      //delete button functionality
      deleteButton.addEventListener("click", (e) => {
        //filter todos
        todos = todos.filter((t) => t !== todoEl);
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });
}
