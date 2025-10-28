// src/pages/RegisterPage.tsx
import type { FC } from 'react'; 
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm'; 
import { AuthBackground } from '../components/auth/AuthBackground';

import '../styles/global/_global.css';
import '../styles/global/_auth_form_base.css'; 

const RegisterPage: FC = () => {
 return (
  <div className="auth-page-layout"> 
   
   <Link to="/" aria-label="Voltar" className="absolute-top-left close-button-style"> 
    ✕ 
   </Link>

   <AuthBackground />

   {/* Wrapper para o conteúdo central */}
   <div className="login-content-wrapper"> 
   
    {/* ✅ Logo está AQUI (fora do card) */}
    <div className="logo-container">
     <img src="/OlimpoBarBer/icons/logo.jpg" alt="Olimpo" /> 
    </div>

    {/* Card Branco */}
    <div className="max-width-wrapper"> 
     <div className="auth-content-padding">
      {/* Renderiza o RegisterForm com os novos campos */}
      <RegisterForm /> 
     </div>
    </div>

    {/* Link para Login */}
    <div className="register-link-container"> 
     <p className="signup-text-style">Já tens conta?</p> 
     <Link to="/login" className="register-link"> 
      Login
     </Link>
    </div>

   </div> 
  </div>
 );
};

export default RegisterPage;