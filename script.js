const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = `${task.text} (${task.time})`;
        if (task.completed) text.classList.add("completed");

        text.onclick = () => toggleComplete(index);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.className = "delete";
        delBtn.onclick = () => deleteTask(index);

        actions.append(editBtn, delBtn);
        li.append(text, actions);
        taskList.appendChild(li);
    });
}

function addTask() {
    if (taskInput.value === "") return;

    tasks.push({
        text: taskInput.value,
        time: taskTime.value || "No date",
        completed: false
    });

    taskInput.value = "";
    taskTime.value = "";

    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

renderTasks();
