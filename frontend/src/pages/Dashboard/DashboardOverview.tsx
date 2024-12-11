import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import CaseIcon from '@mui/icons-material/Work';
import { RootState } from '../../store';

const DashboardCard: React.FC<{
  title: string;
  count: number;
  icon: React.ReactNode;
  link: string;
}> = ({ title, count, icon, link }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          transition: '0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="h4" component="p">
          {count}
        </Typography>
      </Paper>
    </Link>
  </Grid>
);

const DashboardOverview: React.FC = () => {
  const team = useSelector((state: RootState) => state.team.teamMembers);
  const services = useSelector((state: RootState) => state.services.services);
  const caseStudies = useSelector((state: RootState) => state.caseStudies.caseStudies);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <DashboardCard
          title="Team Members"
          count={team.length}
          icon={<PeopleIcon fontSize="large" />}
          link="/dashboard/team"
        />
        <DashboardCard
          title="Services"
          count={services.length}
          icon={<BusinessIcon fontSize="large" />}
          link="/dashboard/services"
        />
        <DashboardCard
          title="Case Studies"
          count={caseStudies.length}
          icon={<CaseIcon fontSize="large" />}
          link="/dashboard/case-studies"
        />
      </Grid>
    </Box>
  );
};

export default DashboardOverview;