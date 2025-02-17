import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CiCirclePlus } from "react-icons/ci";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreatePets({ onClose }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access the current user from context

  const onSubmit = async (data) => {
    try {
      const formattedTime = moment(data.time, "HH:mm").format("hh:mm A");
      const postData = { ...data, time: formattedTime, owner: user.id }; // Include the current user's ID
      const response = await axios.post(`${API_URL}/pets`, postData, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        navigate("/pets"); // Redirect to appointment list
        onClose(); // Close the form
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      setError(
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || "An error occurred. Please try again."
          : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="bg-purple-700 text-white text-center py-3 text-lg font-bold rounded-t-lg flex items-center justify-center">
        <CiCirclePlus className="mr-2" /> Add Appointment
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        {/* Pet Name */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Pet Name</label>
          <input
            className="w-full px-3 py-2 border rounded text-gray-400 placeholder-gray-400"
            type="text"
            placeholder="Pet's Name"
            {...register("name", { required: true })}
          />
        </div>

        {/* Pet Owner */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Pet Owner</label>
          <input
            className="w-full px-3 py-2 border rounded text-gray-400 placeholder-gray-400"
            type="text"
            placeholder="Owner's Name"
            {...register("owner", { required: true })}
          />
        </div>

        {/* Date & Time */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-bold mb-1">Date</label>
            <input
              className="w-full px-3 py-2 border rounded text-gray-400 placeholder-gray-400"
              type="date"
              {...register("date", { required: true })}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-bold mb-1">Time</label>
            <input
              className="w-full px-3 py-2 border rounded text-gray-400 placeholder-gray-400"
              type="time"
              {...register("time", { required: true })}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-bold mb-1">Apt. Notes</label>
          <textarea
            className="w-full px-3 py-2 border rounded text-gray-400 placeholder-gray-400"
            placeholder="Appointment Notes"
            {...register("description")}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
}