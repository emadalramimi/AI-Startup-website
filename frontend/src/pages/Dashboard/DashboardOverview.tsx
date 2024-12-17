import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import CaseIcon from '@mui/icons-material/Work';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RootState } from '../../store';

const StatCard: React.FC<{
  title: string;
  count: number;
  icon: React.ReactNode;
  link: string;
  color: string;
}> = ({ title, count, icon, link, color }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          transition: '0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 3,
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                backgroundColor: `${color}20`,
                borderRadius: '50%',
                p: 1,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ color: color }}>{icon}</Box>
            </Box>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
          <Typography variant="h4" component="div" sx={{ mb: 1 }}>
            {count}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              View Details
            </Typography>
            <ArrowForwardIcon
              sx={{ ml: 1, fontSize: '1rem', color: 'text.secondary' }}
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  </Grid>
);

const RecentActivity: React.FC = () => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Recent Activity</Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem>
          <ListItemText
            primary="New team member added"
            secondary="John Doe - Senior Developer"
          />
          <ListItemSecondaryAction>
            <Typography variant="caption" color="text.secondary">
              2 hours ago
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Service updated"
            secondary="AI Consulting service description updated"
          />
          <ListItemSecondaryAction>
            <Typography variant="caption" color="text.secondary">
              5 hours ago
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="New case study published"
            secondary="AI Implementation at Tech Corp"
          />
          <ListItemSecondaryAction>
            <Typography variant="caption" color="text.secondary">
              1 day ago
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </CardContent>
  </Card>
);

const ProgressSection: React.FC = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Content Completion
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Team Members</Typography>
          <Typography variant="body2" color="text.secondary">
            80%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={80} color="primary" />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Services</Typography>
          <Typography variant="body2" color="text.secondary">
            65%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={65} color="secondary" />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Case Studies</Typography>
          <Typography variant="body2" color="text.secondary">
            45%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={45} color="warning" />
      </Box>
    </CardContent>
  </Card>
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
        <StatCard
          title="Team Members"
          count={team.length}
          icon={<PeopleIcon fontSize="large" />}
          link="/dashboard/team"
          color="#1976d2"
        />
        <StatCard
          title="Services"
          count={services.length}
          icon={<BusinessIcon fontSize="large" />}
          link="/dashboard/services"
          color="#2e7d32"
        />
        <StatCard
          title="Case Studies"
          count={caseStudies.length}
          icon={<CaseIcon fontSize="large" />}
          link="/dashboard/case-studies"
          color="#ed6c02"
        />
        <StatCard
          title="Total Views"
          count={1234}
          icon={<DashboardIcon fontSize="large" />}
          link="/dashboard"
          color="#9c27b0"
        />
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <RecentActivity />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProgressSection />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;