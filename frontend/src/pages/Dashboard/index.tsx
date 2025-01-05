import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: '100vh', py: 4, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 4 }}>
          {t('dashboard.title')}
        </Typography>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Dashboard;
