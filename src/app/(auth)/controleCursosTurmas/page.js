"use client";

import Link from "next/link";

export default function ControleCursosTurmas() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="border border-black rounded-md p-10 bg-white">
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          Controle de Cursos e Turmas
        </h1>

        <div className="flex flex-row gap-16 justify-center">
          <Link href="/controleCursosTurmas/cursos">
            <div className="border-4 border-black px-12 py-8 rounded-md cursor-pointer hover:bg-black hover:text-white transition">
              <span className="text-3xl font-extrabold">CURSOS</span>
            </div>
          </Link>

          <Link href="/controleCursosTurmas/turmas">
            <div className="border-4 border-black px-12 py-8 rounded-md cursor-pointer hover:bg-black hover:text-white transition">
              <span className="text-3xl font-extrabold">TURMAS</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
