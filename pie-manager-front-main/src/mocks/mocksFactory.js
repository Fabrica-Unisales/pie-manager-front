import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
