import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTeamMembers } from '../../store/slices/teamSlice';
import { fetchServices } from '../../store/slices/servicesSlice';
import { fetchCaseStudies } from '../../store/slices/caseStudiesSlice';
import DashboardLayout from '../../components/DashboardLayout';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log('Dashboard rendered, current path:', location.pathname);
    
    // Dispatch actions to fetch data
    dispatch(fetchTeamMembers());
    dispatch(fetchServices());
    dispatch(fetchCaseStudies());
  }, [dispatch, location]);

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default Dashboard;
