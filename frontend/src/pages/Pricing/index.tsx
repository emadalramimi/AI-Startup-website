import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack, Chip, useTheme, alpha, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DiamondIcon from '@mui/icons-material/Diamond';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface PricingFeature {
  feature: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => {
  const theme = useMuiTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === 'rtl';
  
  const handleContactNavigation = () => {
    navigate('/contact');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
    >
      <Paper
        sx={{
          p: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: tier.isPopular 
            ? `linear-gradient(135deg, ${alpha('#1A1F35', 0.9)}, ${alpha('#2A2F45', 0.9)})`
            : 'rgba(13, 25, 39, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 4,
          overflow: 'hidden',
          '&::before': tier.isPopular ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: tier.gradient,
            opacity: 0.1,
            transition: 'opacity 0.3s ease',
          } : {},
          '&:hover::before': tier.isPopular ? {
            opacity: 0.15,
          } : {},
        }}
      >
        {tier.isPopular && (
          <Box
            sx={{
              position: 'absolute',
              top: 17,
              ...(isRTL ? { left: 10 } : { right: 10 }),
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15 
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: `linear-gradient(135deg, #6E41C0, #3A1078)`,
                  borderRadius: '20px',
                  px: 2,
                  py: 0.7,
                  boxShadow: '0 6px 15px rgba(110, 65, 192, 0.4)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `linear-gradient(45deg, 
                      rgba(255,255,255,0.1) 0%, 
                      rgba(255,255,255,0.3) 50%, 
                      rgba(255,255,255,0) 100%)`,
                    transform: 'rotate(45deg)',
                    opacity: 0.3,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 0.5,
                  },
                  transition: 'all 0.3s ease',
                  transform: 'perspective(500px) rotateX(5deg)',
                  '&:hover': {
                    transform: 'perspective(500px) rotateX(0deg) scale(1.05)',
                    boxShadow: '0 10px 20px rgba(110, 65, 192, 0.5)',
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {t('pricing.tiers.pro.popular')}
                </Typography>
              </Box>
            </motion.div>
          </Box>
        )}
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {tier.icon}
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              {tier.name}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {tier.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
              {tier.price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {tier.period}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2} sx={{ mb: 4, flexGrow: 1 }}>
          {tier.features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {feature.included ? (
                <CheckIcon sx={{ color: 'success.main' }} />
              ) : (
                <CloseIcon sx={{ color: 'text.disabled' }} />
              )}
              <Typography
                variant="body1"
                sx={{
                  color: feature.included ? 'text.primary' : 'text.disabled',
                }}
              >
                {feature.feature}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Button
          variant="contained"
          size="large"
          onClick={handleContactNavigation}
          sx={{
            background: tier.gradient,
            textTransform: 'none',
            py: 1.5,
            '&:hover': {
              background: tier.gradient,
              filter: 'brightness(110%)',
            },
          }}
        >
          {tier.buttonText}
        </Button>
      </Paper>
    </motion.div>
  );
};

const CustomServicesSection = () => {
  const theme = useMuiTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === 'rtl';

  const handleContactNavigation = () => {
    navigate('/contact');
  };

  return (
    <Box sx={{ mb: 12 }}>
      <Grid container spacing={4}>
        {t('pricing.custom_services.services', { returnObjects: true }).map((service: any, index: number) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(13, 25, 39, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0.7,
                  }
                }}
              >
                <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  {service.description}
                </Typography>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  {service.features.map((feature: string, featureIndex: number) => (
                    <Box
                      key={featureIndex}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <CheckIcon sx={{ color: 'success.main' }} />
                      <Typography variant="body1">
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleContactNavigation}
                  sx={{
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                    },
                  }}
                >
                  {service.button}
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h3"
        component="h2"
        sx={{
          mt: 12,
          mb: 6,
          textAlign: 'center',
          fontWeight: 'bold',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {t('pricing.custom_services.automation_title')}
      </Typography>
    </Box>
  );
};

const PricingPage = () => {
  const theme = useMuiTheme();
  const { t } = useTranslation();

  const pricingTiers: PricingTier[] = [
    {
      name: t('pricing.tiers.basic.name'),
      price: t('pricing.tiers.basic.price'),
      period: t('pricing.tiers.basic.period'),
      description: t('pricing.tiers.basic.description'),
      gradient: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
      features: [
        { feature: t('pricing.tiers.basic.features.ai_automation'), included: true },
        { feature: t('pricing.tiers.basic.features.workflows'), included: true },
        { feature: t('pricing.tiers.basic.features.monitoring'), included: true },
        { feature: t('pricing.tiers.basic.features.analytics'), included: true },
        { feature: t('pricing.tiers.basic.features.email_support'), included: true },
        { feature: t('pricing.tiers.basic.features.custom_models'), included: false },
        { feature: t('pricing.tiers.basic.features.api'), included: false },
      ],
      buttonText: t('pricing.tiers.basic.button'),
    },
    {
      name: t('pricing.tiers.pro.name'),
      price: t('pricing.tiers.pro.price'),
      period: t('pricing.tiers.pro.period'),
      description: t('pricing.tiers.pro.description'),
      gradient: 'linear-gradient(135deg, #9333EA, #4F46E5)',
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
      features: [
        { feature: t('pricing.tiers.pro.features.basic_features'), included: true },
        { feature: t('pricing.tiers.pro.features.unlimited'), included: true },
        { feature: t('pricing.tiers.pro.features.advanced_ai'), included: true },
        { feature: t('pricing.tiers.pro.features.priority'), included: true },
        { feature: t('pricing.tiers.pro.features.custom_models'), included: true },
        { feature: t('pricing.tiers.pro.features.api'), included: true },
        { feature: t('pricing.tiers.pro.features.manager'), included: true },
      ],
      buttonText: t('pricing.tiers.pro.button'),
      isPopular: true,
    },
    {
      name: t('pricing.tiers.enterprise.name'),
      price: t('pricing.tiers.enterprise.price'),
      period: t('pricing.tiers.enterprise.period'),
      description: t('pricing.tiers.enterprise.description'),
      gradient: 'linear-gradient(135deg, #059669, #0EA5E9)',
      icon: <DiamondIcon sx={{ fontSize: 40 }} />,
      features: [
        { feature: t('pricing.tiers.enterprise.features.pro_features'), included: true },
        { feature: t('pricing.tiers.enterprise.features.custom_dev'), included: true },
        { feature: t('pricing.tiers.enterprise.features.dedicated_team'), included: true },
        { feature: t('pricing.tiers.enterprise.features.sla'), included: true },
        { feature: t('pricing.tiers.enterprise.features.deployment'), included: true },
        { feature: t('pricing.tiers.enterprise.features.security'), included: true },
        { feature: t('pricing.tiers.enterprise.features.premium_support'), included: true },
      ],
      buttonText: t('pricing.tiers.enterprise.button'),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('pricing.title')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', opacity: 0.8 }}
          >
            {t('pricing.subtitle')}
          </Typography>
        </Box>

        <CustomServicesSection />

        <Grid container spacing={4}>
          {pricingTiers.map((tier, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PricingCard tier={tier} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingPage;
