// src/pages/LoginPage.tsx

import type { FC } from 'react'; 
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { AuthBackground } from '../components/auth/AuthBackground';

// ==========================================================
// IMPORTAÇÕES DE ESTILO CORRIGIDAS PARA A PASTA global/
// ==========================================================

import '../styles/global/_global.css';         // Antigo Global.css / Utils.css
import '../styles/global/_auth_form_base.css'; // Antigo Auth.css
import '../styles/global/_login.css';          // Antigo Login.css

const LoginPage: FC = () => {
  return (
    <div className="auth-page-layout">
      
      <Link to="/" aria-label="Voltar" className="absolute-top-left close-button-style"> 
        {/* ... SVG (ou o que for o seu ícone de fechar) ... */}
      </Link>

      <AuthBackground />

      <div className="relative-z20 max-width-wrapper"> 
        <div className="auth-content-padding">
          
          <div className="logo-container">
            <img src="/barbershop/icons/logo.jpg" alt="Olimpo" /> 
          </div>

          <h1 className="form-title">Login</h1> 

          <LoginForm />

          {/* Links e textos extra */}
          <div className="register-link-container"> 
            <p className="text-default signup-text-style">Ainda não tens conta?</p> 
            <Link to="/register" className="link-style">
              Regista-te já!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;