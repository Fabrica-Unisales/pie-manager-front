import React from 'react';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Usuários', href: '/usuarios' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Estandes', href: '/estandes' },
  { label: 'Avaliações', href: '/avaliacoes' },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>PIE MANAGER</div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        className={styles.logout}
        onClick={() => {
          localStorage.removeItem('usuarioLogado');
          window.location.href = '/';
        }}
      >
        Sair
      </button>
    </aside>
  );
};

export default Sidebar; 