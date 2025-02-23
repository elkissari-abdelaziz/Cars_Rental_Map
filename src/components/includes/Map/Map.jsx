import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { addReservation } from "../../../config/store/actions/reservationActions";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Map = ({ cars }) => {
  const dispatch = useDispatch();
  const defaultPosition = [33.5731, -7.5898];
  const { user } = useSelector((state) => state?.auth);
  let userId;
  if (user) {
    let { id } = user;
    userId = id;
  }

  const [duration, setDuration] = useState(1);

  const handleReserve = (carId) => {
    const date_Reservation = new Date().toISOString().split("T")[0];

    const newReservation = {
      id: Date.now(),
      userId,
      carId,
      date_Reservation,
      duration,
      status: "pending",
    };

    dispatch(addReservation(newReservation));
    Swal.fire("Success!", "Reservation Saved Check Later there status", "success");
    toast.success("Reservation was successfully!");
  };

  return (
    <MapContainer center={defaultPosition} zoom={12} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cars?.map((car) => (
        <Marker key={car.id} position={[car?.lat, car?.lng]} icon={customIcon}>
          <Popup>
            <div className="w-64 bg-white rounded-lg shadow-lg p-4">
              <div className="flex flex-col space-y-3">
                <img
                  src={car.image}
                  alt={`${car.brand}-${car.year}`}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <div className="space-y-1">
                  <p className="text-lg font-bold text-gray-800">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-sm text-gray-600">Year: {car.year}</p>
                  <p className="text-sm text-gray-600">Location: {car.location.split(",")[0]}</p>
                  <p className="text-lg font-bold text-red-600">{car.price} DH/day</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="duration" className="text-sm font-medium text-gray-700">
                    How Many Days?
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a3856]"
                    min="1"
                  />
                </div>

                <button
                  onClick={() => handleReserve(car.id)}
                  disabled={car.isReserved}
                  className={`w-full py-2 rounded-lg text-white font-semibold ${
                    car.isReserved
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4a3856] hover:bg-[#3a2c46]"
                  }`}
                >
                  {car.isReserved ? "Reserved" : "Reserve Car"}
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;