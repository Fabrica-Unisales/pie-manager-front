'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listarTurmas, removerTurma } from './storageTurmas';

export default function ListaTurmas() {
  const router = useRouter();
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const turmasArmazenadas = listarTurmas();
    setTurmas(turmasArmazenadas);
  }, []);

  const handleEditar = (id) => {
    router.push(`/controleCursosTurmas/turmas/${id}`);
  };

  const handleExcluir = (id) => {
    const confirmar = confirm('TEM CEERTEZA QUE DESEJA EXCLUIR ESTA TURMA?');
    if (confirmar) {
      removerTurma(id);
      const turmasAtualizadas = listarTurmas();
      setTurmas(turmasAtualizadas);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>LISTA DE TURMAS</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => router.push('/controleCursosTurmas')}
          style={buttonStyle('#888')}
        >
          VOLTAR PARA MENU
        </button>

        <button
          onClick={() => router.push('/controleCursosTurmas/turmas/new')}
          style={buttonStyle('#0070f3')}
        >
          NOVA TURMA
        </button>
      </div>

      {turmas.length === 0 ? (
        <p>Nenhuma turma cadastrada.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Período</th>
              <th style={thStyle}>Turno</th>
              <th style={thStyle}>Curso</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma) => (
              <tr key={turma.id}>
                <td style={tdStyle}>{turma.id}</td>
                <td style={tdStyle}>{turma.periodo}</td>
                <td style={tdStyle}>{turma.turno}</td>
                <td style={tdStyle}>{turma.curso}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEditar(turma.id)}
                    style={{ marginRight: '8px' }}
                  >
                    EDITAR
                  </button>
                  <button onClick={() => handleExcluir(turma.id)}>EXCLUIR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
};

const buttonStyle = (bgColor) => ({
  marginRight: '10px',
  padding: '8px 12px',
  backgroundColor: bgColor,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});
