export default class TurmaMocks {
    static build() {
        const data = [
            {
                key: '1',
                id: '1',
                curso_id: '1',
                periodo_id: '2023-1',
                ano: 2023,
                semestre: 1,
                professor: {
                    id: '201',
                    nome: 'Dr. Silva'
                },
                listaAlunos: [
                    { id: '301', nome: 'Aluno 1' },
                    { id: '302', nome: 'Aluno 2' }
                ]
            },
            {
                key: '2',
                id: '2',
                curso_id: '1',
                periodo_id: '2023-2',
                ano: 2023,
                semestre: 2,
                professor: {
                    id: '202',
                    nome: 'Dra. Oliveira'
                },
                listaAlunos: [
                    { id: '303', nome: 'Aluno 3' },
                    { id: '304', nome: 'Aluno 4' }
                ]
            }
        ];

        const turmas = { data: data, nextId: 3, length: data.length };
        localStorage.setItem('turmas', JSON.stringify(turmas));
    }

    static getTurmas() {
        const turmas = JSON.parse(localStorage.getItem('turmas'));
        return turmas || { data: [], nextId: 1, length: 0 };
    }

    static addTurma(turma) {
        const turmas = this.getTurmas();
        const newTurma = {
            key: turmas.nextId.toString(),
            id: turmas.nextId.toString(),
            ...turma
        };
        
        turmas.data.push(newTurma);
        turmas.nextId++;
        turmas.length = turmas.data.length;
        
        localStorage.setItem('turmas', JSON.stringify(turmas));
        return newTurma;
    }
}