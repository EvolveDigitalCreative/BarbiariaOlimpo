// src/components/auth/AuthBackground.tsx
import type { FC } from 'react';

export const AuthBackground: FC = () => {
  return (
  	<div
  	 	className="auth-background-decorative"
  	 	// ✅ CORREÇÃO AQUI:
  	 	style={{ backgroundImage: "url('/OlimpoBarBer/texture/coin.png')" }}
  	>
  	 	{/* Este div agora terá a imagem de fundo aplicada via CSS ou style */}
  	</div>
  );
};