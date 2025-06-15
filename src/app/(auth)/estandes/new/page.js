'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Space, Card, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const NewEstandePage = () => {
    const [form] = Form.useForm();
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        const projetosData = JSON.parse(localStorage.getItem('projetos')) || [];
        setProjetos(projetosData);
    }, []);

    const generateNextId = () => {
        const estandes = JSON.parse(localStorage.getItem('estandes')) || [];
        if (estandes.length === 0) return "EST-1";
        
        const lastId = estandes[estandes.length - 1].id;
        const number = parseInt(lastId.split('-')[1]) + 1;
        return `EST-${number}`;
    };

    const onFinish = (values) => {
        try {
            const estandes = JSON.parse(localStorage.getItem('estandes')) || [];
            
            const newEstande = {
                id: generateNextId(),
                localizacao: values.localizacao,
                horario_projeto: values.horarios?.map((h, index) => ({
                    id: Date.now() + index,
                    horario: h.horario,
                    projeto_id: h.projeto_id
                })) || []
            };

            estandes.push(newEstande);
            localStorage.setItem('estandes', JSON.stringify(estandes));
            
            message.success('Estande criado com sucesso!');
            setTimeout(() => {
                window.location.href = '/estandes';
            }, 1000);
        } catch (error) {
            message.error('Erro ao criar estande');
            console.error('Erro:', error);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', marginTop: 32 }}>
            <Card title="Novo Estande">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Localização"
                        name="localizacao"
                        rules={[{ required: true, message: 'Por favor, insira a localização.' }]}
                    >
                        <Input placeholder="Ex: Quadra Principal, Salesinho, Auditório" />
                    </Form.Item>

                    <Form.List name="horarios">
                        {(fields, { add, remove }) => (
                            <>
                                <div style={{ marginBottom: 16 }}>
                                    <strong>Horários dos Projetos</strong>
                                </div>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card 
                                        key={key} 
                                        size="small" 
                                        style={{ marginBottom: 8 }}
                                        extra={
                                            <MinusCircleOutlined 
                                                onClick={() => remove(name)} 
                                                style={{ color: 'red' }}
                                            />
                                        }
                                    >
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'horario']}
                                                label="Horário"
                                                rules={[{ required: true, message: 'Insira o horário' }]}
                                            >
                                                <Input placeholder="19:00-20:00" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'projeto_id']}
                                                label="Projeto"
                                                rules={[{ required: true, message: 'Selecione um projeto' }]}
                                            >
                                                <Select placeholder="Selecione o projeto">
                                                    {projetos.map(projeto => (
                                                        <Option key={projeto.id} value={projeto.id}>
                                                            {projeto.titulo}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Space>
                                    </Card>
                                ))}
                                <Form.Item>
                                    <Button 
                                        type="dashed" 
                                        onClick={() => add()} 
                                        block 
                                        icon={<PlusOutlined />}
                                    >
                                        Adicionar Horário
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Salvar
                            </Button>
                            <Button onClick={() => window.location.href = '/estandes'}>
                                Cancelar
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default NewEstandePage;