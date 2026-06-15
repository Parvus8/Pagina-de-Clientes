import { Request, Response, NextFunction } from "express";
import clienteService from "../services/clienteService";

class ClienteController {

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = "1", limit = "9", state, name, sortBy } = req.query;

            const pageNumber  = parseInt(page as string, 10) || 1;
            const limitNumber = Math.min(parseInt(limit as string, 10) || 9, 100);

            const stateFilter  = typeof state  === "string" ? state  : undefined;
            const nameFilter   = typeof name   === "string" ? name   : undefined;
            const sortFilter   = typeof sortBy === "string" ? sortBy : undefined;

            const result = clienteService.getClientes(
                pageNumber, limitNumber, stateFilter, nameFilter, sortFilter
            );

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (typeof id !== "string") {
                return res.status(400).json({ message: "ID inválido" });
            }

            const cliente = clienteService.getClientById(id);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }

            return res.json(cliente);

        } catch (error) {
            next(error);
        }
    }
}

export default new ClienteController();
