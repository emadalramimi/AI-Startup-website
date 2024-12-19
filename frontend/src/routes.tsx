import React from 'react';
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
import MessagesManagement from './pages/Dashboard/MessagesManagement';
import AIDemos from './pages/AIDemos';
import AIDashboard from './pages/AIDemos/Dashboard';
import AgricultureAI from './pages/AIDemos/AgricultureAI';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
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
          <Route path="messages" element={<MessagesManagement />} />
        </Route>

        {/* AI Demo Routes */}
        <Route
          path="/ai-demos"
          element={
            <PrivateRoute>
              <AIDemos />
            </PrivateRoute>
          }
        />
        <Route
          path="/ai-dashboard"
          element={
            <PrivateRoute>
              <AIDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/agriculture-ai"
          element={
            <PrivateRoute>
              <AgricultureAI />
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
