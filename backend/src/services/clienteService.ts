import { Cliente, RawCliente } from "../data/cliente";
import axios from "axios";

class ClienteService {

    private clientes: Cliente[] = [];

    async loadClientes() {
        try {
            const url = process.env.URL;

            if (!url) {
                throw new Error("URL não configurada no ambiente!");
            }

            const response = await axios.get(url);

            this.clientes = response.data.results.map(
                (cliente: RawCliente, index: number): Cliente => ({
                    ...cliente,
                    id: String(index + 1)
                })
            );

        } catch (error) {
            console.error("Erro ao carregar clientes", error);
            throw error;
        }
    }

    getClientes(
        page: number,
        limit: number,
        state?: string,
        name?: string,
        sortBy?: string
    ) {
        page = Math.max(1, page);
        limit = Math.max(1, limit);

        let result = [...this.clientes];

        if (state) {
            const lista = state.split(",").map(s => s.toLowerCase());
            result = result.filter(c =>
                lista.includes(c.location.state.toLowerCase())
            );
        }

        if (name) {
            result = result.filter(c => {
                const fullName = `${c.name.title} ${c.name.first} ${c.name.last}`;
                return fullName.toLowerCase().includes(name.toLowerCase());
            });
        }

        if (sortBy === "estado") {
            result.sort((a, b) =>
                a.location.state.localeCompare(b.location.state, "pt-BR")
            );
        } else if (sortBy === "cidade") {
            result.sort((a, b) =>
                a.location.city.localeCompare(b.location.city, "pt-BR")
            );
        } else {
            result.sort((a, b) =>
                a.name.first.localeCompare(b.name.first, "pt-BR")
            );
        }

        const total = result.length;
        const start = (page - 1) * limit;

        return { total, page, limit, data: result.slice(start, start + limit) };
    }

    getClientById(id: string) {
        return this.clientes.find(c => c.id === id);
    }
}

export default new ClienteService();
