import ItemsMocks from './ItemsMocks.js';
import UsersMocks from './UsuariosMocks.js';

const builds = [];
builds.push(ItemsMocks);
builds.push(UsersMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
