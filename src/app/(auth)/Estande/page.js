'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Space, Tag, Row, Col, message, Modal, Select } from 'antd';
import {buildMocks} from '@/mocks/mocksFactory';
const { Title, Text } = Typography;
const { Option } = Select;

const EstandePage = () => {
  const [estandes, setEstandes] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formulario, setFormulario] = useState({
    id: null,
    localizacao: '',
    estande: '',
    projeto_horario: [{ id: '', horario: '', projeto_id: '' }]
  });



  useEffect(() => {
    try {
      // Run the build function from MocksFactory

      const rawEstandes = localStorage.getItem('estandes');
      if (rawEstandes) {
        const parsed = JSON.parse(rawEstandes);
        setEstandes(parsed.data || []);
      }

      const rawProjetos = localStorage.getItem('projetos');
      if (rawProjetos) {
        const parsedProjetos = JSON.parse(rawProjetos);
        setProjetos(parsedProjetos.data || []);
      }
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  }, []);

// APAGA O ESTANDE FILTRANDO A LISTA DO LOCAL STOROAGE E SLAVANDO UMA NOVA LISTA SEM O ESTANDE EXCLUÍDO
  const excluirEstande = (id) => {
    try {
      const rawData = localStorage.getItem('estandes');
      if (rawData) {
        const storage = JSON.parse(rawData);
        const novaLista = storage.data.filter(e => e.id !== id);

        const novoObjeto = {
          data: novaLista,
          nextId: storage.nextId,
          nextIdH: storage.nextIdH,
          nextIdE: storage.nextIdE
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

 const loadMyMocks = () => {
         buildMocks();
     }
     //ATIVA O FORMULARIO DE EDIÇÃO COM OS DADOS DO ESTANDE SELECIONADO
  const editarEstande = (estande) => {
    const [localizacao, estandeNum] = estande.localizacao.split(' - Estande ');
    setFormulario({
      id: estande.id,
      localizacao,
      estande: estandeNum,
      //para cada projeto com horario no estande tem uma adição no array ph novo
      projeto_horario: estande.projeto_horario.map(ph => ({
        id: ph.id,
        horario: ph.horario,
        projeto_id: ph.projeto_id
      }))
    });
    setModalVisible(true);
  };
//FUNÇÃO PARA MOSTRAR O TITULO DO PROJETO NAS LISTAGENS
  const buscarTituloProjeto = (projetoId) => {
    const projeto = projetos.find(p => p.id === projetoId);
    return projeto?.titulo || 'Projeto não encontrado';
  };

  const handleSave = () => {
    const rawData = localStorage.getItem('estandes');
    let estandesData = { data: [], nextIdH: 1, nextIdE: 1 };
    if (rawData) {
      estandesData = JSON.parse(rawData);
    }
  if (
      formulario.projeto_horario.some(ph => !ph.horario || !ph.projeto_id)
    ) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }
   const conflito = estandesData.data
  // Filtra todos os estandes, exceto o que está sendo editado atualmente
  .filter(est => est.id !== formulario.id)

  // Verifica se existe pelo menos um estande com conflito
  .some(est =>
    // Para cada estande, verifica se algum dos projetos já agendados nele...
    est.projeto_horario.some(ph =>
      // ...é igual a algum dos projetos sendo agendados agora no formulário
      formulario.projeto_horario.some(nph =>
        // Compara se o horário e o projeto são exatamente os mesmos
        ph.horario === nph.horario && ph.projeto_id === nph.projeto_id
      )
    )
  );


    if (conflito) {
      alert('Já existe uma apresentação desse projeto nesse horário.');
      return;
    }

    //pega todos os selects de horario do formulario e faz um map transformando-os em um array do mesmo tamanho 
    //com os horarios de começo de apresentações
    const horariosNoMesmoEstande = formulario.projeto_horario.map(ph => ph.horario.split('-')[0]);
    //idx é o index do array analisado pelas funções map some e filter, basicamente é um index temporario
    //para cada elemento do array do qual a função esta executando
   const horariosDuplicados = horariosNoMesmoEstande.some((horario, idx) =>
    //para cada horario em horariosNoMesmoEstande, verifica se o index do valo do horario é diferente do index atual
   // Exemplo se ja tem um horario 08:00 no array com index 0 e o index do horario atual é 1, com o valor 8 retorna true
    horariosNoMesmoEstande.indexOf(horario) !== idx
    );

    if (horariosDuplicados) {
      alert('Não é possível adicionar dois projetos com o mesmo horário em um mesmo estande.');
      return;
    }

    const novaApresentacao = {
      id: formulario.id,
      localizacao: `${formulario.localizacao} - Estande ${formulario.estande}`,
      projeto_horario: formulario.projeto_horario.map((ph, idx) => ({
        id:ph.id,
        horario: ph.horario,
        projeto_id: ph.projeto_id
      }))
    };

    let novaLista;
    novaLista = estandes.map(e => e.id === formulario.id ? novaApresentacao : e);

    const novoEstandes = {
      data: novaLista,
      nextIdH: estandesData.nextIdH ,
      nextIdE:  estandesData.nextIdE
    };

    localStorage.setItem('estandes', JSON.stringify(novoEstandes));
    setEstandes(novaLista);
    message.success('Estande editado com sucesso!');
    setModalVisible(false);
  };

  //Pagina JSX
  return (
    <div style={{ padding: '40px max(10px, 5%)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Estandes</Title>

    <Modal
  open={modalVisible}
  onCancel={() => {
    setModalVisible(false);
  }}
  onOk={handleSave}
  title={'Editar Estande'}
  width={700}   
>
  {/* HORÁRIOS + PROJETOS */}
  <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 16 }}>
    {formulario.projeto_horario.map((ph, index) => (
      <div
        key={index}
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          background: '#fafafa'
        }}
      >
        {/* SELECT DE HORÁRIOS */}
        <Select
          value={ph.horario}
          onChange={(value) => {
  const horarioDuplicado = formulario.projeto_horario.some((item, i) => item.horario === value && i !== index);
  if (horarioDuplicado) {
    alert('Este horário já foi selecionado para outro projeto neste estande.');
    return;
  }

  const novosPH = [...formulario.projeto_horario];
  novosPH[index].horario = value;
  setFormulario({ ...formulario, projeto_horario: novosPH });
}}

          style={{ marginBottom: 8, width: '100%' }}
          placeholder="Selecione um horário"
        >
          {Array.from({ length: 14 }, (_, i) => {
            const hour = (8 + i).toString().padStart(2, '0');
            return (
              <Option key={hour} value={`${hour}:00`}>
                {hour}:00
              </Option>
            );
          })}
        </Select>

        {/* SELECT DE PROJETO */}
        <Select
          value={ph.projeto_id}
          style={{ width: '100%' }}
          onChange={(value) => {
            const novosPH = [...formulario.projeto_horario];
            novosPH[index].projeto_id = value;
            setFormulario({ ...formulario, projeto_horario: novosPH });
          }}
          placeholder="Selecione um projeto"
        >
          {projetos.map(proj => (
            <Option key={proj.id} value={proj.id}>{proj.titulo}</Option>
          ))}
        </Select>

        {/* BOTÃO REMOVER */}
        {formulario.projeto_horario.length > 1 && (
          <Button
            type="link"
            danger
            onClick={() => {
              const novosPH = formulario.projeto_horario.filter((_, i) => i !== index);
              setFormulario({ ...formulario, projeto_horario: novosPH });
            }}
            style={{ marginTop: 8 }}
          >
            Remover
          </Button>
        )}
      </div>
    ))}
  </div>

  {/* BOTÃO ADICIONAR NOVA APRESENTAÇÃO */}
  <Button
    type="dashed"
    onClick={() => {
      setFormulario({
        ...formulario,
        projeto_horario: [
          ...formulario.projeto_horario,
          { id: '', horario: '', projeto_id: '' }
        ]
      });
    }}
    block
  >
    + Adicionar Apresentação
  </Button>
</Modal>

      
      <Space style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Button type="primary" onClick={() => window.location = "Estande/new"}>Adicionar Estande</Button>
      </Space>
      <Space style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Button type="primary" onClick={loadMyMocks} > CARREGAR PROJETOS</Button>
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
                  <Button key="edit" type="default" onClick={() => editarEstande(estande)}>Editar</Button>,
                  <Button key="delete" type="primary" danger onClick={() => excluirEstande(estande.id)}>Excluir</Button>
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
