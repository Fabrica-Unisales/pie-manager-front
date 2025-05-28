export default class EstandesMock {
  static build() {
    const estandes = [
      {
        id: "EST-001",
        localizacao: "Quadra Principal",
        projeto_horario: [
          { id: 1, horario: "09:00", projeto_id: "PROJ-001" },
          { id: 2, horario: "10:00", projeto_id: "PROJ-002" }
        ]
      },
      {
        id: "EST-002",
        localizacao: "Salesinho",
        projeto_horario: [
          { id: 3, horario: "11:00", projeto_id: "PROJ-003" },
          { id: 4, horario: "12:00", projeto_id: "PROJ-004" }
        ]
      }
    ];

    localStorage.setItem("estandes", JSON.stringify(estandes));
  }
}