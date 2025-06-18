'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTurmas, deleteTurma } from './storageTurmas';

export default function ListaTurmas() {
  const router = useRouter();
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const turmasArmazenadas = getTurmas();
    setTurmas(turmasArmazenadas);
  }, []);

  const handleEditar = (id) => {
    router.push(`/controleCursosTurmas/turmas/${id}`);
  };

  const handleExcluir = (id) => {
    const confirmar = confirm('Tem certeza que deseja excluir esta turma?');
    if (confirmar) {
      deleteTurma(id);
      const turmasAtualizadas = getTurmas();
      setTurmas(turmasAtualizadas);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Turmas</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => router.push('/controleCursosTurmas')}
          style={{
            marginRight: '10px',
            padding: '8px 12px',
            backgroundColor: '#888',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Voltar para Menu
        </button>

        <button
          onClick={() => router.push('/controleCursosTurmas/turmas/new')}
          style={{
            padding: '8px 12px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Nova Turma
        </button>
      </div>

      {turmas.length === 0 ? (
        <p>Nenhuma turma cadastrada.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
          }}
        >
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
                    Editar
                  </button>
                  <button onClick={() => handleExcluir(turma.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
};
