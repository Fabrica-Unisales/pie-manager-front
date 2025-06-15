"use client";
import React from "react";
import {
  NotificationOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import UserRegisterMocks from "@/mocks/UserRegisterMocks";

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
    key: "register",
    icon: React.createElement(UsergroupAddOutlined),
    label: <a href="/register" rel="register">Cadastro de Usuários</a>,
  }
];