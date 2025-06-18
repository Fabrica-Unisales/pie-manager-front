import UserMocks from './UserMocks.js';

export default class TurmaMocks {
    static build() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}').data || [];
        const turmas = [
            {
                id: '1',
                curso_id: '1',
                periodo_id: '1',
                ano: 2025,
                semestre: 1,
                professor: usuarios[5] || { id: '5', nome: 'Fernanda Torres' },
                listaAlunos: [usuarios[4] || { id: '5', nome: 'Aluno A' }, usuarios[5] || { id: '6', nome: 'Aluno B' }]
            },
            {
                id: '2',
                curso_id: '1',
                periodo_id: '2',
                ano: '2025',
                semestre: 2,
                professor: usuarios[6] || { id: '2', nome: 'Prof. Maria' },
                listaAlunos: [usuarios[7] || { id: '8', nome: 'Aluno C' }, usuarios[8] || { id: '9', nome: 'Aluno D' }]
            },
            {
                id: '3',
                curso_id: '2',
                periodo_id: '1',
                ano: 2025,
                semestre: 1,
                professor: usuarios[9] || { id: '2', nome: 'Prof. Maria' },
                listaAlunos: [usuarios[10] || { id: '11', nome: 'Aluno E' }]
            },
            {
                id: '4',
                curso_id: '3',
                periodo_id: '1',
                ano: 2025,
                semestre: 1,
                professor: usuarios[11] || { id: '2', nome: 'Prof. Maria' },
                listaAlunos: [usuarios[12] || { id: '13', nome: 'Aluno F' }, usuarios[13] || { id: '14', nome: 'Aluno G' }]
            },
            {
                id: '5',
                curso_id: '3',
                periodo_id: '2',
                ano: 2025,
                semestre: 2,
                professor: usuarios[14] || { id: '5', nome: 'Prof. Fernanda' },
                listaAlunos: [usuarios[15] || { id: '16', nome: 'Aluno H' }]
            }
        ];
        const data = { data: turmas, nextId: 6, length: 5 };
        localStorage.setItem('turmas', JSON.stringify(data));
    }
}