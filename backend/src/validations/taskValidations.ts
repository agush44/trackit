import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters." })
    .max(100, { message: "Title must not exceed 100 characters." })
    .nonempty({ message: "Title cannot be empty." }),

  column: z.enum(["backlog", "todo", "doing", "done"], {
    required_error: "Column is required.",
    invalid_type_error: "Invalid column type.",
  }),
});
