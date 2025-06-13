export default class CursosMocks {
  static build() {
    const cursos = [
      {
        id: "curso-ads",
        nome: "Análise e Desenvolvimento de Sistemas",
        coordenador_id: "coord-1",
        listaTurmas: [
          {
            id: "turma-1",
            curso_id: "curso-ads",
            periodo_id: "p1",
            ano: 2025,
            semestre: 1,
            professor: { id: "prof-joao", nome: "Prof. João da Silva", tipo: "Professor" },
            listaAlunos: [
              { id: "aluno-maria", nome: "Maria Silva", tipo: "Aluno" },
              { id: "aluno-jose", nome: "José Oliveira", tipo: "Aluno" },
              { id: "aluno-paulo", nome: "Paulo Souza", tipo: "Aluno" },
              { id: "aluno-fernanda", nome: "Fernanda Rocha", tipo: "Aluno" }
            ]
          },
          {
            id: "turma-2",
            curso_id: "curso-ads",
            periodo_id: "p2",
            ano: 2025,
            semestre: 2,
            professor: { id: "prof-carlos", nome: "Prof. Carlos Mendes", tipo: "Professor" },
            listaAlunos: [
              { id: "aluno-luana", nome: "Luana Castro", tipo: "Aluno" },
              { id: "aluno-tiago", nome: "Tiago Pereira", tipo: "Aluno" },
              { id: "aluno-ricardo", nome: "Ricardo Lima", tipo: "Aluno" },
              { id: "aluno-bruna", nome: "Bruna Fernandes", tipo: "Aluno" }
            ]
          },
          {
            id: "turma-3",
            curso_id: "curso-ads",
            periodo_id: "p3",
            ano: 2025,
            semestre: 3,
            professor: { id: "prof-marcos", nome: "Prof. Marcos Silva", tipo: "Professor" },
            listaAlunos: [
              { id: "aluno-fabiana", nome: "Fabiana Costa", tipo: "Aluno" },
              { id: "aluno-leandro", nome: "Leandro Alves", tipo: "Aluno" }
            ]
          }
        ]
      }
    ];

    localStorage.setItem('cursos', JSON.stringify(cursos));
  }
}
