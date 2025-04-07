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

// Agregar una nueva tarea
const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, column } = req.body;

    if (!title || !column) {
      res.status(400).json({
        status: 400,
        error: "Both title and column are required.",
      });
      return;
    }

    const newTask: ITask = await Task.addTask({ title, column });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Editar una tarea
const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: Partial<ITask> = req.body;

    const editedTask: ITask | null = await Task.editTask(id, updateData);

    if (!editedTask) {
      res.status(404).json({
        status: 404,
        error: "Task not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Task edited successfully.",
      task: {
        _id: editedTask._id,
        title: editedTask.title,
        column: editedTask.column,
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
      res.status(400).json({
        status: 400,
        error: "Task ID is required.",
      });
      return;
    }

    const deletedTask: ITask | null = await Task.deleteTask(id);

    if (!deletedTask) {
      res.status(404).json({
        status: 404,
        error: "Task not found.",
      });
      return;
    }

    res.status(200).json({ message: "Task successfully deleted." });
  } catch (error) {
    next(error);
  }
};

export { getAllTasks, addTask, editTask, deleteTask };
