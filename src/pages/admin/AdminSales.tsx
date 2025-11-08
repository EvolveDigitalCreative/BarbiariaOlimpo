import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { subscribeToOrdersPage, type Order, getDashboardStats, type DashboardStats } from '../../services/admin';

const AdminSales: FC = () => {
  const [sales, setSales] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeToOrdersPage((items) => {
      setSales(items);
      setLoading(false);
    }, { order: 'desc', limit: 10 });

    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const s = await getDashboardStats();
        setStats(s);
      } catch (err) {
        console.error('Error fetching dashboard stats for sales:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Vendas</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Receita Hoje</div>
          <div style={{ fontWeight: 700, color: 'var(--primary-gold)' }}>{stats ? `€ ${stats.revenue.daily.toFixed(2)}` : '€ 0.00'}</div>
        </div>
      </div>

      {loading ? (
        <div>Carregando vendas recentes...</div>
      ) : (
        <div className="data-table">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Itens</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id}>
                  <td>{s.userId}</td>
                  <td>{s.products.length}</td>
                  <td style={{ color: 'var(--primary-gold)', fontWeight: 600 }}>€ {s.total.toFixed(2)}</td>
                  <td>{s.createdAt ? new Date(s.createdAt.seconds ? s.createdAt.seconds * 1000 : s.createdAt).toLocaleString('pt-PT') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSales;
