export default class AvaliacoesMocks {
    static build() {
        const data = [
            {
                id: '1',
                projeto_id: '1',
                avaliador_id: '1',
                nota: 8.5,
                comentario: 'Projeto bem estruturado e apresentado.'
            },
            {
                id: '2',
                projeto_id: '2',
                avaliador_id: '2',
                nota: 7.0,
                comentario: 'Faltou detalhamento na documentação.'
            },
            {
                id: '3',
                projeto_id: '3',
                avaliador_id: '3',
                nota: 9.2,
                comentario: 'Excelente inovação e execução.'
            },
            {
                id: '4',
                projeto_id: '4',
                avaliador_id: '1',
                nota: 6.8,
                comentario: 'Apresentação confusa, mas boa ideia.'
            },
            {
                id: '5',
                projeto_id: '5',
                avaliador_id: '2',
                nota: 8.0,
                comentario: 'Documentação completa e clara.'
            },
            {
                id: '6',
                projeto_id: '6',
                avaliador_id: '3',
                nota: 7.5,
                comentario: 'Execução adequada, faltou inovação.'
            }
        ];
        const avaliacoes = { data, nextId: 7, length: data.length };
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    }
}
                    