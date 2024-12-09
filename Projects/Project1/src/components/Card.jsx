const Card = ({ show, toggleBookmark }) => (
  <div className="card">
    <img src={show.thumbnail} alt={show.title} />
    <div className="card-info">
      <h3>{show.title}</h3>
      <p>{show.category} • {show.rating}</p>
      <button onClick={() => toggleBookmark(show.id)}>
        {show.isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </button>
    </div>
  </div>
);

export default Card;
