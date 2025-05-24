export default class AvaliacoesMocks {
    static build() {
        const data = [
            {
                id: '1',
                projeto_id: '101',
                avaliador_id: '201',
                nota: 8.5,
                comentario: 'Projeto bem estruturado e apresentado.'
            },
            {
                id: '2',
                projeto_id: '102',
                avaliador_id: '202',
                nota: 7.0,
                comentario: 'Faltou detalhamento na documentação.'
            },
            {
                id: '3',
                projeto_id: '103',
                avaliador_id: '201',
                nota: 9.2,
                comentario: 'Excelente inovação e execução.'
            },
            {
                id: '4',
                projeto_id: '104',
                avaliador_id: '203',
                nota: 6.8,
                comentario: 'Apresentação confusa, mas boa ideia.'
            },
            {
                id: '5',
                projeto_id: '105',
                avaliador_id: '204',
                nota: 8.0,
                comentario: 'Documentação completa e clara.'
            },
            {
                id: '6',
                projeto_id: '106',
                avaliador_id: '202',
                nota: 7.5,
                comentario: 'Execução adequada, faltou inovação.'
            }
        ];
        const avaliacoes = { data, nextId: 7, length: data.length };
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    }
}
                    