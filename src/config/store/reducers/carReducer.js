import initialState from '../db.js';


const carReducer = (state = initialState.cars, action) => {
  switch (action.type) {
    case 'ADD_CAR':
      return [...state, action.payload];
    case 'UPDATE_CAR':
      return state.map((car) =>
        car.id === action.payload.id ? action.payload : car
      )

    case 'DELETE_CAR':
      return state.filter((car) => car.id !== action.payload);
    default:
      return state;
  }
};

export default carReducer;