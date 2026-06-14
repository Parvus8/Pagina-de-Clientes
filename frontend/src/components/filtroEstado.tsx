const estados = [
    "acre", "alagoas", "amapá", "amazonas", "bahia",
    "ceará", "distrito federal", "espírito santo", "goiás",
    "maranhão", "mato grosso", "mato grosso do sul", "minas gerais",
    "pará", "paraíba", "paraná", "pernambuco", "piauí",
    "rio de janeiro", "rio grande do norte", "rio grande do sul",
    "rondônia", "roraima", "santa catarina", "são paulo",
    "sergipe", "tocantins"
];

interface StateFilterProp {
    state: string;
    onChange: (state: string) => void;
}

export default function StateFilter({ state, onChange }: StateFilterProp) {
    return (
        <select
            value={state}
            onChange={(e) => onChange(e.target.value)}
            style={{ textTransform: "capitalize" }}
        >
            <option value="">Todos os estados</option>

            {estados.map((estado) => (
                <option key={estado} value={estado}>
                    {estado}
                </option>
            ))}
        </select>
    );
}
