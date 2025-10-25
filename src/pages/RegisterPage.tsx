// src/pages/RegisterPage.tsx

import type { FC } from 'react'; 
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm'; 
import { AuthBackground } from '../components/auth/AuthBackground';

// ==========================================================
// IMPORTAÇÕES DE ESTILO CORRIGIDAS PARA A PASTA global/
// ==========================================================

import '../styles/global/_global.css';         // Antigo Global.css / Utils.css
import '../styles/global/_auth_form_base.css'; // Antigo Auth.css
import '../styles/global/_register.css';       // Antigo Register.css

const RegisterPage: FC = () => {
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
          
          <h1 className="form-title">Registo</h1> 

          <RegisterForm />

          {/* Link para o Login */}
          <div className="register-link-container"> 
            <p className="text-default signup-text-style">Já tens conta?</p> 
            <Link to="/login" className="link-style">
              Iniciar Sessão!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;