import { saveToLocalStorage, getFromLocalStorage } from '../../../utils/localStorageService';

export const ADD_CAR = 'ADD_CAR';
export const UPDATE_CAR = 'UPDATE_CAR';
export const DELETE_CAR = 'DELETE_CAR';

export const addCar = (car) => {
  const cars = getFromLocalStorage('cars') || [];
  cars.push(car);
  saveToLocalStorage('cars', cars); 
  return { type: ADD_CAR, payload: car };
};

export const updateCar = (car) => {
  const cars = getFromLocalStorage('cars') || [];
  const updatedCars = cars.map((c) => (c.id === car.id ? car : c));
  saveToLocalStorage('cars', updatedCars); 
  return { type: UPDATE_CAR, payload: car };
};

export const deleteCar = (id) => {
  const cars = getFromLocalStorage('cars') || [];
  const updatedCars = cars.filter((car) => car.id !== id);
  saveToLocalStorage('cars', updatedCars);
  return { type: DELETE_CAR, payload: id };
};