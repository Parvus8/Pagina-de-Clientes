import { Router } from "express";
import clienteController from "../controllers/clienteController";

const router = Router();

router.get("/cliente", clienteController.list);

router.get("/cliente/:id", clienteController.getById);

export default router;