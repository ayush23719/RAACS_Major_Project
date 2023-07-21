import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import CustomNavbar from "./components/CustomNavbar";
import ParticleBackground from "./components/ParticleBackground";
import Home from "./Pages/Home";
import MapPage from "./Pages/MapPage";
import WelcomePage from "./Pages/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <ParticleBackground />
      <CustomNavbar />

      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
