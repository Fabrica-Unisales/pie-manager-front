import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import estandesMocks from './estandesMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(estandesMocks);
export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
