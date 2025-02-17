import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function PetFilter({ setPets }) {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilter = async () => {
    try {
      let queryParams = "";
      if (filters.search) {
        queryParams += `q=${filters.search}`;
      }
      if (filters.sortBy) {
        if (queryParams) {
          queryParams += `&sortBy=${filters.sortBy}`;
        } else {
          queryParams += `sortBy=${filters.sortBy}`;
        }
      }
      const response = await axios.get(`${API_URL}/pets?${queryParams}`, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        setPets(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching filtered pets:", error);
    }
  };

  return (
    <div className="pet-filter-container">
      <div className="filter-form">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={filters.search}
          onChange={handleChange}
          className="filter-input"
        />
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Select an option</option>
          <option value="name_asc">Name (ASC)</option>
          <option value="name_desc">Name (DESC)</option>
          <option value="date_asc">Date (ASC)</option>
          <option value="date_desc">Date (DESC)</option>
          <option value="time_asc">Time (ASC)</option>
          <option value="time_desc">Time (DESC)</option>
        </select>
        <button onClick={applyFilter} className="filter-button">
          Apply
        </button>
      </div>
    </div>
  );
}