import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import mockCursos from './mockCursos.js';
import mockTurmas from './mockTurmas.js';
import ControleAvaliacaoMocks from './controleAvaliacaoMocks.js';
import ProjetoMocks from './projetoMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(mockCursos);
builds.push(mockTurmas);
builds.push(ControleAvaliacaoMocks);
builds.push(ControleAvaliacaoMocks); 
builds.push(ProjetoMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}