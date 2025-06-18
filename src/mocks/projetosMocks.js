export default class projetosMocks{
 static build() {
     const data = [
         { id: '1', titulo: 'exemplo', descricao:'exemplo de um projeto', id_turma:'', id_professor:'',
            listaAlunos:['expemplo']},
         { id:'2', titulo:'engenharia', descricao:'projeto de engenharia', id_turma:'3', id_professor:'2', 
          listaAlunos:[
           'João Silva', 'Maria'
          ]   
         },
     ];

     const projetos = { data, nextId: 3, length: data.length };
     localStorage.setItem('projetos', JSON.stringify(projetos));
 }
}