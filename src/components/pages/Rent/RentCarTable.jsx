import { useSelector } from 'react-redux';
import { useReservation } from './hooks/useReservation.js';
import { Button } from '../../ui/button'; 

const RentCarTable = () => {
  const loggedInUser = useSelector(state => state.auth.user);

  const reservations = useSelector(state => state.reservations);
  const cars = useSelector(state => state.cars);
  const users = useSelector(state => state.users);

  const { handleApprove, handleReject } = useReservation();

  const myCars = cars.filter((car) => car.owner_Id === loggedInUser.id);

  const filteredReservations = reservations.filter((reservation) => {
    for (const car of myCars) {
      if (car.id === reservation.carId) {
        return true; 
      }
    }
    return false;
  });

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-center text-3xl text-[#313848] font-bold mb-6">Handle My Rent</h3>
      <hr className="mb-6 border-gray-300" />

      {filteredReservations.length > 0 ? (
        <>
          <table className="w-full hidden md:table bg-[#f2efe9] border border-solid">
            <thead className="bg-red-100">
              <tr>
                <th className="p-3 text-center">User Name</th>
                <th className="p-3 text-center">Car Model</th>
                <th className="p-3 text-center">Dates</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((request) => {
                const user = users.find((u) => u.id === request.userId) || { name: "Unknown User" };
                const car = cars.find((car) => car.id === request.carId);

                return (
                  <tr key={request.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-center">{user.name}</td>
                    <td className="p-3 text-center">{car ? `${car.brand}-${car.model}` : "Unknown Car"}</td>
                    <td className="p-3 text-center">{request.startDate} to {request.endDate}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`font-bold ${
                          request.status === "pending"
                            ? "text-yellow-500"
                            : request.status === "rejected"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Button
                        disabled={request.status !== "pending"}
                        onClick={() => handleApprove(request, filteredReservations)}
                        className="mr-2 bg-green-500 hover:bg-green-600 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        disabled={request.status !== "pending"}
                        onClick={() => handleReject(request.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="md:hidden space-y-4">
            {filteredReservations.map((request) => {
              const user = users.find((u) => u.id === request.userId) || { name: "Unknown User" };
              const car = cars.find((car) => car.id === request.carId);

              return (
                <div key={request.id} className="bg-white shadow-lg rounded-lg p-4">
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">User Name:</span> {user.name}
                    </p>
                    <p>
                      <span className="font-medium">Car Model:</span> {car ? `${car.brand}-${car.model}` : "Unknown Car"}
                    </p>
                    <p>
                      <span className="font-medium">Dates:</span> {request.startDate} to {request.endDate}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`font-bold ${
                          request.status === "pending"
                            ? "text-yellow-500"
                            : request.status === "rejected"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {request.status}
                      </span>
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        disabled={request.status !== "pending"}
                        onClick={() => handleApprove(request, filteredReservations)}
                        className="bg-green-500 hover:bg-green-600 text-white flex-1"
                      >
                        Approve
                      </Button>
                      <Button
                        disabled={request.status !== "pending"}
                        onClick={() => handleReject(request.id)}
                        className="bg-red-500 hover:bg-red-600 text-white flex-1"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h4 className="text-center text-red-500 w-50 font-bold mx-auto">You have no reservations yet.</h4>
      )}
    </div>
  );
};

export default RentCarTable;