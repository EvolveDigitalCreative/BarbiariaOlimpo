// src/components/auth/LoginForm.tsx

import type { FC } from 'react';
import { Link } from 'react-router-dom';

const LoginForm: FC = () => {
    return (
        <form className="login-form-container">
            
            {/* Campo E-mail */}
            <input 
                type="email" 
                placeholder="E-mail" 
                className="auth-input"
                required
            />
            
            {/* Campo Palavra-passe */}
            <div className="password-input-wrapper">
                <input 
                    type="password" 
                    placeholder="Palavra-passe" 
                    className="auth-input"
                    required
                />
                {/* Ícone do Olho/Mudar Visibilidade aqui se necessário */}
            </div>

            {/* Link Esqueceu a Palavra-passe */}
            <Link to="/forgot-password" className="forgot-password-link">
                Esqueci-me da palavra-passe
            </Link>

            {/* Botão de Aceder */}
            <button type="submit" className="auth-submit-button">
                Aceder
            </button>
        </form>
    );
};

export { LoginForm };