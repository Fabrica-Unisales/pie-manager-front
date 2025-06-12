import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import AvaliacoesMocks from './AvaliacoesMocks.js';
import EstandeMocks from './EstandeMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(AvaliacoesMocks);
builds.push(EstandeMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
