interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, total, limit, onChange }: PaginationProps) {
    const totalPages = Math.ceil(total / limit);
    if (totalPages <= 1) return null;

    const half   = 1;
    const start  = Math.max(1, Math.min(page - half, totalPages - 2));
    const end    = Math.min(totalPages, start + 2);
    const window = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <div className="pagination">
            <button
                className="pagination-arrow"
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
            >
                ‹
            </button>

            {window.map(p => (
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