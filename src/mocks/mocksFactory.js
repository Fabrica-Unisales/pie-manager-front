import ItemsMocks from './ItemsMocks.js';
import UsuariosMocks from './UsuariosMocks.js';
import AvaliacoesMocks from './AvaliacoesMocks.js';

const builds = [];
builds.push(UsuariosMocks);
builds.push(ItemsMocks);
builds.push(AvaliacoesMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
