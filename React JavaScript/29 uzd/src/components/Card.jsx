import { Link } from "react-router";
export default function Card({user}) {

    return (
  <div className="col-4 mb-4">
      <img
        src={user.avatar_url}
        className="rounded-circle"
        width="140"
        alt={user.login}
      />
      <div className="card-body">
        <h5 className="card-title">{user.login}</h5>
        <button className="btn btn-secondary">
          <Link to={`/users/${user.id}`}>
          View Details</Link>
          </button>
      </div>
  </div>
    );
}
