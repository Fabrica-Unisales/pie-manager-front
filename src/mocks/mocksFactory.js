import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import EstandesMocks from './estandesMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(EstandesMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
