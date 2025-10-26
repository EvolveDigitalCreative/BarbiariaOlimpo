// src/components/auth/RegisterForm.tsx

import type { FC } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importa a função de registo
import { doc, setDoc } from 'firebase/firestore'; // Importa funções do Firestore
import { auth, db } from '../../services/firebaseConfig'; // ✅ Ajuste o caminho

const RegisterForm: FC = () => {
    // Estados para os inputs
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
            return; // Interrompe a função se as senhas não baterem
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
            console.log("Utilizador criado no Auth:", user);

            // --- 2. Salva dados adicionais no Firestore ---
            // Cria uma referência para o documento do novo utilizador na coleção 'users'
            // O ID do documento será o UID do utilizador do Firebase Auth
            const userDocRef = doc(db, "users", user.uid); 

            // Define os dados a serem salvos
            await setDoc(userDocRef, {
                uid: user.uid, // Opcional, mas útil ter no documento
                name: name,
                email: email,
                phone: phone,
                role: 'client', // ✅ Defina uma role padrão (ex: 'client', 'pending', 'customer')
                createdAt: new Date() // Opcional: guardar data de criação
            });
            console.log("Dados do utilizador salvos no Firestore");

            // --- 3. Redireciona ---
            // Pode redirecionar para a dashboard ou para a página de login
            // pedindo para ele fazer login pela primeira vez.
            navigate('/dashboard'); // Ou navigate('/login');

        } catch (err: any) {
            console.error("Erro no registo:", err);

            // Mapeia erros comuns do Firebase
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
                    type="password" 
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
                    type="password" 
                    placeholder="Confirmar palavra-passe" 
                    className="auth-input"
                    required
                    autoComplete="new-password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 {/* Placeholder para o Ícone */}
                <div className="password-toggle-icon">
                    {/* Use aqui o seu elemento de ícone (ex: <img> ou SVG inlinado) */}
                    <span>{/* Ícone */}</span>
                </div>
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

// Lembre-se de ter o estilo .auth-error-message no seu CSS

export { RegisterForm };