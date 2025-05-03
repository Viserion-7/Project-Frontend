document.addEventListener("DOMContentLoaded", () => {
  const addSubtaskBtn = document.getElementById("add-subtask");
  const subtasksContainer = document.getElementById("subtasks-container");

  addSubtaskBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Subtask";
    subtasksContainer.appendChild(input);
  });
});

let allTasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const tasksContainer = document.querySelector(".tasks");

  fetch("./assets/data/tasks.json")
    .then(response => response.json())
    .then(tasks => {
      allTasks = tasks;  // store globally
      renderTasks(allTasks);
    });

  function renderTasks(tasks) {
    tasksContainer.innerHTML = "";  // clear first

    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.classList.add("task-card");
      card.innerHTML = `
        <h3>${task.title}</h3>
        <p>Category: ${task.category}</p>
        <p>Due: ${task.due_date} | Priority: ${task.priority}</p>
        <p>Status: ${task.completed ? 'Completed ✅' : 'Pending ❌'}</p>
        <div class="task-actions">
          <button class="view-btn" data-id="${index}">View</button>
          <button class="edit-btn" data-id="${index}">Edit</button>
          <button class="delete-btn" data-id="${index}">Delete</button>
        </div>
      `;
      tasksContainer.appendChild(card);
    });

    attachTaskActions();
  }

  function attachTaskActions() {
    const viewButtons = document.querySelectorAll(".view-btn");
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        window.location.href = `task-info.html?id=${id}`;
      });
    });

    editButtons.forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        window.location.href = `task.html?id=${id}`;
      });
    });

    deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        if (confirm("Are you sure you want to delete this task?")) {
          allTasks.splice(id, 1);
          renderTasks(allTasks);
        }
      });
    });
  }
});
