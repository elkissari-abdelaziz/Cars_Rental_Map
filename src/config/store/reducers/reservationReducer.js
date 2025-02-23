import initialState from '../db.js';


const reservationReducer = (state = initialState.reservations, action) => {
    switch (action.type) {
        case "ADD_RESERVATION":
            return [...state, action.payload];

        case "APPROVE_RESERVATION":
            return state.map((res) =>
                res.id === action.payload ? { ...res, status: 'approved' } : res
            );

        case "REJECT_RESERVATION":
            return state.map((res) =>
                res.id === action.payload ? { ...res, status: 'rejected' } : res
            );

        default:
            return state;
    }
};

export default reservationReducer;
