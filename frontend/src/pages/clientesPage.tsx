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
    const [name, setName] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [state, setState] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [selectedClient, setSelectedCliente] = useState<Cliente | null>(null);

    useEffect(() => { //Debounce
        const timer = setTimeout(() => {
            setName(nameInput);
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [nameInput]);

    const handleStateChange = (s: string) => { setState(s); setPage(1); };

    useEffect(() => {

        api.get<PaginatedResponse>("/cliente", { params: { page, limit: 9, state, name } })
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

    }, [page, state, name]);

    return (

        <div className="container">

            <aside>
                <StateFilter
                    state={state}
                    onChange={handleStateChange}
                />
            </aside>

            <main>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="toolbar">

                    <input
                        placeholder="Buscar nome"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                    <span>
                        Exibindo {clients.length}{" "}de{" "}{total}
                    </span>
                </div>

                <div className="grid">

                    {clients.map(cliente => (

                        <ClientCard
                            key={cliente.id}
                            cliente={cliente}
                            onClick={() => setSelectedCliente(cliente)}
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

            <ClientDetailsModal
                cliente={selectedClient}
                onClose={() => setSelectedCliente(null)}
            />

        </div>
    );
}
