const LOCAL_STORAGE_KEY = 'usersGrupo6';

let initialUsers = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha_hash: 'hash123',
        matricula: '2023001',
        usuario: 'joaos',
        tipo: 'Aluno'
    },
    {
        id: 2,
        nome: 'Maria Souza',
        email: 'maria.souza@example.com',
        senha_hash: 'hash456',
        matricula: '2023002',
        usuario: 'marias',
        tipo: 'Professor'
    },
    {
        id: 3,
        nome: 'Pedro Almeida',
        email: 'pedro.almeida@example.com',
        senha_hash: 'hash789',
        matricula: '2023003',
        usuario: 'pedroa',
        tipo: 'Coordenador'
    },
    {
        id: 4,
        nome: 'Ana Lima',
        email: 'ana.lima@example.com',
        senha_hash: 'hashabc',
        matricula: '2023004',
        usuario: 'analima',
        tipo: 'AvaliadorExterno'
    }
];

const saveUsers = (usersToSave) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(usersToSave));
    }
};

const loadAndInitializeUsers = () => {
    if (typeof window === 'undefined') {
        return initialUsers;
    }
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        if (!parsedUsers || (Array.isArray(parsedUsers) && parsedUsers.length === 0)) {
            saveUsers(initialUsers);
            return initialUsers;
        }
        return parsedUsers;
    } else {
        saveUsers(initialUsers);
        return initialUsers;
    }
};

let users = loadAndInitializeUsers();

const UserMocksGrupo6 = {
    getUsers: () => {
        return loadAndInitializeUsers();
    },

    getUserById: (id) => {
        const currentUsers = loadAndInitializeUsers();
        return currentUsers.find(user => user.id === id);
    },

    createUser: (user) => {
        const currentUsers = loadAndInitializeUsers();
        const newId = currentUsers.length > 0 ? Math.max(...currentUsers.map(u => u.id)) + 1 : 1;
        const newUser = { ...user, id: newId };
        users.push(newUser);
        saveUsers(users);
        return newUser;
    },

    updateUser: (updatedUser) => {
        const currentUsers = loadAndInitializeUsers();
        const newUsers = currentUsers.map(user => user.id === updatedUser.id ? { ...user, ...updatedUser } : user);
        saveUsers(newUsers);
        users = newUsers;
        return updatedUser;
    },

    deleteUser: (id) => {
        const initialLength = users.length;
        users = users.filter(user => user.id !== id);
        saveUsers(users);
        return users.length < initialLength;
    },

    build: () => {
        if (typeof window !== 'undefined' && !localStorage.getItem(LOCAL_STORAGE_KEY)) {
             saveUsers(initialUsers);
             users = initialUsers;
             console.log("UserMocksGrupo6.build() - Mocks de usuários do Grupo 6 carregados no localStorage.");
        } else if (typeof window !== 'undefined') {
            console.log("UserMocksGrupo6.build() - Mocks de usuários do Grupo 6 já existem ou foram carregados.");
        }
    }
};

export default UserMocksGrupo6;
