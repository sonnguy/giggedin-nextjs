export const SET_USER_DATA = 'SET_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';

export const setUserData = (data) => {
  localStorage.setItem('USER_DATA', JSON.stringify(data));
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};

export const removeUserData = () => {
  localStorage.removeItem('USER_DATA');
  return {
    type: REMOVE_USER_DATA,
    payload: {},
  };
};
