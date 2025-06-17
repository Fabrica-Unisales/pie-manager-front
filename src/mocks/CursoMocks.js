import UserMocks from './UserMocks.js';

export default class CursoMocks {
    static build() {
        const users = JSON.parse(localStorage.getItem('users') || '{}').data || [];
        const cursos = [
            {
                id: '1',
                nome: 'Ciência da Computação',
                coordenador_id: users[0]?.id || '1',
                listaTurmas: ['1', '2']
            },
            {
                id: '2',
                nome: 'Engenharia Civil',
                coordenador_id: users[1]?.id || '2',
                listaTurmas: ['3']
            },
            {
                id: '3',
                nome: 'Administração',
                coordenador_id: users[2]?.id || '3',
                listaTurmas: ['4', '5']
            }
        ];
        const data = { data: cursos, nextId: 4, length: 3 };
        localStorage.setItem('cursos', JSON.stringify(data));
    }
}