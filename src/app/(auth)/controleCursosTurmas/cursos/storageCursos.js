const KEY = "cursos";

export function getCursos() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function getCurso(id) {
  const cursos = getCursos();
  return cursos.find((curso) => curso.id === id);
}

export function salvarCurso(curso) {
  const cursos = getCursos();
  const index = cursos.findIndex((c) => c.id === curso.id);

  if (index === -1) {
    cursos.push(curso);
  } else {
    cursos[index] = curso;
  }

  localStorage.setItem(KEY, JSON.stringify(cursos));
}

export function deletarCurso(id) {
  const cursos = getCursos().filter((curso) => curso.id !== id);
  localStorage.setItem(KEY, JSON.stringify(cursos));
}
