export default class AvaliacoesMocks {
    static build() {
      const data = [
        {
          id: '1',
          projeto_id: '201',
          nomeProjeto: 'Sistema de Gestão Escolar',
          avaliador_id: '301',
          nomeAvaliador: 'Prof. João Silva',
          nota: 9.0,
          comentario: 'Apresentação excelente, domínio claro do conteúdo.'
        },
        {
          id: '2',
          projeto_id: '202',
          nomeProjeto: 'Aplicativo de Saúde Mental',
          avaliador_id: '302',
          nomeAvaliador: 'Profa. Maria Oliveira',
          nota: 6.5,
          comentario: 'Boa proposta, mas execução deixou a desejar.'
        },
        {
          id: '3',
          projeto_id: '203',
          nomeProjeto: 'Plataforma de Ensino Online',
          avaliador_id: '303',
          nomeAvaliador: 'Prof. Carlos Souza',
          nota: 7.8,
          comentario: 'Código funcional, mas com poucas explicações técnicas.'
        },
        {
          id: '4',
          projeto_id: '204',
          nomeProjeto: 'Controle de Estoque com RFID',
          avaliador_id: '304',
          nomeAvaliador: 'Profa. Ana Lima',
          nota: 8.7,
          comentario: 'Design de interface muito bem elaborado.'
        },
        {
          id: '5',
          projeto_id: '205',
          nomeProjeto: 'Simulador de Investimentos',
          avaliador_id: '305',
          nomeAvaliador: 'Prof. Lucas Mendes',
          nota: 9.3,
          comentario: 'Solução criativa e com bom embasamento teórico.'
        },
        {
          id: '6',
          projeto_id: '206',
          nomeProjeto: 'Assistente de Compras com IA',
          avaliador_id: '306',
          nomeAvaliador: 'Profa. Fernanda Reis',
          nota: 5.9,
          comentario: 'Faltou clareza na apresentação e testes no sistema.'
        }
      ];
  
      const avaliacoes = {
        data,
        nextId: 7,
        length: data.length
      };
  
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    }
  }
  