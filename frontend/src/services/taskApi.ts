import fetchData, { API_URL } from "./api";
import { ITask } from "../types/ITask";

export const fetchAllTasks = async (): Promise<ITask[]> => {
  return fetchData(`${API_URL}/api/tasks`);
};

export const createTask = async (
  taskData: Omit<ITask, "id" | "createdAt" | "updatedAt">
): Promise<ITask> => {
  return fetchData(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
};

export const updateTask = async (
  id: string,
  taskData: Partial<ITask>
): Promise<ITask> => {
  console.log("📡 Payload final:", taskData);

  return fetchData(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (id: string): Promise<void> => {
  return fetchData(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
