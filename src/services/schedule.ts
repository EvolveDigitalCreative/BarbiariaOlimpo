import { collection, query, getDocs, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Ajuste o caminho conforme o seu projeto

// 🚨 IMPORTANTE: Você precisa definir o tipo Appointment no seu types (ex: types/index.ts)
// Assumindo que você tem um tipo Appointment
interface Appointment {
    id: string;
    userId: string;
    userName: string;
    barberName: string;
    serviceName: string;
    dateTime: number; // Timestamp
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'canceled';
}

// ⚙️ Tipos Auxiliares

// Assumimos que a disponibilidade é armazenada por dia/barbeiro
export interface BarberWorkingHours {
    id: string; // Document ID (pode ser o ID do barbeiro + data, ou um ID único)
    barberId: string;
    dayOfWeek: number; // 0 (Domingo) a 6 (Sábado)
    startTime: string; // Ex: "09:00"
    endTime: string;   // Ex: "18:00"
    breakStart?: string; // Ex: "13:00"
    breakEnd?: string;   // Ex: "14:00"
}

export interface Service {
    id: string;
    name: string;
    durationMinutes: number; // Duração do serviço em minutos
    price: number;
}

export interface BookingData {
    serviceId: string;
    barberId?: string; // Pode ser undefined ("Sem Preferência")
    dateTime: number; // Timestamp da hora do agendamento
    serviceName: string;
    price: number;
    barberName: string; 
    userId: string; 
    userName: string;
}

// --- Funções Principais de Agendamento ---

/**
 * Busca os horários de trabalho para um barbeiro específico (ou todos)
 */
export async function getWorkingHours(barberId?: string): Promise<BarberWorkingHours[]> {
    try {
        let q = collection(db, 'workingHours');
        if (barberId) {
            q = query(q, where('barberId', '==', barberId)) as any;
        }
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BarberWorkingHours[];
    } catch (error) {
        console.error('Error fetching working hours:', error);
        return [];
    }
}

/**
 * Busca todas as marcações existentes para um determinado dia e barbeiro(s).
 */
export async function getBookedAppointments(date: Date, barberId?: string): Promise<Appointment[]> {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Usamos o timestamp em milissegundos para a consulta (assumindo que o campo 'dateTime' é um número/timestamp)
        const startMs = startOfDay.getTime();
        const endMs = endOfDay.getTime();


        let q = query(
            collection(db, 'appointments'),
            where('dateTime', '>=', startMs), 
            where('dateTime', '<=', endMs)
        );

        if (barberId) {
            q = query(q, where('barberId', '==', barberId)) as any;
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
    } catch (error) {
        console.error('Error fetching booked appointments:', error);
        return [];
    }
}


/**
 * 🛠️ LÓGICA PRINCIPAL: Calcula os slots de horário disponíveis.
 */
export function calculateAvailableSlots(
    workingHours: BarberWorkingHours[],
    bookedAppointments: Appointment[],
    serviceDurationMinutes: number
): string[] {
    const slots: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (workingHours.length === 0) {
        return []; // Nenhum horário de trabalho definido
    }

    // Simplificação: Assume que todos os barbeiros trabalham no mesmo horário (ou que já filtramos)
    const wh = workingHours[0]; // Horário do primeiro barbeiro (ou do barbeiro único)
    
    const [startHour, startMin] = wh.startTime.split(':').map(Number);
    const [endHour, endMin] = wh.endTime.split(':').map(Number);
    
    let currentTime = new Date();
    currentTime.setHours(startHour, startMin, 0, 0);
    const endTime = new Date();
    endTime.setHours(endHour, endMin, 0, 0);

    // Itera por cada slot possível
    while (currentTime.getTime() < endTime.getTime()) {
        const slotEnd = new Date(currentTime.getTime() + serviceDurationMinutes * 60000);
        
        // 1. Verificar se o slot termina após o horário de fecho
        if (slotEnd.getTime() > endTime.getTime()) {
            break; 
        }

        // 2. Verificar se o slot está no passado (para o dia de hoje)
        if (currentTime.getTime() < new Date().getTime() && currentTime.getDate() === new Date().getDate()) {
            currentTime = new Date(slotEnd);
            continue;
        }

        // 3. Verificar se há conflito com as marcações existentes
        const isBooked = bookedAppointments.some(appointment => {
            const appointmentStart = new Date(appointment.dateTime);
            // Assumindo que a duração real da marcação está no Appointment ou é fixa.
            // Para simplificar, vou usar a duração do serviço atual para checar a sobreposição.
            const appointmentEnd = new Date(appointmentStart.getTime() + serviceDurationMinutes * 60000); 

            // Conflito se:
            // - O novo slot começar antes do fim da marcação E
            // - O novo slot terminar após o início da marcação
            return (
                currentTime.getTime() < appointmentEnd.getTime() &&
                slotEnd.getTime() > appointmentStart.getTime()
            );
        });

        // 4. (Omitido) Verificar conflito com o intervalo (break)

        if (!isBooked) {
            slots.push(currentTime.toTimeString().slice(0, 5)); // Ex: "09:00"
        }

        // Avança para o próximo slot (30 minutos, por exemplo)
        currentTime = new Date(currentTime.getTime() + 30 * 60000); 
    }

    return slots;
}

/**
 * 🛠️ Salva uma nova marcação no Firestore.
 */
export async function createAppointment(data: BookingData): Promise<string> {
    try {
        const newAppointment: Omit<Appointment, 'id'> = {
            userId: data.userId,
            userName: data.userName,
            barberName: data.barberName,
            serviceName: data.serviceName,
            dateTime: data.dateTime, // Timestamp em ms
            price: data.price,
            status: 'confirmed',
            ...(data.barberId && { barberId: data.barberId }), 
        };

        const docRef = await addDoc(collection(db, 'appointments'), {
            ...newAppointment,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw new Error('Não foi possível finalizar o agendamento.');
    }
}