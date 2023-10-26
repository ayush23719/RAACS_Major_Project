import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import CustomNavbar from "./components/CustomNavbar";
import ParticleBackground from "./components/ParticleBackground";
import Home from "./Pages/Home";
import MapPage from "./Pages/MapPage";
import WelcomePage from "./Pages/WelcomePage";
import Analysis from "./Pages/Analysis";
import LiveSeverity from "./Pages/LiveSeverity";
function App() {
  return (
    <BrowserRouter>
      <ParticleBackground />
      <CustomNavbar />

      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/live" element={<LiveSeverity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
