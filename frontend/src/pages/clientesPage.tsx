import { useEffect, useState } from "react";
import { api } from "../services/api";

import ClientCard from "../components/clienteCard";
import Pagination from "../components/pagina";
import StateFilter from "../components/filtroEstado";
import ClientDetailsModal from "../components/clientesModal";
import { Cliente } from "../types/cliente";

interface PaginatedResponse {
    total: number;
    page: number;
    limit: number;
    data: Cliente[];
}

export default function ClientesPage() {
    const [clients, setClients] = useState<Cliente[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [nameInput, setNameInput] = useState("");
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [sortBy, setSortBy] = useState("nome");
    const [error, setError] = useState<string | null>(null);
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setName(nameInput);
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [nameInput]);

    const handleStateChange = (s: string) => { setState(s); setPage(1); };
    const handleSortChange = (s: string) => { setSortBy(s); setPage(1); };

    useEffect(() => {
        api.get<PaginatedResponse>("/cliente", {
            params: { page, limit: 9, state, name, sortBy }
        })
            .then(response => {
                setClients(response.data.data);
                setTotal(response.data.total);
                setError(null);
            })
            .catch(() => {
                setClients([]);
                setTotal(0);
                setError("Falha ao carregar clientes");
            });
    }, [page, state, name, sortBy]);

    return (
        <div className="page">
            <h1 className="page-titulo">Lista de membros</h1>

            <div className="container">
                <aside>
                    <StateFilter state={state} onChange={handleStateChange} />
                </aside>

                <main>
                    {error && <p className="erro">{error}</p>}

                    <div className="toolbar">
                        <span className="toolbar-contagem">
                            Exibindo {clients.length} de {total} itens
                        </span>

                        <label className="toolbar-ordenar">
                            Ordenar por:
                            <select
                                value={sortBy}
                                onChange={e => handleSortChange(e.target.value)}
                            >
                                <option value="nome">Nome</option>
                                <option value="estado">Estado</option>
                                <option value="cidade">Cidade</option>
                            </select>
                        </label>
                    </div>

                    <div className="grid">
                        {clients.map(cliente => (
                            <ClientCard
                                key={cliente.id}
                                cliente={cliente}
                                onClick={() => setSelectedClient(cliente)}
                            />
                        ))}
                    </div>

                    <Pagination
                        page={page}
                        total={total}
                        limit={9}
                        onChange={setPage}
                    />
                </main>
            </div>

            <ClientDetailsModal
                cliente={selectedClient}
                onClose={() => setSelectedClient(null)}
            />
        </div>
    );
}
