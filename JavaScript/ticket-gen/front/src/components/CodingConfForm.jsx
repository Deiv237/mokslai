import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import "./codingConfForm.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CodingConfForm() {
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formdata) => {
    try {
      console.log("Submitting form data:", formdata); // ✅ Log form data
      const { data: response } = await axios.post(
        `${API_URL}/users/signup`,
        formdata,
        { withCredentials: true }
      );
      console.log("Response from backend:", response);
      setUser(response.data);
    } catch (error) {
      console.error("Error response:", error.response?.data); // ✅ Log backend error
      setError(error.response?.data?.message || "An Error Occurred");
    }
  };  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-900 to-black text-white p-4">
      <div className="bg-opacity-20 bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <p className="text-center text-gray-400 mt-2">
          Secure your spot at next year's biggest coding conference.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center">
            <label className="cursor-pointer w-full border-2 border-dashed border-gray-500 p-6 rounded-lg text-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full mx-auto"
                />
              ) : (
                <p className="text-gray-400">Drag and drop or click to upload</p>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Upload your photo (JPG or PNG, max size: 500KB).
            </p>
          </div>

          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
          />
          {errors.fullName && <p className="text-red-500 text-sm">Full Name is required.</p>}

          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}

          <input
            type="text"
            placeholder="GitHub Username"
            {...register("githubUsername", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-black py-3 rounded-lg font-semibold text-lg"
          >
            Generate My Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
