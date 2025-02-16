import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { MdClose, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router"; // For navigation to edit pet page
import { UserContext } from "../contexts/UserContext"; // Import UserContext

const API_URL = import.meta.env.VITE_API_URL;

export default function Pet() {
  const { user, isAdmin } = useContext(UserContext); // Access user and isAdmin from context
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // For navigating to edit pet page

  // Fetch Pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${API_URL}/pets`, { withCredentials: true });
        if (response.data.status === "success") {
          setPets(response.data.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchPets();
  }, []);

  // Filter pets based on the user role
  const filteredPets = isAdmin ? pets : pets.filter((pet) => pet.isOwner);

  // Delete Pet
  const deletePet = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/pets/${id}`, { withCredentials: true });

      if (response.data.status === "success") {
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
      } else {
        setError("Failed to delete appointment.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting appointment.");
    }
  };

  return (
    <div className="bg-white min-h-screen p-5">
      {error && <p className="text-red-500">{error}</p>}

      {/* Header with Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-purple-700">Pets Medicare</h1>
        <button
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => {
            setShowForm((prev) => !prev);
          }}
        >
          <CiCirclePlus className="text-2xl mr-2" />
          <span>{showForm ? "Close Form" : "Add Appointment"}</span>
        </button>
      </div>

      {/* Create Form */}
      {showForm && <CreatePets onClose={() => setShowForm(false)} />}

      {/* Appointment List */}
      <ul className="w-full max-w-3xl mx-auto">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <li key={pet.id} className="mb-4 p-4 border rounded-lg shadow bg-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold text-purple-700">{pet.name}</p>
                  <p className="text-gray-700"><strong>Owner:</strong> {pet.owner}</p>
                  <p className="text-gray-600">{pet.description}</p>
                </div>
                <div className="text-right text-gray-500">
                  <p>{new Date(pet.date).toLocaleDateString()}</p>
                  <p>{pet.time}</p>
                </div>
              </div>

              {/* Actions: Only Show Delete/Edit for Allowed Users */}
              <div className="flex justify-end mt-2 space-x-3">
                {(isAdmin || pet.isOwner) && (
                  <>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deletePet(pet.id)}
                    >
                      <MdClose className="text-2xl" />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/edit-pet/${pet.id}`)} // Navigate to edit pet page
                    >
                      <MdEdit className="text-2xl" />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No appointments available.</p>
        )}
      </ul>
    </div>
  );
}
