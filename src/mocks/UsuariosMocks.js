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

      {
        id: '2',
        nome: 'James',
        email: 'james@unisales.com',
        senha: 'james123',
        matricula: '78523',
        usuario: 'James.junior',
        tipo: 'professor',
      },


    ];

    const users = { data, nextId: 3, length: data.length };
    localStorage.setItem('users', JSON.stringify(users));
  }
}
