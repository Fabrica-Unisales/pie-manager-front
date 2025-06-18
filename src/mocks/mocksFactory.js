import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import CursoMocks from './CursoMocks.js';
// import TurmaMocks from './TurmaMocks.js';
import UsuariosMock from './UsuariosMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(CursoMocks);
// builds.push(TurmaMocks);
builds.push(UsuariosMock)

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
