"use client";
import React from "react";
import {
  FileSearchOutlined,
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
    key: "avaliacoes",
    icon: React.createElement(FileSearchOutlined),
    label: <a href="/avaliacaoestandes" rel="avaliacoes">Avaliações Estandes</a>,
  },
];