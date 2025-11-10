import { 
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  startAfter,
  limit as limitFn,
  type Query,
  type CollectionReference
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id?: string;
  userId: string;
  userName?: string;
  barberId?: string;
  barberName?: string;
  serviceId?: string;
  serviceName?: string;
  date: Date | any; // will be stored as Firestore Timestamp
  status: AppointmentStatus;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
}

type UnsubscribeFn = () => void;

/**
 * Subscribes to appointments in real-time.
 * callback receives an array of Appointment objects.
 * options can include filters: status, barberId, userId, startDate, endDate
 */
export function subscribeToAppointments(
  callback: (appointments: Appointment[]) => void,
  options?: {
    status?: AppointmentStatus;
    barberId?: string;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
    order?: 'asc' | 'desc';
  }
): UnsubscribeFn {
  const colRef: CollectionReference = collection(db, 'appointments');
  const qParts: Array<any> = [];

  if (options?.status) qParts.push(where('status', '==', options.status));
  if (options?.barberId) qParts.push(where('barberId', '==', options.barberId));
  if (options?.userId) qParts.push(where('userId', '==', options.userId));
  if (options?.startDate) qParts.push(where('date', '>=', options.startDate));
  if (options?.endDate) qParts.push(where('date', '<=', options.endDate));

  qParts.push(orderBy('date', options?.order === 'desc' ? 'desc' : 'asc'));

  const q: Query = query(colRef, ...qParts);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const items: Appointment[] = snapshot.docs.map(docSnap => {
      const data = docSnap.data() as any;
      const dateVal = data.date && typeof data.date.toDate === 'function' ? data.date.toDate() : data.date;
      return ({
        id: docSnap.id,
        ...data,
        date: dateVal
      } as Appointment);
    });
    callback(items);
  }, (error) => {
    console.error('Appointments onSnapshot error:', error);
    callback([]);
  });

  return unsubscribe;
}

// Pagination helpers
export async function fetchAppointmentsPage(options?: {
  limit?: number;
  startAfterDate?: any;
  status?: AppointmentStatus;
  barberId?: string;
  userId?: string;
  order?: 'asc' | 'desc';
}) {
  try {
    const limitNum = options?.limit ?? 20;
    const colRef: CollectionReference = collection(db, 'appointments');
    const qParts: any[] = [];
    if (options?.status) qParts.push(where('status', '==', options.status));
    if (options?.barberId) qParts.push(where('barberId', '==', options.barberId));
    if (options?.userId) qParts.push(where('userId', '==', options.userId));
    qParts.push(orderBy('date', options?.order === 'asc' ? 'asc' : 'desc'));
    if (options?.startAfterDate) qParts.push(startAfter(options.startAfterDate));
    qParts.push(limitFn(limitNum));

    const q = query(colRef, ...qParts);
    const snap = await getDocs(q);
    const items = snap.docs.map(d => {
      const data = d.data() as any;
      const dateVal = data.date && typeof data.date.toDate === 'function' ? data.date.toDate() : data.date;
      return ({ id: d.id, ...data, date: dateVal } as Appointment);
    });
    const last = snap.docs[snap.docs.length - 1];
    const lastDate = last ? (last.data() as any).date : null;
    return { appointments: items, lastDate };
  } catch (error) {
    console.error('Error fetching appointments page:', error);
    throw error;
  }
}

export function subscribeToAppointmentsPage(
  callback: (appointments: Appointment[], lastDate: any | null) => void,
  options?: {
    limit?: number;
    startAfterDate?: any;
    status?: AppointmentStatus;
    barberId?: string;
    userId?: string;
    order?: 'asc' | 'desc';
  }
): UnsubscribeFn {
  const limitNum = options?.limit ?? 20;
  const colRef: CollectionReference = collection(db, 'appointments');
  const qParts: any[] = [];
  if (options?.status) qParts.push(where('status', '==', options.status));
  if (options?.barberId) qParts.push(where('barberId', '==', options.barberId));
  if (options?.userId) qParts.push(where('userId', '==', options.userId));
  qParts.push(orderBy('date', options?.order === 'asc' ? 'asc' : 'desc'));
  if (options?.startAfterDate) qParts.push(startAfter(options.startAfterDate));
  qParts.push(limitFn(limitNum));

  const q: Query = query(colRef, ...qParts);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const items: Appointment[] = snapshot.docs.map(docSnap => {
      const data = docSnap.data() as any;
      const dateVal = data.date && typeof data.date.toDate === 'function' ? data.date.toDate() : data.date;
      return ({ id: docSnap.id, ...data, date: dateVal } as Appointment);
    });
    const last = snapshot.docs[snapshot.docs.length - 1];
    const lastDate = last ? (last.data() as any).date : null;
    callback(items, lastDate);
  }, (error) => {
    console.error('Appointments page onSnapshot error:', error);
    callback([], null);
  });

  return unsubscribe;
}

export async function createAppointment(payload: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}

export async function updateAppointment(id: string, updates: Partial<Appointment>) {
  try {
    await updateDoc(doc(db, 'appointments', id), {
      ...updates,
      updatedAt: serverTimestamp()
    } as any);
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
}

export async function deleteAppointment(id: string) {
  try {
    await deleteDoc(doc(db, 'appointments', id));
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
}

export async function getAppointment(id: string) {
  try {
    const docSnap = await getDoc(doc(db, 'appointments', id));
    if (!docSnap.exists()) return null;
    const data = docSnap.data() as any;
    const dateVal = data.date && typeof data.date.toDate === 'function' ? data.date.toDate() : data.date;
    return {
      id: docSnap.id,
      ...data,
      date: dateVal
    } as Appointment;
  } catch (error) {
    console.error('Error getting appointment:', error);
    throw error;
  }
}