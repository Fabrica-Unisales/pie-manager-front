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
    key: "send",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/itens" rel="itens">Itens</a>,
  },
  {
    key: "estand",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/controle_de_estande" rel="controle_de_estande">Controle de Estande</a>,
  },
];
