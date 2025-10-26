// src/components/auth/LoginForm.tsx

import React, { useState } from 'react'; 
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const LoginForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className="login-form-container">
            
            {/* ✅ Título "Login" ADICIONADO de volta */}
            <h2 className="login-title">Login</h2>
            
            <input 
                type="email" 
                placeholder="E-mail ou número" 
                className="auth-input"
                required
            />
            
            <div className="password-input-wrapper">
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Palavra-passe" 
                    className="auth-input"
                    required
                />
                <span 
                    className="password-toggle-icon" 
                    onClick={() => setShowPassword(!showPassword)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowPassword(!showPassword)}
                >
                    👁️
                </span>
            </div>

            <button type="submit" className="auth-submit-button">
                Aceder
            </button>
            
            <Link to="/forgot-password" className="forgot-password-link">
                Esqueci-me da palavra-passe
            </Link>

        </form>
    );
};

export { LoginForm };