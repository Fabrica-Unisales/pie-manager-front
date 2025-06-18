"use client";

export class MocksAvaliacaoEstandes {
  static getAvaliacoes() {
    return [
      {
        id: 8,
        projeto_id: 108,
        nomeProjeto: "Projeto Hotel",
        avaliador_id: 208,
        nomeAvaliador: "Fernanda Rocha",
        notaProjeto: 7.8,
        comentario: "Bom trabalho, mas precisa de mais detalhes técnicos.",
      },
      {
        id: 9,
        projeto_id: 109,
        nomeProjeto: "Projeto India",
        avaliador_id: 209,
        nomeAvaliador: "Gustavo Martins",
        notaProjeto: 8.3,
        comentario: "Boa ideia, mas a execução pode ser melhorada.",
      },
      {
        id: 10,
        projeto_id: 110,
        nomeProjeto: "Projeto Juliett",
        avaliador_id: 210,
        nomeAvaliador: "Sofia Torres",
        notaProjeto: 9.8,
        comentario: "Excelente projeto, muito bem desenvolvido e apresentado.",
      },
      {
        id: 11,
        projeto_id: 111,
        nomeProjeto: "Projeto Kilo",
        avaliador_id: 211,
        nomeAvaliador: "Carlos Silva",
        notaProjeto: 6.5,
        comentario: "Ideia interessante, mas faltou clareza na apresentação.",
      },
      {
        id: 12,
        projeto_id: 112,
        nomeProjeto: "Projeto Lima",
        avaliador_id: 212,
        nomeAvaliador: "Ana Costa",
        notaProjeto: 8.0,
        comentario: "Bom projeto, mas precisa de mais pesquisa de mercado.",
      },
      {
        id: 13,
        projeto_id: 113,
        nomeProjeto: "Projeto Mike",
        avaliador_id: 208,
        nomeAvaliador: "Fernanda Rocha",
        notaProjeto: 7.5,
        comentario: "Bom conceito, mas a implementação técnica precisa de ajustes.",
      },
      {
        id: 14,
        projeto_id: 114,
        nomeProjeto: "Projeto November",
        avaliador_id: 209,
        nomeAvaliador: "Gustavo Martins",
        notaProjeto: 8.7,
        comentario: "Muito bom, mas poderia ter mais inovação.",
      },
      {
        id: 15,
        projeto_id: 115,
        nomeProjeto: "Projeto Oscar",
        avaliador_id: 210,
        nomeAvaliador: "Sofia Torres",
        notaProjeto: 9.2,
        comentario: "Excelente apresentação e conteúdo.",
      },
      {
        id: 16,
        projeto_id: 116,
        nomeProjeto: "Projeto Papa",
        avaliador_id: 211,
        nomeAvaliador: "Carlos Silva",
        notaProjeto: 6.0,
        comentario: "Faltou clareza na proposta.",
      },
      {
        id: 17,
        projeto_id: 117,
        nomeProjeto: "Projeto Quebec",
        avaliador_id: 212,
        nomeAvaliador: "Ana Costa",
        notaProjeto: 8.4,
        comentario: "Bom trabalho, mas precisa de mais detalhes técnicos.",
      }
    ];
  }

  static getAvaliadores() {
    return [
      {
        id: 208,
        nome: "Fernanda Rocha",
        email: "fernanda.rocha@email.com",
        especialidade: "Desenvolvimento Web"
      },
      {
        id: 209,
        nome: "Gustavo Martins",
        email: "gustavo.martins@email.com",
        especialidade: "Mobile Development"
      },
      {
        id: 210,
        nome: "Sofia Torres",
        email: "sofia.torres@email.com",
        especialidade: "UI/UX Design"
      },
      {
        id: 211,
        nome: "Carlos Silva",
        email: "carlos.silva@email.com",
        especialidade: "Backend Development"
      },
      {
        id: 212,
        nome: "Ana Costa",
        email: "ana.costa@email.com",
        especialidade: "Data Science"
      },
      {
        id: 213,
        nome: "Lucas Almeida",
        email: "lucas.almeida@email.com",
        especialidade: "DevOps"
      },
      {
        id: 214,
        nome: "Mariana Souza",
        email: "mariana.souza@email.com",
        especialidade: "Cloud Computing"
      },
      {
        id: 215,
        nome: "Pedro Lima",
        email: "pedro.lima@email.com",
        especialidade: "Cybersecurity"
      },
      {
        id: 216,
        nome: "Julia Fernandes",
        email: "julia.fernandes@email.com",
        especialidade: "Machine Learning"
      },
      {
        id: 217,
        nome: "Ricardo Pereira",
        email: "ricardo.pereira",
        especialidade: "Blockchain"
      }
    ];
  }
}