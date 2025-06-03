'use client';
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

export default function EditProjetoForm({ params }) {
    // console.log('params', params.id);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // Aqui você pode enviar os dados para a API ou atualizar o estado
        console.log('Form values:', values);
    };
    const exampleItem = {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
    };
    return (
        <form.Projeto
            form={form}
            layout="vertical"
            initialValues={exampleItem}
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
        >
            <Form.Projeto
                label="Nome"
                name="name"
                rules={[{ required: true, message: 'Por favor, insira o nome do projeto.' }]}
            >
                <Input />
            </Form.Projeto>
            <Form.Projeto
                label="Descrição"
                name="description"
                rules={[{ required: true, message: 'Por favor, insira a descrição.' }]}
            >
                <Input.TextArea rows={3} />
            </Form.Projeto>
            <Form.Projeto
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
            </Form.Projeto>
            <Form.Projeto
                label="Quantidade"
                name="quantity"
                rules={[{ required: true, message: 'Por favor, insira a quantidade.' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Projeto>
            <Form.Projeto>
                <Button type="primary" htmlType="submit" block>
                    Salvar
                </Button>
            </Form.Projeto>
            <Button
                style={{ marginTop: 8 }}
                block
                onClick={() => window.location.href = '/projetos'}
            >
                Cancelar
            </Button>
        </form.Projeto>
    );
}
