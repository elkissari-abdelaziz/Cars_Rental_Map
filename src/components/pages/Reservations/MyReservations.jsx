import { useDispatch, useSelector } from 'react-redux';

const MyReservations = () => {
  const { reservations, cars, users, auth } = useSelector((state) => state);
  const { id: userId } = auth.user;

  const userReservations = reservations.filter((reservation) => reservation.userId === userId);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'approved':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-3xl text-[#313848] font-bold mb-6">My Reservations</h2>
      <hr className="mb-6 border-gray-300" />

      {userReservations.length === 0 ? (
        <h4 className="text-center text-red-500 w-50 font-bold mx-auto">You have no reservations yet.</h4>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg hidden md:table border bg-[#f2efe9]">
            <thead className="bg-red-200 text-center">
              <tr className="text-center border border-gray-300 ">
                <th className="p-3 text-center">#</th>
                <th className="p-3 text-center">Car</th>
                <th className="p-3 text-center">Owner</th>
                <th className="p-3 text-center">Reservation Date</th>
                <th className="p-3 text-center">Duration</th>
                <th className="p-3 text-center">Location</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {userReservations.map((reservation, index) => {
                const car = cars.find((car) => car.id === reservation.carId);
                const owner = users.find((user) => user.id === car?.owner_Id);

                return (
                  <tr key={reservation.id} className="hover:bg-gray-50 transition-colors text-center">
                    <td className="p-3 border-t">{index + 1}</td>
                    <td className="p-3 border-t">{car ? `${car.brand}-${car.model} ${car.year}` : "Unknown Car"}</td>
                    <td className="p-3 border-t">{car ? owner?.name : "Unknown Owner"}</td>
                    <td className="p-3 border-t">{reservation.date_Reservation}</td>
                    <td className="p-3 border-t">{reservation.duration} {reservation.duration > 1 ? "days" : "day"}</td>
                    <td className="p-3 border-t">{car ? car.location.split(",")[0] + "....." : "N/A"}</td>
                    <td className="p-3 border-t">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="p-3 border-t">{car ? `${reservation.duration * car.price} DH` : "N/A"}</td>
                 
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="md:hidden space-y-4">
            {userReservations.map((reservation, index) => {
              const car = cars.find((car) => car.id === reservation.carId);
              const owner = users.find((user) => user.id === car?.owner_Id);

              return (
                <div key={reservation.id} className="bg-white shadow-lg rounded-lg p-4">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">{car ? `${car.brand}-${car.model} ${car.year}` : "Unknown Car"}</p>
                    <p><span className="font-medium">Owner:</span> {car ? owner?.email : "Unknown Owner"}</p>
                    <p><span className="font-medium">Reservation Date:</span> {reservation.date_Reservation}</p>
                    <p><span className="font-medium">Duration:</span> {reservation.duration} {reservation.duration > 1 ? "days" : "day"}</p>
                    <p><span className="font-medium">Location:</span> {car ? car.location.split(",")[0] + "....." : "N/A"}</p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Total Price:</span> {car ? `${reservation.duration * car.price} DH` : "N/A"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReservations;