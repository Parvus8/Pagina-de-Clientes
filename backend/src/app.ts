import express from "express";
import clientRoutes from "./routes/clienteRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", clientRoutes);

export default app;