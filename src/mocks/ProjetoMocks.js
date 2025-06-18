export default class ProjetosMocks {
  static build() {
    const data = [
      {
        id: '1',
        titulo: 'SmartTasks ',
        descricao: 'Gerenciador simples de tarefas com tecnologia web.',
        id_turma: 'turma-1',
        id_Professor: 'prof-maria',
        listaAlunos: ['aluno-ana', 'aluno-joao']
      },
      {
        id: '2',
        titulo: 'EcoData ',
        descricao: 'Um sistema de coleta e análise de dados ambientais.',
        id_turma: 'turma-1',
        id_Professor: 'prof-maria',
        listaAlunos: ['aluno-lara','aluno-pedro']
      },
      {
        id: '3',
        titulo: 'SafeLogin',
        descricao: 'Aplicativo de autenticação segura com verificação em duas etapas.',
        id_turma: 'turma-2',
        id_Professor: 'prof-jose',
        listaAlunos: ['aluno-mia', 'aluno-lucas']
      },
      {
        id: '4',
        titulo: 'EduBot ',
        descricao: 'Chatbot para dúvidas frequentes de alunos em ambiente escolar.',
        id_turma: 'turma-2',
        id_Professor: 'prof-jose',
        listaAlunos: ['aluno-camila', 'aluno-bruno']
      },
      {
        id: '5',
        titulo: 'HealthTrack',
        descricao: 'Um sistema para registro e acompanhamento de atividades físicas e saúde.',
        id_turma: 'turma-3',
        id_Professor: 'prof-marta',
        listaAlunos: ['aluno-sofia', 'aluno-fabio']
      },
      {
        id: '6',
        titulo: 'LibraryPlus',
        descricao: 'Um sistema simples de controle de empréstimos e devoluções de livros para bibliotecas escolares.',
        id_turma: 'turma-3',
        id_Professor: 'prof-marta',
        listaAlunos: ['aluno-clara', 'aluno-davi']
      }
    ];

    const projetos = {
      data: data,
      nextId: 7,
      length: data.length
    };

    localStorage.setItem('projetos', JSON.stringify(projetos));
  }
}
