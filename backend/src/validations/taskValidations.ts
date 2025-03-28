import { z } from "zod";

export const taskSchema = z.object({
  task: z
    .string()
    .min(3, { message: "Task must have at least 3 characters." })
    .max(100, { message: "Task must not exceed 100 characters." })
    .nonempty({ message: "Task cannot be empty." }),
});
