"use client";
import {
  NotificationOutlined,
} from "@ant-design/icons";
import React from "react";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/home" rel="home">Home</a>,
  },
  {
    key: "send",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/itens" rel="itens">Itens</a>,
  },
    {
    key: "cursos-turmas",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/cursos-turmas" rel="cursos-turmas">Cadastro de Cursos e Turmas</a>,
  },
];