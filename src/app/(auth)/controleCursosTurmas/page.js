"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <h1>CONTROLE DE CURSOS E TURMAS</h1>
      <button onClick={() => router.push("/controleCursosTurmas/cursos")}>
        GERENCIAR CURSOS
      </button>
      <button onClick={() => router.push("/controleCursosTurmas/turmas")}>
        GERENCIAR TURMAS
      </button>
    </div>
  );
}
