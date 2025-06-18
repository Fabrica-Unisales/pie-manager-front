'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Button, Popconfirm, message, Tag } from 'antd';
import { MocksAvaliacaoEstandes } from '@/mocks/MocksAvaliacaoEstandes';

export default function AvaliacoesPage() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('avaliacoes');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      const initialData = MocksAvaliacaoEstandes.getAvaliacoes();
      setData(initialData);
      localStorage.setItem('avaliacoes', JSON.stringify(initialData));
    }
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    localStorage.setItem('avaliacoes', JSON.stringify(newData));
    message.success('Avaliação excluída!');
  };

  const getNotaColor = (nota) => {
    if (nota >= 9) return 'green';
    if (nota >= 8) return 'blue';
    if (nota >= 6) return 'orange';
    return 'red';
  };

  const columns = [
    { 
      title: "ID", 
      dataIndex: "id", 
      key: "id",
      width: 80,
      render: (id) => (
        <Tag color="default">
          {id}
        </Tag>
      )
    },
    { title: "Projeto", dataIndex: "nomeProjeto", key: "nomeProjeto" },
    { title: "Avaliador", dataIndex: "nomeAvaliador", key: "nomeAvaliador" },
    { 
      title: "Nota", 
      dataIndex: "notaProjeto", 
      key: "notaProjeto",
      render: (nota) => (
        <Tag color={getNotaColor(nota)}>
          {nota}
        </Tag>
      )
    },
    { title: "Comentário", dataIndex: "comentario", key: "comentario" },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => router.push(`/avaliacaoestandes/${record.id}`)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger>Excluir</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  
  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => router.push('/avaliacaoestandes/new')}
        style={{ marginBottom: 16 }}
      >
        Adicionar Avaliação
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}