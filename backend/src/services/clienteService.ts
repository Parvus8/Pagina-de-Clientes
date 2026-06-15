import { Cliente, RawCliente } from "../data/cliente";
import axios from "axios";

class ClienteService {
    
    private clientes: Cliente[] = [];

    async loadClientes() {
        try {

            const url = process.env.URL;

            if(!url){
                throw new Error(
                    "URL não configurada no ambiente!"
                );
                
            }

            const response =
                await axios.get(url);

            this.clientes =
                response.data.results.map(
                    (cliente: RawCliente, index: number) => ({
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
                cliente=>
                    cliente.location.state.toLowerCase() === state.toLowerCase()
            );
        }

        if (name) {
            result = result.filter(cliente=> {

                const fullName =
                    `${cliente.name.title} ${cliente.name.first} ${cliente.name.last}`;
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