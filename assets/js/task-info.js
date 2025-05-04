document.addEventListener("DOMContentLoaded", () => {
  const taskDetails = document.getElementById("task-details");
  const markCompletedBtn = document.getElementById("mark-completed");

  // Get task ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = parseInt(urlParams.get("id")) || 0;

  fetch("./assets/data/tasks.json")
    .then((response) => response.json())
    .then((tasks) => {
      const task = tasks[taskId];
      if (task) {
        renderTaskDetails(task);
      } else {
        taskDetails.innerHTML = "<p>Task not found.</p>";
      }
    });

  function renderTaskDetails(task) {
    const subtasks = task.subtasks || [];
    taskDetails.innerHTML = `
      <p><strong>Title:</strong> ${task.title}</p>
      <p><strong>Category:</strong> ${task.category}</p>
      <p><strong>Due Date:</strong> ${task.due_date}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Description:</strong> ${
        task.description || "No description"
      }</p>
      <p><strong>Status:</strong> <span id="status-text">${
        task.completed ? "Completed ✅" : "Pending ❌"
      }</span></p>

      <h3>Subtasks</h3>
      <ul class="subtasks-list">
        ${
          subtasks.length > 0
            ? subtasks.map((sub) => `<li>${sub}</li>`).join("")
            : "<li>No subtasks</li>"
        }
      </ul>
    `;
  }

  markCompletedBtn.addEventListener("click", () => {
    const statusText = document.getElementById("status-text");
    statusText.textContent = "Completed ✅";
    alert("Task marked as completed!");
  });
});
