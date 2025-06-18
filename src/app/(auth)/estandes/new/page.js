'use client';
import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const exampleEstande = {
    localizacao: '',
    horario: '',
    projeto: ''
};

const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function NewEstandeForm() {
    const [form] = Form.useForm();

    const onFinish = (values) => {

        const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [], nextId: 1, length: 0 };
        const novoEstande = {
            id: estandes.nextId,
            localizacao: values.localizacao,
            horario_projeto: [
                {
                    id: Date.now(),
                    horario: values.horario,
                    projeto_id: estandes.nextId,
                }
            ]
        };
        const novosEstandes = {
            data: [...estandes.data, novoEstande],
            nextId: estandes.nextId + 1,
            length: (estandes.length || 0) + 1
        };
        localStorage.setItem('estandes', JSON.stringify(novosEstandes));
        window.location.href = '/estandes';
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={exampleEstande}
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
        >
            <Form.Item
                label="Localização"
                name="localizacao"
                rules={[{ required: true, message: 'Por favor, insira a localização do estande.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Horário"
                name="horario"
                rules={[{ required: true, message: 'Por favor, selecione o horário.' }]}
            >
                <Select placeholder="Selecione o horário">
                    {horariosDisponiveis.map(horario => (
                        <Select.Option key={horario} value={horario}>
                            {horario}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Salvar
                </Button>
            </Form.Item>
            <Button
                style={{ marginTop: 8 }}
                block
                onClick={() => window.location.href = '/estandes'}
            >
                Cancelar
            </Button>
        </Form>
    );
}