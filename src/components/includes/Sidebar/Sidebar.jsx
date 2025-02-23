import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';

const Sidebar = () => {
  const { user, isLoggedIn } = useSelector((state) => state?.auth);

  if (!isLoggedIn) return null;

  const role = user.role;

  return (
    <div className="w-64  p-4 border-r" style={{ backgroundColor: "hsla(276, 21.10%, 27.80%, 0.23)" }}>
      <h3 className="text-center text-2xl  font-bold text-gray-800 mb-4">Dashboard</h3>
      <hr className="my-2 border border-2  bg-[#e9b984]" />
      <ul className="space-y-2">
        {role === 'user' && (
          <>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/cars/car-listings">Car Listings</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/cars/add-car">Add Car</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/cars/my-cars">My Cars</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/my-reservations">My Reservations</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/my-rent">My Rent</Link>
              </Button>
            </li>
          </>
        )}
        {role === 'admin' && (
          <>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </Button>
            </li>

            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/admin/users">Users</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/admin/cars">Cars</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="w-full justify-center bg-[#e9b984] hover:bg-[#f9d78b]">
                <Link to="/admin/reservations">Reservations</Link>
              </Button>
            </li>

          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;