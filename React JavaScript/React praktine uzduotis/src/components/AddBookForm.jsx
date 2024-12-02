import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (title.length < 3 || title.length > 100)
      errors.title = "Title must be between 3 and 100 characters.";
    if (!/^[a-zA-Z\s]+$/.test(author))
      errors.author = "Author name can only contain letters and spaces.";
    if (!category) errors.category = "Please provide a category.";
    if (price <= 0 || isNaN(price))
      errors.price = "Price must be a positive number.";
    // if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/.test(cover)) errors.cover = "Invalid cover URL.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            author,
            category,
            price: parseFloat(price),
            cover,
            reserved: false,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Book registered successfully:", data);
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h1 className="text-center mb-4">Register a New Book</h1>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="form-label"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {formErrors.title && <p className="text-danger">{formErrors.title}</p>}
      </div>
      <div className="mb-3">
        <label
          htmlFor="author"
          className="form-label"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {formErrors.author && (
          <p className="text-danger">{formErrors.author}</p>
        )}
      </div>
      <div className="mb-3">
        <label
          htmlFor="category"
          className="form-label"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {formErrors.category && (
          <p className="text-danger">{formErrors.category}</p>
        )}
      </div>
      <div className="mb-3">
        <label
          htmlFor="price"
          className="form-label"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {formErrors.price && <p className="text-danger">{formErrors.price}</p>}
      </div>
      <div className="mb-3">
        <label
          htmlFor="cover"
          className="form-label"
        >
          Cover URL
        </label>
        <input
          type="text"
          id="cover"
          className="form-control"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        {formErrors.cover && <p className="text-danger">{formErrors.cover}</p>}
      </div>
      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        Submit
      </button>
    </form>
  );
}
