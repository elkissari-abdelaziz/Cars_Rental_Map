import React from 'react';
import CarListings from '../Cars/CarListings';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b">
          <p className="text-4xl font-bold text-center text-red-600 my-5">Welcome to Car Rental App</p>
        </div>
        <div className="p-6 bg-gray-50">
          <CarListings />
        </div>
      </div>
    </div>
  );
};

export default Home;