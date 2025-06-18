"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, Form, Input, Select, InputNumber, message } from "antd";
import { usuarios } from "@/mocks/usuarios";
import { projetos } from "@/mocks/projetos";

export default function EditarAvaliacaoPage() {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const [avaliadores, setAvaliadores] = useState([]);
  const [projetosList, setProjetosList] = useState([]);
  const [avaliacao, setAvaliacao] = useState(null);

  const avaliacaoId = params?.id;

  useEffect(() => {
    setAvaliadores(usuarios.filter(u => u.tipo === "AvaliadorExterno"));
    setProjetosList(projetos);

    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
    const found = avaliacoes.find(a => String(a.id) === String(avaliacaoId));
    if (!found) {
      message.error("Avaliação não encontrada!");
      router.push("/avaliacao");
      return;
    }
    setAvaliacao(found);
    form.setFieldsValue({
      projeto_id: found.projeto_id,
      avaliador_id: found.avaliador_id,
      nota: found.nota,
      comentario: found.comentario,
    });
  }, [avaliacaoId, form, router]);

  const handleSubmit = (values) => {
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
    const idx = avaliacoes.findIndex(a => String(a.id) === String(avaliacaoId));
    if (idx === -1) {
      message.error("Avaliação não encontrada!");
      router.push("/avaliacao");
      return;
    }
    avaliacoes[idx] = { ...avaliacoes[idx], ...values };
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    message.success("Avaliação editada com sucesso!");
    router.push("/avaliacao");
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Editar Avaliação</h2>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="projeto_id"
          label="Projeto"
          rules={[{ required: true, message: "Selecione o projeto avaliado" }]}
        >
          <Select placeholder="Selecione o projeto">
            {projetosList.map(projeto => (
              <Select.Option key={projeto.id} value={projeto.id}>
                {projeto.titulo}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="avaliador_id"
          label="Avaliador Externo"
          rules={[{ required: true, message: "Selecione o avaliador" }]}
        >
          <Select placeholder="Selecione o avaliador externo">
            {avaliadores.map(avaliador => (
              <Select.Option key={avaliador.id} value={avaliador.id}>
                {avaliador.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="nota"
          label="Nota"
          rules={[
            { required: true, message: "Informe a nota" },
            { type: "number", min: 0, max: 10, message: "Nota deve ser entre 0 e 10" },
          ]}
        >
          <InputNumber min={0} max={10} step={0.1} style={{ width: 120 }} />
        </Form.Item>
        <Form.Item
          name="comentario"
          label="Comentário"
          rules={[{ required: true, message: "Informe um comentário" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Salvar
          </Button>
          <Button onClick={() => router.push("/avaliacao")}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}