import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PokeDetails from "./components/PokeDetails";
import PokemonProvider from "./providers/PokemonProvider";
export default function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokeDetails />} />
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  );
}
