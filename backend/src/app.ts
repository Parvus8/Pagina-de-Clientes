import express from "express";
import clientRoutes from "./routes/clienteRoutes";

const app = express();

app.use(express.json());

app.use("/api", clientRoutes);

export default app;