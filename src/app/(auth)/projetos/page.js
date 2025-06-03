'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Título',
        dataIndex: 'titulo',
        key: 'titulo',
    },
    {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
    },
    {
        title: 'Turma',
        dataIndex: 'id_turma',
        key: 'id_turma',
    },
    {
        title: 'Professor',
        dataIndex: 'id_professor',
        key: 'id_professor',
    },
    {
        title: 'Alunos',
        dataIndex: 'lista_alunos',
        key: 'lista_alunos',
        render: (alunos) => alunos.join(', '),
    },
];

const Projetos = () => {
    const handleAddProjeto = () => {
        window.location.href = '/projetos/new';
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
        if (projetos.data.length > 0) {
            setData(projetos.data);
        }
    }, []);

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
                    onClick={handleAddProjeto}
                >
                    Adicionar Projeto
                </Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </div>
    );
};

export default Projetos;
