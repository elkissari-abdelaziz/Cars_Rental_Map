import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';

import Home from './components/pages/Home/Home';
import Login from './components/pages/Auth/Login';
import SignUp from './components/pages/Auth/SignUp';
import AddCar from './components/pages/Cars/AddCar';
import CarListings from './components/pages/Cars/CarListings';
import EditCar from './components/pages/Cars/EditCar';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import ProtectedRoute from './middleware/ProtectedRoute';
import MyCars from './components/pages/Cars/MyCars';
import MyReservations from './components/pages/Reservations/MyReservations';
import CarRent from './components/pages/Rent/CarRent';
import RentCarTable from './components/pages/Rent/RentCarTable';
import UsersManagement from './components/pages/Admin/Usersmanagement';
import CarsManagement from './components/pages/Admin/CarsManagement';
import ReservationsManagement from './components/pages/Admin/ReservationsManagement';



const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/cars/car-listings" element={<CarListings />} />

          <Route
            path="/cars/add-car"
            element={
              <ProtectedRoute>
                <AddCar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cars/my-cars"
            element={
              <ProtectedRoute>
                <MyCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/edit-car/:id"
            element={
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars/rent-request-car/:id"
            element={
              <ProtectedRoute>
                <CarRent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-rent"
            element={
              <ProtectedRoute>
                <RentCarTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reservations"
            element={
              <ProtectedRoute>
                <MyReservations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={['admin']}>
                <UsersManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars"
            element={
              <ProtectedRoute roles={['admin']}>
                <CarsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute roles={['admin']}>
                <ReservationsManagement />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;