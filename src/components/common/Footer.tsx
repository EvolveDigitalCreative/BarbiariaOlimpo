// src/components/common/Footer.tsx
// Componente genérico para evitar erros na importação

import type { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            textAlign: 'center', 
            padding: '20px', 
            fontSize: '0.8rem' 
        }}>
            <p>&copy; {new Date().getFullYear()} Olimpo Barbershop. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;