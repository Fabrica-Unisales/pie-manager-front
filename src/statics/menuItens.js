"use client";
import React from "react";
import Link from "next/link";
import { NotificationOutlined, BookOutlined } from "@ant-design/icons";

export const items2 = [
  {
    key: "home",
    icon: React.createElement(NotificationOutlined),
    label: <Link href="/home">Home</Link>,
  },
  {
    key: "itens",
    icon: React.createElement(NotificationOutlined),
    label: <Link href="/itens">Itens</Link>,
  },
  {
    key: "cursosturmas",
    icon: React.createElement(BookOutlined),
    label: <Link href="/controleCursosTurmas">Cursos e Turmas</Link>,
  },
];
