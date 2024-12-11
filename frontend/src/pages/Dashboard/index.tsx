import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchTeamMembers } from '../../store/slices/teamSlice';
import { fetchServices } from '../../store/slices/servicesSlice';
import { fetchCaseStudies } from '../../store/slices/caseStudiesSlice';

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        {/* Add any dashboard header/navigation here if needed */}
      </Box>
      <Outlet />
    </Container>
  );
};

export default Dashboard;
