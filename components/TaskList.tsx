import React from "react";
import DeleteButton from "./DeleteButton";

export interface Task {
  id: string;
  title: string;
  description?: string;
}

interface TaskListProps {
  tasks: Task[];
  deleteTask: (taskId: string) => Promise<void>;
}

function TaskList({ tasks, deleteTask }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task?.id}>
          <h3>{task?.title}</h3>
          <p>{task?.description}</p>
          <DeleteButton
            onDelete={() => {
              if (task && task.id) {
                console.log("Deleting task with ID:", task.id);
                deleteTask(task.id);
              } else {
                console.error("Task id is undefined or task is null");
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
