'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Tag, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { confirm } = Modal;

export default function ListaEstandes() {
    const [estandes, setEstandes] = useState([]);

    const loadEstandes = () => {
        try {
            const storedEstandes = JSON.parse(localStorage.getItem('estandes')) || [];
            setEstandes(storedEstandes);
        } catch (error) {
            message.error('Falha ao carregar estandes.');
            setEstandes([]);
        }
    };

    useEffect(() => {
        loadEstandes();
        const handleStorageChange = (e) => {
            if (e.key === 'estandes') {
                loadEstandes();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleDelete = (id) => {
        if (!id) {
            message.error('Não foi possível excluir. ID do estande não encontrado.');
            return;
        }

        confirm({
            title: 'Tem certeza que deseja excluir este estande?',
            icon: <ExclamationCircleOutlined />,
            content: 'Essa ação não pode ser desfeita.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                try {
                    const currentEstandes = JSON.parse(localStorage.getItem('estandes')) || [];
                    const updatedEstandes = currentEstandes.filter(estande => estande.id !== id);
                    localStorage.setItem('estandes', JSON.stringify(updatedEstandes));
                    setEstandes(updatedEstandes);
                    message.success('Estande excluído com sucesso!');
                } catch (error) {
                    message.error('Ocorreu um erro ao excluir o estande.');
                }
            },
            onCancel() {},
        });
    };

    const columns = [
        {
            title: 'ID do Estande',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Localização',
            dataIndex: 'localizacao',
            key: 'localizacao',
        },
        {
            title: 'Horários',
            key: 'projeto_horario',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    {record.projeto_horario && record.projeto_horario.length > 0 ? (
                        record.projeto_horario.map((ph, index) => (
                            <Tag key={`${record.id}-${index}`} bordered={false} color="default">
                                {ph.horario} - {ph.projeto_id}
                            </Tag>
                        ))
                    ) : (
                        <Tag bordered={false} color="default">Nenhum horário associado</Tag>
                    )}
                </Space>
            ),
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/estandes/${record.id}`} passHref>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Excluir
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h1>Lista de Estandes</h1>
            <Link href="/estandes/new" passHref>
                <Button type="primary" style={{ marginBottom: 16 }}>
                    Novo Estande
                </Button>
            </Link>
            <Table columns={columns} dataSource={estandes} rowKey="id" />
        </div>
    );
}