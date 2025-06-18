import Link from 'next/link';

export default function ControleCursosTurmas() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Controle de Cursos e Turmas</h1>
      
      <div className="space-y-4">
        <Link href="/controleCursosTurmas/cursos">
          <div className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
            📚 Gerenciar Cursos
          </div>
        </Link>

        <Link href="/controleCursosTurmas/turmas">
          <div className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer">
            🏫 Gerenciar Turmas
          </div>
        </Link>
      </div>
    </div>
  );
}
