import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { useSelector } from 'react-redux';
import { calculateTotalRevenue } from '@/utils/calculateTotalRevenue';
import Map from '@/components/includes/Map/Map';

const AdminDashboard = () => {


  const reservations = useSelector(state => state.reservations);
  const cars = useSelector(state => state.cars);
  const users = useSelector(state => state.users)

  const totalRevenue = calculateTotalRevenue(reservations, cars);

  return (
    <div className="p-6">
      <h1 className=" text-center text-[#313848] text-3xl font-bold mb-4">Admin Dashboard</h1>
      <hr className='border-2 text-dark mb-2' />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-[#4a3856] bg-[#f2efe9]">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Total Revenue</CardTitle>
            <hr className='border-2' />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center">{totalRevenue || "15.590"} DH</p>
          </CardContent>
        </Card>
        <Card className="border-[#4a3856] bg-[#f2efe9]">
          <CardHeader>
            <CardTitle className="text-center text-2xl  ">Total Users</CardTitle>
            <hr className='border-2' />

          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center">{users.length}</p>
          </CardContent>
        </Card >
        <Card className="border-[#4a3856] bg-[#f2efe9] ">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Total Cars</CardTitle>
            <hr className='border-2' />

          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-center">{cars.length}</p>
          </CardContent>
        </Card>
      </div>
      <Card>

        <CardContent className="border-[#4a3856] bg-[#f2efe9]">
          <h2 className="text-center text-[#313848] text-3xl font-bold mb-4 ">All Cars In the Platform</h2>
          <hr className='m-2 bg-dark border-2' />
          <Map cars={cars} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;