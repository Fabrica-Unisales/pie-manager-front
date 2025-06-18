const KEY = "cursos";

// 🔍 Listar cursos
export function listarCursos() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  }
  return [];
}

// 💾 Salvar ou atualizar curso
export function salvarCurso(curso) {
  const cursos = listarCursos();
  const index = cursos.findIndex((c) => c.id === curso.id);
  if (index >= 0) {
    cursos[index] = curso; // Atualiza
  } else {
    cursos.push(curso); // Cria novo
  }
  localStorage.setItem(KEY, JSON.stringify(cursos));
}

// 🗑️ Deletar curso
export function excluirCurso(id) {
  const cursos = listarCursos().filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(cursos));
}
