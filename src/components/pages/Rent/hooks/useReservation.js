import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { approveReservation, rejectReservation } from '../../../../config/store/actions/reservationActions';

export const useReservation = () => {
  const dispatch = useDispatch();

  const handleApprove = (selectedRequest, carRequests) => {
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

  const handleReject = (requestId) => {
    Swal.fire({
      title: "Reject this request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectReservation(requestId));
        Swal.fire("Rejected!", "The reservation has been rejected.", "success");
      }
    });
  };

  return { handleApprove, handleReject };
};