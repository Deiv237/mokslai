import Card from './Card';

const Trending = ({ shows, toggleBookmark }) => (
  <div className="trending">
    {shows.map((show) => (
      <Card key={show.id} show={show} toggleBookmark={toggleBookmark} />
    ))}
  </div>
);

export default Trending;
