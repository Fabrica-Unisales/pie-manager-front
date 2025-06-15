export default class ProjetosMock {
    static build() {
        const projetos = [
            {
                id: "PROJ-1",
                titulo: "Sistema de Gestão Inteligente",
                descricao: "Plataforma de automação de processos",
                id_turma: "TURMA-1",
                id_Professor: "USER-1",
                listaAlunos: ["USER-2", "USER-3"]
            },
            {
                id: "PROJ-2",
                titulo: "Aplicativo de Saúde e Bem-estar",
                descricao: "App para monitoramento de saúde pessoal",
                id_turma: "TURMA-2",
                id_Professor: "USER-4",
                listaAlunos: ["USER-5", "USER-6"]
            },
            {
                id: "PROJ-3",
                titulo: "Plataforma de E-commerce",
                descricao: "Sistema completo de vendas online",
                id_turma: "TURMA-3",
                id_Professor: "USER-7",
                listaAlunos: ["USER-8", "USER-9"]
            },
            {
                id: "PROJ-4",
                titulo: "Sistema de Gerenciamento de Eventos",
                descricao: "Aplicativo para organização de eventos",
                id_turma: "TURMA-4",
                id_Professor: "USER-10",
                listaAlunos: ["USER-11", "USER-12"]
            },
            {
                id: "PROJ-5",
                titulo: "App de Controle Financeiro",
                descricao: "Aplicativo para gestão de finanças pessoais",
                id_turma: "TURMA-5",
                id_Professor: "USER-13",
                listaAlunos: ["USER-14", "USER-15"]
            }
        ];

        localStorage.setItem("projetos", JSON.stringify(projetos));
    }
}