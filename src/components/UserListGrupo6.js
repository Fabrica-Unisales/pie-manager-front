import React, { useEffect, useState } from 'react';
import { fetchUsersGrupo6, removeUserGrupo6 } from '@/app/users/services/UserServiceGrupo6';

const UserListGrupo6 = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await fetchUsersGrupo6();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    await removeUserGrupo6(id);
    loadUsers();
  };

  return (
    <div>
      <h2>Lista de Usuários - Grupo 6</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.nome}</strong> - {user.email} - {user.tipo}
            <button onClick={() => onEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListGrupo6;
