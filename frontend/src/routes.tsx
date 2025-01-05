import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardOverview = lazy(() => import('./pages/Dashboard/DashboardOverview'));
const ServicesManagement = lazy(() => import('./pages/Dashboard/ServicesManagement'));
const MessagesManagement = lazy(() => import('./pages/Dashboard/MessagesManagement'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      
      // Dashboard routes
      {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: 'services', element: <ServicesManagement /> },
          { path: 'messages', element: <MessagesManagement /> },
        ]
      },

      // 404 Route
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default router;
