import { combineReducers } from 'redux';
import authReducer from './authReducer';
import carReducer from './carReducer';
import reservationReducer from './reservationReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({

  auth: authReducer,
  cars: carReducer,
  reservations: reservationReducer,
  users: userReducer

});

export default rootReducer;