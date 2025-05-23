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
import SkillsList from "./private/Dashboard/Skills/SkillList";
import SkillDetail from "./private/Dashboard/Skills/SkillDetail";
import AddAndUpdateSkill from "./private/Dashboard/Skills/AddAndUpdateSkill";
import ServicesList from "./private/Dashboard/Services/ServicesList";
import AddService from "./private/Dashboard/Services/AddService";
import ServiceDetail from "./private/Dashboard/Services/ServiceDetail";

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


            <Route path="skills" element={<SkillsList />} />
            <Route path="skills/:id/view" element={<SkillDetail />} />
            <Route path="skills/add" element={<AddAndUpdateSkill />} />
            <Route path="skills/:id/edit" element={<AddAndUpdateSkill />} />

            <Route path="services" element={<ServicesList />} />
            <Route path="services/add" element={<AddService />} />
            <Route path="services/:id/view" element={<ServiceDetail />} />


          </Route>

        </Routes>
      </LayoutComponents>
    </Router>
  );
}

export default App;
