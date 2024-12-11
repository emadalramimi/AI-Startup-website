import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardOverview from './pages/Dashboard/DashboardOverview';
import TeamManagement from './pages/Dashboard/TeamManagement';
import ServicesManagement from './pages/Dashboard/ServicesManagement';
import CaseStudiesManagement from './pages/Dashboard/CaseStudiesManagement';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="services" element={<ServicesManagement />} />
        <Route path="case-studies" element={<CaseStudiesManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
