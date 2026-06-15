import { useEffect } from "react";
import { Cliente } from "../types/cliente";

interface ClienteModalProp {
    cliente: Cliente | null;
    onClose: () => void;
}

function capitalizar(str: string) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

function formatarData(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function ClientDetailsModal({ cliente, onClose }: ClienteModalProp) {

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!cliente) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>

                <button onClick={onClose}>Fechar</button>

                <img
                    src={cliente.picture.large}
                    alt={`${cliente.name.first} ${cliente.name.last}`}
                />

                <h2>{capitalizar(cliente.name.first)} {capitalizar(cliente.name.last)}</h2>

                <p className="modal-genero">
                    {cliente.gender === "male" ? "Masculino" : "Feminino"}
                </p>

                <div className="modal-secao">
                    <strong>Contato</strong>
                    <p>Email {cliente.email}</p>
                    <p>Telefone {cliente.phone}</p>
                    <p>Celular {cliente.cell}</p>
                </div>

                <div className="modal-secao">
                    <strong>Endereço</strong>
                    <p>{cliente.location.street}</p>
                    <p>{cliente.location.city} · {capitalizar(cliente.location.state)}</p>
                    <p>CEP: {cliente.location.postcode}</p>
                </div>

                <div className="modal-secao">
                    <strong>Dados pessoais</strong>
                    <p>Nascimento: {formatarData(cliente.dob.date)} ({cliente.dob.age} anos)</p>
                    <p>Cadastro: {formatarData(cliente.registered.date)}</p>
                </div>

            </div>
        </div>
    );
}
