import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import UserRegisterMocks from './UserRegisterMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(UserRegisterMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
