import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PetList from "./pages/PetList";
import AddPet from "./pages/AddPet";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/add-pet" element={<AddPet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
