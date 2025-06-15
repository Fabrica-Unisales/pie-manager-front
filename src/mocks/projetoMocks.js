export default class ProjetoMocks {
    static build() {
        const projetos = {
            data: [
                {
                    id: 'proj-001',
                    titulo: 'Sistema de Gestão Escolar',
                    descricao: 'Aplicação web para gerenciar turmas, professores e alunos.',
                    id_turma: 'turma-01',
                    id_Professor: 'p-ranya',
                    listaAlunos: ['a-yasmin', 'a-thiago', 'a-camila']
                },
                {
                    id: 'proj-002',
                    titulo: 'App de Saúde Mental',
                    descricao: 'Aplicativo mobile com ferramentas de apoio psicológico.',
                    id_turma: 'turma-02',
                    id_Professor: 'p-kelly',
                    listaAlunos: ['a-enzo', 'a-sofia']
                },
                {
                    id: 'proj-003',
                    titulo: 'Plataforma de Cursos Online',
                    descricao: 'Sistema que permite criação e inscrição em cursos virtuais.',
                    id_turma: 'turma-03',
                    id_Professor: 'p-marciano',
                    listaAlunos: ['a-davi', 'a-juliana', 'a-igor', 'a-mirela']
                },
                {
                    id: 'proj-004',
                    titulo: 'Dashboard de Dados Climáticos',
                    descricao: 'Visualização interativa de dados meteorológicos em tempo real.',
                    id_turma: 'turma-01',
                    id_Professor: 'p-samira',
                    listaAlunos: ['a-caio', 'a-beatriz']
                },
                {
                    id: 'proj-005',
                    titulo: 'Rede Social Acadêmica',
                    descricao: 'Rede social voltada para interação entre estudantes e professores.',
                    id_turma: 'turma-02',
                    id_Professor: 'p-heitor',
                    listaAlunos: ['a-gustavo', 'a-tatiane', 'a-nicolas', 'a-luiza']
                }
            ],
            nextId: 6,
            length: 5
        };
        localStorage.setItem('projetos', JSON.stringify(projetos));
    }
}
