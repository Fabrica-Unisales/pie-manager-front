import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import UsuariosMocks from './usuarioMocks.js';
import ProjetosMocks from './ProjetosMocks.js';
import EstandeMocks from './estandeMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(UsuariosMocks);
builds.push(ProjetosMocks);
builds.push(EstandeMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
