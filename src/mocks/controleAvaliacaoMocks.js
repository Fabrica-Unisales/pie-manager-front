export default class ControleAvaliacaoMocks {
    static build() {
        const controleAvaliacao = {
            data: [
                {
                    id: '1',
                    projeto_id: 'proj-001',
                    avaliador_id: 'aE-fernando',
                    nota: 8.5,
                    comentario: 'Excelente desempenho no projeto.',
                },
                {
                    id: '2',
                    projeto_id: 'proj-002',
                    avaliador_id: 'aE-cintia',
                    nota: 7.0,
                    comentario: 'Bom trabalho, mas com pontos a melhorar.',
                },
                {
                    id: '3',
                    projeto_id: 'proj-003',
                    avaliador_id: 'aE-juliana',
                    nota: 6.0,
                    comentario: 'Faltou clareza na apresentação.',
                },
                {
                    id: '4',
                    projeto_id: 'proj-004',
                    avaliador_id: 'aE-paulo',
                    nota: 9.0,
                    comentario: 'Apresentação técnica excelente.',
                },
                {
                    id: '5',
                    projeto_id: 'proj-005',
                    avaliador_id: 'aE-raquel',
                    nota: 10.0,
                    comentario: 'Trabalho impecável!',
                },
                {
                    id: '6',
                    projeto_id: 'proj-006',
                    avaliador_id: 'aE-felipe',
                    nota: 5.5,
                    comentario: 'Apresentação fraca e pouco conteúdo.',
                },
                {
                    id: '7',
                    projeto_id: 'proj-007',
                    avaliador_id: 'aE-marcos',
                    nota: 7.8,
                    comentario: 'Bom projeto, mas faltou documentação.',
                }
            ],
            nextId: 8,
            length: 7
        };

        localStorage.setItem('controleAvaliacao', JSON.stringify(controleAvaliacao));
    }
}
