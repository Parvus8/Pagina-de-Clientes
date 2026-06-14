import { useEffect, useState } from "react";
import { api } from "../services/api";

import ClientCard from "../components/ClientCard";
import Pagination from "../components/Pagination";
import StateFilter from "../components/StateFilter";
import ClientDetailsModal from "../components/ClientDetailsModal";

export default function ClientsPage() {

    const [clients, setClients] = useState([]);
    const [page, setPage] = useState(1);

    const [total, setTotal] = useState(0);

    const [name, setName] = useState("");
    const [state, setState] = useState("");

    const [selectedcliente,setSelectedClient] =
        useState(null);

    useEffect(() => {

        api.get("/clients", {
            params: {
                page,
                limit: 9,
                state,
                name
            }
        })
        .then(response => {

            setClients(
                response.data.data
            );

            setTotal(
                response.data.total
            );
        });

    }, [page, state, name]);

    return (

        <div className="container">

            <aside>

                <StateFilter
                    state={state}
                    onChange={setState}
                />

            </aside>

            <main>

                <div className="toolbar">

                    <input
                        placeholder="Buscar nome"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <span>
                        Exibindo {clients.length}
                        {" "}de{" "}
                        {total}
                    </span>

                </div>

                <div className="grid">

                    {clients.map(cliente=> (

                        <ClientCard
                            key={cliente.id}
                            client={client}
                            onClick={() =>
                                setSelectedClient(client)
                            }
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
                client={selectedClient}
                onClose={() =>
                    setSelectedClient(null)
                }
            />

        </div>
    );
}