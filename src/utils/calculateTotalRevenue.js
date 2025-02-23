export const calculateTotalRevenue = (reservations, cars) => {
    return reservations
        .filter(reservation => reservation.status === "Confirmed") 
        .reduce((total, reservation) => {
            const car = cars.find(c => c.id === reservation.carId); 
            if (car && car.price) {
                return total + car.price * reservation.duration;
            }
            return total;
        }, 0);
};
