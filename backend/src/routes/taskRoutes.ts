import { Router, Request, Response, NextFunction } from "express";
import { validate } from "../middleware/validate";
import {
  getAllTasks,
  addTask,
  editTask,
  deleteTask,
} from "../controllers/taskController";
import { taskSchema } from "../validations/taskValidations";

const taskRoutes = Router();

taskRoutes.get("/", getAllTasks);
taskRoutes.post("/", validate(taskSchema), addTask);
taskRoutes.put("/:id", validate(taskSchema), editTask);
taskRoutes.delete("/:id", deleteTask);

export { taskRoutes };
