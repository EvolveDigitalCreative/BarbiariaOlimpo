// src/pages/LoginPage.tsx

import type { FC } from 'react'; 
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { AuthBackground } from '../components/auth/AuthBackground';

import '../styles/global/_global.css';
import '../styles/global/_auth_form_base.css';
import '../styles/global/_login.css';

const LoginPage: FC = () => {
  return (
    // O layout principal agora centraliza tudo
    <div className="auth-page-layout"> 
      
      <Link to="/" aria-label="Voltar" className="absolute-top-left close-button-style"> 
        ✕ 
      </Link>

      <AuthBackground />

      {/* ✅ Container para o conteúdo central (logo + card + link registro) */}
      <div className="login-content-wrapper"> 
      
        {/* ✅ Logo MOVIda PARA FORA e ANTES do card */}
        <div className="logo-container">
          <img src="public\OlimpoBarBer\images\logo.webp" alt="Olimpo" /> 
        </div>

        {/* O Card Branco */}
        <div className="max-width-wrapper"> 
          <div className="auth-content-padding">
            {/* O LoginForm agora não tem mais o h2 "Login" dentro dele */}
            <LoginForm /> 
          </div>
        </div>

        {/* Link "Regista-te já!" continua abaixo do card */}
        <div className="register-link-container"> 
          <p className="signup-text-style">Ainda não tens conta?</p> 
          <Link to="/register" className="register-link">
            Regista-te já!
          </Link>
        </div>

      </div> {/* Fim do login-content-wrapper */}
    </div>
  );
};

export default LoginPage;