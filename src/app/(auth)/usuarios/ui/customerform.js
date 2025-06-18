'use client';

import { useState, useEffect } from 'react';

export default function CustomerForm({ onSave, editingCustomer, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    senha_hash: '',
    matricula: '',
    usuario: '',
    tipo: 'Aluno',
  });

  useEffect(() => {
    if (editingCustomer) {
      setFormData(editingCustomer);
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerWithId = {
      ...formData,
      id: formData.id || String(Date.now()), // cria ID se for novo
    };

    onSave(customerWithId);

    setFormData({
      id: '',
      name: '',
      email: '',
      senha_hash: '',
      matricula: '',
      usuario: '',
      tipo: 'Aluno',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">
        {editingCustomer ? 'Editar Usuário' : 'Novo Usuário'}
      </h2>

      <input
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        className="block mb-2 p-2 border w-full"
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="block mb-2 p-2 border w-full"
        required
      />
      <input
        name="senha_hash"
        placeholder="Senha Hash"
        value={formData.senha_hash}
        onChange={handleChange}
        className="block mb-2 p-2 border w-full"
        required
      />
      <input
        name="matricula"
        placeholder="Matrícula"
        value={formData.matricula}
        onChange={handleChange}
        className="block mb-2 p-2 border w-full"
        required
      />
      <input
        name="usuario"
        placeholder="Usuário"
        value={formData.usuario}
        onChange={handleChange}
        className="block mb-2 p-2 border w-full"
        required
      />

      <select
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        className="block mb-4 p-2 border w-full"
      >
        <option value="Aluno">Aluno</option>
        <option value="Professor">Professor</option>
        <option value="Coordenador">Coordenador</option>
        <option value="AvaliadorExterno">AvaliadorExterno</option>
      </select>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {editingCustomer ? 'Salvar Alterações' : 'Cadastrar Usuário'}
      </button>

      {editingCustomer && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="ml-4 text-red-500"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
export function getStoredCustomers() {
  const stored = localStorage.getItem('customers');
  return stored ? JSON.parse(stored) : [];
}