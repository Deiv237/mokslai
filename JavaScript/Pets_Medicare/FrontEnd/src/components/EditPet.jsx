import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext"; // Import UserContext

const API_URL = import.meta.env.VITE_API_URL;

export default function EditPet() {
  const { id } = useParams(); // Get pet ID from URL
  const { user } = useContext(UserContext); // Access user from context
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    description: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for user and pet data
  const navigate = useNavigate();

  // Fetch pet data when the component mounts
  useEffect(() => {
    const fetchPet = async () => {
      if (!user) {
        setError("User is not authenticated.");
        navigate("/login"); // Redirect to login page if user is not authenticated
        return;
      }
  
      try {
        // Make the request to fetch pet data by id
        const response = await axios.get(`${API_URL}/pets/${id}`, { withCredentials: true });
  
        // If the response is successful, check the status
        if (response.data.status === "success" && response.data.data.length > 0) {
          const fetchedPet = response.data.data[0]; // Access the first pet from the array
  
          // Check if the user is the owner or an admin
          if (fetchedPet.owner === user.username || user.role === "admin") {
            setPet(fetchedPet);
            setFormData({
              name: fetchedPet.name || "",
              owner: fetchedPet.owner || "",
              description: fetchedPet.description || "",
              date: fetchedPet.date || "",
              time: fetchedPet.time || "",
            });
            setLoading(false); // Stop loading after the data is fetched
          } else {
            setError("You are not authorized to edit this pet.");
            navigate("/"); // Redirect to home if not authorized
          }
        } else {
          setError("Pet not found.");
          setLoading(false); // Stop loading if pet is not found
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
        setError(error.response?.data?.message || "Failed to fetch pet details.");
        setLoading(false); // Stop loading on error
      }
    };
  
    fetchPet();
  }, [id, user, navigate]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the request to update pet data
      const response = await axios.put(`${API_URL}/pets/${id}`, formData, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        navigate("/pets"); // Redirect back to the pet list after successful update
      } else {
        setError("Failed to update pet. Please try again.");
      }
    } catch (error) {
      setError("Error updating pet. Please try again.");
    }
  };

  // If loading, show a loading message
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {error && <p className="text-red-500">{error}</p>}

      {/* Edit Pet Form */}
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Edit Pet</h2>

      {pet && (
        <form onSubmit={handleSubmit}>
          {/* Pet Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold text-gray-700">
              Pet Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          {/* Owner */}
          <div className="mb-4">
            <label htmlFor="owner" className="block text-sm font-bold text-gray-700">
              Owner
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-bold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded"
            ></textarea>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-bold text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          {/* Time */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-bold text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => navigate("/pets")} // Redirect to home on cancel
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
