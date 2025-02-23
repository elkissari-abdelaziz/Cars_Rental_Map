import initialState from '../db.js';

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case LOGIN:
      return {...action.payload,isLoggedIn:true}
      

    case LOGOUT:
      return  {...action.payload, isLoggedIn: false } 
  
    default:
      return state;
  }
};

export default authReducer;