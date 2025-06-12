export default class EstandeMocks {
    static build() {
        const data = [
            {
                id: '1',
                localizacao: 'Bloco A - Sala 101',
                horario_projeto: [
                    {
                        id: 1,
                        horario: '09:00',
                        projeto_id: '101'
                    },
                    {
                        id: 2,
                        horario: '10:30',
                        projeto_id: '102'
                    }
                ]
            },
            {
                id: '2',
                localizacao: 'Bloco B - Sala 203',
                horario_projeto: [
                    {
                        id: 3,
                        horario: '14:00',
                        projeto_id: '103'
                    },
                    {
                        id: 4,
                        horario: '15:30',
                        projeto_id: '104'
                    }
                ]
            },
            {
                id: '3',
                localizacao: 'Bloco C - Sala 305',
                horario_projeto: [
                    {
                        id: 5,
                        horario: '11:00',
                        projeto_id: '105'
                    },
                    {
                        id: 6,
                        horario: '13:00',
                        projeto_id: '106'
                    }
                ]
            }
        ];
        const estandes = { data, nextId: 4, length: data.length };
        localStorage.setItem('estandes', JSON.stringify(estandes));
    }
}
                    