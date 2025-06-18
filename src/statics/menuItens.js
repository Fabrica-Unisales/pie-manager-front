"use client";
import React from "react";
import {
  NotificationOutlined,
  BookOutlined,
} from "@ant-design/icons";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/home" rel="home">Home</a>,
  },

  {
    key: "itens",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/itens" rel="itens">Itens</a>,
  },
  
  {
    key: "cursos",
    icon: React.createElement(BookOutlined),
    label: <a href="/curso" rel="cursos">Cursos</a>,
  },

  {
    key: "turmas",
    icon: React.createElement(BookOutlined),
    label: <a href="/turma" rel="turmas">Turmas</a>,
  },

  {
    key: "apresentacoes",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/estandes" rel="itens">Apresentações</a>,
  },
  {
    key: "avaliacoes",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/avaliacoes" rel="avaliacoes">Avaliações</a>,
  },
];