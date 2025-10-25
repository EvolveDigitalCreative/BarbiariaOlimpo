// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação dos Estilos Globais (Corrigido)
import './styles/global/_global.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Importação das Páginas de Domínio
import HomePage from './pages/OlimpoBarBer';     // Rota: /
import OlimpoSkincare from './pages/OlimpoSkincare.tsx'; // Rota: /skincare
// --------------------------------------------
// 🥇 IMPORTAÇÃO DA NOVA PÁGINA WEAR
import OlimpoWear from './pages/OlimpoWear.tsx';    // Rota: /wear
// --------------------------------------------


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ROTAS DE DOMÍNIO */}
        <Route path="/" element={<HomePage />} />
        <Route path="/skincare" element={<OlimpoSkincare />} />
        <Route path="/wear" element={<OlimpoWear />} />

        {/* ROTAS DE AUTENTICAÇÃO */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);