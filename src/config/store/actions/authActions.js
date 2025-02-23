import { saveToLocalStorage, removeFromLocalStorage } from "../../../utils/localStorageService";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (user) => {
  
  const authData = { user, isLoggedIn: true };
  saveToLocalStorage('auth', authData);
  return {
    type: LOGIN,
    payload: authData,
  };
};

export const logout = () => {
  removeFromLocalStorage('auth');
  return { type: LOGOUT};
};

