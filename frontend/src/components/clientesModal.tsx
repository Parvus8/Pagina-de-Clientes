export default function ClientDetailsModal({
    cliente,
    onClose
}) {

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
                    alt=""
                />

                <h2>
                    {cliente.name.first}
                    {" "}
                    {cliente.name.last}
                </h2>

                <p>
                    Endereço:
                    {" "}
                    {cliente.location.street.number}
                    {" "}
                    {cliente.location.street.name}
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

            </div>

        </div>
    );
}