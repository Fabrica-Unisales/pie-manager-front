"use client";
import { useEffect, useState } from 'react';

export default function ControleDeEstande() {
  const [estandes, setEstandes] = useState([]);
  const [novoEstande, setNovoEstande] = useState({
    id: '',
    projeto_id: '',
    avaliador_id: '',
    nota: '',
    comentario: '',
  });
  const [editandoIndex, setEditandoIndex] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem('estandes');
    if (dados) {
      setEstandes(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('estandes', JSON.stringify(estandes));
  }, [estandes]);

  function handleChange(e) {
    const { name, value } = e.target;
    setNovoEstande({ ...novoEstande, [name]: value });
  }

  function adicionarOuSalvar() {
    if (editandoIndex !== null) {
      const atualizados = [...estandes];
      atualizados[editandoIndex] = { ...novoEstande };
      setEstandes(atualizados);
      setEditandoIndex(null);
    } else {
      const idExistente = estandes.some(e => e.id === novoEstande.id);
      if (idExistente) {
        alert("Já existe um estande com este ID.");
        return;
      }
      setEstandes([...estandes, { ...novoEstande }]);
    }
    setNovoEstande({ id: '', projeto_id: '', avaliador_id: '', nota: '', comentario: '' });
  }

  function editar(index) {
    const item = { ...estandes[index] };
    setNovoEstande(item);
    setEditandoIndex(index);
  }

  function remover(index) {
    const atualizados = [...estandes];
    atualizados.splice(index, 1);
    setEstandes(atualizados);
    if (editandoIndex === index) {
      cancelar();
    }
  }

  function cancelar() {
    setNovoEstande({ id: '', projeto_id: '', avaliador_id: '', nota: '', comentario: '' });
    setEditandoIndex(null);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Controle de Estandes de Avaliação</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          adicionarOuSalvar();
        }}
        style={styles.form}
      >
        <input name="id" placeholder="ID" value={novoEstande.id} onChange={handleChange} required style={styles.input} />
        <input name="projeto_id" placeholder="Projeto ID" value={novoEstande.projeto_id} onChange={handleChange} required style={styles.input} />
        <input name="avaliador_id" placeholder="Avaliador ID" value={novoEstande.avaliador_id} onChange={handleChange} required style={styles.input} />
        <input name="nota" type="number" step="0.1" placeholder="Nota" value={novoEstande.nota} onChange={handleChange} required style={styles.input} />
        <input name="comentario" placeholder="Comentário" value={novoEstande.comentario} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>
          {editandoIndex !== null ? 'Salvar' : 'Adicionar'}
        </button>
        {editandoIndex !== null && (
          <button type="button" onClick={cancelar} style={{ ...styles.button, backgroundColor: '#999' }}>
            Cancelar
          </button>
        )}
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Projeto</th>
            <th>Avaliador</th>
            <th>Nota</th>
            <th>Comentário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estandes.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.projeto_id}</td>
              <td>{item.avaliador_id}</td>
              <td>{item.nota}</td>
              <td>{item.comentario}</td>
              <td>
                <button onClick={() => editar(index)} style={styles.btnEditar}>Editar</button>
                <button onClick={() => remover(index)} style={styles.btnRemover}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  title: {
    color: '#003366',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  input: {
    flex: '1 0 200px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  btnEditar: {
    backgroundColor: '#00509e',
    color: '#fff',
    padding: '6px 10px',
    marginRight: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  btnRemover: {
    backgroundColor: '#cc0000',
    color: '#fff',
    padding: '6px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
