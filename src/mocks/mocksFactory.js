import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import UsuariosMocks from './usuarioMocks.js';
import ProjetosMocks from './ProjetosMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(UsuariosMocks);
builds.push(ProjetosMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
