import { useLocation } from "react-router-dom";
import "./Ticket.css";

const Ticket = () => {
  const location = useLocation();
  const { fullName, email, githubUsername, avatar } = location.state || {};

  if (!fullName || !email || !githubUsername) {
    return <h1 className="text-white text-center text-2xl mt-10">No ticket data available.</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-black text-white p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Congrats, <span className="text-orange-400">{fullName}</span>!</h1>
        <p className="text-xl mt-2">Your ticket is ready.</p>
        <p className="text-gray-400 mt-2">We've emailed your ticket to <span className="text-red-400">{email}</span>.</p>
      </div>

      <div className="mt-6 bg-opacity-20 bg-gray-900 p-6 rounded-2xl shadow-lg max-w-lg w-full">
        <div className="bg-gray-800 p-4 rounded-xl flex flex-col items-center">
          {avatar && <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-orange-400" />}
          <h2 className="text-xl font-semibold mt-2">Coding Conf</h2>
          <p className="text-gray-400">@{githubUsername}</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
