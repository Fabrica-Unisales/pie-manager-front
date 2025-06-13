export default class estandesMocks {
    static build() {
        const data = [
            {
                id: 1,
                name: 'Estande 1',
                localizacao: 'Estande 1',
                horario_projeto: [{ id: 1, horario: '10:00', projeto_id: "1" }]      
            },
            {
                id: 2,
                name: 'Estande 2',
                localizacao: 'Estande 2',
                horario_projeto: [{ id: 2, horario: '10:00', projeto_id: "2" }] 
            },
            {
                id: 3,
                name: 'Estande 3',
                localizacao: 'Estande 3',
                horario_projeto: [{ id: 3, horario: '10:00', projeto_id: "3" }]    
            },
            {
                id: 4,
                name: 'Estande 4',
                localizacao: 'Estande 4',
                horario_projeto: [{ id: 4, horario: '10:00', projeto_id: "4" }]    
            },  
        ];

        const estandes = {data : data, nextId: 5, length: 3};
        
        localStorage.setItem('estandes', JSON.stringify(estandes));
    }
}