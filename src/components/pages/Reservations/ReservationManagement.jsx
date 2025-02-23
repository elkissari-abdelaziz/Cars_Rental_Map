import { useDispatch, useSelector } from "react-redux";
import { approveReservation, rejectReservation } from "../../config/store/actions/reservationActions";
import { toast } from "react-toastify";
import { Button } from '../../ui/button'; 

const ReservationManagement = () => {
  const dispatch = useDispatch();

  const reservations = useSelector((state) => state.reservations);
  const currentUser = useSelector((state) => state.auth.user);

  const myReservations = reservations.filter((reserv) => reserv.carId === currentUser.carId);

  const handleApprove = (id) => {
    dispatch(approveReservation(id));
    toast.success("Reservation approved successfully!");
  };

  const handleReject = (id) => {
    dispatch(rejectReservation(id));
    toast.success("Reservation rejected successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Reservation Management</h2>
      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-yellow-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Car ID</th>
            <th className="p-2">User ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myReservations.map((reservation) => (
            <tr key={reservation.id} className="border-b">
              <td className="p-2">{reservation.id}</td>
              <td className="p-2">{reservation.carId}</td>
              <td className="p-2">{reservation.userId}</td>
              <td className="p-2">{reservation.status}</td>
              <td className="p-2">
                {reservation.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleApprove(reservation.id)}
                      className="mr-2"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(reservation.id)}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationManagement;