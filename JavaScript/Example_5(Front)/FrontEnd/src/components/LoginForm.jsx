import { useForm } from "react-hook-form";
import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContent";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/users/login`,
        formdata,
        { withCredentials: true }
      );
      // console.log(response.data);
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

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>{error}</div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" {...register("email")} className="mt-1 w-full" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="mt-1 w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="w-full">
        Login
      </button>
    </form>
  );
}
