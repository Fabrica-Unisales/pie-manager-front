import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import AvaliacoesMocks from './AvaliacoesMocks.js';
import UsuariosMocks from './usuariosMocks.js';
import projetosMocks from './projetosMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(AvaliacoesMocks);
builds.push(UsuariosMocks);
builds.push(projetosMocks);


export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
