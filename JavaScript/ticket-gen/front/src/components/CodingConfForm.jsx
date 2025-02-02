import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import axios from "axios"; // Import Axios for API calls
import "./codingConfForm.css";

const CodingConfForm = () => {
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const navigate = useNavigate(); // Use navigate for page redirection

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object for sending data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("username", githubUsername);

    try {
      // Send data to backend
      const response = await axios.post("http://localhost:3001/api/v1/users/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      // If successful, navigate to the Ticket page
      if (response.status === 201) {
        navigate("/ticket", { state: { fullName, email, githubUsername, avatar } });
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-900 to-black text-white p-4">
      <div className="bg-opacity-20 bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center">Your Journey to Coding Conf 2025 Starts Here!</h1>
        <p className="text-center text-gray-400 mt-2">Secure your spot at next year's biggest coding conference.</p>
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label className="cursor-pointer w-full border-2 border-dashed border-gray-500 p-6 rounded-lg text-center">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto" />
              ) : (
                <p className="text-gray-400">Drag and drop or click to upload</p>
              )}
              <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
            </label>
            <p className="text-xs text-gray-500 mt-2">Upload your photo (JPG or PNG, max size: 500KB).</p>
          </div>

          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500" required />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500" required />
          <input type="text" placeholder="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-purple-500" required />

          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg">
            Generate My Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodingConfForm;
