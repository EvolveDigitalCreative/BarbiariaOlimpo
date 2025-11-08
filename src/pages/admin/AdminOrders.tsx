import { useEffect, useState } from 'react';
import type { FC } from 'react';
import {
  subscribeToOrdersPage,
  type Order,
  updateOrderStatus,
  getOrder
} from '../../services/admin';
import Pagination from '../../components/common/Pagination';

const statusOptions: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const AdminOrders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Pagination / filters
  const [statusFilter, setStatusFilter] = useState<Order['status'] | ''>('');
  const [limitPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [cursors, setCursors] = useState<any[]>([]); // store lastCreatedAt for each page
  const [lastCreatedAt, setLastCreatedAt] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    // build options for page subscription
    const options: any = { order: 'desc', limit: limitPerPage };
    if (statusFilter) options.status = statusFilter;
    if (cursors[pageIndex]) options.startAfterCreatedAt = cursors[pageIndex];

    const unsub = subscribeToOrdersPage((items, last) => {
      setOrders(items);
      setLastCreatedAt(last);
      setLoading(false);
    }, options);

    return () => unsub();
  }, [pageIndex, statusFilter, limitPerPage, cursors]);

  const openDetails = async (id?: string) => {
    if (!id) return;
    try {
      const ord = await getOrder(id);
      setSelectedOrder(ord as Order);
      setTrackingInput(ord?.shippingDetails?.trackingNumber || '');
    } catch (err) {
      console.error(err);
      setError('Não foi possível obter os detalhes do pedido.');
    }
  };

  const closeDetails = () => {
    setSelectedOrder(null);
    setTrackingInput('');
    setError(null);
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus, trackingInput || undefined);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar o estado do pedido.');
    }
  };

  const handleTrackingSave = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, selectedOrder?.status || 'processing', trackingInput || undefined);
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar tracking.');
    }
  };

  const goNext = () => {
    if (!lastCreatedAt) return; // no more
    // ensure cursor for next page is set
    setCursors(prev => {
      const next = [...prev];
      next[pageIndex + 1] = lastCreatedAt;
      return next;
    });
    setPageIndex(p => p + 1);
  };

  const goPrev = () => {
    if (pageIndex === 0) return;
    setPageIndex(p => p - 1);
  };

  const handleFilterChange = (val: Order['status'] | '') => {
    setStatusFilter(val);
    setPageIndex(0);
    setCursors([]);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Encomendas</h2>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>Status:</label>
        <select value={statusFilter} onChange={(e) => handleFilterChange(e.target.value as any)}>
          <option value="">Todos</option>
          {statusOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div style={{ marginLeft: 'auto' }}>
          Página: {pageIndex + 1}
        </div>
      </div>

      {loading ? (
        <div>Carregando encomendas...</div>
      ) : (
        <div className="data-table">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td style={{ fontFamily: 'monospace' }}>{o.id}</td>
                  <td>{o.userId}</td>
                  <td>{o.products.length}</td>
                  <td>€ {o.total.toFixed(2)}</td>
                  <td style={{ textTransform: 'capitalize' }}>{o.status}</td>
                  <td>{o.createdAt ? new Date(o.createdAt.seconds ? o.createdAt.seconds * 1000 : o.createdAt).toLocaleString('pt-PT') : '-'}</td>
                  <td>
                    <button className="btn" onClick={() => openDetails(o.id)}>Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div style={{ marginTop: '1.5rem', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 6 }}>
          <h3>Detalhes do Pedido</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>ID:</strong> <span style={{ fontFamily: 'monospace' }}>{selectedOrder.id}</span>
            </div>
            <div>
              <strong>Cliente:</strong> {selectedOrder.userId}
            </div>
            <div>
              <strong>Total:</strong> € {selectedOrder.total.toFixed(2)}
            </div>
            <div>
              <strong>Status:</strong> {selectedOrder.status}
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <strong>Produtos:</strong>
              <ul>
                {selectedOrder.products.map((p, idx) => (
                  <li key={idx}>{p.productId} x{p.quantity} — € {p.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label style={{ marginRight: 8 }}>Mudar status:</label>
            <select
              value={selectedOrder.status}
              onChange={(e) => handleStatusChange(selectedOrder.id as string, e.target.value as Order['status'])}
            >
              {statusOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <div style={{ marginLeft: '1rem' }}>
              <label>Tracking:</label>
              <input type="text" value={trackingInput} onChange={(e) => setTrackingInput(e.target.value)} style={{ marginLeft: 8 }} />
              <button className="btn" onClick={() => handleTrackingSave(selectedOrder.id as string)} style={{ marginLeft: 8 }}>Salvar</button>
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <button className="btn" onClick={closeDetails}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      <div>
        <Pagination
          pageIndex={pageIndex}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={pageIndex > 0}
          hasNext={!!lastCreatedAt}
          label="Página"
        />
      </div>
    </div>
  );
};

export default AdminOrders;
