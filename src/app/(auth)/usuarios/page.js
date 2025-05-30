"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState({ usuario: "", senha: "" });
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("usuarios");
    if (dados) {
      setUsuarios(JSON.parse(dados));
    }
  }, []);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === login.usuario && u.senha_hash === btoa(login.senha)
    );

    if (usuarioEncontrado) {
      alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);
      setErro("");
    } else {
      setErro("Usuário não cadastrado.");
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "80px auto", padding: 24 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Usuário</label>
          <input
            type="text"
            name="usuario"
            value={login.usuario}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={login.senha}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
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
          Entrar
        </button>
      </form>

      {erro && (
        <div style={{ marginTop: 16, color: "red", textAlign: "center" }}>
          {erro}
          <br />
          <button
            onClick={() => router.push("/usuarios/cadastrar")}
            style={{
              marginTop: 8,
              background: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Cadastrar
          </button>
        </div>
      )}
    </div>
  );
}
