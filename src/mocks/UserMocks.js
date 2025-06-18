export default class UserMocks {
  static build() {
    const usersData = [
      {
        id: "1",
        nome: "Carlos Daniel Bracho",
        email: "cd.bracho@brachocorp.com",
        senha_hash: "secret123",
        matricula: "1001",
        usuario: "carlos.daniel",
        tipo: "Coordenador",
      },
      {
        id: "2",
        nome: "Paulina Martins",
        email: "paulina.usurpadora@gmail.com",
        senha_hash: "secret456",
        matricula: "2002",
        usuario: "paulina.martins",
        tipo: "Aluno",
      },
      {
        id: "3",
        nome: "Vovó Piedade Bracho",
        email: "piedade.matriarca@brachocorp.com",
        senha_hash: "secret789",
        matricula: "N/A",
        usuario: "vovo.piedade",
        tipo: "AvaliadorExterno",
      },
    ];

    const users = { data: usersData, nextId: 4 };

    localStorage.setItem("users", JSON.stringify(users));

    const loginUsers = usersData.map((u) => ({
      username: u.email,
      password: u.senha_hash,
    }));
    localStorage.setItem("login_users", JSON.stringify(loginUsers));
  }
}
