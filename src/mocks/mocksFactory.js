import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import ControleAvaliacaoMocks from './controleAvaliacaoMocks.js';
import ProjetoMocks from './projetoMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(ControleAvaliacaoMocks); 
builds.push(ProjetoMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}