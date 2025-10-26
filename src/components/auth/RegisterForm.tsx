// src/components/auth/RegisterForm.tsx

import React, { useState } from 'react'; 
import type { FC } from 'react';

const RegisterForm: FC = () => {
    // Hooks para visibilidade das senhas
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form className="login-form-container"> 
            
            <h2 className="login-title">Registo</h2>
            
            {/* ✅ Campo: Nome e sobrenome */}
            <input 
                type="text" 
                placeholder="Nome e sobrenome" 
                className="auth-input"
                required
                autoComplete="name" // Ajuda o navegador a preencher
            />

            {/* ✅ Campo: Email */}
            <input 
                type="email" 
                placeholder="E-mail" // Placeholder ajustado
                className="auth-input"
                required
                autoComplete="email"
            />

            {/* ✅ Campo: Numero do telemovel */}
            <input 
                type="tel" // Tipo 'tel' para teclados móveis
                placeholder="Numero do telemovel" 
                className="auth-input"
                required
                autoComplete="tel"
            />
            
            {/* ✅ Campo: Palavra-passe */}
            <div className="password-input-wrapper">
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Palavra-passe" 
                    className="auth-input"
                    required
                    autoComplete="new-password" // Importante para gerenciadores de senha
                />
                <span 
                    className="password-toggle-icon" 
                    onClick={() => setShowPassword(!showPassword)}
                    role="button" tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowPassword(!showPassword)}
                >
                    👁️
                </span>
            </div>

            {/* Botão de Criar Conta */}
            <button type="submit" className="auth-submit-button">
                Criar conta 
            </button>
            
        </form>
    );
};

export { RegisterForm };