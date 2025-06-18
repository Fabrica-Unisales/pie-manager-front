import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import projetomocks from './projetomocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(projetomocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
