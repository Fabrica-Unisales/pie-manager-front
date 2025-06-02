"use client";
import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, Select, Popconfirm, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { usuarios } from "@/mocks/usuarios";

const periodos = [
  { id: 1, nome: "2025/1" },
  { id: 2, nome: "2025/2" },
];

export default function CursoPage() {
  const router = useRouter();
  const [cursos, setCursos] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cursos");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  
  useEffect(() => {
    localStorage.setItem("cursos", JSON.stringify(cursos));
  }, [cursos]);

  const [modalCursoVisible, setModalCursoVisible] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);
  const [formCurso] = Form.useForm();


  const [modalTurmaVisible, setModalTurmaVisible] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [editingTurma, setEditingTurma] = useState(null);
  const [formTurma] = Form.useForm();


  const coordenadores = usuarios.filter(u => u.tipo === "Coordenador");
  const professores = usuarios.filter(u => u.tipo === "Professor");
  const alunos = usuarios.filter(u => u.tipo === "Aluno");

 
  const handleAddCurso = () => {
    setEditingCurso(null);
    formCurso.resetFields();
    setModalCursoVisible(true);
  };

  const handleEditCurso = (curso) => {
    setEditingCurso(curso);
    formCurso.setFieldsValue({
      nome: curso.nome,
      coordenador_id: curso.coordenador_id,
    });
    setModalCursoVisible(true);
  };

  const handleSaveCurso = (values) => {
    if (editingCurso) {
      setCursos(
        cursos.map(c =>
          c.id === editingCurso.id
            ? { ...c, ...values }
            : c
        )
      );
      message.success("Curso editado com sucesso!");
    } else {
      setCursos([
        ...cursos,
        { ...values, id: Date.now(), listaTurmas: [] }
      ]);
      message.success("Curso adicionado com sucesso!");
    }
    setModalCursoVisible(false);
    formCurso.resetFields();
    setEditingCurso(null);
  };

  const handleRemoveCurso = (cursoId) => {
    setCursos(cursos.filter(c => c.id !== cursoId));
    message.success("Curso removido!");
  };

  const getCoordenadorNome = (id) =>
    coordenadores.find(c => c.id === id)?.nome || "Não encontrado";


  const handleGerenciarTurmas = (curso) => {
    setCursoSelecionado(curso);
    setModalTurmaVisible(true);
    setEditingTurma(null);
    formTurma.resetFields();
  };

  const handleAddTurma = () => {
    setEditingTurma(null);
    formTurma.resetFields();
  };

  const handleEditTurma = (turma) => {
    setEditingTurma(turma);
    formTurma.setFieldsValue({
      periodo_id: turma.periodo_id,
      ano: turma.ano,
      semestre: turma.semestre,
      professor_id: turma.professor_id,
      listaAlunos: turma.listaAlunos,
    });
  };

  const handleSaveTurma = (values) => {
    if (editingTurma) {
     
      const novasTurmas = cursoSelecionado.listaTurmas.map(t =>
        t.id === editingTurma.id ? { ...editingTurma, ...values } : t
      );
      atualizarCursoTurmas(novasTurmas);
      message.success("Turma editada!");
    } else {
   
      const novaTurma = {
        ...values,
        id: Date.now(),
      };
      const novasTurmas = [...(cursoSelecionado.listaTurmas || []), novaTurma];
      atualizarCursoTurmas(novasTurmas);
      message.success("Turma adicionada!");
    }
    setEditingTurma(null);
    formTurma.resetFields();
  };

  const handleRemoveTurma = (turmaId) => {
    const novasTurmas = cursoSelecionado.listaTurmas.filter(t => t.id !== turmaId);
    atualizarCursoTurmas(novasTurmas);
    message.success("Turma removida!");
  };

  function atualizarCursoTurmas(novasTurmas) {
    setCursos(cursos.map(c =>
      c.id === cursoSelecionado.id
        ? { ...c, listaTurmas: novasTurmas }
        : c
    ));
    setCursoSelecionado(prev =>
      prev ? { ...prev, listaTurmas: novasTurmas } : prev
    );
  }


  const getProfessorNome = id => professores.find(p => p.id === id)?.nome || "Não encontrado";
  const getAlunoNomes = ids => alunos.filter(a => ids?.includes(a.id)).map(a => a.nome).join(", ");


  const columns = [
    { title: "Nome", dataIndex: "nome" },
    {
      title: "Coordenador",
      dataIndex: "coordenador_id",
      render: id => getCoordenadorNome(id)
    },
    {
      title: "Ações",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEditCurso(record)} type="link">Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja remover este curso?"
            onConfirm={() => handleRemoveCurso(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger type="link">Remover</Button>
          </Popconfirm>
          <Button onClick={() => handleGerenciarTurmas(record)} style={{ marginLeft: 8 }} type="link">
            Gerenciar Turmas
          </Button>
        </>
      ),
    },
  ];


  const columnsTurmas = [
    { title: "Ano", dataIndex: "ano" },
    { title: "Semestre", dataIndex: "semestre" },
    {
      title: "Período",
      dataIndex: "periodo_id",
      render: id => periodos.find(p => p.id === id)?.nome || id
    },
    {
      title: "Professor",
      dataIndex: "professor_id",
      render: id => getProfessorNome(id)
    },
    {
      title: "Alunos",
      dataIndex: "listaAlunos",
      render: ids => getAlunoNomes(ids)
    },
    {
      title: "Ações",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEditTurma(record)} type="link">Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja remover esta turma?"
            onConfirm={() => handleRemoveTurma(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger type="link">Remover</Button>
          </Popconfirm>
        </>
      ),
    }
  ];

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 24, position: "relative" }}>

      <Button
        type="link"
        icon={<LeftOutlined />}
        onClick={() => router.push("/home")}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          paddingLeft: 0,
          zIndex: 10
        }}
      >
        Voltar para Home
      </Button>
      <h1 style={{ textAlign: "center" }}>Cursos</h1>
      <Button type="primary" onClick={handleAddCurso} style={{ marginBottom: 16 }}>
        Adicionar Curso
      </Button>
      <Table
        dataSource={cursos}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: "Nenhum curso cadastrado" }}
      />
      <Modal
        title={editingCurso ? "Editar Curso" : "Novo Curso"}
        open={modalCursoVisible}
        onCancel={() => setModalCursoVisible(false)}
        onOk={() => formCurso.submit()}
        okText={editingCurso ? "Salvar" : "Adicionar"}
        destroyOnClose
      >
        <Form form={formCurso} onFinish={handleSaveCurso} layout="vertical">
          <Form.Item label="Nome" name="nome" rules={[{ required: true, message: "Obrigatório" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Coordenador" name="coordenador_id" rules={[{ required: true, message: "Obrigatório" }]}>
            <Select placeholder="Selecione o coordenador">
              {coordenadores.map(coord => (
                <Select.Option key={coord.id} value={coord.id}>
                  {coord.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={"Turmas do Curso: " + (cursoSelecionado?.nome || "")}
        open={modalTurmaVisible}
        onCancel={() => setModalTurmaVisible(false)}
        footer={null}
        width={850}
        destroyOnClose
      >
        <div>
          <Table
            dataSource={cursoSelecionado?.listaTurmas || []}
            columns={columnsTurmas}
            rowKey="id"
            locale={{ emptyText: "Nenhuma turma cadastrada" }}
            pagination={false}
          />
          <h3 style={{ marginTop: 24 }}>{editingTurma ? "Editar Turma" : "Nova Turma"}</h3>
          <Form
            form={formTurma}
            onFinish={handleSaveTurma}
            layout="inline"
            style={{ marginBottom: 16, flexWrap: "wrap", gap: 12 }}
            initialValues={{ listaAlunos: [] }}
          >
            <Form.Item name="ano" label="Ano" rules={[{ required: true }]}>
              <Input type="number" min={2000} max={2100} />
            </Form.Item>
            <Form.Item name="semestre" label="Semestre" rules={[{ required: true }]}>
              <Select style={{ width: 100 }}>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="periodo_id" label="Período" rules={[{ required: true }]}>
              <Select style={{ width: 120 }}>
                {periodos.map(p => (
                  <Select.Option key={p.id} value={p.id}>{p.nome}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="professor_id" label="Professor" rules={[{ required: true }]}>
              <Select style={{ width: 160 }}>
                {professores.map(prof => (
                  <Select.Option key={prof.id} value={prof.id}>{prof.nome}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="listaAlunos" label="Alunos" rules={[{ required: true }]}>
              <Select mode="multiple" maxTagCount={2} style={{ minWidth: 180 }}>
                {alunos.map(aluno => (
                  <Select.Option key={aluno.id} value={aluno.id}>{aluno.nome}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingTurma ? "Salvar" : "Adicionar"}
              </Button>
              {editingTurma && (
                <Button style={{ marginLeft: 8 }} onClick={() => {
                  setEditingTurma(null);
                  formTurma.resetFields();
                }}>
                  Cancelar edição
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}