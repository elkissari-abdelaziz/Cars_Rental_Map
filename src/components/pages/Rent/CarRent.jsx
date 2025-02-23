import { useDispatch, useSelector } from 'react-redux';
import { approveReservation, rejectReservation } from '../../../config/store/actions/reservationActions';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { Button } from '../../ui/button'; 

const CarRent = () => {
  const { id } = useParams();
  const car = useSelector(state => state.cars.filter(car => car.id === id));
  const dispatch = useDispatch();

  const reservations = useSelector(state => state.reservations);
  const users = useSelector(state => state.users);

  const carRequests = reservations.filter(reservation => reservation.carId === parseInt(id) && reservation.status === "pending");

  const handleApprove = (selectedRequest) => {
    Swal.fire({
      title: "Approve this request?",
      text: "This will reject all other requests for this car.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(approveReservation(selectedRequest.id));
        carRequests
          .filter(request => request.id !== selectedRequest.id)
          .forEach(request => dispatch(rejectReservation(request.id)));

        Swal.fire("Approved!", "The reservation has been approved.", "success");
      }
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Rent Requests for {car.brand} {car.model}</h3>
      {carRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="space-y-2">
          {carRequests.map(request => {
            const user = users.find(u => u.id === request.userId) || { name: "Unknown User" };

            return (
              <li key={request.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p><strong>{user.name}</strong> requested from {request.startDate} to {request.endDate}</p>
                </div>
                <Button onClick={() => handleApprove(request)}>
                  Approve
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CarRent;