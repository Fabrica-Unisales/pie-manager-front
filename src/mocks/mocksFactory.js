import ItemsMocks from './ItemsMocks.js';
import UserMocks from './UserMocks.js';
import CursoMocks from './CursoMocks.js';
import TurmaMocks from './TurmaMocks.js';

const builds = [];
builds.push(UserMocks);
builds.push(ItemsMocks);
builds.push(CursoMocks);
builds.push(TurmaMocks);

export function buildMocks() {
    builds.forEach((build) => {
        build.build();
    });
}
