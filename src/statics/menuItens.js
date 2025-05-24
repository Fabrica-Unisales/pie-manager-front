"use client";
import React from "react";
import {
  NotificationOutlined,
} from "@ant-design/icons";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/home" rel="home">Home</a>,
  },
  {
    key: "usuarios",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/usuarios" rel="usuarios">Usuários</a>,
  },
  {
    key: "cursos",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/cursos" rel="cursos">Cursos</a>,
  },
  {
    key: "projetos",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/projetos" rel="projetos">Projetos</a>,
  },
  {
    key: "estandes",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/estandes" rel="estandes">Estandes</a>,
  },
  {
    key: "avaliacoes",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/avaliacoes" rel="avaliacoes">Avaliações</a>,
  },
  {
    key: "itens",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/itens" rel="itens">Itens</a>,
  },
];