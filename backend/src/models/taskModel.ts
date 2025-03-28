import { Schema, model, Document, Model } from "mongoose";

// Define the interface for Task
export interface ITask extends Document {
  task: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Schema for Task
const taskSchema = new Schema<ITask>(
  {
    task: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Create the Task model
const Task: Model<ITask> = model<ITask>("Task", taskSchema);

// Define the function to get all tasks
const getAllTasks = async (): Promise<ITask[]> => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw {
      status: 500,
      message: "Error retrieving tasks from the database.",
    };
  }
};

// Define the function to add a new task
interface IAddTask {
  task: string;
}

const addTask = async (dataTask: IAddTask): Promise<ITask> => {
  try {
    const newTask = new Task(dataTask);
    await newTask.save();
    return newTask;
  } catch (error) {
    throw {
      status: 500,
      message: "Error creating the task.",
    };
  }
};

// Define the function to edit an existing task
const editTask = async (
  id: string,
  updateData: Partial<ITask>
): Promise<ITask> => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw {
        status: 404,
        message: "Task not found.",
      };
    }
    Object.assign(task, updateData);
    await task.save();
    return task;
  } catch (error) {
    throw {
      status: 500,
      message: "Error editing the task",
    };
  }
};

// Define the function to delete a task
const deleteTask = async (id: string): Promise<ITask | null> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      throw {
        status: 404,
        message: "Task not found.",
      };
    }

    return deletedTask;
  } catch (error) {
    throw {
      status: 500,
      message: "Error deleting the task",
    };
  }
};

export default {
  getAllTasks,
  addTask,
  editTask,
  deleteTask,
};
