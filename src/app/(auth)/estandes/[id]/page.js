'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, message, Card, TimePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export default function EditarEstandePage() {
    const [form] = Form.useForm();
    const router = useRouter();
    const params = useParams();
    const { id: currentEstandeIdFromUrl } = params;

    const [foundEstandeData, setFoundEstandeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Novo estado para controle de carregamento

    useEffect(() => {
        console.log("useEffect: Iniciando carregamento do estande...", currentEstandeIdFromUrl);
        if (currentEstandeIdFromUrl) {
            try {
                const existingEstandes = JSON.parse(localStorage.getItem('estandes')) || [];
                const estandeToEdit = existingEstandes.find(e => e.id === currentEstandeIdFromUrl);

                if (estandeToEdit) {
                    console.log("useEffect: Estande encontrado!", estandeToEdit);
                    const formattedProjetosHorarios = estandeToEdit.projeto_horario.map(item => ({
                        ...item,
                        horario: item.horario ? dayjs(item.horario, 'HH:mm') : null,
                    }));

                    form.setFieldsValue({
                        localizacao: estandeToEdit.localizacao,
                        projeto_horario: formattedProjetosHorarios,
                    });
                    setFoundEstandeData(estandeToEdit);
                } else {
                    console.warn("useEffect: Estande não encontrado para ID:", currentEstandeIdFromUrl);
                    message.error('Estande não encontrado para edição!');
                    router.push('/estandes');
                }
            } catch (error) {
                console.error('useEffect: ERRO ao carregar estande do localStorage:', error);
                message.error('Erro ao carregar dados do estande.');
                router.push('/estandes');
            } finally {
                setIsLoading(false); // Finaliza o carregamento, mesmo em caso de erro
            }
        } else {
            // Se não houver ID na URL (caso de navegação direta para /estandes/), redireciona
            console.warn("useEffect: ID do estande não fornecido na URL.");
            message.error('ID do estande não fornecido para edição.');
            router.push('/estandes');
        }
    }, [currentEstandeIdFromUrl, form, router]);


    // Esta função é chamada quando o formulário é enviado E TODAS as validações são bem-sucedidas.
    const onFinish = (values) => {
        console.log("onFinish: Formulário enviado com sucesso. Valores:", values);
        console.log("onFinish: Dados originais do estande (foundEstandeData):", foundEstandeData);

        if (!foundEstandeData) {
            message.error("Erro: Dados do estande original não carregados. Não é possível salvar.");
            console.error("onFinish: foundEstandeData está null ou undefined.");
            return;
        }

        try {
            let existingEstandes = JSON.parse(localStorage.getItem('estandes')) || [];
            console.log("onFinish: Estandes existentes antes da atualização:", existingEstandes);

            const projetosHorariosFormatados = values.projeto_horario?.map((item, index) => ({
                id: item.id || `ph_${Date.now()}_${index}`,
                horario: item.horario ? item.horario.format('HH:mm') : '',
                projeto_id: item.projeto_id,
            })) || [];

            const idDoEstandeParaAtualizar = currentEstandeIdFromUrl;
            console.log("onFinish: ID do estande para atualizar:", idDoEstandeParaAtualizar);


            if (projetosHorariosFormatados.length === 0 || !projetosHorariosFormatados[0]?.projeto_id) {
                message.error('É necessário informar o ID do Projeto para pelo menos um horário de apresentação.');
                console.warn("onFinish: Validação falhou: Projeto ID ausente.");
                return;
            }

            const primeiroProjetoId = projetosHorariosFormatados[0]?.projeto_id;
            const idDeProjetoJaExisteEmOutroEstande = existingEstandes.some(
                estande => estande.id === primeiroProjetoId && estande.id !== idDoEstandeParaAtualizar
            );

            if (idDeProjetoJaExisteEmOutroEstande) {
                message.error(`Já existe outro estande com o ID de Projeto '${primeiroProjetoId}' configurado como ID principal. Por favor, use um ID diferente.`);
                console.warn("onFinish: Validação falhou: Projeto ID já existe em outro estande.");
                return;
            }

            const estandesFiltrados = existingEstandes.filter(e => e.id !== idDoEstandeParaAtualizar);
            console.log("onFinish: Estandes após filtrar o estande antigo:", estandesFiltrados);

            const estandeAtualizado = {
                ...foundEstandeData, 
                id: idDoEstandeParaAtualizar,
                localizacao: values.localizacao,
                projeto_horario: projetosHorariosFormatados,
            };
            console.log("onFinish: Objeto de estande a ser salvo:", estandeAtualizado);
            
            localStorage.setItem('estandes', JSON.stringify([...estandesFiltrados, estandeAtualizado]));
            console.log("onFinish: Dados salvos no localStorage.");

            message.success('Estande atualizado com sucesso!');
            router.push(`/estandes`); 
            console.log("onFinish: Redirecionando para /estandes.");

        } catch (error) {
            console.error('onFinish: ERRO fatal ao salvar estande:', error);
            message.error('Ocorreu um erro ao salvar o estande.');
        }
    };

    // Esta função é chamada se o formulário falhar na validação (campos obrigatórios não preenchidos)
    const onFinishFailed = (errorInfo) => {
        console.error('onFinishFailed: Falha na validação do formulário. Erros:', errorInfo);
        message.error('Por favor, preencha todos os campos obrigatórios corretamente.');
    };

    const handleCancel = () => {
        router.push('/estandes');
    };

    // Exibe "Carregando" enquanto os dados estão sendo buscados
    if (isLoading) {
        return <div style={{ padding: 24 }}>Carregando estande...</div>;
    }

    // Se não encontrou o estande e terminou de carregar, não renderiza o formulário
    if (!foundEstandeData && !isLoading) {
        return <div style={{ padding: 24 }}>Estande não encontrado ou erro no carregamento.</div>;
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>Editar Estande</h1>
            <Form
                form={form}
                name="editarEstande"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed} // Adiciona este handler para erros de validação
                layout="vertical"
                // initialValues={{ projeto_horario: [{}] }} // Removendo, pois os valores serão preenchidos via form.setFieldsValue
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
                                        fields.length > 0 ? (
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
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Salvar Alterações
                        </Button>
                        <Button
                            style={{ marginLeft: 8 }}
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}