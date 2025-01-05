import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DashboardOverview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {t('dashboard.overview.title')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">
              {t('dashboard.overview.services')}
            </Typography>
            <Typography variant="body1">
              {t('dashboard.overview.servicesCount', { count: 5 })}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">
              {t('dashboard.overview.messages')}
            </Typography>
            <Typography variant="body1">
              {t('dashboard.overview.messagesCount', { count: 12 })}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">
              {t('dashboard.overview.team')}
            </Typography>
            <Typography variant="body1">
              {t('dashboard.overview.teamCount', { count: 8 })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
