export default class ProjetosMocks {
   static build () {
    const projetos = [
     {
        key: '1',
        name: 'Projeto A',
        description: 'Descrição do Projeto A',
        price: 100,
        quantity: 10,
        },
       ]
       const Projetos = {data : data, nextId: 24, length: 23};
        
        localStorage.setProjetos('projetos', JSON.stringify(projetos));
    }
   }