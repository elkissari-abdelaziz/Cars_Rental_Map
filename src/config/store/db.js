import { getFromLocalStorage, saveToLocalStorage } from "../../utils/localStorageService";


const users = [{
    id: 1,
    name: "admin",
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin',
},

];

const auth = { user: null, isLoggedIn: false };

const reservations = [];
const cars = [];


const storedUsers = getFromLocalStorage('users');
if (!storedUsers) {
    saveToLocalStorage('users', users);
}

const initialState = {
    auth: getFromLocalStorage('auth') || auth,
    cars: getFromLocalStorage('cars') || cars,
    reservations: getFromLocalStorage('reservations') || reservations,
    users: storedUsers || users,
};

export default initialState;
