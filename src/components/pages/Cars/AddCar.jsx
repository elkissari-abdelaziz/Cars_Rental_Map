import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../../../config/store/actions/carActions';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import MapPicker from '../../includes/Map/MapPicker';
import { Input } from '../../ui/input'; 
import { Button } from '../../ui/button'; 
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card'; 
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    image: null,
    location: '',
    lat: '',
    lng: '',
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file' && files.length > 0) {
      const image = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };

      reader.readAsDataURL(image);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      year: '',
      price: '',
      image: null,
      location: '',
      lat: '',
      lng: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      ...formData,
      owner_Id: id,
      isReserved: false,
      id: Date.now(),
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    };
    dispatch(addCar(newCar));
    toast.success('Car added successfully!');
    resetForm();
    Swal.fire('Success!', 'Car added successfully!', 'success').then(() => navigate("/cars/my-cars"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fbf7f5]">
      <Card className="w-full max-w-2xl border-solid border-[#4a3856] bg-[#f2efe9]">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-[#313848]">Add New Car</CardTitle>
          <hr className='border-2 text-[#4a3856] bg-[#4a3856]' />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label htmlFor="brand" className="block text-base font-medium text-[#4a3856]">
                Brand
              </label>
              <Input
                type="text"
                id="brand"
                name="brand"
                placeholder="Enter car brand"
                value={formData.brand}
                onChange={handleChange}
                className="border-solid border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"

              />
            </div>
            <div>
              <label htmlFor="model" className="block text-base font-medium text-[#4a3856]">
                Model
              </label>
              <Input
                type="text"
                id="model"
                name="model"
                placeholder="Enter car model"
                value={formData.model}
                onChange={handleChange}
                className="border-solid border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"

              />
            </div>
            <div>
              <label htmlFor="year" className="block text-base font-medium text-[#4a3856]">
                Year
              </label>
              <Input
                type="number"
                id="year"
                name="year"
                placeholder="Enter car model year"
                value={formData.year}
                onChange={handleChange}
                className="border-solid border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"

              />
            </div>
            <div>
              <label htmlFor="price" className="block text-base font-medium text-[#4a3856]">
                Price
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                placeholder="Enter car price"
                value={formData.price}
                onChange={handleChange}
                className="border-solid border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"

              />
            </div>
            <div>
              <label htmlFor="location" className="block text-base font-medium text-[#4a3856]">
                Location
              </label>
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="Enter car location"
                value={formData.location}
                onChange={handleChange}
                className="border-solid border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"

              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#4a3856]">Select on Map</label>
              <MapPicker
                onLocationSelect={(locationData) => {
                  setFormData((prev) => ({
                    ...prev,
                    lat: locationData.lat,
                    lng: locationData.lng,
                    location: locationData.address,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="lat" className="block text-base font-medium text-[#4a3856]">
                Latitude
              </label>
              <Input
                type="number"
                id="lat"
                name="lat"
                placeholder="Enter latitude"
                value={formData.lat}
                onChange={handleChange}
                className="border-solid border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"

              />
            </div>
            <div>
              <label htmlFor="lng" className="block text-base font-medium text-[#4a3856]">
                Longitude
              </label>
              <Input
                type="number"
                id="lng"
                name="lng"
                placeholder="Enter longitude"
                value={formData.lng}
                onChange={handleChange}
                className="border-solid border-[#4a3856] focus:ring-2 focus:ring-[#4a3856] placeholder:text-[#4a3856]"

              />
            </div>
            <div>
              <label htmlFor="image" className="block text-base font-medium text-[#4a3856]">
                Car Image
              </label>
              <Input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="border border-[#4a3856] rounded-base px-3 mt-1 w-full text-[#4a3856] 
             file:bg-[#4a3856] file:text-white file:rounded-md file:px-2 file:py-1 
             file:border-none file:cursor-pointer focus:ring-2 focus:ring-[#4a3856]"
              />

            </div>
            <div className='flex justify-center'>

              <Button type="submit" className="w-25 bg-[#4a3856] ">
                Add Car
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCar;