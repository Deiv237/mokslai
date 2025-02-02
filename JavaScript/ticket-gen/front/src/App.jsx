import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodingConfForm from "./components/CodingConfForm";
import Ticket from "./components/Ticket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodingConfForm />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </Router>
  );
}

export default App;
