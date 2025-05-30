"use client";
import React from "react";

export default function UsuariosLogin() {
  return (
    <div
      style={{
        maxWidth: 320,
        margin: "80px auto",
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Pagina de Login</h2>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label>Usuário</label>
          <input
            type="text"
            name="usuario"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
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
    </div>
  );
}
