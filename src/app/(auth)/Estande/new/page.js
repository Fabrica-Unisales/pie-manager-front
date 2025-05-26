'use client';
import React, { useEffect, useState } from 'react';
import { Button, Input, Card, Row, Col, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
const AdicionarApresentacao = dynamic(() => import('../../../components/Apresentacao/AdicionarApresentacao'), { ssr: false });

const { Title } = Typography;

export default function EstandeAdmin() {
  const [modalAberto, setModalAberto] = useState(false);
  const [locais, setLocais] = useState([]);
  const [novoLocal, setNovoLocal] = useState('');
  const [novoNumeroEstande, setNovoNumeroEstande] = useState({});

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('locais');
    if (dadosSalvos) {
      setLocais(JSON.parse(dadosSalvos));
    }
  }, []);

  const salvarLocalStorage = (novosLocais) => {
    localStorage.setItem('locais', JSON.stringify(novosLocais));
  };

  const normalizarTexto = (texto) =>
    texto.toLowerCase().replace(/\s/g, '');

  const adicionarLocal = () => {
    const nome = novoLocal.trim();
    if (!nome) return;

    const jaExiste = locais.some(
      (local) => normalizarTexto(local.nome) === normalizarTexto(nome)
    );

    if (jaExiste) {
      alert('Localização já cadastrada.');
      return;
    }

    const novo = {
      id: Date.now(),
      nome,
      estandes: []
    };

    const novosLocais = [...locais, novo];
    setLocais(novosLocais);
    salvarLocalStorage(novosLocais);
    setNovoLocal('');
  };

  const adicionarStand = (localId) => {
    const numero = parseInt(novoNumeroEstande[localId]);
    if (isNaN(numero) || numero <= 0) {
      alert('Número inválido.');
      return;
    }

    const novosLocais = locais.map(local => {
      if (local.id === localId) {
        const jaExiste = local.estandes.some(est => est.numero === numero);
        if (jaExiste) {
          alert(`Estande ${numero} já existe nesse local.`);
          return local;
        }

        const novoEstande = { id: Date.now(), numero };
        return {
          ...local,
          estandes: [...local.estandes, novoEstande]
        };
      }
      return local;
    });

    setLocais(novosLocais);
    salvarLocalStorage(novosLocais);
    setNovoNumeroEstande(prev => ({ ...prev, [localId]: '' }));
  };

  const deletarLocal = (localId) => {
    const atualizados = locais.filter(local => local.id !== localId);
    setLocais(atualizados);
    salvarLocalStorage(atualizados);
  };

  const deletarStand = (localId, standId) => {
    const atualizados = locais.map(local => {
      if (local.id === localId) {
        const novosEstandes = local.estandes.filter(est => est.id !== standId);
        return { ...local, estandes: novosEstandes };
      }
      return local;
    });

    setLocais(atualizados);
    salvarLocalStorage(atualizados);
  };

  return (
    <div style={{ padding: 24 }}>

<Card style={{ margin : '16px 0', backgroundColor : '#d3d3d3' } }>
  <AdicionarApresentacao
    aberto={modalAberto}
    aoFechar={() => setModalAberto(false)}
  />
</Card>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Nome da nova localização"
          value={novoLocal}
          onChange={e => setNovoLocal(e.target.value)}
          style={{ width: 240, marginRight: 8 }}
        />
        <Button type="primary" onClick={adicionarLocal}>Adicionar Localização</Button>
      </div>

      {locais.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>Adicionar Stands</Title>
          {locais.map(local => (
            <div key={local.id} style={{ marginBottom: 12 }}>
              <span style={{ marginRight: 8 }}>{local.nome}:</span>
              <Input
                type="number"
                placeholder="Número do estande"
                style={{ width: 160, marginRight: 8 }}
                value={novoNumeroEstande[local.id] || ''}
                onChange={e =>
                  setNovoNumeroEstande(prev => ({
                    ...prev,
                    [local.id]: e.target.value
                  }))
                }
              />
        <Button type="primary" onClick={() => adicionarStand(local.id)}>
  Adicionar Estande
</Button>
            </div>
          ))}
        </div>
      )}

      <Row gutter={[16, 16]}>
        {locais.map(local => (
          <Col span={24} key={local.id}>
            <Card
              title={`📍 Local: ${local.nome}`}
              bordered
              extra={
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => deletarLocal(local.id)}
                  danger
                />
              }
            >
              <Row gutter={[8, 8]}>
                {local.estandes
                  .sort((a, b) => a.numero - b.numero)
                  .map(stand => (
                    <Col key={stand.id}>
                      <Card
                        size="medium"
                        style={{ backgroundColor: '#e6f7ff', position: 'relative' }}
                      >
                        🟦 Stand {stand.numero}
                        <Button
                          type="text"
                          size="small"
                          icon={<CloseOutlined />}
                          onClick={() => deletarStand(local.id, stand.id)}
                          danger
                          style={{ position: 'absolute', top: 0, right: 0 }}
                        />
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
