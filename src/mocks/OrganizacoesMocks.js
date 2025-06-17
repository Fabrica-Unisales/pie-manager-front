export default class OrganizacoesMocks {
    static build() {
        const data = [
            {
                id: '1',
                key: '1',
                nome: 'Unisales',
                curso_id: '88',
                semestre: '2',
                ano: '2024',
                professor: 'Wilson',
                coordenador_id: '1',
                periodo_id: '2024/01'
            }
        ];
        localStorage.setItem('organizacoes', JSON.stringify(data));
    }
} 