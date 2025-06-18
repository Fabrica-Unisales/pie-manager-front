'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

export default function EditCursoPage() {
    const { cursoId } = useParams();
    const [coordenadores, setCoordenadores] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}').data || [];
        const curso = storedCursos.find(c => c.id === cursoId);
        if (curso) {
            form.setFieldsValue({
                nome: curso.nome,
                coordenadorId: curso.coordenador_id,
            });
        }
        const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];
        setCoordenadores(storedUsuarios.filter(u => u.tipo === 'Coordenador'));
    }, [cursoId, form]);

    const handleSubmit = (values) => {
        const storedCursos = JSON.parse(localStorage.getItem('cursos') || '{}');
        storedCursos.data = storedCursos.data.map(curso =>
            curso.id === cursoId ? { ...curso, nome: values.nome, coordenador_id: values.coordenadorId } : curso
        );
        localStorage.setItem('cursos', JSON.stringify(storedCursos));
        window.location.href = '/cursos';
    };

    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>Editar Curso</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[{ required: true, message: 'Por favor, insira o nome do curso' }]}
                >
                    <Input placeholder="Digite o nome do curso" />
                </Form.Item>
                <Form.Item
                    label="Coordenador"
                    name="coordenadorId"
                    rules={[{ required: true, message: 'Por favor, selecione um coordenador' }]}
                >
                    <Select placeholder="Selecione um coordenador">
                        {coordenadores.map(coordenador => (
                            <Option key={coordenador.id} value={coordenador.id}>
                                {coordenador.nome}
                            </Option>
                        ))}
                    </Select>
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