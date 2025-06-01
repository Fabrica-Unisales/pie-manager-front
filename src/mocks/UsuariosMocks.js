export default class UsersMocks {
  static build() {
    const data = [
      {
        id: '1',
        nome: 'Victor',
        email: 'victor@meirison.com',
        senha: 'victor123',
        matricula: '14587777',
        usuario: 'victor.m',
        tipo: 'aluno',
      },
    ];

    const users = { data, nextId: 2, length: data.length };
    localStorage.setItem('users', JSON.stringify(users));
  }
}
