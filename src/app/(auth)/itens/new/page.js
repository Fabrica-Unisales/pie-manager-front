'use client';
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

const exampleItem = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
};

export default function NewItemForm() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // Aqui você pode enviar os dados para a API ou atualizar o estado
        console.log('Form values:', values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={exampleItem}
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
        >
            <Form.Item
                label="Nome"
                name="name"
                rules={[{ required: true, message: 'Por favor, insira o nome do item.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Descrição"
                name="description"
                rules={[{ required: true, message: 'Por favor, insira a descrição.' }]}
            >
                <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
                label="Preço"
                name="price"
                rules={[{ required: true, message: 'Por favor, insira o preço.' }]}
            >
                <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                />
            </Form.Item>
            <Form.Item
                label="Quantidade"
                name="quantity"
                rules={[{ required: true, message: 'Por favor, insira a quantidade.' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Salvar
                </Button>
            </Form.Item>
            <Button
                style={{ marginTop: 8 }}
                block
                onClick={() => window.location.href = '/itens'}
            >
                Cancelar
            </Button>
        </Form>
    );
}