'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Space, message, Card, TimePicker, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function NovoEstandePage() {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = (values) => {
        const existingEstandes = JSON.parse(localStorage.getItem('estandes')) || [];

        const projetosHorariosFormatados = values.projeto_horario?.map((item, index) => ({
            id: index,
            horario: item.horario ? item.horario.format('HH:mm') : '',
            projeto_id: item.projeto_id,
        })) || [];

        const novoEstande = {
            id: uuidv4(),
            localizacao: values.localizacao,
            projeto_horario: projetosHorariosFormatados,
        };

        localStorage.setItem('estandes', JSON.stringify([...existingEstandes, novoEstande]));

        message.success('Estande cadastrado com sucesso!');
        form.resetFields();
        router.push('/estandes');
    };

    const handleCancel = () => {
        router.push('/estandes');
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Cadastrar Novo Estande</h1>
            <Form
                form={form}
                name="novoEstande"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ projeto_horario: [{}] }}
            >
                <Form.Item
                    label="Localização do Estande"
                    name="localizacao"
                    rules={[{ required: true, message: 'Por favor, insira a localização do estande!' }]}
                >
                    <Input placeholder="Ex: Bloco A, Sala 101" />
                </Form.Item>

                <Form.List name="projeto_horario">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card
                                    size="small"
                                    title={`Horário de Apresentação ${key + 1}`}
                                    key={key}
                                    style={{ marginBottom: 16 }}
                                    extra={
                                        fields.length > 1 ? (
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        ) : null
                                    }
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'projeto_id']}
                                        label="ID do Projeto"
                                        rules={[{ required: true, message: 'Por favor, insira o ID do projeto!' }]}
                                    >
                                        <Input placeholder="Ex: proj-123" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'horario']}
                                        label="Horário"
                                        rules={[{ required: true, message: 'Por favor, selecione o horário!' }]}
                                    >
                                        <TimePicker format="HH:mm" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Card>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Adicionar Horário de Apresentação
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Cadastrar Estande
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}