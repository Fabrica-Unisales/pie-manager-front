export default class projetosMocks{
 static build() {
     const data = [
         { id: '1', titulo: 'exemplo', descricao:'exemplo de um projeto', id_turma:'', id_professor:'',
            listaAlunos:[{id: '0', nome: 'expemplo', email: 'exemplo@email.com', senha: '', matricula: '',
            usuario: '', tipo: 'Aluno'},]},
         { id:'2', titulo:'engenharia', descricao:'projeto de engenharia', id_turma:'3', id_professor:'2', 
          listaAlunos:[
           {id: '1', nome: 'João Silva', email: 'joao.silva@email.com', senha: '123456', matricula: '2023001',
           usuario: 'joao.silva', tipo: 'Aluno'}, {id: '6', nome: 'Maria', email: 'maria@email.com', senha: '1656', 
           matricula: '2025551', usuario: 'maria', tipo: 'Aluno'}
          ]   
         },
     ];

     const projetos = { data, nextId: 3, length: data.length };
     localStorage.setItem('projetos', JSON.stringify(projetos));
 }
}