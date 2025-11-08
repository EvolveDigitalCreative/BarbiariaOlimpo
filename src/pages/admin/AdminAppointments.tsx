import { useEffect, useState } from 'react';
import type { FC } from 'react';
import {
  subscribeToAppointmentsPage,
  type Appointment,
  updateAppointment
} from '../../services/appointments';
import Pagination from '../../components/common/Pagination';

const AdminAppointments: FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination / filters
  const [statusFilter, setStatusFilter] = useState<Appointment['status'] | ''>('');
  const [limitPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [cursors, setCursors] = useState<any[]>([]);
  const [lastDate, setLastDate] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    const options: any = { order: 'asc', limit: limitPerPage };
    if (statusFilter) options.status = statusFilter;
    if (cursors[pageIndex]) options.startAfterDate = cursors[pageIndex];

    const unsub = subscribeToAppointmentsPage((items, last) => {
      setAppointments(items);
      setLastDate(last);
      setLoading(false);
    }, options);

    return () => unsub();
  }, [pageIndex, statusFilter, limitPerPage, cursors]);

  const handleMarkCompleted = async (id?: string) => {
    if (!id) return;
    try {
      await updateAppointment(id, { status: 'completed' });
    } catch (err) {
      console.error(err);
      setError('Não foi possível marcar como concluída.');
    }
  };

  const handleCancel = async (id?: string) => {
    if (!id) return;
    try {
      await updateAppointment(id, { status: 'cancelled' });
    } catch (err) {
      console.error(err);
      setError('Não foi possível cancelar a marcação.');
    }
  };

  const goNext = () => {
    if (!lastDate) return;
    setCursors(prev => {
      const next = [...prev];
      next[pageIndex + 1] = lastDate;
      return next;
    });
    setPageIndex(p => p + 1);
  };

  const goPrev = () => {
    if (pageIndex === 0) return;
    setPageIndex(p => p - 1);
  };

  const handleFilterChange = (val: Appointment['status'] | '') => {
    setStatusFilter(val);
    setPageIndex(0);
    setCursors([]);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Marcações</h2>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>Status:</label>
        <select value={statusFilter} onChange={(e) => handleFilterChange(e.target.value as any)}>
          <option value="">Todos</option>
          <option value="scheduled">scheduled</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
          <option value="no-show">no-show</option>
        </select>
        <div style={{ marginLeft: 'auto' }}>Página: {pageIndex + 1}</div>
      </div>

      {loading ? (
        <div>Carregando marcações...</div>
      ) : (
        <div className="data-table">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Barbeiro</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id}>
                  <td>{a.userName || a.userId}</td>
                  <td>{a.serviceName || a.serviceId}</td>
                  <td>{a.barberName || a.barberId}</td>
                  <td>{a.date ? new Date(a.date).toLocaleString('pt-PT') : '-'}</td>
                  <td style={{ textTransform: 'capitalize' }}>{a.status}</td>
                  <td>
                    {a.status !== 'completed' && a.status !== 'cancelled' && (
                      <>
                        <button className="btn" onClick={() => handleMarkCompleted(a.id)}>Concluir</button>
                        <button className="btn" onClick={() => handleCancel(a.id)} style={{ marginLeft: 8 }}>Cancelar</button>
                      </>
                    )}
                    {a.status === 'completed' && (
                      <span>Concluído</span>
                    )}
                    {a.status === 'cancelled' && (
                      <span>Cancelado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <Pagination
          pageIndex={pageIndex}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={pageIndex > 0}
          hasNext={!!lastDate}
          label="Página"
        />
      </div>
    </div>
  );
};

export default AdminAppointments;
