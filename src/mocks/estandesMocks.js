export default class EstandesMocks {
    static build() {
        const data = [
            {
                id: 1,
                localizacao: 'Rua 1',
                horario_projeto: [{id: 1, horario: '10:00', projeto_id: '1'}]
            },
            {
                id: 2,
                localizacao: 'Rua 2',
                horario_projeto: [{id: 3, horario: '12:00', projeto_id: '2'}]
            },
            {
                id: 3,
                localizacao: 'Rua 3',
                horario_projeto: [{id: 5, horario: '14:00', projeto_id: '3'}]
            },
            {
                id: 4,
                localizacao: 'Rua 4',
                horario_projeto: [{id: 7, horario: '16:00', projeto_id: '4'}]
            },
        ];

        const estandes = {data : data, nextId: 5, length: 3};
        
        localStorage.setItem('estandes', JSON.stringify(estandes));
    }
}