import Card from '../components/Card';
import data from '../data/data.json';

const Movies = () => {
  const movies = data.filter((show) => show.category === 'Movie');

  return (
    <div className="movies">
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <Card key={movie.id} show={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
