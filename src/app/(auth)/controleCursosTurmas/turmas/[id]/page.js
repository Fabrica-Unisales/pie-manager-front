'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { listarCursos } from '../../cursos/storageCursos';
import { getTurmaById, updateTurma } from '../storageTurmas';

export default function EditarTurma() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [turma, setTurma] = useState({
    id: '',
    periodo: '',
    turno: '',
    curso: '',
  });

  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const lista = listarCursos();
    setCursos(lista);

    const turmaEncontrada = getTurmaById(id);
    if (turmaEncontrada) {
      setTurma(turmaEncontrada);
    } else {
      alert('TURMA NÃO ENCONTRADA!');
      router.push('/controleCursosTurmas/turmas');
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurma({ ...turma, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTurma(id, turma);
    router.push('/controleCursosTurmas/turmas');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>EDITAR TURMA</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          maxWidth: '500px',
        }}
      >
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          ID da Turma:
          <input
            type="text"
            name="id"
            value={turma.id}
            onChange={handleChange}
            disabled
            style={{ flex: '1', marginLeft: '10px' }}
          />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Período:
          <input
            type="text"
            name="periodo"
            value={turma.periodo}
            onChange={handleChange}
            required
            style={{ flex: '1', marginLeft: '10px' }}
          />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Turno:
          <select
            name="turno"
            value={turma.turno}
            onChange={handleChange}
            required
            style={{ flex: '1', marginLeft: '10px' }}
          >
            <option value="">Selecione</option>
            <option value="Matutino">Matutino</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noturno">Noturno</option>
          </select>
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Curso:
          <select
            name="curso"
            value={turma.curso}
            onChange={handleChange}
            required
            style={{ flex: '1', marginLeft: '10px' }}
          >
            <option value="">Selecione</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.nome}>
                {curso.nome}
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            SALVAR
          </button>
          <button
            type="button"
            onClick={() => router.push('/controleCursosTurmas/turmas')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#666',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
}
