import { useState, useEffect, ReactNode } from "react";
import {
  fetchAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskApi";
import { ITask } from "../types/ITask";
import { TaskContext } from "./taskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const loadTasks = async () => {
    try {
      const data = await fetchAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks", error);
    }
  };

  const addTask = async (
    task: Omit<ITask, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const editTask = async (id: string, updatedTask: Partial<ITask>) => {
    try {
      const updated = await updateTask(id, updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, loadTasks, addTask, editTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
