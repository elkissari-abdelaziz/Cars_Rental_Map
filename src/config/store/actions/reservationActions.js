import { saveToLocalStorage, getFromLocalStorage } from '../../../utils/localStorageService';

export const ADD_RESERVATION = 'ADD_RESERVATION';
export const APPROVE_RESERVATION = 'APPROVE_RESERVATION';
export const REJECT_RESERVATION = 'REJECT_RESERVATION';


export const addReservation = (reservation) => {
  const reservations = getFromLocalStorage('reservations') || [];
  reservations.push(reservation);
  saveToLocalStorage('reservations', reservations);
  return { type: ADD_RESERVATION, payload: reservation };
};

export const rejectReservation = (id) => {
  const reservations = getFromLocalStorage('reservations') || [];
  const updatedReservations = reservations.map((res) =>
    res.id === id ? { ...res, status: 'rejected' } : res
  );
  saveToLocalStorage('reservations', updatedReservations);

  return { type: REJECT_RESERVATION, payload: id };
};

export const approveReservation = (id) => {
  const reservations = getFromLocalStorage('reservations') || [];
  const updatedReservations = reservations.map((res) =>
    res.id === id ? { ...res, status: 'approved' } : res
  );
  saveToLocalStorage('reservations', updatedReservations);
  return { type: APPROVE_RESERVATION, payload: id };
};