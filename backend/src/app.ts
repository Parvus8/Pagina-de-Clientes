import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import clientRoutes from "./routes/clienteRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", clientRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erro interno do servidor" });
});

export default app;