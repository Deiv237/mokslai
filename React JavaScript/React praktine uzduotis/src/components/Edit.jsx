import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Edit() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const book = await response.json();
        setData(book);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update. Status: ${response.status}`);
      }
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h1 className="text-center mb-4">Edit Book</h1>
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={data.title || ""}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Author</label>
        <input
          type="text"
          className="form-control"
          value={data.author || ""}
          onChange={(e) => setData({ ...data, author: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Category</label>
        <input
          type="text"
          className="form-control"
          value={data.category || ""}
          onChange={(e) => setData({ ...data, category: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="btn btn-success w-100"
      >
        Save Changes
      </button>
    </form>
  );
}
