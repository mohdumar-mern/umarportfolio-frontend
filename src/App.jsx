import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutComponents from "./components/Layout/Layout";
import HeroPage from "./pages/HeroSection/HeroPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProjectPage from "./pages/projects/ProjectPage";
import SkillPage from "./pages/Skills/SkillPage";
import ServicesPage from "./pages/Services/ServicesPage";

function App() {
  return (
    <Router>
      <LayoutComponents>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/skills" element={<SkillPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </LayoutComponents>
    </Router>
  );
}

export default App;
