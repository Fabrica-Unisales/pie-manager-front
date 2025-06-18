"use client";
import React from "react";
import {
  NotificationOutlined,
  LikeOutlined
} from "@ant-design/icons";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: <a href="/home" rel="home">Home</a>,
  },
  {
    key: "avaliacoes",
    icon: React.createElement(LikeOutlined),
    label: <a href="/avaliacoes" rel="avaliacoes">Avaliações</a>,
  },
];