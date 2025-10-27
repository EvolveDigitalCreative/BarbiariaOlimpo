// functions/src/index.ts - CÓDIGO COMPLETO CORRIGIDO PARA DEPLOY

import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

// Importações date-fns
import {
    parse, addMinutes, isBefore, isAfter, isSameDay, format,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";

// Inicializa Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// --- CONFIGURAÇÕES ---
const TIMEZONE = "Europe/Lisbon";
const SLOT_INTERVAL_MINUTES = 30;
const MIN_ADVANCE_HOURS = 2;
const DEFAULT_WORKING_HOURS: TimeRange = { start: "09:00", end: "18:00" };
const DEFAULT_BREAKS: TimeRange[] = [{ start: "12:00", end: "13:00" }];
// --------------------

// Interfaces (tipagem)
interface HorariosDisponiveisRequest {
    barberId?: string | null;
    serviceId: string;
    date: string; // YYYY-MM-DD
}
interface TimeRange { start: string; end: string; }
interface AppointmentInterval { start: Date; end: Date; }

// Tipagem segura para a função parse (resolve o erro @typescript-eslint/no-explicit-any)
type DateFnsParse = (
  dateString: string,
  formatString: string,
  baseDate: Date
) => Date;

// Função Auxiliar para Parse (com tipagem segura)
const parseTime = (dateString: string, timeString: string): Date => {
    try {
      return (parse as DateFnsParse)(`${dateString} ${timeString}`, "yyyy-MM-dd HH:mm", new Date());
    } catch (e) {
      functions.logger.warn(`Fallback para new Date() em parseTime para: ${dateString} ${timeString}`, e);
      return new Date(`${dateString}T${timeString}:00`);
    }
};


/**
 * Cloud Function (V2 HTTPS Callable) para calcular horários disponíveis.
 */
export const getAvailableSlots = functions.https.onCall(
    { region: 'us-central1' }, 
    async (req) => {
        // Uso de req.data é tipagem V2, mas requer tipagem explícita se o cliente não fornecer a metadata
        const data = req.data as HorariosDisponiveisRequest;
        const { barberId, serviceId, date: dateString } = data;

        functions.logger.info("Recebido para getAvailableSlots:", { barberId, serviceId, date: dateString });

        // 1. Validação
        if (!serviceId || !dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            throw new functions.https.HttpsError("invalid-argument", "serviceId e date (YYYY-MM-DD) são obrigatórios.");
        }

        try {
            // 2. Buscar Duração do Serviço
            const serviceSnap = await db.collection("services").doc(serviceId).get();
            if (!serviceSnap.exists) {
                throw new functions.https.HttpsError("not-found", `Serviço com ID ${serviceId} não encontrado.`);
            }
            const serviceDuration = serviceSnap.data()?.durationMinutes || 60;

            // 3. Buscar Horários/Pausas do Barbeiro (ou padrão)
            let workingHours: TimeRange = DEFAULT_WORKING_HOURS;
            let breaks: TimeRange[] = DEFAULT_BREAKS;
            if (barberId) {
                const barberSnap = await db.collection("users").doc(barberId).get();
                if (barberSnap.exists) {
                    const barberData = barberSnap.data();
                    workingHours = barberData?.workingHours || DEFAULT_WORKING_HOURS;
                    breaks = barberData?.breaks || DEFAULT_BREAKS;
                    functions.logger.info(`Usando horários do barbeiro ${barberId}`);
                } else {
                     functions.logger.warn(`Barbeiro ${barberId} não encontrado, usando horários padrão.`);
                }
            } else {
                functions.logger.info("Nenhum barbeiro especificado, usando horários padrão.");
            }

             // 4. Buscar Agendamentos Existentes
            let appointmentsQuery = db.collection("appointments").where("date", "==", dateString);
            if (barberId) {
                 appointmentsQuery = appointmentsQuery.where("barberId", "==", barberId);
            }

            const appointmentsSnap = await appointmentsQuery.get();
            const existingAppointments: AppointmentInterval[] = appointmentsSnap.docs.map(doc => {
                 const appData = doc.data();
                 const startTime = parseTime(appData.date, appData.time);
                 const duration = appData.serviceDurationMinutes || serviceDuration;
                 const endTime = addMinutes(startTime, duration);
                 return { start: startTime, end: endTime };
            });
            functions.logger.info(`Encontrados ${existingAppointments.length} agendamentos existentes para ${dateString}` + (barberId ? ` / barbeiro ${barberId}` : ""));


            // --- 5. Gerar e Filtrar Slots ---
            const availableSlots: string[] = [];
            // ✅ Corrigido o uso de 'parse'
            const selectedDate = (parse as DateFnsParse)(dateString, "yyyy-MM-dd", new Date()); 
            const now = toZonedTime(new Date(), TIMEZONE);
            const isToday = isSameDay(selectedDate, now);
            const minBookingTimeToday = addMinutes(now, MIN_ADVANCE_HOURS * 60);

            let currentSlotStart = parseTime(dateString, workingHours.start);
            const workEnd = parseTime(dateString, workingHours.end);
            const breakTimes: AppointmentInterval[] = breaks.map(b => ({
                start: parseTime(dateString, b.start),
                end: parseTime(dateString, b.end),
            }));

            functions.logger.info(`Gerando slots de ${format(currentSlotStart, "HH:mm")} a ${format(workEnd, "HH:mm")} com intervalo ${SLOT_INTERVAL_MINUTES}min`);

            while (isBefore(currentSlotStart, workEnd)) {
                const currentSlotEnd = addMinutes(currentSlotStart, serviceDuration);

                // Slot termina após o expediente? Pula para o próximo dia (break)
                if (isAfter(currentSlotEnd, workEnd)) {
                    functions.logger.debug(`Slot ${format(currentSlotStart, "HH:mm")} termina após o expediente.`);
                    break;
                }

                let isAvailable = true;
                const slotLabel = format(currentSlotStart, "HH:mm"); // Para logs

                // Check 1: Passado ou muito próximo (se for hoje)
                if (isToday && isBefore(currentSlotStart, minBookingTimeToday)) {
                    functions.logger.debug(`Slot ${slotLabel} está no passado ou muito próximo.`);
                    isAvailable = false;
                }

                // Check 2: Sobrepõe pausa
                if (isAvailable) {
                    for (const breakTime of breakTimes) {
                        if (isBefore(currentSlotStart, breakTime.end) && isAfter(currentSlotEnd, breakTime.start)) {
                            functions.logger.debug(`Slot ${slotLabel} sobrepõe pausa (${format(breakTime.start, "HH:mm")}-${format(breakTime.end, "HH:mm")}).`);
                            isAvailable = false;
                            break;
                        }
                    }
                }

                // Check 3: Sobrepõe agendamento existente
                if (isAvailable) {
                    for (const appointment of existingAppointments) {
                        if (isBefore(currentSlotStart, appointment.end) && isAfter(currentSlotEnd, appointment.start)) {
                            functions.logger.debug(`Slot ${slotLabel} sobrepõe agendamento (${format(appointment.start, "HH:mm")}-${format(appointment.end, "HH:mm")}).`);
                            isAvailable = false;
                            break;
                        }
                    }
                }

                // Adiciona se passou por todas as verificações
                if (isAvailable) {
                    availableSlots.push(slotLabel);
                }

                // Próximo slot
                currentSlotStart = addMinutes(currentSlotStart, SLOT_INTERVAL_MINUTES);
            }

            functions.logger.info(`Calculados ${availableSlots.length} slots disponíveis:`, availableSlots);

            // 6. Retornar Resultado
            return { horarios: availableSlots };

        } catch (error) {
            functions.logger.error("Erro interno em getAvailableSlots:", error);
            if (error instanceof functions.https.HttpsError) { throw error; }
            throw new functions.https.HttpsError("internal", "Falha interna ao calcular horários.");
        }
    });