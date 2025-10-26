// src/components/auth/RegisterForm.tsx

import React, { useState } from 'react'; // ✅ CORRIGIDO: useState precisa ser importado aqui!
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ CORRIGIDO: useNavigate também precisa ser importado
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { doc, setDoc } from 'firebase/firestore'; 
import { auth, db } from '../../services/firebaseConfig'; // Ajuste o caminho

const RegisterForm: FC = () => {
    // Hooks para visibilidade das senhas
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Estados para feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // Função chamada ao submeter o formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        // --- Validação ---
        if (password !== confirmPassword) {
            setError("As palavras-passe não coincidem.");
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError("A palavra-passe deve ter pelo menos 6 caracteres.");
            setLoading(false);
            return;
        }
        // (Adicione mais validações se necessário - ex: formato do telemóvel)

        try {
            // --- 1. Cria o utilizador no Firebase Auth ---
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // --- 2. Salva dados adicionais no Firestore ---
            const userDocRef = doc(db, "users", user.uid); 

            await setDoc(userDocRef, {
                uid: user.uid, 
                name: name,
                email: email,
                phone: phone,
                role: 'client', 
                createdAt: new Date() 
            });

            // --- 3. Redireciona ---
            navigate('/dashboard'); 

        } catch (err: any) {
            console.error("Erro no registo:", err);

            let errorMessage = "Ocorreu um erro ao tentar criar a conta. Tente novamente.";
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = "Este e-mail já está registado.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "O formato do e-mail é inválido.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "A palavra-passe é muito fraca.";
            }
            setError(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="login-form-container" onSubmit={handleSubmit}> 
            
            <h2 className="login-title">Registo</h2>
            
            {/* Campo: Nome e sobrenome */}
            <input 
                type="text" 
                placeholder="Nome e sobrenome" 
                className="auth-input"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {/* Campo: Email */}
            <input 
                type="email" 
                placeholder="E-mail"
                className="auth-input"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Campo: Numero do telemovel */}
            <input 
                type="tel" 
                placeholder="Numero do telemovel" 
                className="auth-input"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            
            {/* Campo: Palavra-passe */}
            <div className="password-input-wrapper">
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Palavra-passe" 
                    className="auth-input"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            {/* Campo: Confirmar Palavra-passe */}
            <div className="password-input-wrapper">
                <input 
                    // ✅ AQUI o 'showConfirmPassword' está sendo usado para controlar o type
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirmar palavra-passe" 
                    className="auth-input"
                    required
                    autoComplete="new-password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 <span 
                    // ✅ AQUI o 'setShowConfirmPassword' está sendo usado no onClick
                    className="password-toggle-icon" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    role="button" tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowConfirmPassword(!showConfirmPassword)}
                >
                    👁️
                </span>
            </div>

            {/* Mostra a mensagem de erro */}
            {error && <p className="auth-error-message">{error}</p>}

            {/* Botão de Criar Conta */}
            <button 
                type="submit" 
                className="auth-submit-button"
                disabled={loading}
            >
                {loading ? 'A criar...' : 'Criar conta'} 
            </button>
            
        </form>
    );
};

export { RegisterForm };