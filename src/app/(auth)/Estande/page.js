'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Space, Tag, Row, Col, message } from 'antd';
import { buildMocks } from '@/mocks/mocksFactory';

const { Title, Text } = Typography;

const EstandePage = () => {
  const [estandes, setEstandes] = useState([]);
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    try {
      // Carrega os estandes
      const rawEstandes = localStorage.getItem('estandes');
      if (rawEstandes && rawEstandes.trim().length > 0) {
        const parsed = JSON.parse(rawEstandes);
        setEstandes(parsed.data || []);
      }

      // Carrega os projetos
      const rawProjetos = localStorage.getItem('projetos');
      if (rawProjetos && rawProjetos.trim().length > 0) {
        const parsedProjetos = JSON.parse(rawProjetos);
        setProjetos(parsedProjetos.data || []);
      }

    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  }, []);

  const carregarMocks = () => {
    buildMocks();

    try {
      const rawEstandes = localStorage.getItem('estandes');
      const rawProjetos = localStorage.getItem('projetos');

      if (rawEstandes) {
        const parsed = JSON.parse(rawEstandes);
        setEstandes(parsed.data || []);
      }

      if (rawProjetos) {
        const parsed = JSON.parse(rawProjetos);
        setProjetos(parsed.data || []);
      }

      message.success('Mocks carregados com sucesso!');
    } catch (e) {
      console.error("Erro ao carregar mocks:", e);
    }
  };

  const excluirEstande = (id) => {
    try {
      const rawData = localStorage.getItem('estandes');
      if (rawData && rawData.trim().length > 0) {
        const storage = JSON.parse(rawData);
        const novaLista = storage.data.filter(e => e.id !== id);

        const novoObjeto = {
          data: novaLista,
          nextId: storage.nextId,
          length: novaLista.length
        };

        localStorage.setItem('estandes', JSON.stringify(novoObjeto));
        setEstandes(novaLista);
        message.success('Estande excluído com sucesso!');
      }
    } catch (error) {
      console.error("Erro ao excluir estande:", error);
      message.error('Erro ao excluir o estande.');
    }
  };

  const buscarTituloProjeto = (projetoId) => {
    const projeto = projetos.find(p => p.id === projetoId);
    return projeto?.titulo || 'Projeto não encontrado';
  };

  return (
    <div style={{ padding: '40px max(10px, 5%)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Estandes</Title>

      <Space style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Button type="primary" onClick={carregarMocks}>Carregar Mocks</Button>
        <Button onClick={() => alert('Ir para o formulário de criação')}>Adicionar Estande</Button>
      </Space>

      {estandes.length === 0 ? (
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 40 }}>
          Nenhum estande localizado.
        </Text>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {estandes.map(estande => (
            <Col xs={24} sm={20} md={12} lg={8} key={estande.id}>
              <Card
                title={`Local: ${estande.localizacao}`}
                actions={[
                  <Button type="default" onClick={() => alert(`Editar ${estande.id}`)}>Editar</Button>,
                  <Button type="primary" danger onClick={() => excluirEstande(estande.id)}>Excluir</Button>
                ]}
              >
                <Text strong>Projetos e horários:</Text>
                <div style={{ marginTop: 8 }}>
                  {estande.projeto_horario?.map(ph => (
                    <div key={ph.id} style={{ marginBottom: 8 }}>
                      <Text>{buscarTituloProjeto(ph.projeto_id)}</Text>
                      <Tag color="blue" style={{ marginLeft: 8 }}>{ph.horario}</Tag>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default EstandePage;
