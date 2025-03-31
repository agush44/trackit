import { createContext } from "react";
import { TaskContextProps } from "../types/TaskContextProps";

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);
