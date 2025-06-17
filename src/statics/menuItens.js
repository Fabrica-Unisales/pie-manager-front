import React from "react";
import {
  NotificationOutlined,
  TeamOutlined,
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
  },
];