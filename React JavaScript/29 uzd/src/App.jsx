import { Routes, Route } from "react-router";
import Card from "./components/Card";
import Home from "./components/Home";

export default function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<Card />} />
      </Routes>
    </>
  );
}