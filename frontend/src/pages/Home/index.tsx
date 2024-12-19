import { Box, Container, Typography, Button, Grid, useTheme, alpha, LinearProgress, Paper } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowForward, Speed, Psychology, DataObject, Cloud, Security, Code, CodeRounded, PsychologyRounded, VisibilityRounded, ChatRounded } from '@mui/icons-material';
import Lottie from 'lottie-react';
import ParticlesBackground from '../../components/ParticlesBackground';
import Testimonials from '../../components/Testimonials';
import aiAnimation from '../../assets/ai-animation.json';
import Globe from 'globe.gl';
import { scaleSequential } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { AIDevelopmentIcon, MachineLearningIcon, ComputerVisionIcon, NLPIcon } from '../../components/Icons3D';

const DEFAULT_POINT = {
  lat: 22.5880,
  lng: 58.3829,
  size: 0.7,
  color: '#FFD700',
};

const useGlobe = (globeEl, countries) => {
  useEffect(() => {
    if (!globeEl || countries.features.length === 0) return;

    const globe = Globe()
      .globeImageUrl('')
      .backgroundColor('rgba(0,0,0,0)')
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor('#7c4dff')
      .atmosphereAltitude(0.1)
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonColor(() => '#2a3eb1')
      .hexPolygonAltitude(0.01)
      .pointsData([DEFAULT_POINT])
      .pointAltitude(0.02)
      .pointColor('color')
      .pointRadius('size')
      .pointsMerge(true)
      (globeEl);

    // Auto-rotate and controls
    const controls = globe.controls();
    Object.assign(controls, {
      autoRotate: true,
      autoRotateSpeed: 0.5,
      enableZoom: false,
      minDistance: 300,
      maxDistance: 300,
    });

    globe.pointOfView({ ...DEFAULT_POINT, altitude: 1.0 });

    return () => {
      globeEl.innerHTML = '';
    };
  }, [globeEl, countries]);
};

const GlobeVisualization = () => {
  const globeEl = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState({ features: [] });
  const theme = useTheme();

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'
    )
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  useGlobe(globeEl.current, countries);

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.6,
        rotate: -20,
        filter: 'blur(10px)'
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)'
      }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 15,
        duration: 1,
      }}
      style={{
        width: '100%',
        height: '100%',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <Box
        ref={globeEl}
        sx={{
          width: '100%',
          height: '100%',
          transition: 'all 0.5s ease-in-out',
          '& > div': {
            width: '100% !important',
            height: '100% !important',
          },
          '& canvas': {
            outline: 'none',
            boxShadow: `0 15px 50px ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: '50%',
          },
        }}
      />
    </motion.div>
  );
};


const ProcessStep = ({ number, title, description, isLast = false }: { number: string; title: string; description: string; isLast?: boolean }) => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          mb: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '2.5rem',
            top: '5rem', 
            bottom: isLast ? '0' : '-50%',
            width: '2px',
            background: isLast ? 'none' : `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`,
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            width: '5rem',
            height: '5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
            mr: 3,
            position: 'relative',
            zIndex: 1,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 700,
            }}
          >
            {number}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, pt: 0.5 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              fontSize: '1.1rem',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const SkillBar = ({ skill, value, color }: { skill: string; value: number; color: string }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{skill}</Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: alpha(color, 0.1),
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}, ${theme.palette.secondary.main})`,
          },
        }}
      />
    </Box>
  );
};

