export default class CursoMocks {
    static build() {
        const data = [
            {
                key: '1',
                id: '1',
                nome: 'Engenharia de Software',
                coordenador_id: '101',
                listaTurmas: ['1', '2']
            },
            {
                key: '2',
                id: '2',
                nome: 'Ciência da Computação',
                coordenador_id: '102',
                listaTurmas: ['3', '4']
            },
            {
                key: '3',
                id: '3',
                nome: 'Sistemas de Informação',
                coordenador_id: '103',
                listaTurmas: ['5']
            }
        ];

        const cursos = { data: data, nextId: 4, length: data.length };
        localStorage.setItem('cursos', JSON.stringify(cursos));
    }

    static getCursos() {
        const cursos = JSON.parse(localStorage.getItem('cursos'));
        return cursos || { data: [], nextId: 1, length: 0 };
    }

    static addCurso(curso) {
        const cursos = this.getCursos();
        const newCurso = {
            key: cursos.nextId.toString(),
            id: cursos.nextId.toString(),
            ...curso
        };
        
        cursos.data.push(newCurso);
        cursos.nextId++;
        cursos.length = cursos.data.length;
        
        localStorage.setItem('cursos', JSON.stringify(cursos));
        return newCurso;
    }
}