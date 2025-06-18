"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <h1>Gestão de Cursos e Turmas</h1>
      <button onClick={() => router.push("/auth/controleCursosTurmas/cursos")}>
        Gerenciar Cursos
      </button>
      <button onClick={() => router.push("/auth/controleCursosTurmas/turmas")}>
        Gerenciar Turmas
      </button>
    </div>
  );
}
