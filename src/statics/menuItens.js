"use client";
import React from "react";
import {
  NotificationOutlined,
  BookOutlined,
} from "@ant-design/icons";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/home" rel="home">Home</a>,
  },
  {
    key: "cursos", // altere a key se desejar
    icon: React.createElement(BookOutlined),
    label: <a href="/curso" rel="cursos">Cursos e Turmas</a>,
  },
];