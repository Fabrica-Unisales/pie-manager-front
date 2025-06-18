'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Tag, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { confirm } = Modal;

export default function ListaEstandes() {
    const [estandes, setEstandes] = useState([]);

    // Função para carregar os estandes do localStorage
    const loadEstandes = () => {
        console.log('1. [loadEstandes] Tentando carregar estandes do localStorage...');
        try {
            const storedEstandes = JSON.parse(localStorage.getItem('estandes')) || [];
            setEstandes(storedEstandes);
            console.log('2. [loadEstandes] Estandes carregados com sucesso:', storedEstandes);
            if (storedEstandes.length === 0) {
                console.log('3. [loadEstandes] localStorage "estandes" está vazio ou não existe.');
            }
        } catch (error) {
            console.error('ERRO: [loadEstandes] Falha ao carregar estandes do localStorage:', error);
            setEstandes([]); // Garante que o estado seja um array vazio em caso de erro
        }
    };

    // Carrega os estandes na montagem do componente
    // E também pode ser um bom lugar para um listener, mas para simplificar, confiamos no refresh.
    useEffect(() => {
        loadEstandes();
        // Nota: Para atualizações em tempo real sem refresh, você precisaria de um mecanismo mais avançado
        // como Context API ou um listener customizado para localStorage (que não é nativo).
    }, []);

    // Função para excluir um estande
    const handleDelete = (id) => {
        console.log(`4. [handleDelete] Função chamada. ID recebido para exclusão: ${id}`);

        if (!id) {
            console.error('ERRO: [handleDelete] ID do estande é inválido ou indefinido. Abortando exclusão.');
            message.error('Não foi possível excluir. ID do estande não encontrado.');
            return; // Sai da função se o ID for inválido
        }

        confirm({
            title: 'Tem certeza que deseja excluir este estande?',
            icon: <ExclamationCircleOutlined />,
            content: 'Essa ação não pode ser desfeita.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                console.log(`5. [handleDelete - onOk] Confirmação de exclusão OK para o ID: ${id}`);
                try {
                    const updatedEstandes = estandes.filter(estande => {
                        console.log(`   Comparando estande ${estande.id} com ID a excluir ${id}`);
                        return estande.id !== id;
                    });

                    console.log('6. [handleDelete - onOk] Estandes após filtragem (sem o item a ser excluído):', updatedEstandes);

                    localStorage.setItem('estandes', JSON.stringify(updatedEstandes));
                    console.log('7. [handleDelete - onOk] localStorage atualizado com sucesso.');

                    setEstandes(updatedEstandes); // Atualiza o estado para renderizar a tabela
                    console.log('8. [handleDelete - onOk] Estado do componente atualizado.');

                    message.success('Estande excluído com sucesso!');
                    console.log('9. [handleDelete - onOk] Exclusão concluída e mensagem de sucesso exibida.');
                } catch (error) {
                    console.error('ERRO: [handleDelete - onOk] Falha durante o processo de exclusão:', error);
                    message.error('Ocorreu um erro ao excluir o estande.');
                }
            },
            onCancel() {
                console.log('10. [handleDelete - onCancel] Exclusão cancelada.');
            },
        });
    };

    const columns = [
        {
            title: 'ID do Estande',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Localização',
            dataIndex: 'localizacao',
            key: 'localizacao',
        },
        {
            title: 'Projetos e Horários',
            key: 'projeto_horario',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    {record.projeto_horario && record.projeto_horario.length > 0 ? (
                        record.projeto_horario.map((ph, index) => (
                            <Tag key={index} color="blue">
                                Projeto ID: {ph.projeto_id} - Horário: {ph.horario}
                            </Tag>
                        ))
                    ) : (
                        <Tag color="volcano">Nenhum projeto associado</Tag>
                    )}
                </Space>
            ),
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_, record) => (
                <Space size="middle">
                    {/* Botão Editar: A rota dinâmica [id] precisa estar configurada */}
                    <Link href={`/home/estandes/${record.id}`} passHref>
                        <Button type="link">Editar</Button>
                    </Link>
                    {/* Botão Excluir */}
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Excluir
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h1>Lista de Estandes</h1>
            <Link href="/home/estandes/new" passHref>
                <Button type="primary" style={{ marginBottom: 16 }}>
                    Novo Estande
                </Button>
            </Link>
            <Table columns={columns} dataSource={estandes} rowKey="id" />
        </div>
    );
}
