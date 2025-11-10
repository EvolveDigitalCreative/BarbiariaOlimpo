// src/components/sections/olimpo_wear/WearCollectionGrid.tsx

import type { FC } from 'react';

const WearCollectionGrid: FC = () => {
  return (
    <section className="wear-collection-grid-section">
      <h2 className="section-title">As Coleções</h2>
      <div className="collection-grid">
        {/* Grid para destacar coleções específicas (Alex/Mirror) */}
        <div className="collection-card">Coleção ALEX</div>
        <div className="collection-card">Coleção MIRROR</div>
      </div>
    </section>
  );
};

export default WearCollectionGrid;