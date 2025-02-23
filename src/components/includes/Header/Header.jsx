import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../config/store/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <header className="bg-[#4a3856] shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#d16940]">Cars$Rental</span>
        </Link>

        <nav>
          <ul className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <li>
                  <span className="font-bold text-white px-3 py-1 ">
                    Welcome, {user?.name}
                  </span>
                </li>
                <li>
                  <Button
                    className="bg-[#d16940] hover:bg-[#b65634] text-white px-4 py-2 rounded-lg shadow-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button
                    className="bg-[#d16940] hover:bg-[#b65634] text-white px-4 py-2 rounded-lg shadow-md"
                    asChild
                  >
                    <Link to="/auth/login">Login</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    className="bg-[#d16940] hover:bg-[#b65634] text-white px-4 py-2 rounded-lg shadow-md"
                    asChild
                  >
                    <Link to="/auth/signup">Sign Up</Link>
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;