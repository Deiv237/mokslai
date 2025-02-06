import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss";
import { useParams } from 'react-router';
const API_URL = import.meta.env.VITE_API_URL;

export default function InvoiceEdit() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${API_URL}/invoices/${id}`, {
          withCredentials: true,
        });
        if (response.data.status === "success") {
          setInvoice(response.data.data);
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
            setError("No response from server. Check your internet connection.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };
    fetchInvoice();
  }, [id]);

  const patchInvoice = async (data) => {
    try {
      const response = await axios.patch(`${API_URL}/invoices/${id}`, data, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        setInvoice({ ...invoice, ...data });
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
          setError("No response from server. Check your internet connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const deleteInvoice = async () => {
    try {
      const response = await axios.delete(`${API_URL}/invoices/${id}`, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        setInvoice({});
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
          setError("No response from server. Check your internet connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {invoice && (
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Invoice</h2>
          <p className="text-gray-700 text-sm mb-2">
            <strong>Tag:</strong> {invoice.tag}
          </p>
          <p className="text-gray-700 text-sm mb-2">
            <strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-sm mb-2">
            <strong>Value:</strong> ${Number(invoice.value).toFixed(2)}
          </p>
          <p className="text-gray-700 text-sm mb-2">
            <strong>Username:</strong> {invoice.username}
          </p>
          <p className="text-gray-700 text-sm mb-2">
            <strong>Status:</strong> {invoice.status}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => patchInvoice({ status: "Paid" })}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Mark as Paid
            </button>
            <button
              onClick={() => deleteInvoice()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}