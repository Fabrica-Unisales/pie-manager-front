"use client";

import { useState } from "react";
import "../../globals.css";

const tiposUsuario = ["Aluno", "Professor", "Coordenador", "AvaliadorExterno"];

const CadastroUsuarioPage = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    matricula: "",
    usuario: "",
    tipo: "Aluno",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const gerarId = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const novoUsuario = {
      id: gerarId(),
      ...form,
      senha_hash: btoa(form.senha),
    };

    delete novoUsuario.senha;

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuário cadastrado com sucesso!");
    setForm({
      nome: "",
      email: "",
      senha: "",
      matricula: "",
      usuario: "",
      tipo: "Aluno",
    });
    console.log(localStorage.getItem("usuarios"));
  };

  return (
    <div className="container">
      <h2 className="">Cadastro de Usuário</h2>
      <br></br>
      <form onSubmit={handleSubmit} className="">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="input-style"
          required
        />
        <input
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          placeholder="Nome de usuário"
          className="input-style"
          required
        />
        <br></br> <br></br>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="input-style"
          required
        />
        <input
          name="senha"
          value={form.senha}
          onChange={handleChange}
          placeholder="Senha"
          type="password"
          className="input-style"
          required
        />
        <br></br> <br></br>
        <input
          name="matricula"
          value={form.matricula}
          onChange={handleChange}
          placeholder="Matrícula"
          className="input-style"
          required
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="select-style"
        >
          {tiposUsuario.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        <br></br> <br></br>
        <button type="submit" className="btn-style">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuarioPage;
