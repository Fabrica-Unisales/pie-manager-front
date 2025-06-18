import { usuarios } from "./usuarios";

// Utilitário para buscar usuários por id
const getUsuario = id => usuarios.find(u => u.id === id);

// Dois projetos de exemplo:
export const projetos = [
  {
    id: "p1",
    titulo: "Sistema de Gestão Acadêmica",
    descricao: "Desenvolvimento de um sistema para gerenciar processos acadêmicos.",
    id_turma: "t1",
    id_Professor: "4", // Prof. Daniel Lima
    listaAlunos: [
      getUsuario("1"), // Alice Silva
      getUsuario("2")  // Bruno Souza
    ]
  },
  {
    id: "p2",
    titulo: "App de Controle de Eventos",
    descricao: "Aplicativo para organização e divulgação de eventos universitários.",
    id_turma: "t2",
    id_Professor: "5", // Prof. Elisa Martins
    listaAlunos: [
      getUsuario("3"), // Carla Dias
      getUsuario("1")  // Alice Silva
    ]
  }
];