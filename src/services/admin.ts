import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
  getDoc,
  startAfter,
  limit,
  type CollectionReference,
  type Query,
  type DocumentData
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import type { UserData } from './auth';

// User Management
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

// Order Management
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
  createdAt: any;
  updatedAt: any;
}

export async function updateOrderStatus(
  orderId: string, 
  status: Order['status'], 
  trackingNumber?: string
) {
  try {
    const updates: any = {
      status,
      updatedAt: new Date()
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

// Order CRUD and real-time subscription
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

export function subscribeToOrders(
  callback: (orders: Order[]) => void,
  options?: { status?: Order['status']; userId?: string; order?: 'asc' | 'desc' }
): () => void {
  const colRef: CollectionReference = collection(db, 'orders');
  const qParts: any[] = [];
  if (options?.status) qParts.push(where('status', '==', options.status));
  if (options?.userId) qParts.push(where('userId', '==', options.userId));
  qParts.push(orderBy('createdAt', options?.order === 'desc' ? 'desc' : 'asc'));
  const q = query(colRef, ...qParts);
  const unsub = onSnapshot(q, (snap) => {
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
    callback(items);
  }, (err) => {
    console.error('orders onSnapshot error', err);
    callback([]);
  });
  return unsub;
}

// Cursor-based pagination (one-time fetch)
export async function fetchOrdersPage(options?: {
  limit?: number;
  startAfterCreatedAt?: any; // Firestore Timestamp or Date
  status?: Order['status'];
  userId?: string;
  order?: 'asc' | 'desc';
}) {
  try {
    const limitNum = options?.limit ?? 20;
    const colRef: CollectionReference = collection(db, 'orders');
    const qParts: any[] = [];
    if (options?.status) qParts.push(where('status', '==', options.status));
    if (options?.userId) qParts.push(where('userId', '==', options.userId));
    qParts.push(orderBy('createdAt', options?.order === 'asc' ? 'asc' : 'desc'));
    if (options?.startAfterCreatedAt) qParts.push(startAfter(options.startAfterCreatedAt));
    qParts.push(limit(limitNum));

    const q = query(colRef, ...qParts);
    const snap = await getDocs(q);
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
    const last = snap.docs[snap.docs.length - 1];
    const lastCreatedAt = last ? (last.data() as any).createdAt : null;
    return { orders: items, lastCreatedAt };
  } catch (error) {
    console.error('Error fetching orders page:', error);
    throw error;
  }
}

// Real-time subscription for a single page (supports limit + startAfter)
export function subscribeToOrdersPage(
  callback: (orders: Order[], lastCreatedAt: any | null) => void,
  options?: {
    limit?: number;
    startAfterCreatedAt?: any;
    status?: Order['status'];
    userId?: string;
    order?: 'asc' | 'desc';
  }
): () => void {
  const limitNum = options?.limit ?? 20;
  const colRef: CollectionReference = collection(db, 'orders');
  const qParts: any[] = [];
  if (options?.status) qParts.push(where('status', '==', options.status));
  if (options?.userId) qParts.push(where('userId', '==', options.userId));
  qParts.push(orderBy('createdAt', options?.order === 'asc' ? 'asc' : 'desc'));
  if (options?.startAfterCreatedAt) qParts.push(startAfter(options.startAfterCreatedAt));
  qParts.push(limit(limitNum));

  const q = query(colRef, ...qParts);
  const unsub = onSnapshot(q, (snap) => {
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
    const last = snap.docs[snap.docs.length - 1];
    const lastCreatedAt = last ? (last.data() as any).createdAt : null;
    callback(items, lastCreatedAt);
  }, (err) => {
    console.error('orders page onSnapshot error', err);
    callback([], null);
  });
  return unsub;
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

// Analytics/Dashboard Data
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

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Users stats
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const activeUsersSnapshot = await getDocs(
      query(collection(db, 'users'), where('active', '==', true))
    );

    // Orders stats
    const now = new Date();
    const dayStart = new Date(now.setHours(0, 0, 0, 0));
    const weekStart = new Date(now.setDate(now.getDate() - 7));
    const monthStart = new Date(now.setDate(now.getDate() - 30));

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

    // Popular services calculation would go here
    // This is a placeholder implementation
    const popularServices: DashboardStats['popularServices'] = []; // Would need to aggregate from appointments/orders

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

function calculateRevenue(orders: Order[], since: Date): number {
  function toDateValue(v: any): Date {
    if (!v) return new Date(0);
    // Firestore Timestamp
    if (typeof v === 'object' && 'seconds' in v && typeof v.seconds === 'number') {
      return new Date(v.seconds * 1000);
    }
    // Firestore Timestamp with toDate()
    if (v && typeof v.toDate === 'function') {
      return v.toDate();
    }
    if (v instanceof Date) return v;
    // fallback
    return new Date(v);
  }

  return orders
    .filter(order => toDateValue(order.createdAt) >= since)
    .reduce((total, order) => total + (order.total || 0), 0);
}