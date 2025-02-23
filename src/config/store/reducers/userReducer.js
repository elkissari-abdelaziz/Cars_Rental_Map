import initialState from '../db';

const userReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case 'REGISTER':
      return [...state, action.payload];
    case 'UPDATE_USER':
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};

export default userReducer;