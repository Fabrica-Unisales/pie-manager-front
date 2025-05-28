export default class ProjetosMock{
    static build() {
        const projetos = [
            {
                id: "PROJ-001",
                titulo: "Sistema de Gestão Inteligente",
                descricao: "Plataforma de automação de processos",
                id_turma: "TURMA-01",
                id_Professor: "USER-01",
                listaAlunos: ["USER-02", "USER-03"]
            },
            {
                id: "PROJ-002",
                titulo: "Aplicativo de Saúde e Bem-estar",
                descricao: "App para monitoramento de saúde pessoal",
                id_turma: "TURMA-02",
                id_Professor: "USER-04",
                listaAlunos: ["USER-05", "USER-06"]
            }
        ];

        localStorage.setItem("projetos", JSON.stringify(projetos));
    }}