  'use client';
  import React, { useEffect, useState } from 'react';
  import {
    Button,
    Card,
    Col,
    Input,
    Modal,
    Row,
    Select,
    Typography,
  } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

  const { Title } = Typography;
  const { Option } = Select;

  export default function ApresentacoesAdmin() {
    const [locais, setLocais] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [estandesData, setEstandesData] = useState({ data: [], nextIdH: 1, nextIdE: 1 });
    const [modalVisible, setModalVisible] = useState(false);
    const [formulario, setFormulario] = useState({
      localizacao: '',
      estande: '',
      projeto_horario: [{ id: '', horario: '', projeto_id: '' }]
    });

    const horariosDisponiveis = Array.from({ length: 14 }, (_, i) => {
      const h = i + 8;
      return `${String(h).padStart(2, '0')}:00-${String(h + 1).padStart(2, '0')}:00`;
    });

    useEffect(() => {
    if (modalVisible) {
      const locaisSalvos = localStorage.getItem('locais');
      setLocais(locaisSalvos ? JSON.parse(locaisSalvos) : []);

      try {
        const projetosSalvos = JSON.parse(localStorage.getItem('projetos'));
        if (Array.isArray(projetosSalvos)) {
          setProjetos(projetosSalvos);
        } else if (projetosSalvos?.data) {
          setProjetos(projetosSalvos.data);
        } else {
          setProjetos([]);
        }
      } catch (e) {
        console.error("Erro ao carregar projetos:", e);
        setProjetos([]);
      }

      const estandesSalvos = JSON.parse(localStorage.getItem('estandes'));
      if (estandesSalvos && typeof estandesSalvos === 'object') {
        setEstandesData({
          data: Array.isArray(estandesSalvos.data) ? estandesSalvos.data : [],
          nextIdH: estandesSalvos.nextIdH ?? 1,
          nextIdE: estandesSalvos.nextIdE ?? 1
        });
      }
    }
  }, [modalVisible]);


    const handleAddHorario = () => {
      setFormulario((prev) => ({
        ...prev,
        projeto_horario: [...prev.projeto_horario, { id: '', horario: '', projeto_id: '' }]
      }));
    };

    const handleChangeHorarioProjeto = (index, field, value) => {
      const novaLista = [...formulario.projeto_horario];
      novaLista[index][field] = value;
      setFormulario({ ...formulario, projeto_horario: novaLista });
    };

    const handleSave = () => {
      if (
        !formulario.localizacao ||
        !formulario.estande ||
        formulario.projeto_horario.some(ph => !ph.horario || !ph.projeto_id)
      ) {
        alert('Preencha todos os campos antes de salvar.');
        return;
      }

      const localizacaoCompleta = `${formulario.localizacao} - Estande ${formulario.estande}`;

      const estandeJaExiste = estandesData.data.some(est => est.localizacao === localizacaoCompleta);
      if (estandeJaExiste) {
        alert('Já existem projetos cadastrados nesse estande. Para adicionar outros horários, edite a apresentação existente.');
        return;
      }

      const conflito = estandesData.data.some(est =>
        est.projeto_horario.some(ph =>
          formulario.projeto_horario.some(nph =>
            ph.horario === nph.horario.split('-')[0] && ph.projeto_id === nph.projeto_id
          )
        )
      );

      if (conflito) {
        alert('Já existe uma apresentação desse projeto nesse horário.');
        return;
      }

      const horariosNoMesmoEstande = formulario.projeto_horario.map(ph => ph.horario.split('-')[0]);
      const horariosDuplicados = horariosNoMesmoEstande.some((horario, idx) =>
        horariosNoMesmoEstande.indexOf(horario) !== idx
      );

      if (horariosDuplicados) {
        alert('Não é possível adicionar dois projetos com o mesmo horário em um mesmo estande.');
        return;
      }

      const novaApresentacao = {
        id: String(estandesData.nextIdE),
        localizacao: localizacaoCompleta,
        projeto_horario: formulario.projeto_horario.map((ph, idx) => ({
          id: estandesData.nextIdH + idx,
          horario: ph.horario.split('-')[0],
          projeto_id: ph.projeto_id
        }))
      };

      const novaLista = [...estandesData.data, novaApresentacao];
      const novoEstandes = {
        data: novaLista,
        nextIdH: estandesData.nextIdH + formulario.projeto_horario.length,
        nextIdE: estandesData.nextIdE + 1,
      };

      setEstandesData(novoEstandes);
      localStorage.setItem('estandes', JSON.stringify(novoEstandes));
      setModalVisible(false);
      alert('Apresentação salva com sucesso!');
      setFormulario({
        localizacao: '',
        estande: '',
        projeto_horario: [{ id: '', horario: '', projeto_id: '' }]
      });
    };

    return (
      <div style={{ padding: 24 }}>
        <Title level={3}>Gerenciar Apresentações</Title>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
          Adicionar Apresentação
        </Button>

        <Modal
          title="Nova Apresentação"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleSave}
          okText="Salvar"
          cancelText="Cancelar"
          width={600}
        >
          <Row gutter={12} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Select
                placeholder="Localização"
                style={{ width: '100%' }}
                onChange={(value) => setFormulario({ ...formulario, localizacao: value })}
                value={formulario.localizacao || undefined}
              >
                {locais.map(local => (
                  <Option key={local.id} value={local.nome}>{local.nome}</Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <Select
                placeholder="Estande"
                style={{ width: '100%' }}
                onChange={(value) => setFormulario({ ...formulario, estande: value })}
                value={formulario.estande || undefined}
                disabled={!formulario.localizacao}
              >
                {locais.find(l => l.nome === formulario.localizacao)?.estandes.map(est => (
                  <Option key={est.id} value={est.numero}>{`Estande ${est.numero}`}</Option>
                )) || null}
              </Select>
            </Col>
          </Row>

          {formulario.projeto_horario.map((item, idx) => (
            <Row gutter={12} style={{ marginBottom: 12 }} key={idx}>
              <Col span={12}>
                <Select
                  placeholder="Horário"
                  style={{ width: '100%' }}
                  onChange={(value) => handleChangeHorarioProjeto(idx, 'horario', value)}
                  value={item.horario || undefined}
                >
                  {horariosDisponiveis.map(h => (
                    <Option key={h} value={h}>{h}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <Select
                  placeholder="Projeto"
                  style={{ width: '100%' }}
                  onChange={(value) => handleChangeHorarioProjeto(idx, 'projeto_id', value)}
                  value={item.projeto_id || undefined}
                >
                  {projetos.map(p => (
                    <Option key={p.id} value={p.id}>{p.titulo}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
          ))}

          <Button onClick={handleAddHorario} style={{ marginTop: 8 }} block>
            + Adicionar Horário e Projeto
          </Button>
        </Modal>
      </div>
    );
  }
