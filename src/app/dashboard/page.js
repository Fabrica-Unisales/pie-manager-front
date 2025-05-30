"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Buscar usuário logado no localStorage
    const userLogado = localStorage.getItem("usuarioLogado");
    if (!userLogado) {
      // Se não tiver, redireciona para login
      router.push("/login");
      return;
    }
    setUsuario(JSON.parse(userLogado));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("usuarioLogado");
    router.push("/login");
  };

  if (!usuario) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>Bem-vindo(a), {usuario.nome}!</h1>
      <p>
        Você está logado como: <b>{usuario.tipo}</b>
      </p>

      <nav
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 300,
        }}
      >
        <button onClick={() => router.push("/usuarios")} style={btnStyle}>
          Gerenciar Usuários
        </button>
        <button onClick={() => router.push("/cursos")} style={btnStyle}>
          Gerenciar Cursos
        </button>
        <button onClick={() => router.push("/projetos")} style={btnStyle}>
          Gerenciar Projetos
        </button>
        <button onClick={() => router.push("/estandes")} style={btnStyle}>
          Gerenciar Estandes
        </button>
      </nav>

      <button
        onClick={logout}
        style={{
          marginTop: 40,
          padding: 10,
          background: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          width: 150,
        }}
      >
        Sair
      </button>
    </div>
  );
}

const btnStyle = {
  padding: "10px 15px",
  fontSize: 16,
  cursor: "pointer",
  borderRadius: 6,
  border: "1px solid #1890ff",
  backgroundColor: "#e6f0ff",
};
