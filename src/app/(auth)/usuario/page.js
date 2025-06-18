"use client";

import { useState, useEffect } from "react";
import "../../globals.css";

const tiposUsuario = ["Aluno", "Professor", "Coordenador", "AvaliadorExterno"];

const CadastroUsuarioPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    email: "",
    senha: "",
    matricula: "",
    usuario: "",
    tipo: "Aluno",
  });
  const [isEditando, setIsEditando] = useState(false);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(usuariosSalvos);
  }, []);

  const gerarId = () => {
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => Number(u.id))) + 1 : 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const salvarLocalStorage = (lista) => {
    localStorage.setItem("usuarios", JSON.stringify(lista));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditando) {
      // Atualizar usuário
      const listaAtualizada = usuarios.map((u) =>
        Number(u.id) === Number(form.id)
          ? {
              ...u,
              nome: form.nome,
              email: form.email,
              matricula: form.matricula,
              usuario: form.usuario,
              tipo: form.tipo,
              // Atualiza senha se informado
              senha_hash: form.senha ? btoa(form.senha) : u.senha_hash,
            }
          : u
      );
      setUsuarios(listaAtualizada);
      salvarLocalStorage(listaAtualizada);
      alert("Usuário atualizado com sucesso!");
    } else {
      // Criar novo usuário
      const novoUsuario = {
        id: gerarId(),
        nome: form.nome,
        email: form.email,
        matricula: form.matricula,
        usuario: form.usuario,
        tipo: form.tipo,
        senha_hash: btoa(form.senha),
      };
      const listaAtualizada = [...usuarios, novoUsuario];
      setUsuarios(listaAtualizada);
      salvarLocalStorage(listaAtualizada);
      alert("Usuário cadastrado com sucesso!");
    }

    setForm({
      id: null,
      nome: "",
      email: "",
      senha: "",
      matricula: "",
      usuario: "",
      tipo: "Aluno",
    });
    setIsEditando(false);
  };

  const handleEditar = (usuario) => {
    setForm({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: "", // limpa senha para não mostrar
      matricula: usuario.matricula,
      usuario: usuario.usuario,
      tipo: usuario.tipo,
    });
    setIsEditando(true);
  };

  const handleExcluir = (id) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      const listaFiltrada = usuarios.filter((u) => Number(u.id) !== Number(id));
      setUsuarios(listaFiltrada);
      salvarLocalStorage(listaFiltrada);
      if (isEditando && Number(form.id) === Number(id)) {
        setForm({
          id: null,
          nome: "",
          email: "",
          senha: "",
          matricula: "",
          usuario: "",
          tipo: "Aluno",
        });
        setIsEditando(false);
      }
      alert("Usuário excluído com sucesso!");
    }
  };

  const handleCancelar = () => {
    setForm({
      id: null,
      nome: "",
      email: "",
      senha: "",
      matricula: "",
      usuario: "",
      tipo: "Aluno",
    });
    setIsEditando(false);
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit}>
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
        <br />
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
          placeholder={isEditando ? "Nova senha (opcional)" : "Senha"}
          type="password"
          className="input-style"
          required={!isEditando}
        />
        <br />
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
        <br />
        <button type="submit" className="btn-style">
          {isEditando ? "Atualizar" : "Cadastrar"}
        </button>
        {isEditando && (
          <button
            type="button"
            onClick={handleCancelar}
            className="btn-cancel"
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="table-style">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Email</th>
            <th>Matrícula</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Nenhum usuário cadastrado.
              </td>
            </tr>
          )}
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.email}</td>
              <td>{usuario.matricula}</td>
              <td>{usuario.tipo}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditar(usuario)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleExcluir(usuario.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CadastroUsuarioPage;
