import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, useTheme, alpha, Paper, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHeader from '../../components/PageHeader';
import AnimatedCard from '../../components/AnimatedCard';
import ParticlesBackground from '../../components/ParticlesBackground';
import { Link as RouterLink } from 'react-router-dom';
import { fetchServices } from '../../store/slices/servicesSlice';
import { Service } from '../../types';
import { ArrowForward } from '@mui/icons-material';

const DefaultIcon = () => {
  const theme = useTheme();
  return (
    <Box 
      sx={{ 
        width: 60, 
        height: 60, 
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
        transform: 'rotate(-5deg)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'rotate(0deg) scale(1.1)',
        }
      }} 
    />
  );
};

const ServiceFeatures = ({ features }: { features?: string[] }) => {
  const theme = useTheme();
  
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 3 }}>
      {features.map((feature, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            '&:before': {
              content: '""',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              mr: 2,
              transition: 'transform 0.2s ease',
            },
            '&:hover': {
              '&:before': {
                transform: 'scale(1.2)',
              },
              '& .feature-text': {
                color: theme.palette.primary.main,
              }
            }
          }}
        >
          <Typography 
            className="feature-text"
            variant="body1" 
            sx={{ 
              transition: 'color 0.2s ease',
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            {feature}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        p: 4,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          '& .service-gradient': {
            opacity: 0.15,
          },
          '& .service-icon': {
            transform: 'rotate(0deg) scale(1.1)',
          }
        },
      }}
    >
      {/* Background Gradient */}
      <Box
        className="service-gradient"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          opacity: 0.1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* Content */}
      <Box sx={{ position: 'relative' }}>
        <Box 
          className="service-icon"
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 3,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {typeof getIconComponent === 'function' 
            ? (service.icon ? getIconComponent(service.icon) : <DefaultIcon />) 
            : <DefaultIcon />}
        </Box>

        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {service.name}
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: 3,
            lineHeight: 1.7
          }}
        >
          {service.description}
        </Typography>

        {service.features && (
          <ServiceFeatures features={service.features} />
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            component={RouterLink}
            to={`/contact?service=${service.name}`}
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: 2,
              py: 1,
              px: 3,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

const LoadingSkeleton = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Skeleton variant="circular" width={60} height={60} />
                </Box>
                <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
                <Skeleton variant="text" height={100} sx={{ mb: 2 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

const Services = () => {
  const theme = useTheme();
  const services = useSelector((state: RootState) => {
    const servicesData = state.services.services;
    return Array.isArray(servicesData) 
      ? servicesData 
      : (servicesData?.results || servicesData?.data || []);
  });
  const loading = useSelector((state: RootState) => state.services.loading);
  const dispatch = useDispatch<AppDispatch>();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        overflow: 'hidden',
        minHeight: '100vh',
        pt: 8,
        pb: 12,
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.8)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
      }}
    >
      <ParticlesBackground />
      
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }}
          >
            Our Services
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 700, mx: 'auto' }}
          >
            Innovative AI Solutions Tailored to Your Business Needs
          </Typography>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : services.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h5" color="text.secondary">
              No services available at the moment
            </Typography>
          </Box>
        ) : (
          <Grid 
            ref={ref} 
            container 
            spacing={4} 
            justifyContent="center"
          >
            {services.map((service: Service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Services;
