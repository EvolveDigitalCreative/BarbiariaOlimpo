import React from 'react';
import type { FC } from 'react';

interface PaginationProps {
  pageIndex: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev?: boolean;
  hasNext?: boolean;
  label?: string; // optional label to display (e.g., "Página")
}

const Pagination: FC<PaginationProps> = ({ pageIndex, onPrev, onNext, canPrev = false, hasNext = false, label = 'Página' }) => {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
      <button className="btn" onClick={onPrev} disabled={!canPrev} aria-label="Página anterior">Anterior</button>
      <div style={{ padding: '0.25rem 0.5rem', color: 'var(--text-gray)' }}>
        {label}: {pageIndex + 1}
      </div>
      <button className="btn" onClick={onNext} disabled={!hasNext} aria-label="Próxima página">Próxima</button>
    </div>
  );
};

export default Pagination;
