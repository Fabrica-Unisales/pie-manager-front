const mockTurmas = {
  data: [
    {
      id: '1',
      curso_id: 'MAT101',
      periodo_id: '2025-1',
      ano: 2025,
      semestre: 1,
      professor_id: 'P001',
      listaAlunos: ['A001', 'A002', 'A003'],
    },
    {
      id: '2',
      curso_id: 'FIS102',
      periodo_id: '2025-1',
      ano: 2025,
      semestre: 1,
      professor_id: 'P002',
      listaAlunos: ['A004', 'A005'],
    },
    {
      id: '3',
      curso_id: 'QUI103',
      periodo_id: '2025-2',
      ano: 2025,
      semestre: 2,
      professor_id: 'P003',
      listaAlunos: ['A006', 'A007', 'A008'],
    },
    {
      id: '4',
      curso_id: 'HIS104',
      periodo_id: '2026-1',
      ano: 2026,
      semestre: 1,
      professor_id: 'P004',
      listaAlunos: ['A009', 'A010'],
    },
    {
      id: '5',
      curso_id: 'BIO105',
      periodo_id: '2026-2',
      ano: 2026,
      semestre: 2,
      professor_id: 'P001',
      listaAlunos: ['A011', 'A012', 'A013'],
    },
  ],
  nextId: 6,
  length: 5,
};

const alunosNomes = {
  'A001': 'Carlos Almeida',
  'A002': 'Fernanda Souza',
  'A003': 'Lucas Santos',
  'A004': 'Mariana Oliveira',
  'A005': 'Roberto Lima',
  'A006': 'Juliana Mendes',
  'A007': 'Felipe Costa',
  'A008': 'Camila Rocha',
  'A009': 'Ana Beatriz',
  'A010': 'Ricardo Moreira',
  'A011': 'Eduardo Pereira',
  'A012': 'Patrícia Vieira',
  'A013': 'Mateus Freitas',
};

localStorage.setItem('turmas', JSON.stringify(mockTurmas));
localStorage.setItem('alunos', JSON.stringify(alunosNomes));
