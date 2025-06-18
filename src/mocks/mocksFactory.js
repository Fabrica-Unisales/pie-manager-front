import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import CursosMocks from './cursoMocks.js';
import ProjetosMocks from './ProjetoMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(CursosMocks);
builds.push(ProjetosMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}