import UserMocksGrupo6 from '../../../mocks/UserMocksGrupo6';

export const fetchUsersGrupo6 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(UserMocksGrupo6.getUsers());
    }, 500);
  });
};

export const addUserGrupo6 = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      UserMocksGrupo6.createUser(user);
      resolve(user);
    }, 500);
  });
};

export const editUserGrupo6 = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      UserMocksGrupo6.updateUser(user);
      resolve(user);
    }, 500);
  });
};

export const removeUserGrupo6 = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      UserMocksGrupo6.deleteUser(id);
      resolve(true);
    }, 500);
  });
};
