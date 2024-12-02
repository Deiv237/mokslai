import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function BookList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [deleteTrigger]);

  const toggleReservedStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({ reserved: !currentStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setData(
        data.map((book) =>
          book.id === id ? { ...book, reserved: !currentStatus } : book
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setDeleteTrigger((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-center mb-4">Book List</h1>
      <div className="row">
        {data.map((book) => (
          <div
            className="col-md-4 mb-4"
            key={book.id}
          >
            <div className="card">
              <img
                src={book.cover}
                className="card-img-top"
                alt={book.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p className="card-text">{book.author}</p>
                <p className="card-text">{book.price}</p>
                <div className="d-flex justify-content-between">
                  <button className={`btn btn-${
                    book.reserved ? "warning" : "primary"
                  } btn-sm`}
                    onClick={() => toggleReservedStatus(book.id, book.reserved)}
                  >
                    {book.reserved ? "Return" : "Lend to reader"}
                  </button>
                  <Link to={`/books/${book.id}`}>Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteBook(book.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
