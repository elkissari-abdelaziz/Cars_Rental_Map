import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../config/store/actions/userActions';
import { toast } from 'react-toastify';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const users = useSelector((state) => state.users);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/cars/car-listings');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setEmailValid(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setPasswordValid(PASSWORD_REGEX.test(formData.password));
    setConfirmValid(formData.password === formData.confirm);
  }, [formData.password, formData.confirm]);

  useEffect(() => {
    setErrMessage('');
  }, [formData.email, formData.password, formData.confirm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailValid || !passwordValid || !confirmValid) {
      setErrMessage('Please enter valid information.');
      return;
    }

    const emailExist = users.find((user) => user.email === formData.email);
    if (emailExist) {
      toast.error('Email already exists. Try another one.');
      return;
    }

    dispatch(register({ name: formData.name, email: formData.email, password: formData.password }, 'user'));
    toast.success('Registered successfully!');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fbf7f5]">
      <Card className="w-full max-w-xl p-10 shadow-2xl rounded-2xl border-2 border-[#4a3856] bg-[#f2efe9]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#4a3856]">Create an Account 🎉</CardTitle>
          <hr className="border-black my-2" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#4a3856]">
                Full Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-2 border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4a3856]">
                Email
                {formData.email && (
                  <FontAwesomeIcon
                    icon={emailValid ? faCheck : faTimes}
                    className={` ${emailValid ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}`}
                  />
                )}
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="border-2 border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"
                required
              />
              {emailFocus && formData.email && !emailValid && (
                <p className="text-red-500 mr-1">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                  Must be a valid email address.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4a3856]">
                Password
                {formData.password && (
                  <FontAwesomeIcon
                    icon={passwordValid ? faCheck : faTimes}
                    className={`${passwordValid ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}`}
                  />
                )}
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                className="border-2 border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"
                required
              />
              {passwordFocus && !passwordValid && (
                <p className="text-red-500 mt-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                  8 to 24 characters. Must include an uppercase, lowercase, number, and special character.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-[#4a3856]">
                Confirm Password
                {formData.confirm && (
                  <FontAwesomeIcon
                    icon={confirmValid ? faCheck : faTimes}
                    className={`${confirmValid ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}`}
                  />
                )}
              </label>
              <Input
                type="password"
                id="confirm"
                placeholder="Confirm password"
                value={formData.confirm}
                onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                onFocus={() => setConfirmFocus(true)}
                onBlur={() => setConfirmFocus(false)}
                className="border-2 border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"
                required
              />
              {confirmFocus && !confirmValid && (
                <p className="text-red-500">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                  Must match the first password field.
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-1/3 bg-[#4a3856] hover:bg-[#3a2c46] text-white py-3 rounded-lg text-lg shadow-md"
                disabled={!emailValid || !passwordValid || !confirmValid}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-[#4a3856]">Already have an account?</p>
            <Button
              asChild
              className="mt-2 bg-[#db6e43] hover:bg-[#b65634] text-white py-2 px-6 rounded-lg text-lg shadow-md"
            >
              <a href="/auth/login">Login Here</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;