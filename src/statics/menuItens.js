import React from "react";
import Link from "next/link";
import { NotificationOutlined, BookOutlined, TeamOutlined } from "@ant-design/icons";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: <Link href="/home">Home</Link>,
  },
  {
    key: "itens",
    icon: React.createElement(NotificationOutlined),
    label: <Link href="/itens">Itens</Link>,
  },
  {
    key: "cursosturmas",
    icon: React.createElement(BookOutlined),
    label: <Link href="/controleCursosTurmas">Cursos e Turmas</Link>,
  },
  {
    key: "users",
    icon: React.createElement(TeamOutlined),
    label: <a href="/users" rel="users">Controle de Usuários</a>,
  },
  {
    key: "avaliacao",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/controleAvaliacoes" rel="controle-avaliacoes">Controle Avaliação</a>,
  },
];
