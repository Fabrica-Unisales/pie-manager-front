'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Space, message } from 'antd';

const projetos = [
    { label: 'Projeto 1', value: 1},
    { label: 'Projeto 2', value: 2},
    { label: 'Projeto 3', value: 3},
    { label: 'Projeto 4', value: 4},
    { label: 'Projeto 5', value: 5},
    { label: 'Projeto 6', value: 6}
];

const avaliadores = [
    { label: 'Avaliador 1', value: 1},
    { label: 'Avaliador 2', value: 2},
    { label: 'Avaliador 3', value: 3},
    { label: 'Avaliador 4', value: 4},
    { label: 'Avaliador 5', value: 5}
];

const AvaliacoesPage = () => {

  const handleAddAvaliacao = () => {
    window.location.href = '/avaliacoes/new';
  };

  const [data, setAvaliacoes] = useState([]);

  const loadAvaliacoesFromLocalStorage = () => {
    const storedAvaliacoes = localStorage.getItem('avaliacoes');

    if (storedAvaliacoes) {
      try {
        const parsedAvaliacoes = JSON.parse(storedAvaliacoes);

        if (parsedAvaliacoes && Array.isArray(parsedAvaliacoes.data)) {
          setAvaliacoes(parsedAvaliacoes.data);

        } else {
          setAvaliacoes([]);
        }

      } catch (error) {
        console.error("Erro ao parsear avaliações do localStorage:", error);
        setAvaliacoes([]);
      }

    } else {
      setAvaliacoes([]);
    }
  }

  useEffect(() => {
    loadAvaliacoesFromLocalStorage()
  }, []);

  const avaliacoesColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Projeto',
      dataIndex: 'projeto_id',
      key: 'projeto_id',
      render: (projeto_id) => getProjetoName(projeto_id)
    },
    {
      title: 'Avaliador',
      dataIndex: 'avaliador_id',
      key: 'avaliador_id',
      render: (avaliador_id) => getAvaliadorName(avaliador_id)
    },
    {
      title: 'Nota',
      dataIndex: 'nota',
      key: 'nota',
      sorter: (a, b) => a.nota - b.nota,
    },
    {
      title: 'Comentário',
      dataIndex: 'comentario',
      key: 'comentario',
      ellipsis: true,
    },
    {
      title: 'Ações',
      key: 'avaliacoesActions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => window.location.href = `/avaliacoes/${record.id}`}>
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir esta avaliação?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getProjetoName = (id) => {
    const localStorageProjetos = localStorage.getItem('projetos') || [];
    const msgAlternativa = 'Projeto desconhecido';

    if(localStorageProjetos.length == 0)
    {
      const projeto = projetos.find(p => p.value == id);
      return projeto ? projeto.label : msgAlternativa;
    }

    const projeto = localStorageProjetos.find(p => p.id == id);
    return projeto ? projeto.titulo : msgAlternativa;
  }

  const getAvaliadorName = (id) => {
    const localStorageAvaliadores = localStorage.getItem('avaliadores') || [];
    const msgAlternativa = 'Avaliador desconhecido';

    if(localStorageAvaliadores.length == 0)
    {
      const avaliador = avaliadores.find(p => p.value == id);
      return avaliador ? avaliador.label : msgAlternativa;
    }

    const avaliador = localStorageAvaliadores.find(a => a.id == id);
    return avaliador ? avaliador.nome : msgAlternativa;
  }

  const handleDelete = (id) => {
    try {
    const localStorageAvaliacoes = localStorage.getItem('avaliacoes');

    if (localStorageAvaliacoes) {
      let avaliacoesData = JSON.parse(localStorageAvaliacoes);

      avaliacoesData.data = avaliacoesData.data.filter(aval => aval.id !== id);
      avaliacoesData.length = avaliacoesData.data.length;

      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoesData));

      setAvaliacoes(avaliacoesData.data);

      message.success(`Avaliação ${id} excluída com sucesso!`);
      }
      
    } catch (error) {
      message.error("Erro ao excluir avaliação.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button
          type="primary"
          style={{
            background: '#1890ff',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 16,
          }}
          onClick={handleAddAvaliacao}
        >
          Adicionar Avaliação
        </Button>
      </div>
      <Table columns={avaliacoesColumns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default AvaliacoesPage;