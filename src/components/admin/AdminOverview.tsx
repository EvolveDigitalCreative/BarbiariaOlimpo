import React, { useEffect, useState } from 'react';
// 🛠️ Importa a nova função e o tipo de Marcação
import {
  getDashboardStats,
  type DashboardStats,
  listOrders,
  type Order,
  listAppointments,
  type Appointment
} from '../../services/admin';
import '../../styles/admin/AdminOverview.css';

// Usamos o tipo Appointment importado para as marcações
type Booking = Appointment;

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obter o início do dia de hoje para os filtros
        const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

        // 🛠️ Chamada de todas as promessas em paralelo
        const [dashboardStats, orders, bookings] = await Promise.all([
          getDashboardStats(),
          // Buscar as 5 últimas vendas de hoje
          listOrders({
            startDate: startOfToday,
            endDate: new Date()
          }),
          // Buscar as 5 próximas marcações a partir de hoje
          listAppointments({
            limit: 5,
            startDate: startOfToday,
          })
        ]);

        setStats(dashboardStats);
        // Ordenar e limitar as ordens (caso listOrders não o faça)
        setRecentOrders(orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5));
        setUpcomingBookings(bookings);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... (Seu array statsData permanece o mesmo) ...
  const statsData = [
    {
      title: 'Vendas Hoje',
      value: stats ? `€ ${stats.revenue.daily.toFixed(2)}` : '€ 0.00',
      change: '+0%', // TODO: Calculate actual change
      isPositive: true,
      icon: 'fas fa-euro-sign',
      color: 'gold'
    },
    {
      title: 'Total Usuários',
      value: stats?.totalUsers.toString() || '0',
      change: `${stats?.activeUsers || 0} ativos`,
      isPositive: true,
      icon: 'fas fa-users',
      color: 'blue'
    },
    {
      title: 'Total Pedidos',
      value: stats?.totalOrders.toString() || '0',
      change: '+0%', // TODO: Calculate actual change
      isPositive: true,
      icon: 'fas fa-shopping-cart',
      color: 'green'
    },
    {
      title: 'Receita Mensal',
      value: stats ? `€ ${stats.revenue.monthly.toFixed(2)}` : '€ 0.00',
      change: `+${((stats?.revenue.weekly || 0) / (stats?.revenue.monthly || 1) * 100).toFixed(1)}% na semana`,
      isPositive: true,
      icon: 'fas fa-chart-line',
      color: 'gold'
    }
  ];

  // Mapear vendas
  const recentSales = recentOrders.map(order => ({
    id: order.id,
    cliente: 'Cliente ' + order.userId.slice(0, 8),
    valor: `€ ${order.total.toFixed(2)}`,
    produtos: order.products.length,
    data: new Date(order.createdAt.seconds * 1000).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
    status: order.status
  }));


  // 🛠️ Mapear as marcações para o formato da tabela
  const mappedBookings = upcomingBookings.map(booking => ({
    id: booking.id,
    clientName: booking.userName,
    service: booking.serviceName,
    barber: booking.barberName,
    // Formatar o timestamp para hora
    time: new Date(booking.dateTime).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
    status: booking.status
  }));


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando dados do painel...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="content-header">
        <h1>Visão Geral</h1>
        <div>
          <span style={{ color: 'var(--text-gray)' }}>Hoje, </span>
          <span>{new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            {/* ... (Conteúdo do cartão de estatísticas) ... */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="stat-label">{stat.title}</div>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                  <i className={`fas ${stat.isPositive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                  {stat.change} em relação ao dia anterior
                </div>
              </div>
              <div style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-gold)',
                fontSize: '1.2rem'
              }}>
                <i className={stat.icon}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

        {/* Últimas Vendas */}
        <div className="stat-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-gold)' }}>
            <i className="fas fa-history" style={{ marginRight: '0.5rem' }}></i>
            Últimas Vendas
          </h3>
          <div className="data-table">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Produtos</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.length > 0 ? (
                  recentSales.map(sale => (
                    <tr key={sale.id}>
                      <td>{sale.cliente}</td>
                      <td>{sale.produtos}</td>
                      <td style={{ color: 'var(--primary-gold)', fontWeight: '500' }}>{sale.valor}</td>
                      <td><span className={`status-badge ${sale.status}`}>{sale.status}</span></td>
                      <td>{sale.data}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-gray)' }}>
                      Nenhuma venda recente.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button className="btn btn-secondary">
              <i className="fas fa-list"></i> Ver Todas as Vendas
            </button>
          </div>
        </div>

        {/* Próximas Marcações */}
        <div className="stat-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-gold)' }}>
            <i className="fas fa-clock" style={{ marginRight: '0.5rem' }}></i>
            Próximas Marcações
          </h3>
          <div className="data-table">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Barbeiro</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody>
                {mappedBookings.length > 0 ? (
                  mappedBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.clientName}</td>
                      <td>{booking.service}</td>
                      <td>{booking.barber}</td>
                      <td style={{ fontWeight: '500' }}>{booking.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-gray)' }}>
                      Nenhuma marcação próxima.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button className="btn btn-secondary">
              <i className="fas fa-calendar-alt"></i> Ver Calendário Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;