import { Box, Container, Typography, Button, Grid, useTheme, alpha, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowForward, Language, AutoAwesome, Psychology, Speed } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ParticlesBackground from '../../components/ParticlesBackground';
import Testimonials from '../../components/Testimonials';
import { AIDevelopmentIcon, MachineLearningIcon, ComputerVisionIcon, NLPIcon } from '../../components/Icons3D';
import ImageCarousel from '../../components/ImageCarousel';

const ProcessStep = ({ number, title, description, isLast = false }: { number: string; title: string; description: string; isLast?: boolean }) => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Number(number) * 0.2 }}
    >
      <Box
        sx={{
          position: 'relative',
          p: 3,
          borderRadius: 4,
          background: alpha(theme.palette.background.paper, 0.05),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            background: alpha(theme.palette.background.paper, 0.1),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            '& .step-number': {
              transform: 'scale(1.1)',
              boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Box
            className="step-number"
            sx={{
              width: 60,
              height: 60,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
              position: 'relative',
              transition: 'all 0.3s ease-in-out',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -1,
                borderRadius: '20px',
                padding: 1,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {number}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
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
              variant="body1"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.8),
                lineHeight: 1.7,
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

const SkillBar = ({ skill, value, color }: { skill: string; value: number; color: string }) => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box sx={{ mb: 4 }} ref={ref}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 1.5,
        alignItems: 'center'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 500,
            color: 'text.primary',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: color,
              transform: 'translateX(8px)',
            }
          }}
        >
          {skill}
        </Typography>
        <Box
          sx={{
            backgroundColor: alpha(color, 0.1),
            px: 2,
            py: 0.5,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: color,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(0.95)',
                  boxShadow: `0 0 0 0 ${alpha(color, 0.7)}`,
                },
                '70%': {
                  transform: 'scale(1)',
                  boxShadow: `0 0 0 6px ${alpha(color, 0)}`,
                },
                '100%': {
                  transform: 'scale(0.95)',
                  boxShadow: `0 0 0 0 ${alpha(color, 0)}`,
                },
              },
            }}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              color: color,
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            {value}%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: 12,
          borderRadius: 6,
          bgcolor: alpha(theme.palette.background.paper, 0.1),
          border: `1px solid ${alpha(color, 0.2)}`,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: `0 2px 8px ${alpha(color, 0.1)}`,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0)} 100%)`,
            zIndex: 1,
          }
        }}
      >
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={inView ? { 
            width: `${value}%`, 
            opacity: 1 
          } : {}}
          transition={{ 
            duration: 1.5, 
            ease: [0.87, 0, 0.13, 1],
          }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.8)})`,
            borderRadius: 6,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent 0%, ${alpha('#fff', 0.1)} 50%, transparent 100%)`,
              animation: 'shine 1.5s infinite',
            }
          }}
        />
      </Box>
    </Box>
  );
};

function Home() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const features = [
    {
      icon: <AIDevelopmentIcon />,
      title: t('home.features.innovation.title'),
      description: t('home.features.innovation.description'),
    },
    {
      icon: <MachineLearningIcon />,
      title: t('home.features.expertise.title'),
      description: t('home.features.expertise.description'),
    },
    {
      icon: <ComputerVisionIcon />,
      title: t('home.features.quality.title'),
      description: t('home.features.quality.description'),
    },
    {
      icon: <NLPIcon />,
      title: t('home.features.support.title'),
      description: t('home.features.support.description'),
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: t('home.process.steps.1.title'),
      description: t('home.process.steps.1.description'),
    },
    {
      number: '2',
      title: t('home.process.steps.2.title'),
      description: t('home.process.steps.2.description'),
    },
    {
      number: '3',
      title: t('home.process.steps.3.title'),
      description: t('home.process.steps.3.description'),
    },
    {
      number: '4',
      title: t('home.process.steps.4.title'),
      description: t('home.process.steps.4.description'),
    },
  ];

  const skills = [
    { skill: t('home.skills.ai'), value: 95, color: theme.palette.primary.main },
    { skill: t('home.skills.ml'), value: 90, color: theme.palette.secondary.main },
    { skill: t('home.skills.dl'), value: 85, color: '#00bcd4' },
    { skill: t('home.skills.nlp'), value: 88, color: '#ff9800' },
    { skill: t('home.skills.cv'), value: 92, color: '#e91e63' },
    { skill: t('home.skills.robotics'), value: 87, color: '#9c27b0' },
  ];

  return (
    <Box dir={i18n.dir}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        <ParticlesBackground />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('home.hero.title')}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  color: 'text.secondary',
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                {t('home.hero.subtitle')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  component={RouterLink}
                  to="/contact"
                  sx={{
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    py: 1.5,
                    px: 4,
                  }}
                >
                  {t('home.hero.cta')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/services"
                  sx={{
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    py: 1.5,
                    px: 4,
                  }}
                >
                  {t('home.hero.explore')}
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* AI Automation Section */}
      <Box
        sx={{
          py: { xs: 12, md: 20 },
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.background.paper, 0.9)} 0%, 
            ${alpha(theme.palette.background.default, 0.95)} 50%,
            ${alpha(theme.palette.background.paper, 0.9)} 100%)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            right: '10%',
            width: '50%',
            height: '50%',
            background: `radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animation: 'float 20s ease-in-out infinite',
            transform: 'rotate(-45deg)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '10%',
            width: '40%',
            height: '40%',
            background: `radial-gradient(circle at center, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animation: 'float 15s ease-in-out infinite reverse',
            transform: 'rotate(30deg)',
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '1rem',
                }}
              >
                {t('home.automation.subtitle')}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3.2rem' },
                  fontWeight: 800,
                  mb: 3,
                  background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main}, 
                    ${theme.palette.secondary.main}, 
                    ${theme.palette.primary.main}
                  )`,
                  backgroundSize: '200% auto',
                  animation: 'gradient 5s linear infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                  '@keyframes gradient': {
                    '0%': {
                      backgroundPosition: '0% center',
                    },
                    '100%': {
                      backgroundPosition: '200% center',
                    },
                  },
                }}
              >
                {t('home.automation.title')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.9),
                  mb: 6,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.8,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                }}
              >
                {t('home.automation.description')}
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: AutoAwesome, color: '#FF6B6B' },
              { icon: Psychology, color: '#4ECDC4' },
              { icon: Speed, color: '#45B7D1' },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: '24px',
                      background: `linear-gradient(145deg, 
                        ${alpha(theme.palette.background.paper, 0.9)}, 
                        ${alpha(theme.palette.background.default, 0.8)}
                      )`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: `linear-gradient(180deg, 
                          ${alpha(item.color, 0.05)} 0%, 
                          ${alpha(item.color, 0.02)} 100%
                        )`,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                        border: `1px solid ${alpha(item.color, 0.3)}`,
                        '&::before': {
                          opacity: 1,
                        },
                        '& .feature-icon': {
                          transform: 'scale(1.1)',
                          boxShadow: `0 12px 40px ${alpha(item.color, 0.4)}`,
                          '& .icon-animation': {
                            transform: 'rotate(360deg)',
                          },
                        },
                      },
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: '28px',
                        background: `linear-gradient(135deg, 
                          ${alpha(item.color, 0.9)}, 
                          ${alpha(item.color, 0.7)}
                        )`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: -1,
                          borderRadius: '28px',
                          padding: 1,
                          background: `linear-gradient(135deg, 
                            ${alpha(item.color, 0.9)}, 
                            ${alpha(item.color, 0.7)}
                          )`,
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        },
                      }}
                    >
                      <motion.div
                        className="icon-animation"
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <item.icon
                          sx={{
                            fontSize: 45,
                            color: 'white',
                            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
                          }}
                        />
                      </motion.div>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2.5,
                        fontWeight: 700,
                        background: `linear-gradient(135deg, 
                          ${item.color}, 
                          ${alpha(item.color, 0.8)}
                        )`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '1.4rem', md: '1.5rem' },
                      }}
                    >
                      {t(`home.automation.features.${index + 1}.title`)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.9),
                        lineHeight: 1.8,
                        fontSize: '1.05rem',
                      }}
                    >
                      {t(`home.automation.features.${index + 1}.description`)}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/services"
                sx={{
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  py: 2,
                  px: 8,
                  background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main}, 
                    ${theme.palette.secondary.main}
                  )`,
                  boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                    background: `linear-gradient(135deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.secondary.main}
                    )`,
                  },
                }}
              >
                {t('home.automation.cta')}
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Our Expertise Section */}
      <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('home.skills.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {t('home.skills.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              {skills.map((skill, index) => (
                <SkillBar
                  key={index}
                  skill={skill.skill}
                  value={skill.value}
                  color={skill.color}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ height: '500px' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: alpha(theme.palette.background.paper, 0.1),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '100%',
                      background: `linear-gradient(180deg, 
                        ${alpha(theme.palette.primary.main, 0.1)} 0%, 
                        ${alpha(theme.palette.secondary.main, 0.1)} 100%
                      )`,
                      zIndex: 1,
                    },
                    transform: isRTL ? 'scaleX(-1)' : 'none',
                  }}
                >
                  <Box
                    component="video"
                    src="/assets/Object_detection.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isRTL ? 'scaleX(-1)' : 'none',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Process Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.97)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '40%',
            height: '40%',
            background: `radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            animation: 'float 10s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '35%',
            height: '35%',
            background: `radial-gradient(circle at center, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                textShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              {t('home.process.title')}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{ mb: 10, maxWidth: 700, mx: 'auto', opacity: 0.8 }}
            >
              {t('home.process.subtitle')}
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ProcessStep
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  isLast={index === processSteps.length - 1}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: 'background.paper',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('home.cta.title')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
            {t('home.cta.subtitle')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/contact"
            endIcon={isRTL ? <ArrowForward sx={{ transform: 'scaleX(-1)' }} /> : <ArrowForward />}
            sx={{
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '1.1rem',
              py: 1.5,
              px: 4,
            }}
          >
            {t('home.cta.button')}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
