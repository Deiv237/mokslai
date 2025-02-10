import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function InvoiceEdit() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("Invalid invoice ID.");
      return;
    }

    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/invoices/${id}`, {
          withCredentials: true,
        });

        console.log("API Response:", response.data); // 🛠 Debugging API Response

        if (
          response.data.status === "success" &&
          response.data.data.length > 0
        ) {
          setInvoice(response.data.data[0]); // ✅ Extract first object from array
        } else {
          setError("Invoice not found.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const patchInvoice = async (invoiceData) => {
    try {
      const response = await axios.patch(
        `${API_URL}/invoices/${id}`,
        invoiceData,
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        setInvoice(invoiceData);
      } else {
        setError("Failed to update invoice.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating invoice.");
    }
  };

  const deleteInvoice = async () => {
    try {
      const response = await axios.delete(`${API_URL}/invoices/${id}`, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        setInvoice(null); // Clear invoice after deletion
      } else {
        setError("Failed to delete invoice.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting invoice.");
    }
  };

  if (loading) return <p>Loading invoice...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!invoice) return <p>Invoice not found.</p>;

  return (
    <form className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Invoice Details</h2>
      <label className="block mb-4">
        <strong className="text-lg font-bold mb-2">Tag</strong>
        <input
          type="text"
          className="block w-full p-2 border rounded-lg shadow-md"
          value={invoice.tag || "N/A"}
          onChange={(e) => setInvoice({ ...invoice, tag: e.target.value })}
        />
      </label>

      <label className="block mb-4">
        <strong className="text-lg font-bold mb-2">Date</strong>
        <input
          type="text"
          className="block w-full p-2 border rounded-lg shadow-md"
          value={
            invoice.date
              ? new Date(invoice.date).toLocaleDateString("en-CA")
              : ""
          }
          onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
        />
      </label>

      <label className="block mb-4">
        <strong className="text-lg font-bold mb-2">Value</strong>
        <input
          type="text"
          className="block w-full p-2 border rounded-lg shadow-md"
          value={invoice.value || "0.00"}
          onChange={(e) => setInvoice({ ...invoice, value: e.target.value })}
        />
      </label>

      <label className="block mb-4">
        <strong className="text-lg font-bold mb-2">Username</strong>
        <input
          type="text"
          className="block w-full p-2 border rounded-lg shadow-md"
          value={invoice.username || "N/A"}
          onChange={(e) => setInvoice({ ...invoice, username: e.target.value })}
        />
      </label>

      <strong className="text-lg font-bold mb-2">Status</strong>
      <select
        name="status"
        id="status"
        value={invoice.status || "N/A"}
        className="block w-full p-2 pl-10 text-lg border rounded-lg shadow-md"
        onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}
      >
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Draft">Draft</option>
      </select>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => patchInvoice(invoice)}
          className="bg-green-500 hover:bg-green-700 text-gray-100 font-bold py-2 px-4 rounded"
        >
          <Link to={`/invoices`}>Update Invoice</Link>
        </button>
        <button
          onClick={deleteInvoice}
          className="bg-red-500 hover:bg-red-700 text-gray-100 font-bold py-2 px-4 rounded ml-2"
        >
          <Link to={`/invoices`}>Delete Invoice</Link>
        </button>
      </div>
      <div>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded">
          <Link to={`/invoices`}>Back</Link>
        </button>
      </div>
    </form>
    // <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
    //   <div className="bg-white rounded-lg shadow-md p-4 mt-4">
    //     <h2 className="text-lg font-bold mb-2">Invoice Details</h2>
    //     <p><strong>Tag:</strong> {invoice.tag || "N/A"}</p>
    //     <p"><strong>Date:</strong> {invoice.date ? new Date(invoice.date).toLocaleDateString() : "N/A"}</p>
    //     <p"><strong>Value:</strong> ${invoice.value ? Number(invoice.value).toFixed(2) : "0.00"}</p>
    //     <p><strong>Username:</strong> {invoice.username || "N/A"}</p>
    //     <p><strong>Status:</strong> {invoice.status || "N/A"}</p>
    //   </div>
    // </div>
  );
}
