"use client";
import React from "react";
import {
  BookOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

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
    key: "cursos",
    icon: React.createElement(BookOutlined),
    label: <a href="/cursos" rel="cursos">Cursos</a>,
  },

    {
    key: "turma",
    icon: React.createElement(BookOutlined),
    label: <a href="/turmas" rel="turmas">Turmas</a>,
  },
  
];