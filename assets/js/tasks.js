document.addEventListener("DOMContentLoaded", () => {
  const addSubtaskBtn = document.getElementById("add-subtask");
  const subtasksContainer = document.getElementById("subtasks-container");
  const tasksContainer = document.querySelector(".tasks");

  let allTasks = [];

  // Subtask adder
  if (addSubtaskBtn && subtasksContainer) {
    addSubtaskBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Subtask";
      subtasksContainer.appendChild(input);
    });
  }

  // Load tasks
  fetch("./assets/data/tasks.json")
    .then((response) => response.json())
    .then((tasks) => {
      allTasks = tasks;
      renderTasks(allTasks);
      showReminders(allTasks);
    });

  function renderTasks(tasks) {
    if (!tasksContainer) return; // Skip if no task container

    tasksContainer.innerHTML = "";
    const today = new Date().toISOString().split("T")[0];

    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.classList.add("task-card");

      // Badge logic
      let badge = "";
      if (task.due_date) {
        if (task.due_date === today && !task.completed) {
          badge = '<span class="badge due-today">- Due Today</span>';
        } else if (task.due_date < today && !task.completed) {
          badge = '<span class="badge overdue">Overdue</span>';
        }
      }

      card.innerHTML = `
        <h3>${task.title} ${badge}</h3>
        <p>Category: ${task.category}</p>
        <p>Due: ${task.due_date} | Priority: ${task.priority}</p>
        <p>Status: ${task.completed ? "Completed ✅" : "Pending ❌"}</p>
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
    document.querySelectorAll(".view-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        window.location.href = `task-info.html?id=${id}`;
      });
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        window.location.href = `task.html?id=${id}`;
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        if (confirm("Are you sure you want to delete this task?")) {
          allTasks.splice(id, 1);
          renderTasks(allTasks);
        }
      });
    });
  }

  function showReminders(tasks) {
    const today = new Date().toISOString().split("T")[0];
    const reminders = tasks.filter(
      (task) => task.due_date && task.due_date <= today && !task.completed
    );

    if (reminders.length > 0) {
      let msg = "Reminder!\n";
      reminders.forEach((task) => {
        msg += `- "${task.title}" is due on ${task.due_date}\n`;
      });
      alert(msg);
    }
  }
});
