import { Request, Response, NextFunction } from "express";
import Task from "../models/taskModel";
import { ITask } from "../models/taskModel";

// Obtener todas las tareas
const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva tarea
const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newTask: ITask = await Task.addTask(req.body);

    if (!newTask) {
      return res.status(400).json({
        status: 400,
        error: "Failed to create task. Please try again.",
      });
    }

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Editar una tarea existente
const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const editData: Partial<ITask> = req.body; // Los datos de la tarea a editar

    const editedTask: ITask | null = await Task.editTask(id, editData);

    if (!editedTask) {
      return res.status(404).json({
        status: 404,
        error: "Task not found.",
      });
    }

    res.status(200).json({
      message: "Task edited successfully.",
      task: {
        _id: editedTask._id,
        task: editedTask.task,
        createdAt: editedTask.createdAt,
        updatedAt: editedTask.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar una tarea
const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        error: "Task ID is required.",
      });
    }

    const deletedTask: ITask | null = await Task.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({
        status: 404,
        error: "Task not found.",
      });
    }

    res.status(200).json({ message: "Task successfully deleted." });
  } catch (error) {
    next(error);
  }
};

export { getAllTasks, addTask, editTask, deleteTask };
