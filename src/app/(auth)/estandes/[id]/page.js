'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Typography, Spin, Card, Space, AutoComplete } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { PlusOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditEstandePage = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [estande, setEstande] = useState(null);
    const [horariosProjetos, setHorariosProjetos] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [projetoOptions, setProjetoOptions] = useState([]);

    useEffect(() => {
        const projetosData = JSON.parse(localStorage.getItem('projetos')) || [];
        const estandesData = JSON.parse(localStorage.getItem('estandes')) || [];
        
        setProjetos(projetosData);
        setProjetoOptions(projetosData.map(p => ({ value: p.titulo, label: p.titulo })));
        
        const estandeAtual = estandesData.find(e => e.id === id);
        if (estandeAtual) {
            setEstande(estandeAtual);
            form.setFieldsValue({
                localizacao: estandeAtual.localizacao,
                horarios: estandeAtual.horario_projeto?.map(hp => {
                    const projeto = projetosData.find(p => p.id === hp.projeto_id);
                    return {
                        horario: hp.horario,
                        projeto_id: projeto?.titulo || hp.projeto_id
                    };
                }) || []
            });
        }
        setLoading(false);
    }, [id, form]);

    const onFinish = (values) => {
        try {
            const estandes = JSON.parse(localStorage.getItem('estandes')) || [];
            const index = estandes.findIndex(e => e.id === id);
            
            if (index !== -1) {
                estandes[index] = {
                    ...estandes[index],
                    localizacao: values.localizacao,
                    horario_projeto: values.horarios?.map((h, idx) => {
                        const projeto = projetos.find(p => p.titulo === h.projeto_id);
                        return {
                            id: estandes[index].horario_projeto[idx]?.id || Date.now() + idx,
                            horario: h.horario,
                            projeto_id: projeto?.id || h.projeto_id
                        };
                    }) || []
                };
                
                localStorage.setItem('estandes', JSON.stringify(estandes));
                message.success('Estande atualizado com sucesso!');
                setTimeout(() => {
                    window.location.href = '/estandes';
                }, 1000);
            }
        } catch (error) {
            message.error('Erro ao atualizar estande');
            console.error('Erro:', error);
        }
    };

    const searchProjetoByName = (searchText) => {
        const filtered = projetos
            .filter(projeto => 
                projeto.titulo.toLowerCase().includes(searchText.toLowerCase())
            )
            .map(p => ({ value: p.id, label: p.titulo }));
        setProjetoOptions(filtered);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spin tip="Carregando..." size="large">
                    <div />
                </Spin>
            </div>
        );
    }

    if (!estande) {
        return <p>Estande não encontrado.</p>;
    }

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', marginTop: 32 }}>
            <Card title={`Editar Estande - ${estande.id}`}>
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
                                                label="Projeto (busque pelo nome)"
                                                rules={[{ required: true, message: 'Selecione um projeto' }]}
                                            >
                                                <AutoComplete
                                                    options={projetoOptions}
                                                    onSearch={searchProjetoByName}
                                                    placeholder="Digite o nome do projeto para buscar"
                                                    filterOption={false}
                                                />
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
                                Atualizar
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

export default EditEstandePage;