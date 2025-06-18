export default class UserMocks {
  static build() {
    const users = {
      data: [
        // Existentes
        { username: 'admin@admin', password: 'admin' },
        { username: 'user2', password: 'password2' },
        { username: 'user3', password: 'password3' },

        // Professores
        { id: 'prof-maria', nome: 'Prof. Maria Santos', username: 'joao@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-jose', nome: 'Profª. Jose Castro', username: 'ana@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-marta', nome: 'Prof. Marta Rocha', username: 'carlos@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-bruno', nome: 'Profª. Bruno Souza', username: 'helena@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-marcos', nome: 'Prof. Sergio Lima', username: 'marcos@prof', password: '123', tipo: 'Professor' },

        // Alunos
        { id: 'aluno-ana', nome: 'Ana Silva', username: 'ana@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-joao', nome: 'João Costa', username: 'joao@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-lara', nome: 'Lara Souza', username: 'lara@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-pedro', nome: 'Pedro Lima', username: 'pedro@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-mia', nome: 'Mia Rocha', username: 'mia@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-lucas', nome: 'Lucas Alves', username: 'lucas@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-camila', nome: 'Camila Silva', username: 'camila@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-sofia', nome: 'Sofia Melo', username: 'sofia@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-bruno', nome: 'Bruno Lima', username: 'bruno@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-fabio', nome: 'Fabio Martins', username: 'fabio@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-davi', nome: 'Davi Pedro', username: 'davi@aluno', password: '123', tipo: 'Aluno' }
      ],
      nextId: 21,
      length: 21
    };

    localStorage.setItem('users', JSON.stringify(users));
  }
}
