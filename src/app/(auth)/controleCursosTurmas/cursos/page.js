'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { removerCurso, listarCursos } from './storageCursos';

export default function ListaCursos() {
  const router = useRouter();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const cursosArmazenados = listarCursos();
    setCursos(cursosArmazenados);
  }, []);

  const handleEditar = (id) => {
    router.push(`/controleCursosTurmas/cursos/${id}`);
  };

  const handleExcluir = (id) => {
    const confirmar = confirm('Tem certeza que deseja excluir este curso?');
    if (confirmar) {
      removerCurso(id);
      const cursosAtualizados = listarCursos();
      setCursos(cursosAtualizados);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Cursos</h1>

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
          onClick={() => router.push('/controleCursosTurmas/cursos/new')}
          style={{
            padding: '8px 12px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Novo Curso
        </button>
      </div>

      {cursos.length === 0 ? (
        <p>Nenhum curso cadastrado.</p>
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
              <th style={thStyle}>Tag (ID)</th>
              <th style={thStyle}>Nome do Curso</th>
              <th style={thStyle}>Coordenador</th>
              <th style={thStyle}>Área</th>
              <th style={thStyle}>Carga Horária</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td style={tdStyle}>{curso.id}</td>
                <td style={tdStyle}>{curso.nome}</td>
                <td style={tdStyle}>{curso.coordenador}</td>
                <td style={tdStyle}>{curso.area}</td>
                <td style={tdStyle}>{curso.cargaHoraria} horas</td>
                <td style={tdStyle}>
                  {curso.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEditar(curso.id)}
                    style={{ marginRight: '8px' }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleExcluir(curso.id)}>Excluir</button>
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
