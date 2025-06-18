'use client';
import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';
import projetosMocks from '@/mocks/projetosMocks';

const ProjetosPage = () => {
  const [projetos, setProjetos] = useState([]);

   useEffect(() => {
     const projetos = JSON.parse(localStorage.getItem('projetos'));
     if (!projetos || !projetos.data || projetos.data.length === 0) {
       projetosMocks.build();
     }
     const dados = JSON.parse(localStorage.getItem('projetos'));
     setProjetos(dados.data || []);
   }, []);

   const handleAddUser = () => {
     window.location.href = '/projetos/new';
   };

   const handleDelete = (id) => {
     const projetos = JSON.parse(localStorage.getItem('projetos')) || { data: [] };
     const novaLista = projetos.data.filter(projeto => projeto.id !== id);
     const novoObj = { ...projetos, data: novaLista, length: novaLista.length };
     localStorage.setItem('projetos', JSON.stringify(novoObj));
     setProjetos(novaLista);
   };

   const columns = [//refazer====================================================
     { title: 'ID', dataIndex: 'id', key: 'id' },
     { title: 'Titulo', dataIndex: 'titulo', key: 'titulo' },
     { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
     { title: 'ID da turma', dataIndex: 'id_turma', key: 'id_turma' },
     { title: 'ID do Professor', dataIndex: 'id_professor', key: 'id_professor' },
     { title: 'Alunos do projeto', dataIndex: 'listaAlunos', key: 'listaAlunos', 
        render: (_, record) => ( <span>
        {record.listaAlunos && Array.isArray(record.listaAlunos) 
         ? record.listaAlunos.map(aluno => aluno || 'Nome não disponível').join(', ')
         : 'Nenhum aluno'}
        </span>)
      }, 
     {
       title: 'Ações',
       key: 'action',
       render: (_, record) => (
         <Space>
           <a href={`/projetos/${record.id}`}>Editar</a>
           <a onClick={() => handleDelete(record.id)} style={{ color: 'red' }}>Excluir</a>
         </Space>
       ),
     },
   ];

   return (
     <div style={{ padding: 24 }}>
       <div style={{ marginBottom: 16, textAlign: 'right' }}>
         <Button type="primary" onClick={handleAddUser}>Adicionar Usuário</Button>
       </div>
       <Table columns={columns} dataSource={projetos} rowKey="id" />
     </div>
   );
};

export default ProjetosPage;