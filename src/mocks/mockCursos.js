export default class mockCursos {
  static build() {
      const cursos = [
          {
              id: "TI01",
              nome: "Análise e Desenvolvimento de Sistemas",
              coordenador: "João Silva",
              area: "TI",
              cargaHoraria: 2000,
              status: "ativo",
          },
          {
              id: "GES01",
              nome: "Gestão de Recursos Humanos",
              coordenador: "Maria Santos",
              area: "Gestão",
              cargaHoraria: 1600,
              status: "ativo",
          },
          {
              id: "ADM01",
              nome: "Administração",
              coordenador: "Carlos Almeida",
              area: "Gestão",
              cargaHoraria: 1800,
              status: "ativo",
          },
      ];

      localStorage.setItem('cursos', JSON.stringify(cursos));
  }
}
