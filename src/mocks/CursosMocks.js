// src/mocks/CursosMocks.ts
export default class CursosMocks {
  static build() {
    const data = [
      {
        id: 'c-1',
        nome: 'Engenharia de Software',
        coordenador_id: '201',
        listaTurmas: [
          {
            id: 't-1',
            nome: 'ESW 2025/1',
            periodo: '2025.1',
            semestre: 1,
          },
          {
            id: 't-2',
            nome: 'ESW 2025/2',
            periodo: '2025.2',
            semestre: 2,
          },
        ],
      },
      {
        id: 'c-2',
        nome: 'Administração',
        coordenador_id: '202',
        listaTurmas: [
          {
            id: 't-3',
            nome: 'ADM 2025/1',
            periodo: '2025.1',
            semestre: 1,
          },
        ],
      },
      {
        id: 'c-3',
        nome: 'Ciência da Computação',
        coordenador_id: '203',
        listaTurmas: [
          {
            id: 't-4',
            nome: 'CC 2025/1',
            periodo: '2025.1',
            semestre: 1,
          },
          {
            id: 't-5',
            nome: 'CC 2025/2',
            periodo: '2025.2',
            semestre: 2,
          },
        ],
      },
      {
        id: 'c-4',
        nome: 'Design Gráfico',
        coordenador_id: '204',
        listaTurmas: [], // ainda sem turmas
      },
    ];

    /* Persistência no mesmo ponto que o app lê */
    localStorage.setItem(
      'cursos',
      JSON.stringify({
        data,
        length: data.length,
      }),
    );
  }
}
