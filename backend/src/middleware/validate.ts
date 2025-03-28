import { ZodError, ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }

      return res.status(500).json({ error: "An unexpected error occurred." });
    }
  };
