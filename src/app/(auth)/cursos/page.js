import { cursos } from '@/mocks/CursoMocks';
import Link from 'next/link';

export default function CursosPage() {
  return (
    <div>
      <h1>Gestão de Cursos</h1>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/cursos/new">
          <button>Novo Curso</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(curso => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nome}</td>
              <td>
                <Link href={`/cursos/${curso.id}`}>
                  <button>Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}