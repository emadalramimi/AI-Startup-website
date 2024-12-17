import { Box, Container, Grid, Typography, Button, useTheme, alpha, CircularProgress, Paper, Skeleton, Card } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { ArrowForward, Business, Speed, TrendingUp } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import AnimatedCard from '../../components/AnimatedCard';
import ParticlesBackground from '../../components/ParticlesBackground';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { fetchCaseStudies } from '../../store/slices/caseStudiesSlice';

const LoadingSkeleton = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <Paper
                sx={{
                  p: 0,
                  height: '100%',
                  backgroundColor: 'background.paper',
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                <Skeleton variant="rectangular" height={200} />
                <Box sx={{ p: 3 }}>
                  <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} sx={{ mb: 2 }} width="80%" />
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {[1, 2, 3].map((chip) => (
                      <Grid item key={chip}>
                        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 3 }} />
                      </Grid>
                    ))}
                  </Grid>
                  <Skeleton variant="text" height={60} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

const MetricCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
          theme.palette.secondary.main,
          0.1
        )})`,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        <Icon sx={{ color: 'white' }} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

const CaseStudyDetails = ({ caseStudy }: { caseStudy: any }) => {
  const theme = useTheme();
  
  const clientIndustry = caseStudy.client_industry || 'Not specified';
  const technologies = caseStudy.technologies || ['AI', 'Computer Vision'];
  const results = Array.isArray(caseStudy.results) 
    ? caseStudy.results 
    : (typeof caseStudy.results === 'string' 
      ? [caseStudy.results] 
      : ['No specific results available']);

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 600,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Business sx={{ color: theme.palette.primary.main }} />
          Industry: {clientIndustry}
        </Typography>
        
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Speed sx={{ color: theme.palette.primary.main }} />
          Technologies Used:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 3,
          }}
        >
          {technologies.map((tech: string, index: number) => (
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
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                fontSize: '0.875rem',
                color: theme.palette.primary.main,
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              }}
            >
              {tech}
            </Box>
          ))}
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ color: theme.palette.primary.main }} />
          Key Results:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {results.map((result: string, index: number) => (
            <Box
              key={index}
              sx={{
                px: 3,
                py: 2,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)}, ${alpha(
                  theme.palette.success.light,
                  0.1
                )})`,
                backdropFilter: 'blur(4px)',
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                fontSize: '0.9rem',
                color: theme.palette.text.secondary,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(8px)',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.15)}, ${alpha(
                    theme.palette.success.light,
                    0.15
                  )})`,
                },
              }}
            >
              {result}
            </Box>
          ))}
        </Box>
      </Box>

      <Button
        component={RouterLink}
        to={`/contact?ref=case-study-${caseStudy.id}`}
        variant="outlined"
        endIcon={<ArrowForward />}
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 2,
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          '&:hover': {
            borderColor: theme.palette.primary.dark,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          },
        }}
      >
        Discuss Similar Project
      </Button>
    </Box>
  );
};

const CaseStudies = () => {
  const theme = useTheme();
  const { caseStudies, loading } = useSelector((state: RootState) => {
    const caseStudiesData = state.caseStudies.caseStudies;
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
    return <LoadingSkeleton />;
  }

  if (caseStudies.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 500,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We're currently working on documenting our success stories. Check back soon to explore how we've helped businesses transform their operations with AI solutions.
          </Typography>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            Discuss Your Project
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        position: 'relative', 
        pb: 12,
        pt: 8,
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
            Success Stories
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 700, mx: 'auto' }}
          >
            Explore how we've helped businesses transform their operations with cutting-edge AI solutions
          </Typography>

          <Grid container spacing={3} sx={{ mb: 8 }}>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                icon={Business}
                label="Clients Served"
                value={`${caseStudies.length}+`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                icon={Speed}
                label="Average Efficiency Gain"
                value="45%"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                icon={TrendingUp}
                label="ROI Improvement"
                value="3.5x"
              />
            </Grid>
          </Grid>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4}>
            {caseStudies.map((caseStudy, index) => (
              <Grid item xs={12} md={6} key={caseStudy.id || index}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                    },
                  }}
                >
                  {caseStudy.image && (
                    <Box
                      sx={{
                        height: 240,
                        width: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '30%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </Box>
                  )}
                  
                  <Box sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {caseStudy.title || 'Untitled Case Study'}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                      {caseStudy.description || 'No description available'}
                    </Typography>

                    <CaseStudyDetails caseStudy={caseStudy} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CaseStudies;
