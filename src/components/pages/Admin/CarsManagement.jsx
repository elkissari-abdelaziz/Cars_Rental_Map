import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCar } from "@/config/store/actions/carActions";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Swal from "sweetalert2";

const CarsManagement = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter ? car.type === typeFilter : true;

    return matchesSearch && matchesType;
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This car will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCar(id));
        Swal.fire("Deleted!", "The car has been removed.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#313848] mb-6 text-center">Cars Management</h1>
      <hr className="mb-6 border-gray-300" />

      <Card className="shadow-lg bg-[#e2e2e2] border-[#4a3856] p-4">
        <CardHeader>
          <CardTitle className="text-xl text-[#4a3856]">All Cars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search cars by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 border border-[#4a3856] focus:ring-[#4a3856] p-2 rounded-md"
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-1/4 border border-[#4a3856] p-2 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-[#4a3856] focus:outline-none"
            >
              <option value="">All Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="convertible">Convertible</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg border border-gray-300">
              <thead className="bg-[#313848] text-white">
                <tr>
                  <th className="p-3 text-center">#</th>
                  <th className="p-3 text-center">Brand</th>
                  <th className="p-3 text-center">Model</th>
                  <th className="p-3 text-center">Year</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Type</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.length > 0 ? (
                  filteredCars.map((car, index) => (
                    <tr key={car.id} className="hover:bg-gray-50 transition-colors border-t text-center">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{car.brand}</td>
                      <td className="p-3">{car.model}</td>
                      <td className="p-3">{car.year}</td>
                      <td className="p-3">${car.price}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            car.type === "suv"
                              ? "bg-green-500 text-white"
                              : car.type === "sedan"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {car.type}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button variant="destructive" className="px-3 py-1" onClick={() => handleDelete(car.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-red-500 font-bold">
                      No cars found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarsManagement;
