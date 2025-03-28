import mongoose from "mongoose";

process.loadEnvFile();

const URI_DB = process.env.URI_DB;

if (!URI_DB) {
  throw new Error("Environment variable URI_DB is not defined");
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(URI_DB);
    console.log("Successful connection to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

export { connectDB };
