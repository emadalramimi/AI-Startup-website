import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import {
  AutoFixHigh,
  Psychology,
  Biotech,
  Support,
  ArrowForward,
  ContactSupport,
  AttachMoney,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.ai_automation.title'),
      description: t('services.ai_automation.description'),
      icon: <AutoFixHigh sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      gradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
    },
    {
      title: t('services.custom_ai.title'),
      description: t('services.custom_ai.description'),
      icon: <Psychology sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
      gradient: 'linear-gradient(135deg, #22D3EE 0%, #67E8F9 100%)',
    },
    {
      title: t('services.rd_products.title'),
      description: t('services.rd_products.description'),
      icon: <Biotech sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      gradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
    },
    {
      title: t('services.consultations.title'),
      description: t('services.consultations.description'),
      icon: <Support sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
      gradient: 'linear-gradient(135deg, #22D3EE 0%, #67E8F9 100%)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        background: theme.palette.background.default,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 100%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: theme.gradient.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}
          >
            {t('services.title')}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ 
              mb: 8, 
              color: alpha(theme.palette.common.white, 0.7),
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            {t('services.subtitle')}
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      background: alpha(theme.palette.background.paper, 0.05),
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(service.color, 0.2)}`,
                      transition: 'all 0.3s ease-in-out',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        border: `1px solid ${alpha(service.color, 0.5)}`,
                        '& .service-gradient': {
                          opacity: 0.15,
                        },
                      },
                    }}
                  >
                    <Box
                      className="service-gradient"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: service.gradient,
                        opacity: 0.1,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    />
                    <CardContent sx={{ p: 4, position: 'relative' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: '12px',
                            background: alpha(service.color, 0.1),
                            color: service.color,
                            mr: 2,
                            boxShadow: `0 0 20px ${alpha(service.color, 0.2)}`,
                          }}
                        >
                          {service.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {service.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: alpha(theme.palette.common.white, 0.7),
                          minHeight: '80px',
                          lineHeight: 1.7,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Box
            sx={{
              mt: 8,
              p: 6,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                transform: 'translateY(100%)',
                transition: 'transform 0.3s ease-in-out',
              },
              '&:hover::before': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {t('services.cta.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: alpha(theme.palette.common.white, 0.7),
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {t('services.cta.description')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contact')}
                startIcon={<ContactSupport />}
                sx={{
                  background: theme.gradient.primary,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    background: theme.gradient.secondary,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
              >
                {t('services.cta.contact_button')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/pricing')}
                startIcon={<AttachMoney />}
                endIcon={<ArrowForward />}
                sx={{
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    background: alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('services.cta.pricing_button')}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
