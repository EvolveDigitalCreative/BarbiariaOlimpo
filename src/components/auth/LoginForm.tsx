// src/components/auth/LoginForm.tsx

import React, { useState } from 'react'; 
import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa a função de login
import { auth } from '../../services/firebaseConfig'; // ✅ Ajuste o caminho para o seu firebaseConfig

const LoginForm: FC = () => {
    // Estados para os inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // Estados para feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Para guardar mensagens de erro

    const navigate = useNavigate(); // Hook para navegação

    // Função chamada ao submeter o formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Impede o recarregamento da página
        setLoading(true);       // Ativa o estado de loading
        setError(null);         // Limpa erros anteriores

        try {
            // Tenta fazer o login com Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login bem-sucedido:", userCredential.user);
            
            // ✅ Redireciona para a dashboard (ou outra página) após o login
            navigate('/'); // Mude '/dashboard' para a sua rota desejada

        } catch (err: any) {
            console.error("Erro no login:", err);
            
            // Mapeia erros comuns do Firebase para mensagens amigáveis
            let errorMessage = "Ocorreu um erro ao tentar fazer login. Tente novamente.";
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                errorMessage = "E-mail ou palavra-passe inválidos.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "O formato do e-mail é inválido.";
            }
            setError(errorMessage); // Define a mensagem de erro

        } finally {
            setLoading(false); // Desativa o estado de loading, independentemente do resultado
        }
    };

    return (
        // Adiciona o handler onSubmit ao formulário
        <form className="login-form-container" onSubmit={handleSubmit}>
            
            <h2 className="login-title">Login</h2>
            
            <input 
                type="email" 
                placeholder="E-mail ou número" 
                className="auth-input"
                required
                value={email} // Controla o valor do input
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
                autoComplete="email" // Ajuda o navegador
            />
            
            <div className="password-input-wrapper">
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Palavra-passe" 
                    className="auth-input"
                    required
                    value={password} // Controla o valor do input
                    onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
                    autoComplete="current-password" // Ajuda o navegador
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

            {/* Mostra a mensagem de erro, se existir */}
            {error && <p className="auth-error-message">{error}</p>}

            {/* Desativa o botão enquanto estiver a carregar */}
            <button 
                type="submit" 
                className="auth-submit-button"
                disabled={loading} // Desativa se loading for true
            >
                {/* Mostra texto diferente durante o loading */}
                {loading ? 'A aceder...' : 'Aceder'}
            </button>
            
            <Link to="/forgot-password" className="forgot-password-link">
                Esqueci-me da palavra-passe
            </Link>

        </form>
    );
};

// ✅ NOVO: Estilo básico para a mensagem de erro (adicione ao seu CSS)
/* No _auth_form_base.css ou _login.css:
.auth-error-message {
    color: red;
    font-size: 0.875rem;
    text-align: center;
    margin-bottom: 1rem; // Espaço antes do botão
    margin-top: -0.5rem; // Aproxima do campo de senha
}
*/

export { LoginForm };