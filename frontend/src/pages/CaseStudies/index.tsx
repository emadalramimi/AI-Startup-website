import { Box, Container, Grid, Typography, Button, useTheme, alpha, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import AnimatedCard from '../../components/AnimatedCard';
import ParticlesBackground from '../../components/ParticlesBackground';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { fetchCaseStudies } from '../../store/slices/caseStudiesSlice';

const CaseStudyDetails = ({ caseStudy }: { caseStudy: any }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          mb: 1,
        }}
      >
        Industry: {caseStudy.industry}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 2,
        }}
      >
        {caseStudy.technologies.map((tech: string, index: number) => (
          <Box
            key={index}
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
                theme.palette.secondary.main,
                0.1
              )})`,
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.875rem',
              color: theme.palette.text.secondary,
            }}
          >
            {tech}
          </Box>
        ))}
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 'bold' }}>
          Key Results:
        </Typography>
        {caseStudy.results.map((result: string, index: number) => (
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
              {result}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        component={RouterLink}
        to={`/contact?case=${caseStudy.id}`}
        variant="contained"
        endIcon={<ArrowForward />}
        fullWidth
        sx={{
          background: `linear-gradient(45deg, ${alpha('#2196f3', 0.8)}, ${alpha('#21CBF3', 0.8)})`,
          backdropFilter: 'blur(4px)',
          '&:hover': {
            background: `linear-gradient(45deg, ${alpha('#2196f3', 1)}, ${alpha('#21CBF3', 1)})`,
          },
        }}
      >
        Learn More
      </Button>
    </Box>
  );
};

const CaseStudies = () => {
  const { caseStudies, loading } = useSelector((state: RootState) => {
    const caseStudiesData = state.caseStudies.caseStudies;
    
    // Ensure we always have an array
    const caseStudiesList = Array.isArray(caseStudiesData) 
      ? caseStudiesData 
      : (caseStudiesData?.results || caseStudiesData?.data || []);
    
    return {
      caseStudies: caseStudiesList,
      loading: state.caseStudies.loading
    };
  });
  const dispatch = useDispatch<AppDispatch>();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          No case studies available
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          We're working on creating more case studies to showcase our work
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pb: 12 }}>
      {/* Particles Background */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <ParticlesBackground />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <PageHeader
          title="Case Studies"
          subtitle="Explore how we've helped businesses transform their operations with AI and computer vision solutions"
        />

        <Container maxWidth="lg">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              {caseStudies.map((caseStudy, index) => (
                <Grid item xs={12} md={6} key={caseStudy.id}>
                  <AnimatedCard
                    title={caseStudy.title}
                    description={caseStudy.summary}
                    image={caseStudy.image}
                    delay={index * 0.1}
                    sx={{
                      ...(caseStudy.image && {
                        pt: '200px',
                      }),
                    }}
                  >
                    <CaseStudyDetails caseStudy={caseStudy} />
                  </AnimatedCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default CaseStudies;
