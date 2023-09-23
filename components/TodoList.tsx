// TodoList.tsx
import React, { useState, useEffect } from "react";
import TaskList, { Task } from "./TaskList";
import { v4 as uuidv4 } from "uuid";
import {
  fetchTasksFromServer,
  addTaskToServer,
  deleteTaskFromServer,
} from "../utils/apiUtils";
import TaskInput from "./TaskInput"; // Create a TaskInput component for input fields
import Button from "./AddButton"; // Create a Button component for buttons

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await fetchTasksFromServer();
      setTasks(data);
    } catch (error) {
      // Handle error if needed
    }
  };

  const addTask = async (taskTitle: string, taskDescription: string) => {
    if (taskTitle.trim() === "") return;

    try {
      const taskId = uuidv4();
      const newTask = {
        id: taskId,
        title: taskTitle,
        description: taskDescription,
      };
      await addTaskToServer(newTask);
      fetchTasks(); // Refresh tasks from the server
    } catch (error) {
      // Handle error if needed
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteTaskFromServer(taskId);
      fetchTasks(); // Refresh tasks from the server after deletion
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <ul>
        {/* Render the TaskList component and pass the tasks array as a prop */}
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </ul>
      <TaskInput addTask={addTask} />
    </div>
  );
}

export default TodoList;
