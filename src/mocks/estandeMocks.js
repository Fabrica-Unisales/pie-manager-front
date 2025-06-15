export default class EstandesMock {
  static build() {
    const estandes = [
      {
        id: "EST-1",
        localizacao: "Quadra Principal",
        horario_projeto: [
          { id: 1, horario: "09:00-10:00", projeto_id: "PROJ-1" },
          { id: 2, horario: "10:30-11:30", projeto_id: "PROJ-2" }
        ]
      },
      {
        id: "EST-2", 
        localizacao: "Salesinho",
        horario_projeto: [
          { id: 3, horario: "14:00-15:00", projeto_id: "PROJ-3" },
          { id: 4, horario: "15:30-16:30", projeto_id: "PROJ-4" }
        ]
      },
      {
        id: "EST-3",
        localizacao: "Auditório",
        horario_projeto: [
          { id: 5, horario: "08:00-09:00", projeto_id: "PROJ-5" }
        ]
      }
    ];

    localStorage.setItem("estandes", JSON.stringify(estandes));
  }
}