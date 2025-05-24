export default class UsuariosMocks {
  static build() {
    const data = [
      {
        id: 1,
        nome: 'Ana Souza',
        email: 'ana@example.com',
        senha_hash: 'hash123',
        matricula: '20231001',
        usuario: 'ana_souza',
        tipo: 'Aluno'
      },
      {
        id: 2,
        nome: 'Carlos Mendes',
        email: 'carlos@example.com',
        senha_hash: 'hash456',
        matricula: '20231002',
        usuario: 'carlos_mendes',
        tipo: 'Professor'
      },
      {
        id: 3,
        nome: 'Fernanda Lima',
        email: 'fernanda@example.com',
        senha_hash: 'hash789',
        matricula: '20231003',
        usuario: 'fernanda_lima',
        tipo: 'Coordenador'
      },
      {
        id: 4,
        nome: 'Roberto Dias',
        email: 'roberto@example.com',
        senha_hash: 'hash999',
        matricula: '20231004',
        usuario: 'roberto_dias',
        tipo: 'AvaliadorExterno'
      },
      {
        id: 5,
        nome: 'Juliana Alves',
        email: 'juliana@example.com',
        senha_hash: 'hash555',
        matricula: '20231005',
        usuario: 'juliana_alves',
        tipo: 'Aluno'
      }
    ];

    const usuarios = { data: data, nextId: 6, length: data.length };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
}
