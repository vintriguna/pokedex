import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PokeDetails from "./components/PokeDetails";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
