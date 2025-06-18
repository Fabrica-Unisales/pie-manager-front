export default class TrabalhosMocks {
  static build() {
    const data = [
      {
        id: '1',
        titulo: 'Plataforma de Aprendizado Interativo',
        descricao: 'Ambiente digital para aulas, exercícios e quizzes educacionais.',
        id_turma: 'turma-a',
        id_Professor: 'prof-lucas',
        listaAlunos: ['aluno-clara', 'aluno-vinicius']
      },
      {
        id: '2',
        titulo: 'App de Monitoramento de Atividades Físicas',
        descricao: 'Aplicativo para registrar atividades.',
        id_turma: 'turma-a',
        id_Professor: 'prof-marcos',
        listaAlunos: ['aluno-felipe', 'aluna-larissa']
      },
      {
        id: '3',
        titulo: 'Gestor de Tarefas para Escritórios',
        descricao: 'Sistema de organização e produtividade para equipes pequenas.',
        id_turma: 'turma-b',
        id_Professor: 'prof-andre',
        listaAlunos: ['aluno-guilherme', 'aluno-igor']
      },
      {
        id: '4',
        titulo: 'Portal de Consulta Jurídica',
        descricao: 'Sistema para agendamento de atendimentos e consultas com advogados.',
        id_turma: 'turma-b',
        id_Professor: 'prof-james',
        listaAlunos: ['aluno-rafael', 'aluno-natalia']
      },
      {
        id: '5',
        titulo: 'Sistema de Catálogo para Biblioteca',
        descricao: 'Plataforma online para busca e reserva de livros.',
        id_turma: 'turma-c',
        id_Professor: 'prof-romulo',
        listaAlunos: ['aluna-perla', 'aluno-diego']
      }
    ];

    const trabalhos = {
      data: data,
      nextId: 6,
      length: data.length
    };

    localStorage.setItem('trabalhos', JSON.stringify(trabalhos));
  }
}
