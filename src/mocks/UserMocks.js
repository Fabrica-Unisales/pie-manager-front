export default class UserMocks {
    static build() {
      const data = [
        { key: '1', username: 'admin@admin', password: 'admin' },
        { key: '2', username: 'user2', password: 'password2' },
        { key: '3', username: 'user3', password: 'password3' },
  
        { key: '4', id: 'p-ranya', nome: 'Professora Ranya Castro', username: 'ranya@prof', password: '123', tipo: 'Professor' },
        { key: '5', id: 'p-kelly', nome: 'Professora Kelly Soares', username: 'kelly@prof', password: '123', tipo: 'Professor' },
        { key: '6', id: 'p-marciano', nome: 'Professor Marciano Luz', username: 'marciano@prof', password: '123', tipo: 'Professor' },
        { key: '7', id: 'p-samira', nome: 'Professora Samira Dias', username: 'samira@prof', password: '123', tipo: 'Professor' },
        { key: '8', id: 'p-heitor', nome: 'Professor Heitor Ramos', username: 'heitor@prof', password: '123', tipo: 'Professor' },
        { key: '9', id: 'p-larissa', nome: 'Professora Larissa Melo', username: 'larissa@prof', password: '123', tipo: 'Professor' },
  
        { key: '10', id: 'aE-fernando', nome: 'Avaliador Fernando Dias', username: 'fernando@avaliador', password: '123', tipo: 'AvaliadorExterno' },
        { key: '11', id: 'aE-cintia', nome: 'Avaliadora Cíntia Lopes', username: 'cintia@avaliador', password: '123', tipo: 'AvaliadorExterno' },
        { key: '12', id: 'aE-leonardo', nome: 'Avaliador Leonardo Faria', username: 'leonardo@avaliador', password: '123', tipo: 'AvaliadorExterno' }
      ];
  
      localStorage.setItem('users', JSON.stringify(data));
    }
  }
  