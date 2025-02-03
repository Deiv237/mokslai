import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { post } from "../helpers/post";

const MainPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

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
    return (
        <>
<form onSubmit={handleSubmit(onSubmit)}>
  {/* Top of the main page */}
  <div className="header mb-8">
    <div className="text-[24px] fira text-white">Coding Conf</div>
    <div>
      <h1 className="font-[800] inconsolata text-white">
        Your Journey To Coding Conf 2025 Starts Here!
      </h1>
      <p className="text-[#D1D0D5]">Secure your spot at next year's biggest coding conference</p>
    </div>
  </div>

  {/* Body of the main page */}
  <div className="body h-[54px] w-[460px] m-auto">

    {/* Full Name */}
    <div className="mb-6 text-left inconsolata text-[20px] font-[500]">
      <label
        htmlFor="full-name"
        className="block mb-2 text-sm font-medium text-gray-900 text-white"
      >
        Full Name
      </label>
      <input
        {...register("name")}
        type="text"
        id="full-name"
        className="block w-full p-4 text-white border border-gray-300 rounded-lg"
      />
    </div>

    {/* Email address */}
    <div className="mb-6 text-left inconsolata text-[20px] font-[500]">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 text-white"
      >
        Email address
      </label>
      <input
        {...register("email")}
        type="email" 
        id="email"
        className="block w-full p-4 text-white border border-gray-300 rounded-lg"
        placeholder="example@email.com"
      />
    </div>

    {/* GitHub Username */}
    <div className="mb-6 text-left inconsolata text-[20px] font-[500]">
      <label
        htmlFor="github"
        className="block mb-2 text-sm font-medium text-gray-900 text-white"
      >
        GitHub Username
      </label>
      <input
        {...register("github")}
        type="text"
        id="github"
        className="block w-full p-4 text-white border border-gray-300 rounded-lg"
        placeholder="GitHub Username"
      />
    </div>

    {/* Submit Button */}
    <div className="w-[460px]">
      <button
        type="submit"  
        className="w-[460px] text-center text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
      >
        Generate My Ticket
      </button>
    </div>

  </div>
</form>

        </>
      );
    };

export default MainPage;