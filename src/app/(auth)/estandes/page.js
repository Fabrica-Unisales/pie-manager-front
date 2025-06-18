'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { columnsEstandes } from '@/statics/tableMocks';

const App = () => {
    const handleAddItem = () => {
        window.location.href = '/estandes/new';
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
        if (estandes.data && estandes.data.length > 0) {
            const formattedData = estandes.data.map(estande => ({
                key: estande.id,
                localizacao: estande.localizacao,
                horario: estande.horario_projeto ? estande.horario_projeto.map(hp => hp.horario).join(', ') : '',
                projeto: estande.horario_projeto ? estande.horario_projeto.map(hp => hp.projeto_id).join(', ') : ''
            }));
            setData(formattedData);
        }
    }, []);

    const handleEdit = (record) => {
        window.location.href = `/estandes/${record.key}`;
    };

    const handleDelete = (record) => {
        const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [], nextId: 1, length: 0 };
        const novosEstandes = {
            ...estandes,
            data: estandes.data.filter(item => item.id !== record.key),
            length: (estandes.length || 1) - 1
    };
    localStorage.setItem('estandes', JSON.stringify(novosEstandes));
    setData((prev) => prev.filter((item) => item.key !== record.key));
};


return (
    <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <Button
                type="primary"
                style={{
                    background: '#1890ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: 16,
                }}
                onClick={handleAddItem}
            >
                Adicionar Estande
            </Button>
        </div>
        <Table columns={columnsEstandes.map(col => col.key === 'acoes' ? { ...col, render: (text, record, index) => (col.render(text, record, index, { onEdit: handleEdit, onDelete: handleDelete })) } : col)} dataSource={data} />
    </div>
);
}

export default App;