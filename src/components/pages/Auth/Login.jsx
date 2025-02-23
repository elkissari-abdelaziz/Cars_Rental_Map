import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../../config/store/actions/authActions';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/cars/car-listings');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields!');
      return;
    }

    const userExist = users.find((user) => user.email === email);
    if (!userExist) {
      toast.error('User with this email does not exist.');
      return;
    }

    if (userExist.password !== password) {
      toast.error('Incorrect password.');
      return;
    }

    dispatch(login({ ...userExist, name: userExist.name }));
    toast.success('Logged in successfully!');
    navigate('/cars/car-listings');
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value })

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fbf7f5]">
      <Card className="w-full max-w-xl p-10 shadow-2xl rounded-2xl border-2 border-[#4a3856] bg-[#f2efe9]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#4a3856]">Welcome Back 👋</CardTitle>
          <hr className="border-black my-2" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4a3856]">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4a3856]">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-1/3 bg-[#4a3856] hover:bg-[#3a2c46] text-white py-3 rounded-lg text-lg shadow-md"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-[#4a3856]">Don't have an account?</p>
            <Button
              asChild
              className="mt-2 bg-[#db6e43] hover:bg-[#b65634] text-white py-2 px-6 rounded-lg text-lg shadow-md"
            >
              <a href="/auth/signup">Sign Up Here</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

  );
}

export default Login;