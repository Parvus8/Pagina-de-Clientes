import type { Cliente } from "../types/cliente"

interface ClienteCardProp {
    cliente: Cliente;
    onClick: () => void;
}

export default function ClientCard({
    cliente,
    onClick
}: ClienteCardProp) {

    return (

        <div
            className="card"
            onClick={onClick}
        >

            <img
                src={cliente.picture.medium}
                alt={`${cliente.name.first} ${cliente.name.last}`}
            />

            <h2>
                {cliente.id}
            </h2>

            <h3>
                {cliente.name.first}
                {" "}
                {cliente.name.last}
            </h3>

            <p>
                {cliente.location.street}
            </p>

            <p>
                {cliente.location.city}
            </p>

            <p>
                CEP:
                {" "}
                {cliente.location.postcode}
            </p>

        </div>
    );
}