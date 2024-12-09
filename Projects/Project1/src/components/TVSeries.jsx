import Card from '../components/Card';
import data from '../data/data.json';

const TVSeries = () => {
  const series = data.filter((show) => show.category === 'TV Series');

  return (
    <div className="tv-series">
      <h2>TV Series</h2>
      <div className="series-list">
        {series.map((show) => (
          <Card key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default TVSeries;
