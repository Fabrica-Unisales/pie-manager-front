'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ padding: '30px' }}>
      <h1>Painel de Controles</h1>

      <div style={gridStyle}>
        <div style={cardStyle} onClick={() => router.push('/controleCursosTurmas')}>
          <h2>Gestão de Cursos e Turmas</h2>
          <p>Acesse o controle de cadastro de cursos e turmas.</p>
        </div>

        {/* Você pode adicionar mais cards aqui futuramente */}
      </div>
    </div>
  );
}

// Estilo dos cards
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '30px',
};

const cardStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  textAlign: 'center',
};

