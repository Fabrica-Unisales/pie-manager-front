'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';

export default function TurmasPage() {
    const [turmas, setTurmas] = useState([]);
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}').data || [];
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        setTurmas(storedTurmas);
        setCursos(storedCursos);
    }, []);

    const handleDelete = (id) => {
        const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}');
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
        storedTurmas.data = storedTurmas.data.filter(turma => turma.id !== id);
        storedTurmas.length = storedTurmas.data.length;
        storedCursos.data = storedCursos.data.map(curso => ({
            ...curso,
            listaTurmas: curso.listaTurmas.filter(turmaId => turmaId !== id),
        }));
        localStorage.setItem('turmas', JSON.stringify(storedTurmas));
        localStorage.setItem('cursos', JSON.stringify(storedCursos));
        setTurmas(storedTurmas.data);
    };

    const getCursoNome = (cursoId) => {
        const curso = cursos.find(c => c.id === cursoId);
        return curso ? curso.nome : 'Desconhecido';
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Curso',
            key: 'curso',
            render: (_, record) => getCursoNome(record.curso_id),
        },
        {
            title: 'Período',
            dataIndex: 'periodo_id',
            key: 'periodo_id',
        },
        {
            title: 'Ano',
            dataIndex: 'ano',
            key: 'ano',
        },
        {
            title: 'Semestre',
            dataIndex: 'semestre',
            key: 'semestre',
        },
        {
            title: 'Professor',
            key: 'professor',
            render: (_, record) => record.professor?.name || 'Desconhecido',
        },
        {
            title: 'Alunos',
            key: 'alunos',
            render: (_, record) => record.listaAlunos?.length || 0,
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => {
                console.log('Navigating to edit turma with ID:', record.id); // Debug
                if (!record.id) {
                    return <span>ID inválido</span>;
                }
                return (
                    <Space size="middle">
                        <a href={`/turmas/edit/${record.id}`}>Editar</a>
                        <a onClick={() => handleDelete(record.id)} style={{ color: 'red', cursor: 'pointer' }}>
                            Excluir
                        </a>
                    </Space>
                );
            },
        },
    ];

    const handleAddTurma = () => {
        window.location.href = '/turmas/new';
    };

    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Button
                    type="primary"
                    onClick={handleAddTurma}
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
                    Adicionar Turma
                </Button>
            </div>
            <Table columns={columns} dataSource={turmas} rowKey="id" />
        </div>
    );
}