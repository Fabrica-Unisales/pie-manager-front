import { MOCK_CURSOS } from "@/mocks/mockCursos";

const STORAGE_KEY = "cursos";

export function listarCursos() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CURSOS));
    return MOCK_CURSOS;
  }
}

export function salvarCurso(curso) {
  const cursos = listarCursos();
  const index = cursos.findIndex((c) => c.id === curso.id);
  if (index !== -1) {
    cursos[index] = curso;
  } else {
    cursos.push(curso);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cursos));
}

export function removerCurso(id) {
  const cursos = listarCursos();
  const atualizados = cursos.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}
