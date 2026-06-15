interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, total, limit, onChange }: PaginationProps) {
    const totalPages = Math.ceil(total / limit);
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button
                className="pagination-arrow"
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
            >
                ‹
            </button>

            {pages.map(p => (
                <button
                    key={p}
                    className={`pagination-num${p === page ? " active" : ""}`}
                    onClick={() => onChange(p)}
                >
                    {p}
                </button>
            ))}

            <button
                className="pagination-arrow"
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                ›
            </button>
        </div>
    );
}
