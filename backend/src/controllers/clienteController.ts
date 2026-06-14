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

        const result =
            clienteService.getClientes(
                Number(page),
                Number(limit),
                state as string,
                name as string
            );

        return res.json(result);
    }

    getById(req: Request, res: Response) {

        const cliente =
            clienteService.getClientById(
                req.params.id
            );

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente não encontrado"
            });
        }

        return res.json(cliente);
    }
}

export default new ClienteController();