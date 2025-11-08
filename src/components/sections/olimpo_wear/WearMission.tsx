// src/components/sections/olimpo_wear/WearMission.tsx

import type { FC } from 'react';

const WearMission: FC = () => {
  return (
    <section className="wear-mission-section">
      <div className="greek-pattern-border-mission-top"></div> {/* Borda Grega no Topo */}

      {/* ⚠️ SUBSTITUA O CAMINHO PELO SEU ÍCONE/LOGOTIPO DE MEDALHA (Mantenha o nome 'mission-icon') */}
      <img
        src="/OlimpoWear/icons/icone de nevegacao.png"
        alt="Ícone Olimpo Wear"
        className="mission-icon"
      />

      <h2 className="section-title">A NOSSA MISSÃO</h2>
      <p className="section-paragraph">
        O Olimpo Wear apresenta uma linha de roupa exclusiva que reflete confiança, presença e identidade urbana.
      </p>

      <button className="mission-button">Descobre mais</button>

    </section>
  );
};

export default WearMission;