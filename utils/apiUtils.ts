import axios from "axios";

export const apiUrl: string = "http://localhost:3002/api/tasks";

export const fetchTasksFromServer = async (): Promise<any> => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTaskToServer = async (newTask: any): Promise<void> => {
  try {
    await axios.post(apiUrl, newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const deleteTaskFromServer = async (taskId: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
