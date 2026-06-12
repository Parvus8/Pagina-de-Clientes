import { Cliente } from "../data/cliente.ts";

class ClienteService {
    private clientes: Cliente[] = [];

    setClientes(clientes: Cliente[]) {
        this.clientes = clientes;
    }

    getClientes(        //busca geral de clientes
        page: number,
        limit: number,
        state?: string,
        name?: string
    ) {
        let result = [...this.clientes];

        if (state) {
            result = result.filter(
                client =>
                    client.location.state
                        .toLowerCase()
                        .includes(state.toLowerCase())
            );
        }

        if (name) {
            result = result.filter(client => {

                const fullName =
                    `${client.name.first} ${client.name.last}`;

                return fullName
                    .toLowerCase()
                    .includes(name.toLowerCase());
            });
        }

        const total = result.length;

        const start =
            (page - 1) * limit;

        return {
            total,
            page,
            limit,
            data: result.slice(
                start,
                start + limit
            )
        };
    }
}

export default new ClienteService();