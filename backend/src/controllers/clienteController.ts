import { Request, Response } from "express";
import clienteService from "../services/clienteService";

class ClienteController {

    list(req: Request, res: Response) {

        const {
            page = "1",
            limit = "9",
            state,
            name
        } = req.query;

        const pageNumber =
            typeof page === "string"
                ? Number(page)
                : 1;

        const limitNumber =
            typeof limit === "string"
                ? Number(limit)
                : 9;

        const stateFilter =
            typeof state === "string"
                ? state
                : undefined;

        const nameFilter =
            typeof name === "string"
                ? name
                : undefined;

        const result =
            clienteService.getClientes(
                pageNumber,
                limitNumber,
                stateFilter,
                nameFilter
            );

        return res.json(result);
    }

    getById(req: Request, res: Response) {

        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID inválido"
            });
        }

        const cliente =
            clienteService.getClientById(id);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente não encontrado"
            });
        }

        return res.json(cliente);
    }
}

export default new ClienteController();