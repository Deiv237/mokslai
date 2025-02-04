import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { post } from "../helpers/post"
import "./Main.css";

export default function Main() {

        const navigate = useNavigate();
        const { register, handleSubmit } = useForm();
        const [avatar, setAvatar] = useState(null);
    
        const onSubmit = async (data) => {
            try {
                const newUser = await post(data); 
    
                if (newUser && newUser.data.userId) { 
                    navigate(`/ticket/${newUser.data.userId}`)
                }
            } catch (error) {
                console.error(error);
            }
        };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setAvatar(URL.createObjectURL(file));
        }
      };

    return (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Form Top */}
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-900 to-black text-white p-4">
          <div className="bg-opacity-20 bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full">
            <h1 className="text-3xl font-bold text-center">
              Your Journey to Coding Conf 2025 Starts Here!
            </h1>
            <p className="text-center text-gray-400 mt-2">
              Secure your spot at next year's biggest coding conference.
            </p>
              <div className="flex flex-col items-center">

                {/* Avatar */}
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
    
              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                id="full-Name"
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
              />

              {/* Email Address */}
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                id="email"
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
              />
    
              <input
                type="text"
                placeholder="GitHub Username"
                {...register("githubUsername")}
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500"
              />
    
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black py-3 rounded-lg font-semibold text-lg"
              >
                Generate My Ticket
              </button>
          </div>
        </div>
     </form>
      );
}