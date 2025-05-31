export default class UserRegisterMocks {
  static build() {
    const data = [
      {
        id: 1,
        nome: 'João da Silva',
        email: 'joao.silva@email.com',
        senha_hash: '123456',
        matricula: 'A001',
        usuario: 'joaosilva',
        tipo: 'Aluno',
      },
      {
        id: 2,
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@email.com',
        senha_hash: 'abcdef',
        matricula: 'A002',
        usuario: 'mariaoliveira',
        tipo: 'Professor',
      },
      {
        id: 3,
        nome: 'Carlos Souza',
        email: 'carlos.souza@email.com',
        senha_hash: 'senha123',
        matricula: 'A003',
        usuario: 'carlossouza',
        tipo: 'Coordenador',
      },
      {
        id: 4,
        nome: 'Ana Pereira',
        email: 'ana.pereira@email.com',
        senha_hash: '123abc',
        matricula: 'A004',
        usuario: 'anapereira',
        tipo: 'AvaliadorExterno',
      },
      {
        id: 5,
        nome: 'Pedro Gomes',
        email: 'pedro.gomes@email.com',
        senha_hash: 'qwerty',
        matricula: 'A005',
        usuario: 'pedrogomes',
        tipo: 'Aluno',
      }
    ];

    const users = { data: data, nextId: 6, length: 5 };

    localStorage.setItem('users', JSON.stringify(users));
  }
}