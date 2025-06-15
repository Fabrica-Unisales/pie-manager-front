import React from 'react';
import { Space, Tag, Button, Typography } from 'antd';
import Link from 'next/link';

const { Text } = Typography;

export const getEstandeTableColumns = (handleDelete, projetos) => {
    const buscarNomeProjeto = (projetoId) => {
        if (!projetos || projetos.length === 0) return `ID: ${projetoId}`;
        const projetoEncontrado = projetos.find(p => p.id === projetoId);
        return projetoEncontrado ? projetoEncontrado.titulo : `Projeto não encontrado (ID: ${projetoId})`;
    };

    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Localização',
            dataIndex: 'localizacao',
            key: 'localizacao',
            width: 200,
        },
        {
            title: 'Projetos Vinculados e Horários',
            dataIndex: 'horario_projeto',
            key: 'horario_projeto',
            render: (horarioProjetoArray) => {
                if (!horarioProjetoArray || horarioProjetoArray.length === 0) {
                    return <Text type="secondary">Nenhum projeto vinculado</Text>;
                }
                return (
                    <div>
                        {horarioProjetoArray.map((hp, index) => (
                            <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                                {hp.horario} - {buscarNomeProjeto(hp.projeto_id)}
                            </Tag>
                        ))}
                    </div>
                );
            },
        },
        {
            title: 'Ações',
            key: 'action',
            width: 180,
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/estandes/${record.id}`}> {}
                        <Button type="primary">Editar</Button>
                    </Link>
                    <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                        Excluir
                    </Button>
                </Space>
            ),
        },
    ];
};