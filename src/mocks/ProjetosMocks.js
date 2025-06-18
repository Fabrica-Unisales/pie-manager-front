export default class ProjetosMocks {
  static build() {
    const data = [
      {
        id: '1',
        titulo: 'Sistema de Gerenciamento Escolar',
        descricao: 'Aplicativo web para controlar notas e frequência de alunos.',
        id_turma: '1',
        id_Professor: 2, // Carlos Mendes
        listaAlunos: [1, 5] // Ana Souza, Juliana Alves
      },
      {
        id: '2',
        titulo: 'Plataforma de Avaliação Online',
        descricao: 'Ferramenta para aplicação e correção automática de avaliações.',
        id_turma: '2',
        id_Professor: 2,
        listaAlunos: [1]
      },
         {
        id: '3',
        titulo: 'Plataforma de quizes',
        descricao: 'Ferramenta para aplicação e correção automática de avaliações.',
        id_turma: '2',
        id_Professor: 2,
        listaAlunos: [1]
      },
         {
        id: '4',
        titulo: 'Aplicativo de Reserva de ambientes',
        descricao: 'Ferramenta para aplicação e correção automática de avaliações.',
        id_turma: '2',
        id_Professor: 2,
        listaAlunos: [1]
      },
         {
        id: '5',
        titulo: 'Projeto de aplicativo para solicitações de emergência',
        descricao: 'Ferramenta para aplicação e correção automática de avaliações.',
        id_turma: '2',
        id_Professor: 2,
        listaAlunos: [1]
      }
    ];

    const projetos = { data: data, nextId: 6, length: data.length };
    localStorage.setItem('projetos', JSON.stringify(projetos));
  }
}
