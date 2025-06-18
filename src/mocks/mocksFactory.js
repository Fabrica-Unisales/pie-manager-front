import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import ProjetosMocks from './ProjetoMocks.js';
import CursosMocks from './cursoMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(ProjetosMocks);
builds.push(CursosMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
