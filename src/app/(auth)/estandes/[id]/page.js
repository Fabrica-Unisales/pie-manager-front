'use client';
import React, { useEffect, use } from 'react';
import { Form, Input, Button, Select } from 'antd';

const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function EditEstandeForm({ params }) {
    const { id } = use(params);
    const [form] = Form.useForm();

    useEffect(() => {
        const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
        const estande = estandes.data.find(e => e.id === parseInt(id));
        if (estande) {
            form.setFieldsValue({
                localizacao: estande.localizacao,
                horario: estande.horario_projeto[0]?.horario || '',
            });
        }
    }, [id, form]);

    const onFinish = (values) => {
        const estandes = JSON.parse(localStorage.getItem('estandes')) || { data: [] };
        const estandeIndex = estandes.data.findIndex(e => e.id === parseInt(id));

        if (estandeIndex !== -1) {
            const estandeAtualizado = {
                ...estandes.data[estandeIndex],
                localizacao: values.localizacao,
                horario_projeto: [
                    {
                        id: Date.now(),
                        horario: values.horario,
                        projeto_id: parseInt(id)
                    }
                ]
            };

            const novosEstandes = {
                ...estandes,
                data: [
                    ...estandes.data.slice(0, estandeIndex),
                    estandeAtualizado,
                    ...estandes.data.slice(estandeIndex + 1)
                ]
            };

            localStorage.setItem('estandes', JSON.stringify(novosEstandes));
            window.location.href = '/estandes';
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
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
