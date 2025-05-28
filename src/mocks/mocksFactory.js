import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import EstandesMock from './estandeMocks.js';
import ProjetosMock from './projetoMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(EstandesMock);
builds.push(ProjetosMock);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
