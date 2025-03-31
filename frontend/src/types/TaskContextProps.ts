import { ITask } from "./ITask";

export interface TaskContextProps {
  tasks: ITask[];
  loadTasks: () => Promise<void>;
  addTask: (
    task: Omit<ITask, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  editTask: (id: string, updatedTask: Partial<ITask>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}
