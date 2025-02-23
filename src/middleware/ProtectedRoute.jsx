import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  if (!isLoggedIn) navigate("/auth/login");

  if (roles && !roles.includes(user.role)) navigate("/");

  return children;
};

export default ProtectedRoute;