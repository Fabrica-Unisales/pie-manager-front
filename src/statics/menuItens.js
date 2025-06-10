"use client";
import React from "react";
import {
  NotificationOutlined,
  FormOutlined,
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
    key: "aval",
    icon: React.createElement(FormOutlined), 
    label: <a href="/controleAvaliacoes" rel="controle-avaliacoes">Controle Avaliação</a>, 
  },
];