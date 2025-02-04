import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
// import GetTicket from "./components/GetTicket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/ticket" element={<GetTicket />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

