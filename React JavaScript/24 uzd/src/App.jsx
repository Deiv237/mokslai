import { Routes, Route } from 'react-router';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}

export default App;
