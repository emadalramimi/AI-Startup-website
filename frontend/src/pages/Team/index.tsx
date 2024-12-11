import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, IconButton, useTheme, alpha, CircularProgress } from '@mui/material';
import { LinkedIn, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AppDispatch, RootState } from '../../store';
import { fetchTeamMembers } from '../../store/slices/teamSlice';

const TeamMemberCard = ({ member, index }: { member: any; index: number }) => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <Card
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)}, ${alpha(
            theme.palette.background.paper,
            0.05
          )})`,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
          <CardMedia
            component="img"
            image={member.image || `https://source.unsplash.com/random/400x400/?portrait&sig=${index}`}
            alt={member.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
              height: '50%',
            }}
          />
        </Box>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              mb: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            {member.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              color: theme.palette.primary.main,
              fontWeight: 500,
            }}
          >
            {member.position}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              opacity: 0.8,
              lineHeight: 1.7,
            }}
          >
            {member.bio}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {member.linkedin_url && (
              <IconButton
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  background: theme.palette.primary.main,
                  '&:hover': {
                    background: theme.palette.primary.dark,
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
            )}
            {member.github_url && (
              <IconButton
                href={member.github_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  background: theme.palette.secondary.main,
                  '&:hover': {
                    background: theme.palette.secondary.dark,
                  },
                }}
              >
                <GitHub />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Team = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { members, loading } = useSelector((state: RootState) => {
    const teamData = state.team.teamMembers;
    
    // Ensure we always have an array
    const membersList = Array.isArray(teamData) 
      ? teamData 
      : (teamData?.results || teamData?.data || []);
    
    return {
      members: membersList,
      loading: state.team.loading
    };
  });
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  // Add loading state handling
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 64px)' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Add empty state handling
  if (members.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 64px)' 
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          No team members found
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Our team is currently being assembled
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '350px',
          height: '350px',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(
            theme.palette.secondary.main,
            0.2
          )})`,
          borderRadius: '50%',
          filter: 'blur(90px)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(
            theme.palette.primary.main,
            0.2
          )})`,
          borderRadius: '50%',
          filter: 'blur(90px)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Team
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 800, mx: 'auto', opacity: 0.8 }}
          >
            Meet our team of experts dedicated to bringing AI innovation to your business
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {members.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <TeamMemberCard member={member} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
