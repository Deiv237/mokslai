import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

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
            setError(error.response.data.message || "An error occurred. Please try again.");
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

    fetchInvoices();
  }, []);

  return (
    <div>
      {error && <p className="text-orange-700">{error}</p>}
      <h1 className="text-xl font-bold">Invoices</h1>
      <ul className="list-disc pl-5">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <li key={invoice.id} className="mb-2 border p-3 rounded-lg shadow">
              <p><strong>Tag:</strong> {invoice.tag}</p>
              <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
              <p><strong>Value:</strong> ${Number(invoice.value).toFixed(2)}</p>
              <p><strong>User:</strong> {invoice.username}</p>
              <p><strong>Status:</strong> {invoice.status}</p>
            </li>
          ))
        ) : (
          <p>No invoices available.</p>
        )}
      </ul>
    </div>
  );
}
