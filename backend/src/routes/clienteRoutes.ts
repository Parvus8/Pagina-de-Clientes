import { Router } from "express";
import clienteController from "../controllers/clienteController";

const router = Router();

router.get("/clients", clienteController.list);

router.get("/clients/:id", clienteController.getById);

export default router;