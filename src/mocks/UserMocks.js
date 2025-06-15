export default class UserMocks{
    static build() {
        const users = {
            data: [
                { username: 'admin@admin', password: 'admin' },
                { username: 'user2', password: 'password2' },
                { username: 'user3', password: 'password3' },

                {
                    id: 'p-ranya',
                    nome: 'Prof Ranya Castro',
                    username: 'ranya@prof',
                    password: '123',
                    tipo: 'Professor'
                },
                {
                    id: 'p-kelly',
                    nome: 'Prof Kelly Soares',
                    username: 'kelly@prof',
                    password: '123',
                    tipo: 'Professor'
                },
                {
                    id: 'p-marciano',
                    nome: 'Prof Marciano Luz',
                    username: 'marciano@prof',
                    password: '123',
                    tipo: 'Professor'
                },
                {
                    id: 'p-samira',
                    nome: 'Prof Samira Dias',
                    username: 'samira@prof',
                    password: '123',
                    tipo: 'Professor'
                },
                {
                    id: 'p-heitor',
                    nome: 'Prof Heitor Ramos',
                    username: 'heitor@prof',
                    password: '123',
                    tipo: 'Professor'
                },
                {
                    id: 'p-larissa',
                    nome: 'Prof Larissa Melo',
                    username: 'larissa@prof',
                    password: '123',
                    tipo: 'Professor'
                },
                {
                    id: 'aE-fernando',
                    nome: 'Avaliador Fernando Dias',
                    username: 'fernando@avaliador',
                    password: '123',
                    tipo: 'AvaliadorExterno'
                },
                {
                    id: 'aE-cintia',
                    nome: 'Avaliadora Cíntia Lopes',
                    username: 'cintia@avaliador',
                    password: '123',
                    tipo: 'AvaliadorExterno'
                },
                {
                    id: 'aE-leonardo',
                    nome: 'Avaliador Leonardo Faria',
                    username: 'leonardo@avaliador',
                    password: '123',
                    tipo: 'AvaliadorExterno'
                }   
            ],
            nextId: 27, 
            length: 26
        };
        localStorage.setItem('users', JSON.stringify(users));
    }
}