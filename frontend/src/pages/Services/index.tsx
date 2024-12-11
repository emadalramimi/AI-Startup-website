import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, useTheme, alpha } from '@mui/material';
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

const DefaultIcon = () => (
  <Box 
    sx={{ 
      width: 50, 
      height: 50, 
      backgroundColor: 'primary.main', 
      borderRadius: '50%' 
    }} 
  />
);

const ServiceFeatures = ({ features }: { features?: string[] }) => {
  const theme = useTheme();
  
  // If features is undefined or empty, return null
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {features.map((feature, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            '&:before': {
              content: '""',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              mr: 2,
            },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {feature}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const Services = () => {
  const services = useSelector((state: RootState) => {
    const servicesData = state.services.services;
    // Ensure we always have an array
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
    // Only dispatch if services is empty
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Loading services...
        </Typography>
      </Container>
    );
  }

  if (services.length === 0) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          No services available
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <ParticlesBackground />
      <Container>
        <PageHeader 
          title="Our Services" 
          subtitle="Innovative Solutions Tailored to Your Needs" 
        />
        <Grid 
          ref={ref} 
          container 
          spacing={4} 
          justifyContent="center"
        >
          {services.map((service: Service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <AnimatedCard>
                <Box 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 2 
                    }}
                  >
                    {/* Fallback to DefaultIcon if no icon or getIconComponent is not defined */}
                    {typeof getIconComponent === 'function' 
                      ? (service.icon ? getIconComponent(service.icon) : <DefaultIcon />) 
                      : <DefaultIcon />}
                  </Box>
                  <Typography 
                    variant="h6" 
                    align="center" 
                    gutterBottom
                  >
                    {service.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center" 
                    sx={{ flexGrow: 1 }}
                  >
                    {service.description}
                  </Typography>
                  {/* Conditionally render ServiceFeatures if needed */}
                  {service.features && (
                    <ServiceFeatures features={service.features} />
                  )}
                </Box>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
