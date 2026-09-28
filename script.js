let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority");

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

function displayTasks(taskArray = tasks) {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    taskArray.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-info">
                <input type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})">

                <span>${task.text}</span>

                <span class="priority">${task.priority}</span>
            </div>

            <button class="delete-btn"
                onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks();
}

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}

function filterTasks(type) {

    if (type === "all") {
        displayTasks(tasks);
    }

    else if (type === "completed") {

        const completedTasks =
            tasks.filter(task => task.completed);

        displayTasks(completedTasks);
    }

    else if (type === "pending") {

        const pendingTasks =
            tasks.filter(task => !task.completed);

        displayTasks(pendingTasks);
    }
}

displayTasks();