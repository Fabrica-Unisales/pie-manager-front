"use client";
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const navCards = [
  { label: 'Meus Projetos', href: '/projetos' },
  { label: 'Minhas Turmas', href: '/cursos' },
  { label: 'Estandes', href: '/estandes' },
  { label: 'Avaliações', href: '/avaliacoes' },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLogado = localStorage.getItem('usuarioLogado');
    if (userLogado) {
      setUser(JSON.parse(userLogado));
    }
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Bem-vindo{user ? `, ${user.username}` : ''}!</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        {navCards.map(card => (
          <a key={card.href} href={card.href} style={{ textDecoration: 'none', flex: '1 1 200px', minWidth: 200 }}>
            <Card style={{ textAlign: 'center', cursor: 'pointer', minHeight: 100, justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>{card.label}</span>
            </Card>
          </a>
        ))}
      </div>
      <Button onClick={() => {
        localStorage.removeItem('usuarioLogado');
        window.location.href = '/';
      }}>Sair</Button>
    </div>
  );
};

export default Dashboard; 