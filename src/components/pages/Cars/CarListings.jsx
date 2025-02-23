import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Map from "../../includes/Map/Map";

const CarListings = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cars = useSelector((state) => state.cars);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);

  let userCars = cars.filter((car) => car.owner_Id !== user?.id);

  const filteredCars = userCars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "reserved" && car.isReserved) ||
      (filter === "not_reserved" && !car.isReserved);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-[#313848] text-3xl font-bold mb-4">Car Listings</h2>
      <hr className="mb-4" />

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by brand or model..."
          className="border p-2 rounded-lg w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Cars</option>
          <option value="reserved">Reserved</option>
          <option value="not_reserved">Not Reserved</option>
        </select>
      </div>

      <div className="grid grid-cols-1">
        <Map cars={filteredCars} />
      </div>
    </div>
  );
};

export default CarListings;
