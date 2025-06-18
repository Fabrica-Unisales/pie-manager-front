'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { salvarCurso } from '../storageCursos';

export default function NovoCurso() {
  const router = useRouter();
  const [curso, setCurso] = useState({
    id: '',
    nome: '',
    coordenador: '',
    area: 'TI',
    cargaHoraria: '',
    status: 'ativo',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    salvarCurso(curso);
    router.push('/controleCursosTurmas/cursos');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>NOVO CURSO</h1>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px', 
          maxWidth: '500px' 
        }}
      >
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Tag (ID):
          <input
            type="text"
            name="id"
            value={curso.id}
            onChange={handleChange}
            required
            style={{ flex: '1', marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Nome do Curso:
          <input
            type="text"
            name="nome"
            value={curso.nome}
            onChange={handleChange}
            required
            style={{ flex: '1', marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Coordenador:
          <input
            type="text"
            name="coordenador"
            value={curso.coordenador}
            onChange={handleChange}
            required
            style={{ flex: '1', marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Área:
          <select 
            name="area" 
            value={curso.area} 
            onChange={handleChange} 
            required
            style={{ flex: '1', marginLeft: '10px' }}
          >
            <option value="TI">TI</option>
            <option value="Saúde">Saúde</option>
            <option value="Engenharia">Engenharia</option>
            <option value="Gestão">Gestão</option>
            <option value="Direito">Direito</option>
            <option value="Outros">Outros</option>
          </select>
        </label>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Carga Horária:
          <input
            type="number"
            name="cargaHoraria"
            value={curso.cargaHoraria}
            onChange={handleChange}
            required
            style={{ flex: '1', marginLeft: '10px' }}
          />
        </label>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Status:
          <select 
            name="status" 
            value={curso.status} 
            onChange={handleChange} 
            required
            style={{ flex: '1', marginLeft: '10px' }}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </label>

        <button type="submit">SALVAR</button>
        <button type="button" onClick={() => router.push('/controleCursosTurmas/cursos')}>
          CANCELAR
        </button>
      </form>
    </div>
  );
}
