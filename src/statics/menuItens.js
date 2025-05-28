"use client";
import React from "react";
import {
  NotificationOutlined,
  UserAddOutlined
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
    key: "send",
    icon: React.createElement(UserAddOutlined),
    label: <a href="/users" rel="users">Usuarios</a>,
  },
];