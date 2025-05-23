import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import LayoutComponents from "./components/Layout/Layout";
import HeroPage from "./pages/HeroSection/HeroPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProjectPage from "./pages/projects/ProjectPage";
import SkillPage from "./pages/Skills/SkillPage";
import ServicesPage from "./pages/Services/ServicesPage";
import ContactPage from "./pages/Contact/ContatPage";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./private/Dashboard/DashboardLayut/DashboardLayout";
import DashboardHome from "./private/Dashboard/DashboardHome/DashboardHome";
import ProjectList from "./private/Dashboard/project/ProjectList";
import ProjctDetail from "./private/Dashboard/project/ProjectDetails";
import ProjectAddUpdate from "./private/Dashboard/project/ProjectAddAndUpdate";

function App() {
  return (
    <Router>
      <LayoutComponents>
      <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/skills" element={<SkillPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

            {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } >
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/:id/view" element={<ProjctDetail />} />
            <Route path="projects/add" element={<ProjectAddUpdate />} />
            <Route path="projects/:id/edit" element={<ProjectAddUpdate />} />
          </Route>

        </Routes>
      </LayoutComponents>
    </Router>
  );
}

export default App;
