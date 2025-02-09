import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

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

        if (response.data.status === "success" && response.data.data.length > 0) {
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

  if (loading) return <p>Loading invoice...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!invoice) return <p>Invoice not found.</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Invoice Details</h2>
        <p className="text-gray-700 text-sm mb-2"><strong>Tag:</strong> {invoice.tag || "N/A"}</p>
        <p className="text-gray-700 text-sm mb-2"><strong>Date:</strong> {invoice.date ? new Date(invoice.date).toLocaleDateString() : "N/A"}</p>
        <p className="text-gray-700 text-sm mb-2"><strong>Value:</strong> ${invoice.value ? Number(invoice.value).toFixed(2) : "0.00"}</p>
        <p className="text-gray-700 text-sm mb-2"><strong>Username:</strong> {invoice.username || "N/A"}</p>
        <p className="text-gray-700 text-sm mb-2"><strong>Status:</strong> {invoice.status || "N/A"}</p>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router"; // Fixed import

// const API_URL = import.meta.env.VITE_API_URL;

// export default function InvoiceEdit() {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) {
//       setError("Invalid invoice ID.");
//       return;
//     }

//     const fetchInvoice = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/invoices/${id}`, {
//           withCredentials: true,
//         });

//         if (response.data.status === "success") {
//           setInvoice(response.data.data);
//         } else {
//           setError("Unexpected response format.");
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || "Error fetching invoice.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoice();
//   }, [id]);

//   const patchInvoice = async (data) => {
//     try {
//       const response = await axios.patch(`${API_URL}/invoices/${id}`, data, {
//         withCredentials: true,
//       });

//       if (response.data.status === "success") {
//         setInvoice({ ...invoice, ...data });
//       } else {
//         setError("Failed to update invoice.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Error updating invoice.");
//     }
//   };

//   const deleteInvoice = async () => {
//     try {
//       const response = await axios.delete(`${API_URL}/invoices/${id}`, {
//         withCredentials: true,
//       });

//       if (response.data.status === "success") {
//         setInvoice(null); // Clear invoice after deletion
//       } else {
//         setError("Failed to delete invoice.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Error deleting invoice.");
//     }
//   };

//   if (loading) return <p>Loading invoice...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!invoice) return <p>Invoice not found or deleted.</p>;

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
//       <div className="bg-white rounded-lg shadow-md p-4 mt-4">
//         <h2 className="text-lg font-bold mb-2">Invoice Details</h2>
//         <p className="text-gray-700 text-sm mb-2"><strong>Tag:</strong> {invoice.tag || "N/A"}</p>
//         <p className="text-gray-700 text-sm mb-2"><strong>Date:</strong> {invoice.date ? new Date(invoice.date).toLocaleDateString() : "N/A"}</p>
//         <p className="text-gray-700 text-sm mb-2"><strong>Value:</strong> ${invoice.value ? Number(invoice.value).toFixed(2) : "0.00"}</p>
//         <p className="text-gray-700 text-sm mb-2"><strong>Username:</strong> {invoice.username || "N/A"}</p>
//         <p className="text-gray-700 text-sm mb-2"><strong>Status:</strong> {invoice.status || "N/A"}</p>

//         <div className="flex justify-end mt-4">
//           <button
//             onClick={() => patchInvoice({ status: "Paid" })}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Mark as Paid
//           </button>
//           <button
//             onClick={deleteInvoice}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
