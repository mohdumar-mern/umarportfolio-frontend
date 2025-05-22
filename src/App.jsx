import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutComponents from "./components/Layout/Layout";
import HeroPage from "./pages/HeroSection/HeroPage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <Router>
      <LayoutComponents>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </LayoutComponents>
    </Router>
  );
}

export default App;
