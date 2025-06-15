'use client';
import React from 'react';
import { Form, Input, InputNumber, Button, message, Select } from 'antd';

const exampleAvaliacao = {
    projeto_id: '',
    avaliador_id: '',
    nota: null,
    comentario: '',
};

const projetos = [
    { label: 'Projeto 1', value: 1},
    { label: 'Projeto 2', value: 2},
    { label: 'Projeto 3', value: 3},
    { label: 'Projeto 4', value: 4},
    { label: 'Projeto 5', value: 5}
];

const avaliadores = [
    { label: 'Avaliador 1', value: 1},
    { label: 'Avaliador 2', value: 2},
    { label: 'Avaliador 3', value: 3},
    { label: 'Avaliador 4', value: 4},
    { label: 'Avaliador 5', value: 5}
];

export default function NewAvaliacaoForm() {

    const [form] = Form.useForm();

    const onFinish = (values) => {

        console.log('Valores do formulário de nova avaliação:', values);

        try {

            const storedAvals = localStorage.getItem('avaliacoes');
            let avaliacoesData = {
                data: [],
                nextId: 1,
                length: 0
            };

            if (storedAvals)
                avaliacoesData = JSON.parse(storedAvals);

            const newId = String(avaliacoesData.nextId);
            const newAvaliacao = { id: newId, ...values };

            avaliacoesData.data.push(newAvaliacao);
            avaliacoesData.nextId++;
            avaliacoesData.length++;

            localStorage.setItem('avaliacoes', JSON.stringify(avaliacoesData));

            message.success('Avaliação criada com sucesso!');
            form.resetFields();
            window.location.href = '/avaliacoes';

        } catch (error) {

            console.error("Erro ao salvar nova avaliação no localStorage:", error);
            message.error("Erro ao criar avaliação.");
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={exampleAvaliacao}
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
        >
            <Form.Item
                label="Projeto"
                name="projeto_id"
                rules={[{ required: true, message: 'Por favor, escolha um projeto' }]}
            >
                <Select options={projetos} placeholder="Ex. Matemágicas" />
            </Form.Item>

            <Form.Item
                label="Avaliador"
                name="avaliador_id"
                rules={[{ required: true, message: 'Por favor, escolha um avaliador.' }]}
            >
                <Select options={avaliadores} placeholder="Ex. James Alves" />
            </Form.Item>

            <Form.Item
                label="Nota"
                name="nota"
                rules={[{ required: true, message: 'Por favor, insira a nota.', type: 'number' }]}
            >
                <InputNumber
                    min={0}
                    max={10}
                    step={0.5}
                    style={{ width: '100%' }}
                    formatter={value => `${value}`}
                    parser={value => value.replace(/[^0-9.]/g, '')}
                    placeholder="Ex: 8.5"
                />
            </Form.Item>

            <Form.Item
                label="Comentário"
                name="comentario"
                rules={[{ required: true, message: 'Por favor, insira o comentário.' }]}
            >
                <Input.TextArea rows={3} placeholder="Comentário sobre a avaliação..." />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Criar Avaliação
                </Button>
            </Form.Item>

            <Button
                style={{ marginTop: 8 }}
                block
                onClick={() => window.location.href = '/avaliacoes'}
            >
                Cancelar
            </Button>
        </Form>
    );
}