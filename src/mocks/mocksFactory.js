import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import ProjetosMocks from './ProjetosMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(ProjetosMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
