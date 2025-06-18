import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import mockCursos from './mockCursos.js';
import mockTurmas from './mockTurmas.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(mockCursos);
builds.push(mockTurmas);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
