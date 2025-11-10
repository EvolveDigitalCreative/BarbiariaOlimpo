import { type FC } from 'react';
import { useState, type MouseEvent, useMemo, useCallback } from 'react'; // Adicionado useCallback
import { FaCalendarAlt, FaClock, FaCheckCircle, FaUserCircle, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'; // Adicionado FaTimes (X)
// Importa o CSS do modal
import '../../../../styles/olimposkincare/skincare_booking_modal.css';

// ------------------------------------------------------------
// --- FUNÇÃO DE CAMINHO DE IMAGEM (Requisito 1) ---
// ------------------------------------------------------------

const getImagePath = (serviceName: string): string => { 
    // Garante que o nome do serviço é formatado corretamente para o caminho (ex: "Glow skin" -> "glow-skin.webp")
    const formattedName = serviceName; // Formato mais comum para nomes de ficheiros
    return `/OlimpoSkincare/services gerais/${formattedName}.webp`; 
};

// ------------------------------------------------------------
// --- DADOS DOS SERVIÇOS (Ajustado com priceOptions para Antiacne e Lashes) ---
// ------------------------------------------------------------

const services = [
    {
        id: 'glow',
        name: 'Glow Skin',
        price: '40€',
        duration: '1h',
        imagePath: getImagePath('Glow Skin'), 
        description: 'Limpeza essencial com extração, aplicação de ativos e máscara. Ideal para manter a pele limpa, hidratada e luminosa.',
        category: 'skin',
    },
    {
        id: 'elevate',
        name: 'Elevate skin',
        price: '50€',
        duration: '1h e 15m', 
        imagePath: getImagePath('Elevate Skin'),
        description: 'Tratamento facial que combina técnicas de limpeza, esfoliação e regeneração celular para purificar a pele, controlar a oleosidade e reduzir imperfeições. Proporciona frescor imediato, textura mais uniforme e um aspeto visivelmente saudável.',
        category: 'skin',
    },
    {
        id: 'olimpoglass',
        name: 'Olimpo Skin',
        price: '60€',
        duration: '1h e 30m',
        imagePath: getImagePath('Olimpo Skin'),
        description: 'Protocolo completo com tecnologia Aqua Plus, ativos personalizados e hidratação revitalizante. Limpa em profundidade, trata e renova a pele.',
        category: 'skin',
    },
    {
        id: 'olimpacne',
        name: 'Olimpo Antiacne',
        // PREÇO AJUSTADO PARA 65€, DURAÇÃO CONFIRMADA (Baseado em image_e137f1.jpg)
        price: '65€', 
        duration: '2h',
        imagePath: getImagePath('Olimpo Antiacne'),
        description: 'Tratamento facial criado para prevenir, controlar e reverter a acne. Com ação probiótica, reequilibra a microflora da pele, regula a oleosidade, acalma a inflamação e reduz a vermelhidão causada pela acne.',
        category: 'skin',
        // Dados para o Pop-up de Preços (image_e137f1.jpg)
        priceOptions: [
            { label: 'Sessão Avulsa (1ª vez)', price: '65€' },
            { label: 'Pacote 3 sessões', price: '165€ (55€ cada sessão)' },
            { label: 'Pacote 5 sessões', price: '250€ (50€ cada sessão)' },
        ]
    },
    {
        id: 'scan',
        name: 'Skin Scan',
        price: '25€',
        duration: '30m',
        imagePath: getImagePath('Skin Scan'),
        description: 'Diagnóstico facial com tecnologia coreana e inteligência artificial. Análise completa + plano personalizado.',
        category: 'skin',
    },
    {
        id: 'lashes',
        name: 'Lashes',
        price: 'Preço Variável',
        duration: '2:00 - 3:00 horas',
        imagePath: getImagePath('Lashes'), 
        description: 'Extensão de pestanas (diversos volumes e preços). Consulte a Tabela de Preços.',
        category: 'olhar',
        // Dados para o Pop-up de Preços (Simulação de tabela vista em image_e13812.jpg)
        priceOptions: [
            { label: '1ª APLICAÇÃO', isTitle: true, isHeader: true },
            { label: 'Volume Clássico / Fio a Fio', price: '30€' },
            { label: 'Volume Brasileiro', price: '35€' },
            { label: 'Volume 3D / 5D', price: '55€' },
            { label: 'MANUTENÇÃO', isTitle: true, isHeader: true },
            { label: 'Volume Clássico / Fio a Fio (2 semanas)', price: '23€' },
            { label: 'Volume Brasileiro (2 semanas)', price: '25€' },
        ]
    },
    {
        id: 'sobrancelhas',
        name: 'sobrancelhas',
        price: 'Preço Variável',
        duration: '5 - 10 minutos',
        imagePath: getImagePath('Sobrancelhas'),
        description: 'Design e/ou manutenção de sobrancelhas (diversos serviços e preços).',
        category: 'olhar',
    },
];

// --- Dados Simulados para os Passos 2 e 3 ---
const staff = [
    { id: '1', name: 'Patricia Albuquerque', image: '/OlimpoSkincare/staff/patricia.jpg' }, 
];
const availableSlots = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:30', '13:00', '14:00'];


// ------------------------------------------------------------
// NOVO COMPONENTE: Pop-up de Detalhes/Preços
// ------------------------------------------------------------

interface PriceOption {
    label: string;
    price?: string;
    isTitle?: boolean;
    isHeader?: boolean; // Novo para cabeçalhos como "1ª APLICAÇÃO"
}

interface ServicePopupProps {
    service: typeof services[0];
    onClose: () => void;
}

const ServicePopup: FC<ServicePopupProps> = ({ service, onClose }) => {
    // Verificar se existe um array de opções de preços
    const hasPriceOptions = service.priceOptions && service.priceOptions.length > 0;
    
    // Conteúdo a exibir
    const content: PriceOption[] = hasPriceOptions ? service.priceOptions! : [
        // Fallback (não deve ser usado se o "i" for clicado, mas mantido por segurança)
        { label: service.name, isTitle: true },
        { label: 'Preço', price: service.price },
        { label: 'Duração', price: service.duration },
        { label: 'Descrição:', isTitle: true },
        { label: service.description },
    ];


    return (
        <div className="skincare-service-popup-overlay" onClick={onClose}>
            <div className={`skincare-service-popup-card ${service.id === 'lashes' ? 'lashes-popup' : service.id === 'olimpacne' ? 'antiacne-popup' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-button" onClick={onClose}><FaTimes /></button>
                
                <h3 className="popup-title">{service.name === 'Lashes' ? 'PRICE LIST Lashes' : service.name}</h3>
                
                <div className="popup-content">
                    {hasPriceOptions ? (
                         <div className="price-options-list">
                            {content.map((option, index) => (
                                <p key={index} className={`price-option-item ${option.isTitle ? 'title' : ''} ${option.isHeader ? 'header' : ''}`}>
                                    <span className="option-label">{option.label}</span>
                                    {/* Exibir o preço apenas se não for um título ou cabeçalho */}
                                    {!option.isTitle && <span className="option-price">{option.price}</span>} 
                                </p>
                            ))}
                         </div>
                    ) : (
                        <p>{service.description}</p>
                    )}
                </div>
            </div>
        </div>
    );
};


// ------------------------------------------------------------
// COMPONENTE: Card de Serviço (Ajustado com o ícone de popup)
// ------------------------------------------------------------

interface ServiceCardProps {
    service: typeof services[0];
    isSelected: boolean;
    onSelect: (serviceId: string) => void;
    onOpenPopup: (service: typeof services[0]) => void; // Adicionar prop para abrir o pop-up
}

const ServiceCard: FC<ServiceCardProps> = ({ service, isSelected, onSelect, onOpenPopup }) => {
    
    // Função para tratar o clique no cartão (seleção)
    const handleCardClick = () => {
        onSelect(service.id);
    };

    // Função para tratar o clique no ícone "i" (pop-up)
    const handleInfoClick = (e: MouseEvent) => {
        e.stopPropagation(); // Previne que o clique no ícone selecione o cartão
        onOpenPopup(service);
    };


    return (
        <div 
            className={`skincare-service-card ${isSelected ? 'selected' : ''}`}
            onClick={handleCardClick}
        >
            <div className="card-image-wrapper">
                {/* Ícone de Informação (i) */}
                <div className="info-icon" onClick={handleInfoClick}>i</div> 
                <img 
                    src={service.imagePath} 
                    alt={service.name} 
                    className="service-image" 
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = '/OlimpoSkincare/services gerais/placeholder.png'; 
                        target.classList.add('service-image-placeholder');
                    }}
                />
            </div>
            
            <p className="service-name">{service.name}<span className="card-price-hidden"> | {service.price}</span></p>
            <p className="service-duration">Duração: {service.duration}</p>
        </div>
    );
};

// ------------------------------------------------------------
// Componente do Passo 1: Escolher Serviço (Ajustado com o estado do pop-up)
// ------------------------------------------------------------

const Step1ChooseService: FC<{ goToNext: (service: typeof services[0]) => void }> = ({ goToNext }) => {
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [popupService, setPopupService] = useState<typeof services[0] | null>(null); // Estado para o Pop-up
    
    const selectedService = useMemo(() => services.find(s => s.id === selectedServiceId), [selectedServiceId]);
    
    const handleNextClick = () => {
        if (selectedService) {
            goToNext(selectedService);
        }
    };

    const handleOpenPopup = useCallback((service: typeof services[0]) => {
        setPopupService(service);
    }, []);

    const handleClosePopup = useCallback(() => {
        setPopupService(null);
    }, []);

    return (
        <div className="skincare-modal-step step-1">
            <h2 className="step-title">1. Escolhe o teu serviço</h2>
            
            <div className="service-cards-grid">
                {services.map(service => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={service.id === selectedServiceId}
                        onSelect={setSelectedServiceId} 
                        onOpenPopup={handleOpenPopup} // Passar a função para abrir o pop-up
                    />
                ))}
            </div>

            {/* BOX DE DESCRIÇÃO (Ajustado à imagem) */}
            <div className="service-description-box step-1-description-box">
                {selectedService ? (
                    <>
                        <p className="description-text">{selectedService.name}</p>
                        <p className="description-subtext">{selectedService.description}</p>
                    </>
                ) : (
                    <p className="description-placeholder">Selecione um serviço para ver a descrição.</p>
                )}
            </div>

            <div className="skincare-modal-controls step-1-controls">
                <button 
                    onClick={handleNextClick} 
                    className="skincare-modal-next-button"
                    disabled={!selectedServiceId} 
                >
                    Seguinte
                </button>
            </div>
            
            {/* RENDERIZAR O POP-UP SE HOUVER UM SERVIÇO SELECIONADO PARA TAL */}
            {popupService && <ServicePopup service={popupService} onClose={handleClosePopup} />}
        </div>
    );
};

// ------------------------------------------------------------
// Componente do Passo 2: Data e Hora (Inalterado)
// ------------------------------------------------------------

interface Step2Data {
    selectedDate: string | null;
    selectedTime: string | null;
    selectedStaffId: string; 
}

// NOVO: Função auxiliar para gerar os dias do calendário
const generateCalendarDays = (year: number, month: number, selectedDate: string | null): { date: number, isCurrentMonth: boolean, isSelected: boolean, fullDate: string, isToday: boolean }[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera hora para comparação de datas

    const date = new Date(year, month, 1);
    const firstDayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // 0=Domingo, 1=Segunda. Queremos 0=Segunda (índice 0), 6=Domingo (índice 6)
    
    // Ajustar para Domingo como último dia (0) se necessário, conforme pt-PT.
    // Em Portugal, o calendário começa na Segunda-feira (1).
    // O getDay() retorna 0 (Dom) a 6 (Sáb). Para começar na Segunda, ajustamos:
    // Seg: 1-1=0; Ter: 2-1=1; ...; Sáb: 6-1=5. Dom: 0 -> 6.
    const startOffset = date.getDay() === 0 ? 6 : date.getDay() - 1; 

    const days = [];

    // 1. Dias do Mês Anterior (para preencher o início)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        // Obter o ano e mês corretos para o dia anterior
        const prevDate = new Date(year, month - 1, day);
        days.push({ 
            date: day, 
            isCurrentMonth: false, 
            isSelected: false, 
            fullDate: prevDate.toISOString().split('T')[0],
            isToday: false,
        });
    }

    // 2. Dias do Mês Atual
    const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= currentMonthLastDay; day++) {
        const currentDate = new Date(year, month, day);
        const fullDate = currentDate.toISOString().split('T')[0];
        
        // Apenas para efeito de demonstração, vamos considerar '2025-07-22' como o dia selecionado por defeito (o 'today' simulado)
        // Para uma aplicação real, comparar-se-ia com o 'selectedDate' vindo do estado
        const isSelected = selectedDate === fullDate;
        const isToday = currentDate.getTime() === today.getTime();
        
        days.push({ 
            date: day, 
            isCurrentMonth: true, 
            isSelected,
            fullDate,
            isToday: isToday,
        });
    }

    // 3. Dias do Próximo Mês (para preencher até um total de 42 se necessário)
    const totalDays = days.length;
    const remainingDays = 42 - totalDays; 
    
    // Apenas preenche até 6 semanas (42 dias) ou 5 semanas (35 dias)
    const maxFill = totalDays <= 35 ? 35 : 42; 
    
    for (let day = 1; days.length < maxFill; day++) {
        const nextDate = new Date(year, month + 1, day);
        days.push({ 
            date: day, 
            isCurrentMonth: false, 
            isSelected: false, 
            fullDate: nextDate.toISOString().split('T')[0],
            isToday: false,
        });
    }

    return days;
};


const Step2ChooseDateTime: FC<{ goToNext: (data: Step2Data) => void, goToPrev: () => void, service: typeof services[0] }> = ({ goToNext, goToPrev, service }) => {
    // Data simulada/inicial para o calendário
    const initialDate = new Date(2025, 6, 22); // Julho (6) 2025
    initialDate.setHours(0, 0, 0, 0); // Garante que a hora está a zero

    // 1. Estados para o calendário
    const [currentDate, setCurrentDate] = useState<Date>(initialDate); // Usamos um objeto Date para gerir o mês/ano
    const initialSelectedDateString = initialDate.toISOString().split('T')[0]; // "2025-07-22"
    const [selectedDate, setSelectedDate] = useState<string | null>(initialSelectedDateString); // Formato "AAAA-MM-DD"
    const [selectedTime, setSelectedTime] = useState<string | null>('9:00'); 
    
    const selectedStaffId = staff[0].id; 
    const isNextDisabled = !selectedDate || !selectedTime;

    // 2. Funções de Navegação
    const goToPrevMonth = () => {
        setCurrentDate(prevDate => {
            return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
        });
    };

    const goToNextMonth = () => {
        setCurrentDate(prevDate => {
            return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
        });
    };

    // 3. Dados Dinâmicos do Calendário
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-11
    
    const monthName = new Intl.DateTimeFormat('pt-PT', { month: 'long', year: 'numeric' }).format(currentDate);

    // Memoiza a geração dos dias para evitar recálculo desnecessário
    const calendarDays = useMemo(() => generateCalendarDays(currentYear, currentMonth, selectedDate), [currentYear, currentMonth, selectedDate]);
    
    // 4. Manipulador de seleção de data
    const handleDateClick = (fullDate: string, isCurrentMonth: boolean) => {
        // Ignora datas de meses anteriores
        if (!isCurrentMonth) {
            // Se for do próximo mês, navega para ele e seleciona a data
            const clickedDate = new Date(fullDate);
            if (clickedDate.getTime() > currentDate.getTime()) {
                 setCurrentDate(clickedDate);
            }
            // Se for do mês anterior, mantemos a navegação (mas desativamos a seleção)
            // Para simplicidade, vamos apenas ignorar a seleção do dia anterior
            return; 
        }

        // Seleciona a data no formato "AAAA-MM-DD"
        setSelectedDate(fullDate);
        setSelectedTime(null); // Limpar o horário ao mudar de dia, como é comum em agendamentos
    };


    const handleNextClick = () => {
        if (!isNextDisabled) {
            goToNext({ selectedDate, selectedTime, selectedStaffId });
        }
    };

    const renderCalendar = () => {
        
        return (
            <div className="step-2-content-wrapper">
                {/* Calendário */}
                <div className="calendar-box">
                    <div className="calendar-header">
                        <FaChevronLeft className="calendar-nav-icon" onClick={goToPrevMonth} />
                        <span className="calendar-month-name">{monthName}</span>
                        <FaChevronRight className="calendar-nav-icon" onClick={goToNextMonth} />
                    </div>
                    <div className="calendar-grid">
                        {/* Nomes dos Dias da Semana (Segunda a Domingo em pt-PT) */}
                        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
                            <span key={index} className="day-name">{day}</span>
                        ))}
                        
                        {/* Dias do Mês */}
                        {calendarDays.map((day, index) => {
                            // Para simulação, estamos a desativar as datas que não são do mês atual
                            const isSelectable = day.isCurrentMonth; 

                            return (
                                <div 
                                    key={index} 
                                    className={`calendar-date 
                                        ${day.isCurrentMonth ? 'current-month' : 'past-month'} 
                                        ${day.isSelected ? 'selected' : ''} 
                                        ${isSelectable ? 'selectable' : ''}
                                        ${day.isToday && day.isCurrentMonth ? 'today' : ''}
                                    `}
                                    onClick={() => handleDateClick(day.fullDate, day.isCurrentMonth)} 
                                >
                                    {day.date}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Slots de Tempo */}
                <div className="time-slots-wrapper">
                    {/* Exibir Data Selecionada para Contexto */}
                    <p className="selected-date-display">
                        <FaCalendarAlt /> Dia: <b>{selectedDate ? new Date(selectedDate).toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Escolha uma data'}</b>
                    </p>
                    
                    <div className="time-slots-grid">
                        {availableSlots.map(slot => (
                            <button
                                key={slot}
                                className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                                onClick={() => setSelectedTime(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                    {availableSlots.length === 0 && <p className="no-slots">Nenhum horário disponível para esta data.</p>}
                </div>
            </div>
        );
    };

    return (
        <div className="skincare-modal-step step-2">
            <h2 className="step-title">2. Escolhe a data e hora</h2>
            
            {renderCalendar()}

            <div className="skincare-modal-controls step-2-controls">
                <button onClick={goToPrev} className="skincare-modal-back-button">
                    <FaChevronLeft /> 
                </button>
                <button 
                    onClick={handleNextClick} 
                    className="skincare-modal-next-button"
                    disabled={isNextDisabled}
                >
                    Seguinte
                </button>
            </div>
        </div>
    );
};

// ------------------------------------------------------------
// Componente do Passo 3: Detalhes Pessoais (Atualizado)
// ------------------------------------------------------------

interface BookingData extends Step2Data {
    service: typeof services[0];
}

const Step3Details: FC<{ goToNext: () => void, goToPrev: () => void, bookingData: BookingData }> = ({ goToNext, goToPrev, bookingData }) => {
    const { service, selectedDate, selectedTime, selectedStaffId } = bookingData;
    
    // ALTERAÇÃO: Inicializar com string vazia
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState(''); 
    // const [isConfirmed, setIsConfirmed] = useState(false); // Removido por não ser usado

    const staffName = staff.find(s => s.id === selectedStaffId)?.name || 'Profissional';
    const formattedDateShort = selectedDate ? new Date(selectedDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\/\d{4}/, '') : 'Data';

    const isNextDisabled = !(name && email && phone); 

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
        goToNext(); 
    };
    
    return (
        <div className="skincare-modal-step step-3-details">
            <h2 className="step-title">Confirma a tua marcação</h2> 
            
            <div className="booking-review-summary-card">
                <p className="service-name-resumo">{service.name}</p>
                <div className="staff-info-resumo">
                    <p className="staff-name-resumo">{staffName}</p>
                    <p className="date-time-resumo">{formattedDateShort} de julho de 2025, {selectedTime}</p>
                </div>
                <div className="staff-icon-resumo">
                    <img src={staff.find(s => s.id === selectedStaffId)?.image || '/OlimpoSkincare/staff/default.jpg'} alt="Staff" />
                </div>
            </div>
            
            <form className="booking-form">
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    {/* ALTERAÇÃO: Adicionado placeholder, estado inicial vazio */}
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        placeholder="Nome completo (Ex: Maria Joana)" 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    {/* ALTERAÇÃO: Adicionado placeholder, estado inicial vazio */}
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        placeholder="O seu e-mail (Ex: maria@mail.com)" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Número de telemóvel</label>
                    {/* ALTERAÇÃO: Adicionado placeholder, estado inicial vazio */}
                    <input 
                        type="tel" 
                        id="phone" 
                        value={phone} 
                        placeholder="Número de telemóvel (Ex: 912345678)" 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                </div>
            </form>

            <div className="skincare-modal-controls step-3-controls">
                <button onClick={goToPrev} className="skincare-modal-back-button back-arrow">
                    <FaChevronLeft />
                </button> 
                <button 
                    onClick={handleSubmit} 
                    className="skincare-modal-next-button confirm-button"
                    disabled={isNextDisabled}
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
};

// ------------------------------------------------------------
// Componente do Passo 4: Confirmação Final (Inalterado)
// ------------------------------------------------------------
const Step4Success: FC<{ close: () => void, bookingData: BookingData }> = ({ close, bookingData }) => {
    const staffName = staff.find(s => s.id === bookingData.selectedStaffId)?.name || 'Profissional';
    const formattedDate = bookingData.selectedDate ? new Date(bookingData.selectedDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' }) : 'Data';
    return (
        <div className="skincare-modal-step step-4-success">
            <div className="success-icon-wrapper">
                <FaCheckCircle className="success-icon"/>
            </div>
            <h2 className="step-title success-title">MARCAÇÃO EFETUADA!</h2>
            <p className="success-message">O seu agendamento para <b>{bookingData.service.name}</b> está completo!</p>
            <p className="success-submessage">Enviámos um email de confirmação com todos os detalhes e o link de cancelamento, caso necessite.</p>
            
            <div className="success-details">
                <p>Data: <b>{formattedDate}</b> às <b>{bookingData.selectedTime}</b></p>
                <p>Profissional: <b>{staffName}</b></p>
            </div>
            
            <button onClick={close} className="skincare-modal-close-final-button">
                FECHAR
            </button>
        </div>
    );
};

// ------------------------------------------------------------
// COMPONENTE PRINCIPAL DO MODAL (Inalterado)
// ------------------------------------------------------------

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const steps = [
    'Serviço',
    'Data/Hora',
    'Detalhes', 
    'Concluído' 
];

const SkincareBookingModal: FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1); 
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);

    const resetState = () => {
        setCurrentStep(1);
        setSelectedService(null);
        setBookingData(null);
    };

    // Apenas renderiza o overlay se estiver aberto
    if (!isOpen) {
        // Resetar o estado se a modal fechar e não estiver no passo 1
        if (currentStep !== 1) { 
            resetState();
        }
        return null;
    }

    const goToNext = (data?: typeof services[0] | Step2Data | undefined) => {
        if (currentStep === 1 && data && 'id' in data) {
            setSelectedService(data);
        } else if (currentStep === 2 && data && 'selectedDate' in data) {
            const fullData: BookingData = { ...data, service: selectedService! };
            setBookingData(fullData);
        }

        // Caso especial para o último passo (4 - Sucesso)
        if (currentStep === steps.length) {
            onClose(); 
        }
        
        // Avançar para o próximo passo
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        // Redireciona para o passo 1 se faltar informação essencial (apenas para segurança)
        if (currentStep >= 2 && !selectedService) {
             setCurrentStep(1); 
             return <Step1ChooseService goToNext={goToNext} />;
        }
        
        switch (currentStep) {
            case 1:
                return <Step1ChooseService goToNext={goToNext} />;
            case 2:
                // Type assertion é seguro aqui porque selectedService é verificado acima
                return <Step2ChooseDateTime goToNext={goToNext as (data: Step2Data) => void} goToPrev={goToPrev} service={selectedService!} />; 
            case 3:
                // Redireciona se não houver dados de reserva
                if (!bookingData) {
                    setCurrentStep(1);
                    return <Step1ChooseService goToNext={goToNext} />;
                }
                // Type assertion é seguro aqui porque bookingData é verificado
                return <Step3Details goToNext={goToNext as () => void} goToPrev={goToPrev} bookingData={bookingData} />;
            case 4:
                // Redireciona se não houver dados de reserva
                if (!bookingData) {
                    setCurrentStep(1);
                    return <Step1ChooseService goToNext={goToNext} />;
                }
                return <Step4Success close={onClose} bookingData={bookingData} />;
            default:
                return null;
        }
    };

    const progressSteps = 3; 
    const progressPercentage = (Math.min(currentStep, progressSteps) / progressSteps) * 100;
    
    return (
        <div 
            className="skincare-modal-overlay" 
            onClick={onClose}
            data-is-open={isOpen ? "true" : "false"} 
        >
            <div 
                className="skincare-modal-card" 
                onClick={(e: MouseEvent) => e.stopPropagation()} 
            >
                {/* O botão de voltar do topo só aparece nos passos 2 e 3 */}
                {currentStep > 1 && currentStep < 4 && (
                    <button className="skincare-modal-back-top-button" onClick={goToPrev}>
                        <FaChevronLeft />
                    </button>
                )}
                
                <h1 className="modal-main-title">MARCAÇÕES</h1>
                
                {/* BARRA DE PROGRESSO */}
                <div className="skincare-progress-bar-container">
                    <div 
                        className="skincare-progress-bar-fill" 
                        style={{ width: `${progressPercentage}%` }} 
                    />
                    <div className={`progress-icon-tip tip-${Math.min(currentStep, progressSteps)}`}>
                        <div className="flame-icon"></div>
                    </div>
                </div>
                
                {/* TÍTULOS DA BARRA DE PROGRESSO */}
                <div className="skincare-progress-labels">
                    <span className={`skincare-progress-label ${1 <= currentStep ? 'active' : ''}`}>1/3 Serviço</span>
                    <span className={`skincare-progress-label ${2 <= currentStep ? 'active' : ''}`}>2/3 Data/Hora</span>
                    <span className={`skincare-progress-label ${3 <= currentStep ? 'active' : ''}`}>3/3 Confirmação</span>
                </div>
                
                <hr className="skincare-modal-separator" />

                {/* CONTEÚDO DO PASSO */}
                <div className="skincare-modal-content">
                    {renderStepContent()}
                </div>

                <button className="skincare-modal-close-button" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default SkincareBookingModal;