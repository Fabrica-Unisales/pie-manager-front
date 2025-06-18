'use client';

import { useEffect, useState } from 'react';
import CustomerTable from '@/app/(auth)/usuarios/ui/customer-table';
import CustomerForm from '@/app/(auth)/usuarios/ui/customerform';
import Modal from '@/app/(auth)/usuarios/ui/Modal';
import { getStoredCustomers, saveCustomersToStorage } from '@/app/(auth)/usuarios/lib/localStorageUtils';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredCustomers();
    const mapped = stored.map((c) => ({
      ...c,
      name: c.name ?? c.nome,
    }));
    setCustomers(mapped);
  }, []);

  const handleSave = (newCustomer) => {
    const exists = customers.find((c) => c.id === newCustomer.id);

    let updatedList;
    if (exists) {
      updatedList = customers.map((c) =>
        c.id === newCustomer.id ? newCustomer : c
      );
    } else {
      updatedList = [...customers, newCustomer];
    }

    setCustomers(updatedList);
    saveCustomersToStorage(updatedList);
    setEditing(null);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    const updated = customers.filter((user) => user.id !== id);
    setCustomers(updated);
    saveCustomersToStorage(updated);
  };

  const handleEdit = (customer) => {
    setEditing(customer);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Novo Usuário
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CustomerForm
          onSave={handleSave}
          editingCustomer={editing}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <CustomerTable
        customers={customers}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}