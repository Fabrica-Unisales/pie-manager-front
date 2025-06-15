'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Button, Table, message, Typography, Space, Row, Col, Tag } from 'antd';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { buildMocks } from '@/mocks/mocksFactory';

const { Title } = Typography;

const PaginaEstandes = () => {
    const [estandes, setEstandes] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const carregarDados = useCallback(() => { 
        setCarregando(true);
        try {
            const estandesArmazenados = localStorage.getItem('estandes');
            let estandesParseados = [];
            if (estandesArmazenados) {
                const dadosCrusEstandes = JSON.parse(estandesArmazenados);
                if (Array.isArray(dadosCrusEstandes)) {
                    estandesParseados = dadosCrusEstandes;
                } else if (typeof dadosCrusEstandes === 'object' && dadosCrusEstandes !== null && Array.isArray(dadosCrusEstandes.data)) {
                    estandesParseados = dadosCrusEstandes.data;
                } else {
                    console.warn(
                        "Dados de estandes do localStorage não são um array ou têm formato inesperado. Usando lista vazia. Dados:",
                        dadosCrusEstandes
                    );
                }
            }
            setEstandes(estandesParseados);

            const projetosArmazenados = localStorage.getItem('projetos');
            let projetosParseados = [];
            if (projetosArmazenados) {
                const dadosCrusProjetos = JSON.parse(projetosArmazenados);
                if (Array.isArray(dadosCrusProjetos)) {
                    projetosParseados = dadosCrusProjetos;
                } else if (typeof dadosCrusProjetos === 'object' && dadosCrusProjetos !== null && Array.isArray(dadosCrusProjetos.data)) {
                    projetosParseados = dadosCrusProjetos.data;
                } else {
                    console.warn(
                        "Dados de projetos do localStorage não são um array ou têm formato inesperado. Usando lista vazia. Dados:",
                        dadosCrusProjetos
                    );
                }
            }
            setProjetos(projetosParseados);

        } catch (erro) {
            message.error('Erro ao carregar dados do localStorage.');
            console.error("Erro ao buscar/parsear dados:", erro);
            setEstandes([]); 
            setProjetos([]); 
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    const acaoCarregarMocks = () => {
        try {
            buildMocks();
            message.success('Dados iniciais (mocks) carregados com sucesso! Recarregando lista...');
            carregarDados(); 
        } catch (erro) {
            message.error('Erro ao carregar dados iniciais (mocks).');
            console.error("Erro ao carregar mocks:", erro);
        }
    };

    const aoExcluir = (id) => {
        try {
            const estandesAtuais = estandes.filter(estande => estande.id !== id);
            
            const estandesArmazenadosRaw = localStorage.getItem('estandes');
            if (estandesArmazenadosRaw) {
                const estandesArmazenadosObj = JSON.parse(estandesArmazenadosRaw);
                if (typeof estandesArmazenadosObj === 'object' && estandesArmazenadosObj !== null && estandesArmazenadosObj.data) {
                     const novoObjetoStorage = {
                        ...estandesArmazenadosObj,
                        data: estandesAtuais,
                        length: estandesAtuais.length
                    };
                    localStorage.setItem('estandes', JSON.stringify(novoObjetoStorage));
                } else {
                    localStorage.setItem('estandes', JSON.stringify(estandesAtuais));
                }
            } else {
                 localStorage.setItem('estandes', JSON.stringify(estandesAtuais));
            }

            setEstandes(estandesAtuais);
            message.success('Estande excluído com sucesso!');
        } catch (erro) {
            message.error('Erro ao excluir estande.');
            console.error("Erro ao excluir estande:", erro);
        }
    };

    const handleAddEstande = () => {
        window.location.href = '/estandes/new';
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Localização',
            dataIndex: 'localizacao',
            key: 'localizacao',
        },
        {
            title: 'Projetos Agendados',
            key: 'projetos',
            render: (_, record) => (
                <div>
                    {record.horario_projeto.map((hp, index) => {
                        const projeto = projetos.find(p => p.id === hp.projeto_id);
                        return (
                            <Tag key={index} color="blue">
                                {hp.horario} - {projeto?.nome || hp.projeto_id}
                            </Tag>
                        );
                    })}
                </div>
            ),
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a href={`/estandes/${record.id}`}>Editar</a>
                    <a onClick={() => aoExcluir(record.id)}>Excluir</a>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={2}>Gerenciamento de Estandes</Title>
                </Col>
                <Col>
                    <Space wrap>
                        <Button onClick={acaoCarregarMocks}>
                            Carregar Dados Iniciais
                        </Button>
                        <Link href="/estandes/new">
                            <Button type="primary" icon={<PlusOutlined />}>
                                Adicionar Estande
                            </Button>
                        </Link>
                    </Space>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={estandes}
                rowKey="id"
                loading={{ spinning: carregando, tip: "Carregando dados..." }}
                bordered
                pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
            />
            
             {!carregando && estandes.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: 40, padding: '20px' }}>
                    <Typography.Text type="secondary">Nenhum estande cadastrado no momento.</Typography.Text>
                    <br />
                    <Typography.Text type="secondary">Clique em "Adicionar Estande" ou "Carregar Dados Iniciais" para começar.</Typography.Text>
                </div>
            )}
        </div>
    );
};

export default PaginaEstandes;