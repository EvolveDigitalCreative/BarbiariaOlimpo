// src/components/auth/RegisterForm.tsx

import type { FC } from 'react';
// import { Eye, EyeOff } from 'lucide-react'; <-- LINHA REMOVIDA PARA ELIMINAR O ERRO
// Lembre-se que se usar Link, também precisa de o importar:
// import { Link } from 'react-router-dom'; 

const RegisterForm: FC = () => {
    return (
        <form className="register-form-container">
            
            {/* LINHA 1: NOME E SOBRENOME */}
            <div className="input-row-container">
                <div className="input-row">
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        className="auth-input"
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Sobrenome" 
                        className="auth-input"
                        required
                    />
                </div>
            </div>
            
            {/* LINHA 2: EMAIL E TELEMÓVEL */}
            <div className="input-row-container">
                <div className="input-row">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="auth-input"
                        required
                    />
                    <input 
                        type="tel" 
                        placeholder="Número de Telemóvel (ex: 912 345 678)" 
                        className="auth-input phone-input-placeholder"
                        required
                    />
                </div>
            </div>
            
            {/* LINHA 3: PALAVRA-PASSE */}
            <div className="password-input-wrapper">
                <input 
                    type="password" 
                    placeholder="Palavra-passe" 
                    className="auth-input"
                    required
                />
                {/* Placeholder para o Ícone (Usará a imagem/SVG que está a usar no seu projeto) */}
                <div className="password-toggle-icon">
                    {/* Use aqui o seu elemento de ícone (ex: <img> ou SVG inlinado) */}
                    <span>{/* Ícone */}</span> 
                </div>
            </div>

            {/* LINHA 4: CONFIRMAR PALAVRA-PASSE */}
            <div className="password-input-wrapper">
                <input 
                    type="password" 
                    placeholder="Confirmar palavra-passe" 
                    className="auth-input"
                    required
                />
                 {/* Placeholder para o Ícone */}
                <div className="password-toggle-icon">
                    {/* Use aqui o seu elemento de ícone (ex: <img> ou SVG inlinado) */}
                    <span>{/* Ícone */}</span>
                </div>
            </div>
            
            {/* Botão de Criar Conta */}
            <button type="submit" className="auth-submit-button">
                Criar conta
            </button>
        </form>
    );
};

export { RegisterForm };