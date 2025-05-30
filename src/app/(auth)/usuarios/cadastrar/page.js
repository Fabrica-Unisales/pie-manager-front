"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CadastrarPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    matricula: "",
    usuario: "",
    tipo: "Aluno",
  });

  useEffect(() => {
    const dados = localStorage.getItem("usuarios");
    if (dados) {
      setUsuarios(JSON.parse(dados));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoUsuario = {
      id: usuarios.length + 1,
      nome: form.nome,
      email: form.email,
      senha_hash: btoa(form.senha),
      matricula: form.matricula,
      usuario: form.usuario,
      tipo: form.tipo,
    };

    const atualizados = [...usuarios, novoUsuario];
    setUsuarios(atualizados);
    localStorage.setItem("usuarios", JSON.stringify(atualizados));

    alert("Usuário cadastrado com sucesso!");
    router.push("/usuarios/login");
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 24 }}>
      <h2 style={{ textAlign: "center" }}>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Nome</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Matrícula</label>
          <input
            name="matricula"
            value={form.matricula}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Usuário</label>
          <input
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="Aluno">Aluno</option>
            <option value="Professor">Professor</option>
            <option value="Coordenador">Coordenador</option>
            <option value="AvaliadorExterno">Avaliador Externo</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
