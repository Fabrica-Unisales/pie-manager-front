export default class TrabalhosMocks {
  static build() {
    const data = [
      {
        id: '1',
        titulo: 'Plataforma e-ESCOLA',
        descricao: 'Ambiente digital para aulas, exercícios e quizzes educacionais.',
        id_turma: 'turma1',
        id_Professor: { id: 'prof-lucas', nome: 'Lucas Mendes' },
        listaAlunos: [
          { id: 'aluno-clara', nome: 'Clara Oliveira' },
          { id: 'aluno-vinicius', nome: 'Vinícius Rocha' }
        ]
      },
      {
        id: '2',
        titulo: 'App NewRace',
        descricao: 'Aplicativo para registrar atividades Esportivas.',
        id_turma: 'turma2',
        id_Professor: { id: 'prof-marcos', nome: 'Marcos Lima' },
        listaAlunos: [
          { id: 'aluno-felipe', nome: 'Felipe Santos' },
          { id: 'aluna-larissa', nome: 'Larissa Duarte' },
          { id: 'aluno-hugo', nome: 'Hugo Almeida' }
        ]
      },
      {
        id: '3',
        titulo: 'App TaskIA',
        descricao: 'Sistema de organização e produtividade para equipes pequenas.',
        id_turma: 'turma3',
        id_Professor: { id: 'prof-andre', nome: 'André Figueiredo' },
        listaAlunos: [
          { id: 'aluno-guilherme', nome: 'Guilherme Costa' },
          { id: 'aluno-igor', nome: 'Igor Silva' },
          { id: 'aluna-paula', nome: 'Paula Ribeiro' },
          { id: 'aluna-maria', nome: 'Maria Eduarda' }
        ]
      },
      {
        id: '4',
        titulo: 'App Portal Jurídico',
        descricao: 'Sistema para agendamento de atendimentos e consultas com advogados.',
        id_turma: 'turma4',
        id_Professor: { id: 'prof-james', nome: 'James Silva' },
        listaAlunos: [
          { id: 'aluno-rafael', nome: 'Rafael Torres' },
          { id: 'aluno-natalia', nome: 'Natália Martins' }
        ]
      },
      {
        id: '5',
        titulo: 'NewLibrary App',
        descricao: 'Plataforma online para busca e reserva de livros.',
        id_turma: 'turma5',
        id_Professor: { id: 'prof-romulo', nome: 'Romulo Silva' },
        listaAlunos: [
          { id: 'aluna-perla', nome: 'Perla Soares' },
          { id: 'aluno-diego', nome: 'Diego Barbosa' },
          { id: 'aluna-juliana', nome: 'Juliana Pires' },
          { id: 'aluno-thiago', nome: 'Thiago Costa' },
          { id: 'aluna-bruna', nome: 'Bruna Souza' }
        ]
      }
    ];

    const trabalhos = {
      data,
      nextId: 6,
      length: data.length
    };

    localStorage.setItem('trabalhos', JSON.stringify(trabalhos));
  }
}
