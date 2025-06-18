'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import Link from 'next/link';

export default function CursosPage() {
    const [cursos, setCursos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];
        setCursos(storedCursos);
        setUsuarios(storedUsuarios);
    }, []);

    const handleDelete = (id) => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
        storedCursos.data = storedCursos.data.filter(curso => curso.id !== id);
        storedCursos.length = storedCursos.data.length;
        localStorage.setItem('cursos', JSON.stringify(storedCursos));
        setCursos(storedCursos.data);
    };

    const getCoordenadorNome = (coordenadorId) => {
        const coordenador = usuarios.find(u => u.id === coordenadorId);
        return coordenador ? coordenador.nome : 'Desconhecido';
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Coordenador',
            key: 'coordenador',
            render: (_, record) => getCoordenadorNome(record.coordenador_id),
        },
        {
            title: 'Turmas',
            key: 'turmas',
            render: (_, record) => record.listaTurmas.length,
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/cursos/edit/${record.id}`}>Editar</a>
                    <a onClick={() => handleDelete(record.id)} style={{ color: 'red', cursor: 'pointer' }}>
                        Excluir
                    </a>
                </Space>
            ),
        },
    ];

    const handleAddCurso = () => {
        window.location.href = '/cursos/new';
    };

    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Button
                    type="primary"
                    onClick={handleAddCurso}
                    style={{
                        background: '#1890ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: 16,
                    }}
                >
                    Adicionar Curso
                </Button>
            </div>
            <Table columns={columns} dataSource={cursos} rowKey="id" />
        </div>
    );
}