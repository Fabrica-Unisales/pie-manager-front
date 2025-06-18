'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Form, Select, Input, Checkbox, Button, message, Spin } from 'antd';

const { Option } = Select;

export default function EditTurmaPage() {
    const { turmasId } = useParams();
    const [cursos, setCursos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        console.log('URL:', window.location.href);

        if (!turmasId) {
            message.error('ID da turma não fornecido');
            setLoading(false);
            return;
        }

        try {
            const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}').data || [];
            const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
            const storedUsers = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];

            console.log('turmasId:', turmasId);
            console.log('Stored turmas:', storedTurmas);
            console.log('Stored usuarios:', storedUsers);

            const turma = storedTurmas.find(t => t.id === String(turmasId));

            if (turma) {
                console.log('Turma found:', turma);

                const professoresList = storedUsers.filter(u => u.tipo === 'Professor').map(u => ({
                    id: u.id,
                    nome: u.nome,
                }));

                const alunosList = storedUsers.filter(u => u.tipo === 'Aluno').map(u => ({
                    id: u.id,
                    nome: u.nome,
                }));

                const validProfessor = professoresList.find(p => p.id === turma.professor?.id);
                const validAlunos = turma.listaAlunos?.filter(a => alunosList.some(al => al.id === a.id)) || [];

                setProfessores(professoresList);
                setAlunos(alunosList);

                console.log('Professores:', professoresList);
                console.log('Alunos:', alunosList);

                form.setFieldsValue({
                    cursoId: turma.curso_id,
                    periodoId: turma.periodo_id,
                    ano: String(turma.ano),
                    semestre: String(turma.semestre),
                    professorId: validProfessor ? turma.professor.id : '',
                    alunos: validAlunos.map(aluno => aluno.id),
                });
                console.log('Form values set:', form.getFieldsValue());
            } else {
                message.error('Turma não encontrada');
                console.error('Turma not found for ID:', turmasId);
            }

            setCursos(storedCursos);
            setLoading(false);
        } catch (error) {
            message.error('Erro ao carregar dados');
            console.error('Error loading data:', error);
            setLoading(false);
        }
    }, [turmasId, form]);

    const handleSubmit = async (values) => {
        try {
            const storedTurmas = JSON.parse(localStorage.getItem('turmas') || '{}');
            const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
            const storedUsers = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];

            const professor = storedUsers.find(u => u.id === values.professorId && u.tipo === 'Professor') || {
                id: values.professorId,
                nome: 'Desconhecido',
            };
            const selectedAlunosData = values.alunos?.length > 0 
                ? storedUsers.filter(u => values.alunos.includes(u.id) && u.tipo === 'Aluno').map(u => ({
                    id: u.id,
                    name: u.nome,
                }))
                : [];

            const updatedTurma = {
                id: turmasId,
                curso_id: values.cursoId,
                periodo_id: values.periodoId,
                ano: parseInt(values.ano),
                semestre: parseInt(values.semestre),
                professor: { id: professor.id, name: professor.nome },
                listaAlunos: selectedAlunosData,
            };

            const oldTurma = storedTurmas.data.find(t => t.id === turmasId);
            storedTurmas.data = storedTurmas.data.map(t => (t.id === turmasId ? updatedTurma : t));

            if (oldTurma && oldTurma.curso_id !== values.cursoId) {
                storedCursos.data = storedCursos.data.map(curso => ({
                    ...curso,
                    listaTurmas:
                        curso.id === oldTurma.curso_id
                            ? curso.listaTurmas.filter(id => id !== turmasId)
                            : curso.id === values.cursoId
                            ? [...curso.listaTurmas, turmasId]
                            : curso.listaTurmas,
                }));
                localStorage.setItem('cursos', JSON.stringify(storedCursos));
            }

            localStorage.setItem('turmas', JSON.stringify(storedTurmas));
            message.success('Turma atualizada com sucesso');
            window.location.href = '/turmas';
        } catch (error) {
            message.error('Erro ao atualizar turma');
            console.error('Error updating turma:', error);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: 24, textAlign: 'center' }}>
                <Spin />
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>Editar Turma</h2>
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
                    rules={[{ required: true, message: 'Por favor, selecione o semestre' }]}
                >
                    <Select placeholder="Selecione o semestre">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Professor"
                    name="professorId"
                    rules={[{ required: true, message: 'Por favor, selecione um professor' }]}
                >
                    <Select
                        placeholder="Selecione um professor"
                        showSearch
                        optionFilterProp="children"
                    >
                        {professores.map(professor => (
                            <Option key={professor.id} value={professor.id}>
                                {professor.nome}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Alunos"
                    name="alunos"
                >
                    <Checkbox.Group
                        options={alunos.map(aluno => ({
                            label: aluno.nome,
                            value: aluno.id,
                        }))}
                    />
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