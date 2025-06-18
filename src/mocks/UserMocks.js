export default class UserMocks {
  static build() {
    const users = {
      data: [
        // Existentes
        { username: 'admin@admin', password: 'admin' },
        { username: 'user2', password: 'password2' },
        { username: 'user3', password: 'password3' },

        // Professores
        { id: 'prof-joao', nome: 'Prof. João da Silva', username: 'joao@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-ana', nome: 'Profª. Ana Lima', username: 'ana@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-carlos', nome: 'Prof. Carlos Mendes', username: 'carlos@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-helena', nome: 'Profª. Helena Martins', username: 'helena@prof', password: '123', tipo: 'Professor' },
        { id: 'prof-marcos', nome: 'Prof. Marcos Silva', username: 'marcos@prof', password: '123', tipo: 'Professor' },

        // Alunos
        { id: 'aluno-maria', nome: 'Maria Silva', username: 'maria@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-jose', nome: 'José Oliveira', username: 'jose@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-paulo', nome: 'Paulo Souza', username: 'paulo@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-fernanda', nome: 'Fernanda Rocha', username: 'fernanda@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-luana', nome: 'Luana Castro', username: 'luana@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-tiago', nome: 'Tiago Pereira', username: 'tiago@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-ricardo', nome: 'Ricardo Lima', username: 'ricardo@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-bruna', nome: 'Bruna Fernandes', username: 'bruna@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-fabiana', nome: 'Fabiana Costa', username: 'fabiana@aluno', password: '123', tipo: 'Aluno' },
        { id: 'aluno-leandro', nome: 'Leandro Alves', username: 'leandro@aluno', password: '123', tipo: 'Aluno' }
      ],
      nextId: 21,
      length: 21
    };

    localStorage.setItem('users', JSON.stringify(users));
  }
}
