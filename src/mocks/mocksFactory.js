import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import AvaliacoesMocks from './AvaliacoesMocks.js';
import CursosMocks from './CursosMocks.js';
import TurmasMocks from './TurmasMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(AvaliacoesMocks);
builds.push(CursosMocks);
builds.push(TurmasMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
