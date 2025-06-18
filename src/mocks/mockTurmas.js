export default class mockTurmas {
  static build() {
    const turmas = [
      {
        id: "2024-ADS-MAT",
        periodo: "2024.1",
        turno: "Matutino",
        curso: "Análise e Desenvolvimento de Sistemas",
      },
      {
        id: "2024-GRH-NOT",
        periodo: "2024.1",
        turno: "Noturno",
        curso: "Gestão de Recursos Humanos",
      },
    ];

    localStorage.setItem('turmas', JSON.stringify(turmas));
  }
}
