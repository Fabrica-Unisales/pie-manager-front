
# Objetivos:

Desenvolver um sistema de gestão de projetos integradores utilizando JavaScript, NextJS e ReactJS, com foco na criação de uma interface gráfica amigável e intuitiva. O sistema deve permitir o cadastro de usuários, organização de cursos, projetos e estandes, utilizando JSON no localStorage para armazenamento dos dados.

# Descrição da Atividade:

Criar um projeto de software com o tema "Sistema de Gestão de Projetos Integradores". Um sistema que permita o gerenciamento de projetos integradores, com funcionalidades como cadastro de usuários, organização de cursos, projetos e estandes.

O sistema deve ter uma interface gráfica amigável e intuitiva, com Controles de cadastro, consulta e edição de dados. 

A turma tera 7 squads, cada uma sera resposavel por desenvolver um sistema completo. Cada integrante da squad seara responsavel por uma parte do sistema.
O sistema deversa ser desenvolvido em JavaScript usando NextJS e ReactJS. nao sera necessario desenvolver o backend e todo armazenamento sera feito em JSON no localStorage.

# Requisitos:

- 1 Controle de Cadastro de Usuario : 
    ```
    id: inteiro
    nome: string
    email: string
    senha_hash: string
    matricula: string
    usuario: string
    tipo: string {Aluno, Professor, Coordenador, AvaliadorExterno}
    ```

- 2 Controle de cadastro de Organização de Cursos e Turmas
    ```
    id: string
    nome: string
    coordenador_id : string
    listaTurmas : inteiros[id: string
    curso_id: string
    periodo_id: string
    ano: int
    semestre: int
    professor: Usuario
    listaAlunos : Usuarios[]
    ```

- 3 Controle de cadastro de Projetos
    ```
    id: string
    titulo: string
    descricao: string
    id_turma: string
    id_Professor: Usuario
    listaAlunos: Usuarios[]{2:5}
    ```

- 4 Controle de Estande de Apresentação

    ```
    id: string
    localizacao: string
    horaraio_projeto: {id:inteiro, horario: string ,projeto_id: string}:[]
    ```

- 5 Controle  de Avaliação
    ```
    id: string
    projeto_id: string
    avaliador_id: string
    nota: float
    comentario: string
    ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
