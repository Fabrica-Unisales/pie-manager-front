'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';
import { columns as baseColumns } from '@/statics/registerTableMocks';

export default function UsuariosPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || { data: [] };
        setData(users.data || []);
    }, []);

    const handleDelete = (id) => {
        const users = JSON.parse(localStorage.getItem('users')) || { data: [] };
        const updated = users.data.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify({ data: updated }));
        setData(updated);
    };

    const columns = [
        ...baseColumns.filter(col => col.key !== 'action'),
        {
            title: 'Ação',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => window.location.href = `/register/${record.id}`}>Editar</a>
                    <a onClick={() => handleDelete(record.id)} style={{ color: 'red' }}>Excluir</a>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Button
                    type="primary"
                    onClick={() => window.location.href = '/register/new'}
                >
                    Adicionar Usuário
                </Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </div>
    );
}