import { useEffect } from "react";
import { Cliente } from "../types/cliente";

interface ClienteModalProp {
    cliente: Cliente | null;
    onClose: () => void;
}

export default function ClientDetailsModal({
    cliente,
    onClose
}: ClienteModalProp) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!cliente) {
        return null;
    }

    return (

        <div className="modal">

            <div className="modal-content">

                <button onClick={onClose}>
                    Fechar
                </button>

                <img
                    src={cliente.picture.large}
                    alt={`${cliente.name.first} ${cliente.name.last}`}
                />

                <h2>
                    {capitalizar(cliente.title)}
                    {" "}
                    {capitalizar(cliente.name.first)}
                    {" "}
                    {capitalizar(cliente.name.last)}
                </h2>

                <p>
                    Endereço:
                    {" "}
                    {cliente.location.street}
                </p>

                <p>
                    Cidade:
                    {" "}
                    {cliente.location.city}
                </p>

                <p>
                    Estado:
                    {" "}
                    {cliente.location.state}
                </p>

                <p>
                    CEP:
                    {" "}
                    {cliente.location.postcode}
                </p>

                <p>
                Email:
                    {" "}
                    {cliente.email}
                <p/>
                <p>
                Telefone:
                    {" "}
                    {cliente.phone}
                <p/>
            </div>

        </div>
    );
}

function capitalizar(str: string) {
    return str.replace(/\b\w/, c => c.toUpperCase());
}
