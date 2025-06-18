import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import EstandesMocks from './estandesMocks.js';
import AvaliacoesMocks from './AvaliacoesMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(EstandesMocks);
builds.push(AvaliacoesMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
