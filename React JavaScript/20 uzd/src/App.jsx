import Header from "./components/Header";
import Card from "./components/Card";
import jobs from "./data/data.json";

export default function App() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          {jobs.map((job) => (
            <div
              className="col-md-4"
              key={job.id}
            >
              <Card
                company={job.company}
                position={job.position}
                loacation={job.location}
                postedAt={job.postedAt}
                contract={job.contract}
                logo={job.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
