import { JSX } from "react";
interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onChange: (page: number) => void;
}

export default function Pagination({
    page,
    total,
    limit,
    onChange
}: PaginationProps): JSX.Element {

    const pages =
        Math.ceil(total / limit);

    return (

        <div className="pagination">

            <button
                disabled={page === 1}
                onClick={() =>
                    onChange(page - 1)
                }
            >
                ←
            </button>

            <span>
                Página {page}
            </span>

            <button
                disabled={page === pages}
                onClick={() =>
                    onChange(page + 1)
                }
            >
                →
            </button>

        </div>
    );
}
