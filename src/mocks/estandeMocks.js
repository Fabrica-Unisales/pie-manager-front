export default class EstandeMocks {
  static build() {
    const data = [
      {
        id: '1',
        localizacao: 'Quadra Coberta - Estande 1',
        projeto_horario: [
          {
            id: 1,
            horario: '14:00',
            projeto_id: '1',
          },
          {
            id: 2,
            horario: '15:00',
            projeto_id: '2',
          }
        ]
      },
      {
        id: '2',
        localizacao: 'Quadra Coberta - Estande 1',
        projeto_horario: [
          {
            id: 3,
            horario: '19:00',
            projeto_id: '1',
          },
          {
            id: 4,
            horario: '20:00',
            projeto_id: '2',
          }
        ]
      },
      {
        id: '3',
        localizacao: 'Quadra Coberta - Estande 1',
        projeto_horario: [
          {
            id: 5,
            horario: '10:00',
            projeto_id: '1',
          },
          {
            id: 6,
            horario: '11:00',
            projeto_id: '2',
          }
        ]
      }
    ];

    const estandes = { data: data, nextIdH: 7, nextIdE: 4, length: data.length };
    localStorage.setItem('estandes', JSON.stringify(estandes));
  }
}
