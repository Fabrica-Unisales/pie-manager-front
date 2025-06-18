'use client';

import { useState, useEffect } from 'react';
import { Form, Select, Input, Checkbox, Button, message } from 'antd';

const { Option } = Select;

export default function NewTurmaPage() {
    const [cursos, setCursos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];
        setCursos(storedCursos);
        setProfessores(storedUsuarios.filter(u => u.tipo === 'Professor'));
        setAlunos(storedUsuarios.filter(u => u.tipo === 'Aluno'));
    }, []);

    const handleSubmit = async (values) => {
        try {
            const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}');
            const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
            const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];

            const professor = storedUsuarios.find(u => u.id === values.professorId) || {
                id: values.professorId,
                nome: 'Desconhecido',
            };
            const selectedAlunosData = storedUsuarios.filter(u => values.alunos?.includes(u.id) || []);

            const newTurmaId = String(storedTurmas.nextId || 1);
            const newTurma = {
                id: newTurmaId,
                curso_id: values.cursoId,
                periodo_id: values.periodoId,
                ano: parseInt(values.ano),
                semestre: parseInt(values.semestre),
                professor,
                listaAlunos: selectedAlunosData,
            };

            storedTurmas.data = storedTurmas.data || [];
            storedTurmas.data.push(newTurma);
            storedTurmas.nextId = (storedTurmas.nextId || 1) + 1;
            storedTurmas.length = storedTurmas.data.length;

            const curso = storedCursos.data.find(c => c.id === values.cursoId);
            if (curso) curso.listaTurmas.push(newTurmaId);

            
            localStorage.setItem('turmas', JSON.stringify(storedTurmas));
            localStorage.setItem('cursos', JSON.stringify(storedCursos));

            message.success('Turma criada com sucesso');
            
            setTimeout(() => {
                window.location.href = `/turmas/edit/${newTurmaId}`;
            }, 100);
        } catch (error) {
            message.error('Erro ao criar turma');
            console.error('Error creating turma:', error);
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>Adicionar Nova Turma</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Curso"
                    name="cursoId"
                    rules={[{ required: true, message: 'Por favor, selecione um curso' }]}
                >
                    <Select placeholder="Selecione um curso">
                        {cursos.map(curso => (
                            <Option key={curso.id} value={curso.id}>
                                {curso.nome}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Período ID"
                    name="periodoId"
                    rules={[{ required: true, message: 'Por favor, insira o período ID' }]}
                >
                    <Input placeholder="Digite o período ID" />
                </Form.Item>
                <Form.Item
                    label="Ano"
                    name="ano"
                    rules={[{ required: true, message: 'Por favor, insira o ano' }]}
                >
                    <Input type="number" placeholder="Digite o ano" />
                </Form.Item>
                <Form.Item
                    label="Semestre"
                    name="semestre"
                    rules={[{ required: true, message: 'Por favor, insira o semestre' }]}
                >
                    <Input type="number" placeholder="Digite o semestre" />
                </Form.Item>
                <Form.Item
                    label="Professor"
                    name="professorId"
                    rules={[{ required: true, message: 'Por favor, selecione um professor' }]}
                >
                    <Select placeholder="Selecione um professor">
                        {professores.map(professor => (
                            <Option key={professor.id} value={professor.id}>
                                {professor.nome}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Alunos" name="alunos">
                    <Checkbox.Group>
                        {alunos.map(aluno => (
                            <Checkbox key={aluno.id} value={aluno.id} style={{ display: 'block', marginBottom: 8 }}>
                                {aluno.nome}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            background: '#1890ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            padding: '8px 16px',
                            fontSize: 16,
                        }}
                    >
                        Salvar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}