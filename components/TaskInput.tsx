// TaskInput.tsx
import React, { useState } from "react";
import AddButton from "./AddButton";

interface TaskInputProps {
  addTask: (title: string, description: string) => void;
}

function TaskInput({ addTask }: TaskInputProps) {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleAddTask = () => {
    addTask(taskTitle, taskDescription);
    setTaskTitle(""); // Clear the input field
    setTaskDescription("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <AddButton onClick={handleAddTask} />
    </div>
  );
}

export default TaskInput;
