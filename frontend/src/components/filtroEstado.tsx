import { useState } from "react";

const ESTADOS_PRINCIPAIS = [
    "são paulo",
    "rio de janeiro",
    "minas gerais",
    "espírito santo",
    "bahia"
];

const TODOS_ESTADOS = [
    "acre", "alagoas", "amapá", "amazonas", "bahia",
    "ceará", "distrito federal", "espírito santo", "goiás",
    "maranhão", "mato grosso", "mato grosso do sul", "minas gerais",
    "pará", "paraíba", "paraná", "pernambuco", "piauí",
    "rio de janeiro", "rio grande do norte", "rio grande do sul",
    "rondônia", "roraima", "santa catarina", "são paulo",
    "sergipe", "tocantins"
];

function capitalizar(str: string) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

interface StateFilterProp {
    state: string;
    onChange: (state: string) => void;
}

export default function StateFilter({ state, onChange }: StateFilterProp) {
    const [verTodos, setVerTodos] = useState(false);

    const lista = verTodos ? TODOS_ESTADOS : ESTADOS_PRINCIPAIS;

    return (
        <div className="filtro-sidebar">
            <h4 className="filtro-titulo">Por Estado</h4>

            <ul className="filtro-lista">
                {lista.map(estado => (
                    <li key={estado}>
                        <label className="filtro-item">
                            <input
                                type="checkbox"
                                checked={state === estado}
                                onChange={() =>
                                    onChange(state === estado ? "" : estado)
                                }
                            />
                            {capitalizar(estado)}
                        </label>
                    </li>
                ))}
            </ul>

            <button
                className="filtro-ver-todos"
                onClick={() => {
                    setVerTodos(v => !v);
                    onChange("");
                }}
            >
                {verTodos ? "Ver menos" : "Ver todos"}
            </button>
        </div>
    );
}
