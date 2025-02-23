import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar } from '../../../config/store/actions/carActions';
import { Button } from '../../ui/button'; 
import { Trash2, Pencil, BellPlus } from "lucide-react"; 
import Swal from 'sweetalert2';

const CarCard = ({ car }) => {
  console.log("car", car);
  const { isReserved, brand, id, image, model, price, year } = car;
  const dispatch = useDispatch();

  const reservations = useSelector(state => state.reservations);
  const users = useSelector(state => state.users);

  const carReservation = reservations.find(
    reserv => reserv.status === "pending" && reserv.carId === id
  );

  console.log("carReservation", carReservation);

  const reservedBy = carReservation ? users.find(user => user.id === carReservation.userId) : null;

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this car!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCar(id));
        Swal.fire('Deleted!', 'The car has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-[#f2efe9]">
      <img
        src={image}
        alt={`${brand} ${model} ${year}`}
        className="w-full h-48 object-cover rounded-md"
      />
      <hr className="my-2" />
      <div className="flex justify-between items-center ">
        <h2 className="text-xl font-bold">{brand}</h2>
        <Button
          className={`${carReservation?.status === "pending"
              ? "bg-orange-100 hover:bg-orange-200"
              : carReservation?.status === "rejected"
                ? "bg-red-100 hover:bg-red-200"
                : "bg-green-700 hover:bg-green-800"
            }`}
        >
          {carReservation?.status || "Available"}
        </Button>
      </div>
      <p className="text-gray-800">{model} {year}</p>

      {isReserved && reservedBy && (
        <p className="text-yellow-600">
          Reserved by: <strong>{reservedBy.name}</strong>
        </p>
      )}

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-red-600 font-bold">Price: {price} DH/day</h4>
        <div className="flex space-x-2">
          <Button variant="destructive" onClick={handleDelete} size="icon">
            <Trash2 className="w-5 h-5" />
          </Button>

          <Button asChild variant="outline" size="icon">
            <Link to={`/cars/edit-car/${id}`}>
              <Pencil className="w-5 h-5" />
            </Link>
          </Button>

          <Button asChild className="bg-[#db6e43] hover:bg-orange-500" size="icon">
            <Link to={`/cars/rent-request-car/${id}`}>
              <BellPlus className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
