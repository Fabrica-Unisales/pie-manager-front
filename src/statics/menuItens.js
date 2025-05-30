"use client";
import React from "react";
import Link from "next/link";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: (
      <Link href="/home" rel="home">
        Home
      </Link>
    ),
  },
  {
    key: "itens",
    icon: React.createElement(NotificationOutlined),
    label: (
      <Link href="/itens" rel="itens">
        Itens
      </Link>
    ),
  },
  {
    key: "usuarios",
    icon: React.createElement(UserOutlined),
    label: (
      <Link href="/usuarios" rel="usuarios">
        Usuarios
      </Link>
    ),
  },
];
