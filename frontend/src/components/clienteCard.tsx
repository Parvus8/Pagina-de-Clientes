import type { Cliente } from "../types/cliente";

interface ClienteCardProp {
    cliente: Cliente;
    onClick: () => void;
}

export default function ClientCard({ cliente, onClick }: ClienteCardProp) {
    return (
        <div className="card" onClick={onClick}>
            <img
                src={cliente.picture.medium}
                alt={`${cliente.name.first} ${cliente.name.last}`}
            />
            <div className="card-body">
                <strong className="card-nome">
                    {capitalizar(cliente.name.first)} {capitalizar(cliente.name.last)}              </strong>
                <p>{cliente.location.street}</p>
                <p>{cliente.location.city}</p>
                <p>
                    {capitalizar(cliente.location.state)}
                    {" · "}
                    CEP: {cliente.location.postcode}
                </p>
            </div>
        </div>
    );
}

function capitalizar(str: string) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}