const Home = () => {
  const theme = useTheme();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'High Performance',
      description: 'Our AI solutions are optimized for maximum efficiency and speed.',
    },
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: 'Advanced AI',
      description: 'Cutting-edge machine learning algorithms for intelligent decision making.',
    },
    {
      icon: <DataObject sx={{ fontSize: 40 }} />,
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights with our analytics tools.',
    },
  ];

  const skills = [
    { name: 'AI Development', value: 95, color: theme.palette.primary.main },
    { name: 'Machine Learning', value: 90, color: theme.palette.secondary.main },
    { name: 'Computer Vision', value: 85, color: theme.palette.primary.main },
    { name: 'Natural Language Processing', value: 88, color: theme.palette.secondary.main },
  ];

  const process = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We begin with a thorough consultation to understand your unique challenges, requirements, and business objectives. Our team of experts analyzes your current systems and identifies opportunities for AI integration.',
    },
    {
      number: '02',
      title: 'Strategic Planning',
      description: 'Based on our analysis, we develop a comprehensive AI strategy tailored to your needs. This includes detailed technical specifications, timeline, resource allocation, and clear success metrics.',
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'Our skilled developers build your custom AI solution using cutting-edge technology and best practices. We conduct rigorous testing to ensure reliability, scalability, and optimal performance.',
    },
    {
      number: '04',
      title: 'Integration & Deployment',
      description: 'We seamlessly integrate the AI solution into your existing infrastructure, ensuring minimal disruption to your operations. Our team provides comprehensive documentation and training for your staff.',
    },
    {
      number: '05',
      title: 'Optimization & Support',
      description: 'Post-deployment, we continuously monitor system performance and collect feedback. Our team provides ongoing support, maintenance, and optimization to ensure your AI solution delivers maximum value.',
    },
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Particles Background */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <ParticlesBackground />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(
              theme.palette.secondary.main,
              0.2
            )})`,
            filter: 'blur(100px)',
            y: y1,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.2)}, ${alpha(
              theme.palette.primary.main,
              0.2
            )})`,
            filter: 'blur(100px)',
            y: y2,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                ref={heroRef}
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 800,
                    mb: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  AI Solutions
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 600, lineHeight: 1.6 }}
                >
                  Enduring excellence in artificial intelligence. We craft sustainable AI solutions 
                  that evolve with technology and deliver lasting value for your business.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    component={RouterLink}
                    to="/services"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      },
                    }}
                  >
                    Explore Services
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/contact"
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '120%',
                  right: '74%',
                  width: '100px',  
                  height: '100px', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 100, 
                  damping: 10,
                  delay: 0.2
                }}
              >
                <GlobeVisualization />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Expertise Section */}
      <Box sx={{ py: 10, position: 'relative', backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Expertise in AI
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: 'AI Development',
                description: 'Custom AI solutions tailored to your business needs. From concept to deployment, we build scalable and efficient AI systems that drive innovation.',
                progress: 95,
                icon: <AIDevelopmentIcon sx={{ fontSize: 40 }} />,
              },
              {
                title: 'Machine Learning',
                description: 'Advanced ML algorithms and models that learn from your data to make accurate predictions and automate decision-making processes.',
                progress: 90,
                icon: <MachineLearningIcon sx={{ fontSize: 40 }} />,
              },
              {
                title: 'Computer Vision',
                description: 'State-of-the-art computer vision solutions for image recognition, object detection, and visual data analysis.',
                progress: 85,
                icon: <ComputerVisionIcon sx={{ fontSize: 40 }} />,
              },
              {
                title: 'Natural Language Processing',
                description: 'Sophisticated NLP systems for text analysis, sentiment analysis, and human-like language understanding.',
                progress: 88,
                icon: <NLPIcon sx={{ fontSize: 40 }} />,
              },
            ].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 4,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        '& .icon-container': {
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                      },
                    }}
                  >
                    <Box 
                      className="icon-container"
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    >
                      <Box
                        sx={{
                          mr: 2,
                          p: 2,
                          borderRadius: 3,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          color: 'white',
                          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                    </Box>
                    
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                      {item.description}
                    </Typography>

                    <Box sx={{ position: 'relative', mt: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          position: 'absolute',
                          right: 0,
                          top: -20,
                          fontWeight: 600,
                        }}
                      >
                        {item.progress}%
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Process Section */}
      <Box 
        sx={{ 
          py: 10, 
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0A192F', // Dark navy background
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 50%, ${alpha('#1E2A45', 0.3)}, transparent)`,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 8,
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Process
            </Typography>
          </motion.div>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {process.map((step, index, array) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                isLast={index === array.length - 1}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Integration Section */}
      <Box 
        sx={{ 
          py: 12,
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(30, 30, 60, 0.2) 0%, rgba(30, 30, 60, 0.4) 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'radial-gradient(circle at 50% 50%, rgba(76, 96, 255, 0.2) 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.2)' },
              '100%': { transform: 'scale(1)' },
            },
          }}
        />

        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
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
              Seamless Integration with Your Tech Stack
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary"
              sx={{ mb: 8, maxWidth: 700, mx: 'auto' }}
            >
              Our AI solutions integrate effortlessly with your existing infrastructure, ensuring smooth deployment and maximum efficiency
            </Typography>
          </motion.div>

          <Grid container spacing={4} alignItems="center">
            {[
              {
                icon: <Cloud sx={{ fontSize: 40 }} />,
                title: 'Cloud Integration',
                description: 'Seamlessly connect with major cloud providers including AWS, Google Cloud, and Azure',
                gradient: '45deg, #00C6FB, #005BEA'
              },
              {
                icon: <Security sx={{ fontSize: 40 }} />,
                title: 'Secure Implementation',
                description: 'Enterprise-grade security protocols ensuring your data remains protected',
                gradient: '45deg, #FF512F, #DD2476'
              },
              {
                icon: <Code sx={{ fontSize: 40 }} />,
                title: 'API Compatibility',
                description: 'RESTful APIs and SDKs for easy integration with your existing applications',
                gradient: '45deg, #4776E6, #8E54E9'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      minHeight: 280,
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        '& .integration-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                        '& .integration-gradient': {
                          opacity: 0.15,
                        }
                      },
                    }}
                  >
                    {/* Background Gradient */}
                    <Box
                      className="integration-gradient"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(${feature.gradient})`,
                        opacity: 0.1,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                    
                    {/* Content */}
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        className="integration-icon"
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: 3,
                          background: `linear-gradient(${feature.gradient})`,
                          color: 'white',
                          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                          mb: 3,
                          transition: 'transform 0.3s ease-in-out',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 2,
                          fontWeight: 700,
                          background: `linear-gradient(${feature.gradient})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Integration Platforms */}
          <Box sx={{ mt: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 4,
                }}
              >
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <Typography 
                      variant="h6" 
                      align="center" 
                      sx={{ mb: 4, color: 'text.secondary' }}
                    >
                      Trusted by Leading Platforms
                    </Typography>
                  </Grid>
                  {['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes'].map((platform, index) => (
                    <Grid item key={index}>
                      <Box
                        sx={{
                          px: 3,
                          py: 2,
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        {platform}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ py: 10, position: 'relative', backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              Why Choose Us
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary"
              sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
            >
              We combine cutting-edge technology with expertise to deliver exceptional AI solutions
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[
              {
                icon: <Speed sx={{ fontSize: 40 }} />,
                title: 'High Performance',
                description: 'Our AI solutions are optimized for maximum efficiency and speed, ensuring seamless operation and rapid results.',
                gradient: '45deg, #FF6B6B, #FF8E53'
              },
              {
                icon: <Psychology sx={{ fontSize: 40 }} />,
                title: 'Advanced AI',
                description: 'Cutting-edge machine learning algorithms that evolve with your needs, providing intelligent and adaptive decision-making.',
                gradient: '45deg, #4E65FF, #92EFFD'
              },
              {
                icon: <DataObject sx={{ fontSize: 40 }} />,
                title: 'Data Analytics',
                description: 'Transform complex data into actionable insights with our powerful analytics tools and visualization capabilities.',
                gradient: '45deg, #6B4EFF, #B265FF'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        '& .feature-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                        '& .feature-gradient': {
                          opacity: 0.15,
                        }
                      },
                    }}
                  >
                    {/* Background Gradient */}
                    <Box
                      className="feature-gradient"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(${feature.gradient})`,
                        opacity: 0.1,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                    
                    {/* Content */}
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        className="feature-icon"
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: 3,
                          background: `linear-gradient(${feature.gradient})`,
                          color: 'white',
                          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                          mb: 3,
                          transition: 'transform 0.3s ease-in-out',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 2,
                          fontWeight: 700,
                          background: `linear-gradient(${feature.gradient})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ mb: 12, position: 'relative', zIndex: 1 }}>
        <Testimonials />
      </Container>
    </Box>
  );
};

export default Home;
