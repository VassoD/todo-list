const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const todoList = []; // Store tasks

// Load tasks from a JSON file
function loadTasks() {
  try {
    const data = fs.readFileSync("tasks.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

// Save tasks to a JSON file
function saveTasks(tasks) {
  try {
    const tasksJSON = JSON.stringify(tasks);
    fs.writeFileSync("tasks.json", tasksJSON);
    return true; // Success
  } catch (error) {
    console.error("Error saving tasks:", error);
    return false; // Failure
  }
}

// Initialize the todoList with tasks from the JSON file
todoList.push(...loadTasks());

app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const taskId = uuidv4();
  const task = { id: taskId, title, description };

  todoList.push(task);

  // Save the updated tasks to the JSON file
  if (saveTasks(todoList)) {
    res.status(201).json({ message: "Task added successfully", task });
  } else {
    res.status(500).json({ error: "Failed to save tasks" });
  }
});

app.get("/api/tasks", (req, res) => {
  res.json(todoList);
});

app.put("/api/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const { title, description } = req.body;

  const taskIndex = todoList.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  todoList[taskIndex].title = title;
  todoList[taskIndex].description = description;

  // Save the updated tasks to the JSON file
  if (saveTasks(todoList)) {
    res.json({
      message: "Task updated successfully",
      task: todoList[taskIndex],
    });
  } else {
    res.status(500).json({ error: "Failed to save tasks" });
  }
});

app.delete("/api/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const taskIndex = todoList.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found` });
  }

  todoList.splice(taskIndex, 1);

  // Save the updated tasks to the JSON file
  if (saveTasks(todoList)) {
    res.json({ message: "Task deleted successfully" });
  } else {
    res.status(500).json({ error: "Failed to save tasks" });
  }
});
