import { Link } from 'react-router';

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/movies">Movies</Link></li>
      <li><Link to="/tvseries">TV Series</Link></li>
      <li><Link to="/bookmarked">Bookmarked</Link></li>
    </ul>
  </nav>
);

export default Navbar;
