import { Cliente } from "../data/cliente.ts";
import axios from "axios";

class ClienteService {

    private clientes: Cliente[] = [];

    async loadClientes() {
        try {

            const response =
                await axios.get("https://link.com");

            this.clientes =
                response.data.results.map(
                    (cliente: any, index: number) => ({
                        ...cliente,
                        id: String(index + 1)
                    })
                );

        } catch (error) {

            console.error(
                "Erro ao carregar clientes",
                error
            );

            throw error;
        }
    }

    setClientes(clientes: Cliente[]) {
        this.clientes = clientes;
    }

    getClientes(        //busca geral de clientes
        page: number,
        limit: number,
        state?: string,
        name?: string
    ) {
        page = Math.max(1, page);
        limit = Math.max(1, limit);
        let result = this.clientes;

        if (state) {
            result = result.filter(
                client =>
                    client.location.state.toLowerCase() === state.toLowerCase()
            );
        }

        if (name) {
            result = result.filter(client => {

                const fullName =
                    `${client.name.title} ${client.name.first} ${client.name.last}`;
                return fullName
                    .toLowerCase()
                    .includes(name.toLowerCase());
            });
        }

        const total = result.length;

        const start =
            (page - 1) * limit;

        return {
            total, page, limit,
            data: result.slice(start, start + limit)
        };
    }

    getClientById(id: string) { // busca por id
        return this.clientes.find(
            cliente => cliente.id === id
        );
    }

}

export default new ClienteService();