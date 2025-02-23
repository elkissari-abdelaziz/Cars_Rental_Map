import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import Swal from "sweetalert2";
import { rejectReservation } from "@/config/store/actions/reservationActions";

const ReservationsManagement = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);



  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This reservation will be permanently rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectReservation(id));
        Swal.fire("Rejected!", "The reservation has been rejected.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#313848] mb-6 text-center">Reservations Management</h1>
      <hr className="mb-6 border-gray-300" />

      <Card className="shadow-lg bg-[#e2e2e2] border-[#4a3856] p-4">
        <CardHeader>
          <CardTitle className="text-xl text-[#4a3856]">All Reservations</CardTitle>
        </CardHeader>
        <CardContent>




          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
              <thead className="bg-[#313848] text-white">
                <tr>
                  <th className="p-3 text-center">#</th>
                  <th className="p-3 text-center">User</th>
                  <th className="p-3 text-center">Car</th>
                  <th className="p-3 text-center">Date</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length > 0 ? (


                  reservations.map((reservation, index) => {
                    const thisUser = useSelector(state => state.users).find(user => user.id === reservation.userId)
                    const thisCar = useSelector(state => state.cars).find(car => car.id === reservation.carId)

                    return <tr key={reservation.id} className="hover:bg-gray-50 transition-colors border-t text-center">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{thisUser.name}</td>
                      <td className="p-3">{thisCar?.brand}</td>
                      <td className="p-3">{reservation?.date_Reservation}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${reservation.status === "approved"
                            ? "bg-green-500 text-white"
                            : reservation.status === "Pending"
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                            }`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button variant="destructive" className="px-3 py-1" onClick={() => handleReject(reservation.id)}>
                          Reject
                        </Button>
                      </td>
                    </tr>
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-red-500 font-bold">
                      No reservations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationsManagement;
