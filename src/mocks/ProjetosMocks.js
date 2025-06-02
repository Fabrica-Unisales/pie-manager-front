export default class ProjetosMocks {

 static build () {
  const data = [
   {
    id: '1',
    titulo: 'Projeto Alpha',
    descricao: 'Desenvolvimento de um aplicativo mobile para gestão de tarefas.',
    id_turma: 1001,
    id_professor: 21,
    listaAlunos: [
     {
      id: '1',
      nome: 'Lucas Almeida',
      email: 'lucas.almeida@email.com',
      senha_hash: 'hash123abc',
      matricula: '2023001',
      usuario: 'lucasal',
      tipo: 'aluno'
     },
    ]
   },
   {
    id: '2',
    titulo: 'Projeto Beta',
    descricao: 'Sistema web para controle de estoque de pequenas empresas.',
    id_turma: 1002,
    id_professor: 22,
    listaAlunos: [
     {
      id: '2',
      nome: 'Mariana Costa',
      email: 'mariana.costa@email.com',
      senha_hash: 'hash456def',
      matricula: '2023002',
      usuario: 'marianac',
      tipo: 'aluno'
     },
    ]
   },
   {
    id: '3',
    titulo: 'Projeto Gamma',
    descricao: 'Plataforma de cursos online com sistema de avaliação.',
    id_turma: 1003,
    id_professor: 23,
    listaAlunos: [
     {
      id: '3',
      nome: 'Rafael Souza',
      email: 'rafael.souza@email.com',
      senha_hash: 'hash789ghi',
      matricula: '2023003',
      usuario: 'rafaels',
      tipo: 'aluno'
     },
    ]
   },
   {
    id: '4',
    titulo: 'Projeto Delta',
    descricao: 'Desenvolvimento de um jogo educativo para crianças.',
    id_turma: 1004,
    id_professor: 24,
    listaAlunos: [
     {
      id: '4',
      nome: 'Ana Pereira',
      email: 'ana.pereira@email.com',
      senha_hash: 'hash321jkl',
      matricula: '2023004',
      usuario: 'anap',
      tipo: 'aluno'
     },
    ]
   },
  ]
  return data;
 }
}
