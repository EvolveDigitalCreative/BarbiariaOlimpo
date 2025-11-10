import type { FC } from 'react';

// Tipagem das propriedades (props) do modal
interface SizeGuideModalProps {
    /** Função chamada para fechar o modal. É obrigatória. */
    onClose: () => void;
}

// Dados de Exemplo para a Tabela de Tamanhos
const sizeData = [
    { size: 'S', length: 66, chest: 98, sleeve: 19, shoulder: 44 },
    { size: 'M', length: 70, chest: 104, sleeve: 20, shoulder: 47 },
    { size: 'L', length: 73, chest: 110, sleeve: 22, shoulder: 50 },
    { size: 'XL', length: 76, chest: 116, sleeve: 24, shoulder: 53 },
];

/**
 * Componente Modal para exibir a tabela de tamanhos da Olimpo Wear.
 */
const SizeGuideModal: FC<SizeGuideModalProps> = ({ onClose }) => {
    return (
        // Overlay (fundo escuro) - Clicar aqui fecha o modal
        <div className="modal-overlay" onClick={onClose}>
            {/* Modal Box - Usamos e.stopPropagation() para que clicar dentro não feche o modal */}
            <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
                
                {/* Botão de Fechar */}
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                
                <h3 className="modal-title">Guia de tamanhos</h3>
                <p className="modal-unit">Unit: cm</p>

                <table className="size-table">
                    <thead>
                        <tr>
                            <th>Size</th>
                            <th>Length</th>
                            <th>Chest</th>
                            <th>Sleeve</th>
                            <th>Shoulder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizeData.map((row) => (
                            <tr key={row.size}>
                                <td>{row.size}</td>
                                <td>{row.length}</td>
                                <td>{row.chest}</td>
                                <td>{row.sleeve}</td>
                                <td>{row.shoulder}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SizeGuideModal;