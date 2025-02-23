import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CarCard from "../../includes/CarCard/CarCard";
import Map from "../../includes/Map/Map";
import { useNavigate } from "react-router-dom";

const MyCars = () => {
  const cars = useSelector((state) => state.cars);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);

  const myCars = cars.filter((car) => car.owner_Id === user?.id);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-3xl text-[#313848] font-bold mb-6">All My Cars</h2>
      <hr className="mb-6 border-gray-300"/>

      {myCars.length === 0 ? (
        <p className="text-center font-bold text-red-500">You haven't added any cars yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCars.map((car) => (
              <div key={car.id} className="flex justify-center">
                <CarCard car={car} />
              </div>
            ))}
          </div>

          <div className="mt-8 w-full">
            <Map cars={myCars} className="w-full h-[400px] sm:h-[450px] md:h-[500px]" />
          </div>
        </>
      )}
    </div>



  );
};

export default MyCars;