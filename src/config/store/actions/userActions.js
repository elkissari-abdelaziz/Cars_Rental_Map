import { getFromLocalStorage, saveToLocalStorage } from "../../../utils/localStorageService";

export const REGISTER = 'REGISTER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const register = (user) => {
  const newUser = {
    id: Date.now(),
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role || 'user',
  };

  const users = getFromLocalStorage('users') || [];
  users.push(newUser);
  saveToLocalStorage('users', users);

  return {
    type: REGISTER,
    payload: newUser,
  };


};

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});