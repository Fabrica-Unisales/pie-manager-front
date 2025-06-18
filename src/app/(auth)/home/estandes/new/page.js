'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Space, message, Card, TimePicker, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
import dayjs from 'dayjs'; // Para trabalhar com horários

export default function NovoEstandePage() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // Obtenha os estandes existentes do localStorage
        const existingEstandes = JSON.parse(localStorage.getItem('estandes')) || [];

        // Mapear os horários para o formato necessário
        const projetosHorariosFormatados = values.projeto_horario?.map((item, index) => ({
            id: index, // Ou gere um ID único aqui também, se necessário
            horario: item.horario ? item.horario.format('HH:mm') : '', // Formata o dayjs para string
            projeto_id: item.projeto_id,
        })) || [];

        const novoEstande = {
            id: uuidv4(), // Gera um ID único para o estande
            localizacao: values.localizacao,
            projeto_horario: projetosHorariosFormatados,
        };

        // Adicione o novo estande e salve no localStorage
        localStorage.setItem('estandes', JSON.stringify([...existingEstandes, novoEstande]));

        message.success('Estande cadastrado com sucesso!');
        form.resetFields(); // Limpa o formulário
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Cadastrar Novo Estande</h1>
            <Form
                form={form}
                name="novoEstande"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ projeto_horario: [{}] }} // Garante que há pelo menos um campo para projeto/horário
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
                    <Button type="primary" htmlType="submit">
                        Cadastrar Estande
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}