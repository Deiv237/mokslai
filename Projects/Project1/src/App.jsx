import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Bookmarked from './pages/Bookmarked';

const App = () => (
  <Router>
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvseries" element={<TVSeries />} />
        <Route path="/bookmarked" element={<Bookmarked />} />
      </Routes>
    </div>
  </Router>
);

export default App;
