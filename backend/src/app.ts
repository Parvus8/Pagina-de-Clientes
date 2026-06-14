import express from "express";
import routes from "./routes/clienteRoutes";

const app = express();

app.use(express.json());

app.use("/api", routes);

export default app;