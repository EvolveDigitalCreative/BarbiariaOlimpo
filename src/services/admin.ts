import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot, // <-- Reintroduzido para a função subscribeToOrdersPage
  orderBy,
  serverTimestamp,
  getDoc,
  limit,
  type CollectionReference,
  type Query,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import type { UserData } from './auth';

// --- User Management ---

export async function listUsers(filter?: { role?: string; active?: boolean }) {
  try {
    let usersQuery: Query | CollectionReference = collection(db, 'users');
    if (filter?.role) {
      usersQuery = query(usersQuery, where('role', '==', filter.role));
    }
    if (filter?.active !== undefined) {
      usersQuery = query(usersQuery, where('active', '==', filter.active));
    }

    const snapshot = await getDocs(usersQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (UserData & { id: string })[];
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
}

// --- Order Management (Vendas Olimpo Wear) ---

export interface Order {
  id?: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shippingDetails?: {
    address: string;
    trackingNumber?: string;
  };
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  trackingNumber?: string
) {
  try {
    const updates: any = {
      status,
      updatedAt: serverTimestamp() // 🎯 CORRIGIDO: Usar serverTimestamp para consistência
    };

    if (trackingNumber) {
      updates['shippingDetails.trackingNumber'] = trackingNumber;
    }

    await updateDoc(doc(db, 'orders', orderId), updates);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrder(orderId: string) {
  try {
    const snap = await getDoc(doc(db, 'orders', orderId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Order;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
}

export async function deleteOrder(orderId: string) {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}


export async function listOrders(filter?: {
  status?: Order['status'];
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  try {
    let ordersQuery: Query | CollectionReference = collection(db, 'orders');

    if (filter?.status) {
      ordersQuery = query(ordersQuery, where('status', '==', filter.status));
    }
    if (filter?.userId) {
      ordersQuery = query(ordersQuery, where('userId', '==', filter.userId));
    }
    // Converte Date para Timestamp para a query se necessário
    if (filter?.startDate) {
      ordersQuery = query(ordersQuery, where('createdAt', '>=', filter.startDate));
    }
    if (filter?.endDate) {
      ordersQuery = query(ordersQuery, where('createdAt', '<=', filter.endDate));
    }

    const snapshot = await getDocs(ordersQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error listing orders:', error);
    throw error;
  }
}

/**
 * Subscreve (escuta em tempo real) às encomendas. 
 */
export function subscribeToOrdersPage(
  callback: (orders: Order[]) => void,
  filter?: { status?: Order['status'], limit?: number }
): () => void {

  let ordersQuery: Query | CollectionReference = collection(db, 'orders');

  // Ordenação e Limite
  ordersQuery = query(ordersQuery, orderBy('createdAt', 'desc'));

  if (filter?.status) {
    ordersQuery = query(ordersQuery, where('status', '==', filter.status));
  }

  if (filter?.limit) {
    ordersQuery = query(ordersQuery, limit(filter.limit));
  }

  const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
    const ordersData: Order[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];

    callback(ordersData);

  }, (error) => {
    console.error("Error subscribing to orders page:", error);
  });

  return unsubscribe;
}


// --- Appointment Management (Marcações) ---

export interface Appointment {
  id: string;
  userId: string;
  userName: string; // Nome do cliente
  userEmail: string; // 🎯 ADICIONADO: Necessário para a marcação (BookingModal)
  userPhone: string; // 🎯 ADICIONADO: Necessário para a marcação (BookingModal)
  barberId: string; // 🎯 ADICIONADO: ID do barbeiro (necessário para filtros)
  barberName: string; // Nome do barbeiro
  serviceId: string; // 🎯 ADICIONADO: ID do serviço (necessário para filtros)
  serviceName: string; // Nome do serviço
  dateTime: number; // Timestamp (milisegundos) da marcação
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  duration: number; // 🎯 ADICIONADO: Duração em minutos (necessário para a lógica)
  createdAt: any; // 🎯 ADICIONADO: Timestamp de criação (como em Order)
}

/** 🎯 ADICIONADO: Tipo para a criação de uma marcação (sem campos auto-gerados) */
export type CreateAppointmentData = Omit<Appointment, 'id' | 'status' | 'createdAt'>;

/**
 * 🎯 ADICIONADO: Função de criação de marcação
 * Cria uma nova marcação (agendamento) no Firestore.
 */
export async function createAppointment(data: CreateAppointmentData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...data,
      status: 'pending', // Status inicial
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}


interface AppointmentListOptions {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
  barberId?: string;
  status?: Appointment['status'];
}

/**
 * Lista as marcações (agendamentos) do Firestore.
 */
export const listAppointments = async (options: AppointmentListOptions = {}): Promise<Appointment[]> => {
  try {
    let q: Query | CollectionReference = collection(db, 'appointments');

    // Filtrar por data (usando o campo 'dateTime' que é um timestamp em milissegundos)
    if (options.startDate) {
      q = query(q, where('dateTime', '>=', options.startDate.getTime()));
    }
    if (options.endDate) {
      q = query(q, where('dateTime', '<=', options.endDate.getTime()));
    }

    // Filtrar por barbeiro ou status
    if (options.barberId) {
      q = query(q, where('barberId', '==', options.barberId));
    }
    if (options.status) {
      q = query(q, where('status', '==', options.status));
    }

    // Ordenar por data (próximas marcações primeiro)
    q = query(q, orderBy('dateTime', 'asc'));

    // Limitar
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const snapshot = await getDocs(q);

    const appointments: Appointment[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      appointments.push({
        id: doc.id,
        userId: data.userId || 'N/A',
        userName: data.userName || 'Cliente Desconhecido',
        userEmail: data.userEmail || '', // 🎯 ADICIONADO
        userPhone: data.userPhone || '', // 🎯 ADICIONADO
        barberId: data.barberId || 'N/A', // 🎯 ADICIONADO
        barberName: data.barberName || 'Barbeiro N/A',
        serviceId: data.serviceId || 'N/A', // 🎯 ADICIONADO
        serviceName: data.serviceName || 'Serviço N/A',
        dateTime: data.dateTime,
        status: data.status as Appointment['status'] || 'pending',
        price: data.price || 0,
        duration: data.duration || 0, // 🎯 ADICIONADO
        createdAt: data.createdAt || null, // 🎯 ADICIONADO
      });
    });

    return appointments;
  } catch (error) {
    console.error('Error listing appointments:', error);
    throw error;
  }
};

export async function updateAppointmentStatus(
  appointmentId: string,
  status: Appointment['status']
) {
  try {
    await updateDoc(doc(db, 'appointments', appointmentId), {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
}


// --- Analytics/Dashboard Data ---

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  popularServices: Array<{
    serviceId: string;
    name: string;
    bookings: number;
  }>;
}

function calculateRevenue(orders: Order[], since: Date): number {
  function toDateValue(v: any): Date {
    if (!v) return new Date(0);
    // Trata Firestore Timestamp
    if (typeof v === 'object' && 'seconds' in v && typeof v.seconds === 'number') {
      return new Date(v.seconds * 1000);
    }
    if (v && typeof v.toDate === 'function') {
      return v.toDate();
    }
    if (v instanceof Date) return v;
    return new Date(v);
  }

  return orders
    .filter(order => toDateValue(order.createdAt) >= since)
    .reduce((total, order) => total + (order.total || 0), 0);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Users stats
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const activeUsersSnapshot = await getDocs(
      query(collection(db, 'users'), where('active', '==', true))
    );

    // Orders stats
    const now = new Date();
    // Criar novas datas para evitar modificar o objeto 'now'
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);


    const ordersSnapshot = await getDocs(collection(db, 'orders'));
    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];

    // Calculate revenue
    const revenue = {
      daily: calculateRevenue(orders, dayStart),
      weekly: calculateRevenue(orders, weekStart),
      monthly: calculateRevenue(orders, monthStart)
    };

    // Popular services calculation (Placeholder)
    const popularServices: DashboardStats['popularServices'] = [];

    return {
      totalUsers: usersSnapshot.size,
      activeUsers: activeUsersSnapshot.size,
      totalOrders: ordersSnapshot.size,
      revenue,
      popularServices
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
}