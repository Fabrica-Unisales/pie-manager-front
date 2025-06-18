"use client";
import React from "react";
import {
  NotificationOutlined,
  ProjectOutlined, // ícone para "Projetos"
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
    key: "projetos",
    icon: React.createElement(ProjectOutlined),
    label: <a href="/controleprojetos" rel="projetos">Projetos</a>,
  },
];
