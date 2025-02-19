import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  // Fetch Tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${API_URL}/tours`, { withCredentials: true });
        if (response.data.status === "success") {
          setTours(response.data.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100 text-white">
      <div className="flex max-w-2xl rounded-xl border-black bg-white shadow-md">
        {tours.map((tour) => (
          <div key={tour._id} className="w-1/2 p-4">
            <img src={tour.image} alt={tour.name} className="rounded-l-xl h-64 object-cover" />
            <div className="w-1/2 p-4 space-y-4 rounded-xl bg-white text-black">
              <div className="space-y-4 ml-7 mt-14">
                <p className="text-lg font-bold">TOUR DETAILS</p>
                <h1 className="text-4xl font-bold">{tour.name}</h1>
                <p className="text-lg">{tour.description}</p>
                <div className="flex items-center">
                  <p className="text-green-700 text-4xl font-bold">${tour.price}</p>
                </div>
              </div>
              <div className="items-center text-center justify-center">
                <button className="text-white font-bold bg-green-800 py-4 px-20 rounded-xl">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}