export default class UserMocksGrupo6 {
    static build() {
        const users = [
            {
                id: 1,
                nome: "João Silva",
                email: "joao@teste.com",
                senha_hash: "hash123",
                matricula: "2021001",
                usuario: "joaosilva",
                tipo: "Aluno"
            }
        ];
        localStorage.setItem('usersGrupo6', JSON.stringify(users));
    }

    static getUsers() {
        const users = JSON.parse(localStorage.getItem('usersGrupo6')) || [];
        return users;
    }

    static createUser(user) {
        const users = UserMocksGrupo6.getUsers();
        user.id = Date.now();
        users.push(user);
        localStorage.setItem('usersGrupo6', JSON.stringify(users));
    }

    static updateUser(updatedUser) {
        const users = UserMocksGrupo6.getUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('usersGrupo6', JSON.stringify(users));
        }
    }

    static deleteUser(id) {
        const users = UserMocksGrupo6.getUsers();
        const newUsers = users.filter(u => u.id !== id);
        localStorage.setItem('usersGrupo6', JSON.stringify(newUsers));
    }
}
