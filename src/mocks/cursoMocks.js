export default class CursosMocks {
  static build() {
    const cursos = [
      {
        id: "curso-eng",
        nome: "Engenharia de Software",
        coordenador_id: "coordenador-1",
        listaTurmas: [
          {
            id: "turma-1",
            curso_id: "curso-eng-2",
            periodo_id: "5",
            ano: 2025,
            semestre: 2,
            professor: { id: "prof-maria", nome: "Prof. Maria Santos", tipo: "Professor" },
            listaAlunos: [
              { id: "aluno-mia", nome: "Mia Rocha", tipo: "Aluno" },
              { id: "aluno-lucas", nome: "Lucas Alves", tipo: "Aluno" },
              { id: "aluno-camila", nome: "Camila Silva", tipo: "Aluno" },
              { id: "aluno-bruno", nome: "Bruno Lima", tipo: "Aluno" }
            ]
          },
          {
            id: "turma-2",
            curso_id: "curso-eng-3",
            periodo_id: "5",
            ano: 2025,
            semestre: 2,
            professor: { id: "prof-jose", nome: "Prof. Jose Castro", tipo: "Professor" },
            listaAlunos: [
              { id: "aluno-ana", nome: "Ana Silva", tipo: "Aluno" },
              { id: "aluno-joao", nome: "João Costa", tipo: "Aluno" },
              { id: "aluno-lara", nome: "Lara Souza", tipo: "Aluno" },
              { id: "aluno-pedro", nome: "Pedro Lima", tipo: "Aluno" }
            ]
          },
          {
            id: "turma-3",
            curso_id: "curso-eng-4",
            periodo_id: "5",
            ano: 2025,
            semestre: 2,
            professor: { id: "prof-marta", nome: "Prof. Marta Rocha", tipo: "Professor" },
            listaAlunos: [
              { id: "aluno-sofia", nome: "Sofia Melo", tipo: "Aluno" },
              { id: "aluno-fabio", nome: "Fabio Martins", tipo: "Aluno" },
              { id: "aluno-clara", nome: "Clara Ramos", tipo: "Aluno" },
              { id: "aluno-davi", nome: "Davi Pedro", tipo: "Aluno" } 
            ]
          }
        ]
      }
    ];

    localStorage.setItem('cursos', JSON.stringify(cursos));
  }
}
