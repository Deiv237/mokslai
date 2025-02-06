import "./LoginForm.css";
import { useContext } from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import { UserContext } from "../contexts/UserContent";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
    const [error, setError] = useState(null);
    
    const {setUser} = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const {data:response} = await axios.post(
                `${API_URL}/users/login`, data, {
                    withCredentials: true,
                }
            );
            setUser(response.data);
            navigate("/invoices");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message);
                } else if (error.request) {
                    setError("No response received from server");
                } else {
                    setError("Something went wrong");
                }
            }
        }
    };

    if(error) {
        return (    <p className= "text-red-500 text-sm">{error}</p>  )   }

    return (
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div>{error}</div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    {...register("email")}/>
                    {errors.email && (
                        <p>{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">password</label>
                    <input type="password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    {...register("password")} />
                    {errors.password && (
                        <p>{errors.password.message}</p>
                    )}
                </div>

                <button className="w-full bg-sky-500/75 hover:bg-indigo-700 text-grey-100 font-medium py-2.5 rounded-lg transition-colors" type="submit">
                    Login
                </button>
                <p>Don't have an account? <Link to="/">Sign up</Link></p>
            </form>
    );
}