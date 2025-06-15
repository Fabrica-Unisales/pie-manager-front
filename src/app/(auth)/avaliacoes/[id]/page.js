'use client';
import React, { useEffect } from 'react';
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

export default function EditAvaliacaoForm({ params }) {

    const [form] = Form.useForm();
    const { id } = params;

    useEffect(() => {
        if (id) {
            const storedAvals = localStorage.getItem('avaliacoes');

            if (storedAvals) {
                try {
                    const avaliacoes = JSON.parse(storedAvals).data;
                    const avaliacaoToEdit = avaliacoes.find(aval => aval.id === id);

                    if (avaliacaoToEdit) {
                        form.setFieldsValue({
                            ...avaliacaoToEdit,
                            projeto_id: parseInt(avaliacaoToEdit.projeto_id, 10),
                            avaliador_id: parseInt(avaliacaoToEdit.avaliador_id, 10)
                        });
                    } else {
                        message.error('Avaliação não encontrada!');
                        window.location.href = '/avaliacoes';
                    }
                    
                } catch (error) {
                    console.error("Erro ao fazer parse dos dados de avaliações do localStorage para edição:", error);
                    message.error("Erro ao carregar dados da avaliação para edição.");
                }
            }
        }
    }, [id, form]);

    const onFinish = (values) => {

        console.log(`Valores do formulário de edição para Avaliação ${id}:`, values);

        try {
            const storedAvals = localStorage.getItem('avaliacoes') || { data: [] };

            if (storedAvals) {
                let avaliacoesData = JSON.parse(storedAvals);
                const index = avaliacoesData.data.findIndex(aval => aval.id === id);

                if (index !== -1) {
                    avaliacoesData.data[index] = { ...avaliacoesData.data[index], ...values };
                    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoesData));

                    message.success(`Avaliação ${id} atualizada com sucesso!`);
                    window.location.href = '/avaliacoes';
                } else {
                    message.error('Avaliação não encontrada para atualização!');
                }
            }
        } catch (error) {
            console.error("Erro ao atualizar avaliação no localStorage:", error);
            message.error("Erro ao atualizar avaliação.");
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