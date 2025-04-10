import { Schema, model, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  column: string;
  description?: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    column: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Task: Model<ITask> = model<ITask>("Task", taskSchema);

const getAllTasks = async (): Promise<ITask[]> => {
  try {
    return await Task.find();
  } catch (error) {
    throw {
      status: 500,
      message: "Error retrieving tasks from the database.",
    };
  }
};
interface IAddTask {
  title: string;
  column: string;
  description?: string;
  coverImage?: string;
}

const addTask = async (data: IAddTask): Promise<ITask> => {
  try {
    const newTask = new Task(data);
    await newTask.save();
    return newTask;
  } catch (error) {
    throw {
      status: 500,
      message: "Error creating the task.",
    };
  }
};

const editTask = async (
  id: string,
  updateData: Partial<IAddTask>
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
      message: "Error editing the task.",
    };
  }
};

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
      message: "Error deleting the task.",
    };
  }
};

export default {
  getAllTasks,
  addTask,
  editTask,
  deleteTask,
};
