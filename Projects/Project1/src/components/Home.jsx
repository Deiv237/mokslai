import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Trending from '../components/Trending';
import Card from '../components/Card';
import data from '../data/data.json';

export default function Home () {
  const [shows, setShows] = useState(data);
  const [filteredShows, setFilteredShows] = useState(shows);

  const handleSearch = (query) => {
    const searchResults = shows.filter((show) =>
      show.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredShows(searchResults);
  };

  const toggleBookmark = (id) => {
    setShows((prevShows) =>
      prevShows.map((show) =>
        show.id === id ? { ...show, isBookmarked: !show.isBookmarked } : show
      )
    );
  };

  const trendingShows = shows.filter((show) => show.isTrending);

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      <h2>Trending</h2>
      <Trending shows={trendingShows} toggleBookmark={toggleBookmark} />
      <h2>All Shows</h2>
      <div className="all-shows">
        {filteredShows.map((show) => (
          <Card key={show.id} show={show} toggleBookmark={toggleBookmark} />
        ))}
      </div>
    </div>
  );
};
