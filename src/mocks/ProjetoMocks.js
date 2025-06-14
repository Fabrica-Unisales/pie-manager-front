export default class ProjetosMocks {
  static build() {
    const data = [
      {
        id: '1',
        titulo: 'Sistema de Gestão Escolar',
        descricao: 'Plataforma para gerenciamento de alunos, turmas e notas.',
        id_turma: 'turma-1',
        id_Professor: 'prof-joao',
        listaAlunos: ['aluno-maria', 'aluno-jose']
      },
      {
        id: '2',
        titulo: 'Aplicativo de Serviços Locais',
        descricao: 'App para conectar clientes e prestadores de serviço.',
        id_turma: 'turma-1',
        id_Professor: 'prof-ana',
        listaAlunos: ['aluno-paulo', 'aluno-fernanda']
      },
      {
        id: '3',
        titulo: 'Controle de Estoque para Pequenas Empresas',
        descricao: 'Sistema simples de controle de estoque e vendas.',
        id_turma: 'turma-2',
        id_Professor: 'prof-carlos',
        listaAlunos: ['aluno-luana', 'aluno-tiago']
      },
      {
        id: '4',
        titulo: 'Agenda Médica Online',
        descricao: 'Sistema para agendamento e controle de consultas médicas.',
        id_turma: 'turma-2',
        id_Professor: 'prof-helena',
        listaAlunos: ['aluno-ricardo', 'aluno-bruna']
      },
      {
        id: '5',
        titulo: 'Catálogo de Produtos Digital',
        descricao: 'Catálogo virtual com filtros e gerenciamento de itens.',
        id_turma: 'turma-3',
        id_Professor: 'prof-marcos',
        listaAlunos: ['aluno-fabiana', 'aluno-leandro']
      }
    ];

    const projetos = {
      data: data,
      nextId: 6,
      length: data.length
    };

    localStorage.setItem('projetos', JSON.stringify(projetos));
  }
}
