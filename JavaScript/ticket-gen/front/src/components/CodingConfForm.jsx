import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import navigation
import axios from "axios"; // Import Axios for API calls
import "./codingConfForm.css";
import { useForm } from 'react-hook-form'; // Import useForm from react-hook-form
import { useContext } from 'react'; // Import useContext from react
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const API_URL = import.meta.env.VITE_API_URL;

export default function CodingConfForm() {
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null); // Initialize avatar state
  const [fullName, setFullName] = useState(""); // Initialize fullName state
  const [email, setEmail] = useState(""); // Initialize email state
  const [githubUsername, setGithubUsername] = useState(""); // Initialize githubUsername state

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
      const { data: response } = await axios.post(
        `${API_URL}/users/signup`,
        formdata,
        { withCredentials: true }
      );
      console.log(formdata);
      setUser(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message || "An Error Occured, please try again"
          );
        } else if (error.request) {
          setError("No response from server. Check your internet connection");
        } else {
          setError("Something went wrong, please try again");
        }
      } else {
        setError("An unexpected error Occured");
      }
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
                <p className="text-gray-400">
                  Drag and drop or click to upload
                </p>
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
            {...register("fullName")}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
            required
          />
          <input
            type="text"
            placeholder="GitHub Username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
            required
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
};