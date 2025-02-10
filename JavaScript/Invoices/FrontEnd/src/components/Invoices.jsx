import "./tailwind.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { CiCirclePlus } from "react-icons/ci";

const API_URL = import.meta.env.VITE_API_URL;

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-400";
      case "Pending":
        return "text-orange-400";
      case "Draft":
        return "text-gray-600";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${API_URL}/invoices`, {
          withCredentials: true,
        });
        if (response.data.status === "success") {
          setInvoices(response.data.data); // ✅ Extracting correct data
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(
              error.response.data.message ||
                "An error occurred. Please try again."
            );
          } else if (error.request) {
            setError(
              "No response from server. Check your internet connection."
            );
          } else {
            setError("Something went wrong. Please try again.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchInvoices();
  }, []);

  const onClick = (id) => {
    console.log(`Invoice ${id} clicked`); // Debugging
  };
  

  return (
    <div className="bg-gray-200 p-5">
      {error && <p className="text-orange-700">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <div>
  <h1 className="text-3xl font-bold">Invoices</h1>
  <h2>There are {invoices.length} total invoices</h2>
  </div>
  <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center">
  <Link to="/invoices/create" className="flex justify-between w-full">
    <CiCirclePlus className="mt-1 mr-2" />
    <span>Create Invoice</span>
  </Link>
</button>
</div>
      <ul className="list-disc pl-5 list-none">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <li
              key={invoice.id}
              className="mb-5 border p-2 rounded-lg shadow bg-gray-100"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-gray-500 text-lg font-bold">{invoice.tag}</p>
                </div>
                <div className="flex-1 text-right ml-3">
                  <p className="text-gray-500 text-lg">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-1 text-center ml-3">
                  <p className="text-gray-500 text-lg">{invoice.username}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-gray-500 text-lg">${Number(invoice.value).toFixed(2)}</p>
                </div>
                <div className="flex-0.8 text-right ml-4">
                  <Link to={`/invoices/${invoice.id}`} id={invoice.id}>
                    <button
                      onClick={() => onClick(invoice.id)}
                      className={`text-lg ${getStatusClass(invoice.status)}`}
                    >
                      &#9679; {invoice.status}
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No invoices available.</p>
        )}
      </ul>
    </div>
  );
}
