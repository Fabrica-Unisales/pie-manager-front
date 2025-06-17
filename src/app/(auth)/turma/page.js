'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CursoMockFactory } from '@/mocks/CursoMocks';

export default function NovoCursoPage() {
  const [curso, setCurso] = useState(CursoMockFactory());
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para salvar no mock
    alert(`Curso ${curso.nome} criado!`);
    router.push('/cursos');
  };

  return (
    <div>
      <h1>Novo Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            value={curso.nome}
            onChange={(e) => setCurso({...curso, nome: e.target.value})}
            required
          />
        </div>
        <div>
          <label>ID Coordenador:</label>
          <input
            value={curso.coordenador_id}
            onChange={(e) => setCurso({...curso, coordenador_id: e.target.value})}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}