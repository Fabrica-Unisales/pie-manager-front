export default class UsuariosMocks {
    static build() {
        const data = [
            {
                id: '1',
                nome: 'João Silva',
                email: 'joao.silva@email.com',
                senha: '123456',
                matricula: '2023001',
                usuario: 'joao.silva',
                tipo: 'aluno'
            },
            {
                id: '2',
                nome: 'Maria Oliveira',
                email: 'maria.oliveira@email.com',
                senha: 'abcdef',
                matricula: '2023002',
                usuario: 'maria.oliveira',
                tipo: 'Professor'
            },
            {
                id: '3',
                nome: 'Carlos Souza',
                email: 'carlos.souza@email.com',
                senha: 'senha789',
                matricula: '2023003',
                usuario: 'carlos.souza',
                tipo: 'Coordenador'
            },
            {
                id: '4',
                nome: 'Fernanda Lima',
                email: 'fernanda.lima@email.com',
                senha: 'pass1234',
                matricula: '2023004',
                usuario: 'fernanda.lima',
                tipo: 'Avaliador externo'
            },
            {
                id: '5',
                nome: 'Ademir',
                email: 'administrador@email.com',
                senha: 'admin',
                matricula: '000000',
                usuario: 'admin',
                tipo: 'Coordenador'
            },
        ];
        const usuarios = { data, nextId: 6, length: data.length };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}
