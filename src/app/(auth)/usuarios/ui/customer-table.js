// app/ui/dashboard/customers/customer-table.jsx

export default function CustomerTable({ customers, onDelete, onEdit }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Usuário</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.id} className="border-t">
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.usuario}</td>
            <td>{c.tipo}</td>
            <td>
              <button onClick={() => onEdit(c)} className="text-blue-500 mr-2">
                Editar
              </button>
              <button onClick={() => onDelete(c.id)} className="text-red-500">
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
