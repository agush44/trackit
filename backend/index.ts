import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/mongo";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import { taskRoutes } from "./src/routes/taskRoutes.js";

process.loadEnvFile();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

//const swaggerDocument = YAML.load("./swagger.yaml");
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
