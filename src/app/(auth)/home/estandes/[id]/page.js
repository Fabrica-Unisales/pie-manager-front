'use client'; // Indica que este é um Componente Cliente (Client Component)

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, message, Card, TimePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation'; // Importa hooks para acessar parâmetros da URL e para navegação
import dayjs from 'dayjs'; // Biblioteca para manipulação de datas e horas

export default function EditarEstandePage() {
    const [form] = Form.useForm(); // Hook do Ant Design para gerenciar o formulário
    const router = useRouter(); // Hook para roteamento programático (redirecionar, por exemplo)
    const params = useParams(); // Hook para acessar os parâmetros dinâmicos da URL
    const { id: estandeId } = params; // Pega o 'id' da URL e renomeia para estandeId para clareza

    // Estado para armazenar o objeto completo do estande que está sendo editado
    const [currentEstande, setCurrentEstande] = useState(null);

    // useEffect para carregar os dados do estande quando a página é montada ou o ID da URL muda
    useEffect(() => {
        console.log("Página de Edição: ID do estande na URL:", estandeId);

        if (estandeId) { // Garante que o ID existe antes de tentar carregar
            const existingEstandes = JSON.parse(localStorage.getItem('estandes')) || []; // Carrega todos os estandes
            const foundEstande = existingEstandes.find(e => e.id === estandeId); // Encontra o estande pelo ID

            if (foundEstande) {
                console.log("Página de Edição: Estande encontrado:", foundEstande);
                // Formata os horários de string (HH:mm) para objetos dayjs
                // Isso é necessário porque o TimePicker do Ant Design espera objetos dayjs
                const formattedProjetosHorarios = foundEstande.projeto_horario.map(item => ({
                    ...item,
                    horario: item.horario ? dayjs(item.horario, 'HH:mm') : null, // Converte para dayjs ou null
                }));

                // Preenche os campos do formulário com os dados do estande encontrado
                form.setFieldsValue({
                    localizacao: foundEstande.localizacao,
                    // Garante que se projeto_horario for null/undefined, ele inicialize com um array vazio
                    projeto_horario: formattedProjetosHorarios,
                });
                setCurrentEstande(foundEstande); // Armazena o estande encontrado no estado
            } else {
                // Se o estande não for encontrado (ex: ID inválido na URL), mostra um erro e redireciona
                message.error('Estande não encontrado!');
                router.push('/home/estandes'); // Redireciona de volta para a lista
            }
        }
    }, [estandeId, form, router]); // Dependências: re-executa se ID, form ou router mudarem

    // Função que é chamada quando o formulário é submetido
    const onFinish = (values) => {
        const existingEstandes = JSON.parse(localStorage.getItem('estandes')) || []; // Pega todos os estandes

        // Mapeia os horários de volta para o formato de string (HH:mm) para salvar no localStorage
        const projetosHorariosFormatados = values.projeto_horario?.map((item, index) => ({
            id: item.id || index, // Mantém o ID existente ou usa o índice se for um novo item temporário
            horario: item.horario ? item.horario.format('HH:mm') : '', // Converte dayjs para string
            projeto_id: item.projeto_id,
        })) || [];

        // Encontra o índice do estande que está sendo atualizado na lista existente
        const estandeIndex = existingEstandes.findIndex(e => e.id === estandeId);

        if (estandeIndex > -1) { // Se o estande for encontrado
            const updatedEstande = {
                ...currentEstande, // Mantém quaisquer outros campos que o estande possa ter (que não estão no formulário)
                localizacao: values.localizacao,
                projeto_horario: projetosHorariosFormatados,
            };

            // Atualiza o estande na lista, substituindo o antigo pelo novo objeto atualizado
            existingEstandes[estandeIndex] = updatedEstande;

            // Salva a lista completa e atualizada de volta no localStorage
            localStorage.setItem('estandes', JSON.stringify(existingEstandes));

            message.success('Estande atualizado com sucesso!'); // Feedback visual
            router.push('/home/estandes'); // Redireciona de volta para a página de listagem
        } else {
            message.error('Erro ao atualizar estande: estande não encontrado.'); // Caso o estande não seja encontrado (situação rara)
        }
    };

    // Exibe uma mensagem de carregamento enquanto os dados do estande estão sendo buscados
    if (!currentEstande && estandeId) {
        return <div style={{ padding: 24 }}>Carregando estande...</div>;
    }

    // Renderiza o formulário de edição
    return (
        <div style={{ padding: 24 }}>
            <h1>Editar Estande</h1>
            {/* O initialValues aqui é importante para que Form.List funcione corretamente,
                mas os valores reais serão setados pelo form.setFieldsValue no useEffect. */}
            <Form
                form={form}
                name="editarEstande"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ projeto_horario: [{}] }} // Garante um campo inicial para adicionar
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
                                        fields.length > 0 ? ( // Permite remover todos os campos de horário
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
                    <Button type="primary" htmlType="submit">
                        Salvar Alterações
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => router.push('/home/estandes')} // Botão para cancelar e voltar para a lista
                    >
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
