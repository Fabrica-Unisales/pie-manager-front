import UserMocks from './UserMocks.js';

export default class TurmaMocks {
    static build() {
        const users = JSON.parse(localStorage.getItem('users') || '{}').data || [];
        const turmas = [
            {
                id: '1',
                curso_id: '1',
                periodo_id: '1',
                ano: 2025,
                semestre: 1,
                professor: users[3] || { id: '4', name: 'Prof. Ana' },
                listaAlunos: [users[4], users[5]]
            },
            {
                id: '2',
                curso_id: '1',
                periodo_id: '2',
                ano: 2025,
                semestre: 2,
                professor: users[6] || { id: '7', name: 'Prof. Carlos' },
                listaAlunos: [users[7], users[8]]
            },
            {
                id: '3',
                curso_id: '2',
                periodo_id: '1',
                ano: 2025,
                semestre: 1,
                professor: users[9] || { id: '10', name: 'Prof. Maria' },
                listaAlunos: [users[10]]
            },
            {
                id: '4',
                curso_id: '3',
                periodo_id: '1',
                ano: 2025,
                semestre: 1,
                professor: users[11] || { id: '12', name: 'Prof. João' },
                listaAlunos: [users[12], users[13]]
            },
            {
                id: '5',
                curso_id: '3',
                periodo_id: '2',
                ano: 2025,
                semestre: 2,
                professor: users[14] || { id: '15', name: 'Prof. Lucas' },
                listaAlunos: [users[15]]
            }
        ];
        const data = { data: turmas, nextId: 6, length: 5 };
        localStorage.setItem('turmas', JSON.stringify(data));
    }
}