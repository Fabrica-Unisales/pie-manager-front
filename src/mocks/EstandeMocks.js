const EstandeMocks = {
 build: () => {
   const data = [];

   const projetos = [
     { id: 'P001' },
     { id: 'P002' },
     { id: 'P003' },
   ];

   const avaliadores = [
     { id: 'A101' },
     { id: 'A102' },
     { id: 'A103' },
   ];

   const mock = {
     data,
     projetos,
     avaliadores,
     nextId: 1,
     length: 0,
   };

   localStorage.setItem('estandes', JSON.stringify(mock));
 }
};

export default EstandeMocks;
