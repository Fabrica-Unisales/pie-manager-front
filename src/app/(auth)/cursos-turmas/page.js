'use client';
import { useEffect, useState } from 'react';

const ControleDeAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const dados = localStorage.getItem('alunos');
    if (dados) {
      setAlunos(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alunos', JSON.stringify(alunos));
  }, [alunos]);

  const adicionarOuAtualizarAluno = () => {
    if (!nome || !matricula || !email) {
      alert('Preencha todos os campos.');
      return;
    }

    const novoAluno = { nome, matricula, email };

    if (editIndex !== null) {
      const atualizados = [...alunos];
      atualizados[editIndex] = novoAluno;
      setAlunos(atualizados);
      setEditIndex(null);
    } else {
      setAlunos([...alunos, novoAluno]);
    }

    setNome('');
    setMatricula('');
    setEmail('');
  };

  const editarAluno = (index) => {
    const aluno = alunos[index];
    setNome(aluno.nome);
    setMatricula(aluno.matricula);
    setEmail(aluno.email);
    setEditIndex(index);
  };

  const excluirAluno = (index) => {
    if (confirm('Deseja realmente excluir este aluno?')) {
      const atualizados = alunos.filter((_, i) => i !== index);
      setAlunos(atualizados);
    }
  };

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    aluno.matricula.toLowerCase().includes(pesquisa.toLowerCase()) ||
    aluno.email.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Menu lateral */}
      <aside style={{ width: '250px', borderRight: '1px solid black', padding: '16px', fontSize: '14px' }}>
        <div style={{ marginBottom: '24px' }}>
          <button style={{ fontSize: '24px' }}>☰</button>
        </div>
        <ul>
          <li><strong>Usuarios</strong>
            <ul style={{ marginLeft: '16px', listStyleType: 'disc' }}>
              <li>Controle de Alunos</li>
              <li>Controle de Professores</li>
              <li>Controle de Coordenadores</li>
              <li>Controle de Administradores</li>
              <li>Controle de Avaliadores de Externos</li>
            </ul>
          </li>
          <li><strong>Turmas</strong>
            <ul style={{ marginLeft: '16px', listStyleType: 'disc' }}>
              <li>Controle de cursos</li>
              <li>Controle de turmas</li>
              <li>Controle de períodos</li>
            </ul>
          </li>
          <li><strong>Projetos</strong>
            <ul style={{ marginLeft: '16px', listStyleType: 'disc' }}>
              <li>Controle de projetos</li>
            </ul>
          </li>
          <li><strong>Evento</strong>
            <ul style={{ marginLeft: '16px', listStyleType: 'disc' }}>
              <li>Controle de avaliações professores</li>
              <li>Controle de avaliações externas</li>
              <li>Controle de estandes</li>
              <li>Controle de horário de apresentações</li>
            </ul>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600' }}>Controle de Alunos</h1>
        </div>

        {/* Formulário */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button
            onClick={adicionarOuAtualizarAluno}
            style={{ backgroundColor: '#4f46e5', color: 'white', padding: '8px 24px', borderRadius: '4px' }}
          >
            {editIndex !== null ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>

        {/* Pesquisa */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Pesquisar</label>
          <input
            type="text"
            placeholder="Pesquisar por nome, matrícula ou email"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            style={{ width: '100%', padding: '8px 16px', backgroundColor: '#eadada', borderRadius: '9999px' }}
          />
        </div>

        {/* Tabela */}
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>nome</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>matricula</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>email</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{aluno.nome}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{aluno.matricula}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{aluno.email}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => editarAluno(index)} style={{ backgroundColor: '#60a5fa', color: 'white', padding: '4px 12px', marginRight: '8px', borderRadius: '4px' }}>editar</button>
                  <button onClick={() => excluirAluno(index)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '4px' }}>excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ControleDeAlunos;
