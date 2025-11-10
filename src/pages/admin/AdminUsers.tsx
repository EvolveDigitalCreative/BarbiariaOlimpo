import React from 'react';

const AdminUsers: React.FC = () => {
  const users = [
    { id: 1, nome: 'Miguel', role: 'barber' },
    { id: 2, nome: 'Ricardo', role: 'barber' },
    { id: 3, nome: 'Admin', role: 'admin' },
  ];

  return (
    <div>
      <h2>Colaboradores</h2>
      <div className="data-table">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
