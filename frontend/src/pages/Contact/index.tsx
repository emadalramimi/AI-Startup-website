import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper,
  useTheme, 
  alpha,
  Stack,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Icons
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Components
import ContactForm from './ContactForm';

const ContactPage = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const contactDetails = [
    {
      icon: <EmailOutlinedIcon />,
      title: t('contact.contact_info.email.label'),
      value: 'contact@mantiq.om',
      link: 'mailto:contact@mantiq.om',
      color: theme.palette.primary.main
    },
    {
      icon: <LocalPhoneOutlinedIcon />,
      title: t('contact.contact_info.phone.label'),
      value: '+968 9590 1821',
      link: 'tel:+96895901821',
      color: '#4CAF50'
    },
    {
      icon: <LocationOnOutlinedIcon />,
      title: t('contact.contact_info.address.label'),
      value: 'Muscat, Oman',
      link: 'https://maps.google.com/?q=Muscat,Oman',
      color: '#2196F3'
    }
  ];

  const socialLinks = [
    {
      icon: <WhatsAppIcon />,
      link: 'https://wa.me/96895901821',
      color: '#25D366',
      label: 'WhatsApp'
    },
    {
      icon: <LinkedInIcon />,
      link: 'https://www.linkedin.com/company/mantiqom',
      color: '#0A66C2',
      label: 'LinkedIn'
    },
    {
      icon: <InstagramIcon />,
      link: 'https://www.instagram.com/mantiq.om',
      color: '#E4405F',
      label: 'Instagram'
    },
    {
      icon: <TwitterIcon />,
      link: 'https://twitter.com/mantiqom',
      color: '#1DA1F2',
      label: 'Twitter'
    }
  ];

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.default, 0.95)}, 
          ${alpha(theme.palette.background.paper, 0.95)}
        )`,
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 0 },
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
          sx={{
            flexDirection: { 
              xs: 'column',
              md: isRTL ? 'row-reverse' : 'row-reverse'
            }
          }}
        >
          {/* Contact Form or Contact Information */}
          <Grid 
            item 
            xs={12} 
            md={7} 
            order={{ 
              xs: 1, 
              md: isRTL ? 2 : 1 
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 4 },
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <ContactForm />
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Information or Contact Form */}
          <Grid 
            item 
            xs={12} 
            md={5} 
            order={{ 
              xs: 2, 
              md: isRTL ? 1 : 2 
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1"
                    sx={{ 
                      mb: 2,
                      fontWeight: 700,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      textAlign: isRTL ? 'right' : 'left',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t('contact.title')}
                  </Typography>

                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{ 
                      mb: 4,
                      textAlign: isRTL ? 'right' : 'left',
                      lineHeight: 1.6
                    }}
                  >
                    {t('contact.subtitle')}
                  </Typography>

                  <Stack 
                    spacing={3}
                    sx={{
                      alignItems: isRTL ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {contactDetails.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{ width: '100%' }}
                      >
                        <Box
                          component="a"
                          href={detail.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            textDecoration: 'none',
                            color: 'text.primary',
                            p: 2,
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            flexDirection: isRTL ? 'row-reverse' : 'row',
                            justifyContent: isRTL ? 'flex-end' : 'flex-start',
                            '&:hover': {
                              background: alpha(detail.color, 0.1),
                              transform: 'translateY(-4px)',
                            }
                          }}
                        >
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: '50%',
                              background: alpha(detail.color, 0.1),
                              color: detail.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              order: isRTL ? 2 : 1
                            }}
                          >
                            {detail.icon}
                          </Box>
                          <Box 
                            sx={{ 
                              textAlign: isRTL ? 'right' : 'left',
                              order: isRTL ? 1 : 2,
                              ml: isRTL ? 2 : 0,
                              mr: isRTL ? 0 : 2,
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: isRTL ? 'flex-end' : 'flex-start'
                            }}
                          >
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ 
                                mb: 0.5,
                                textAlign: isRTL ? 'right' : 'left',
                                width: '100%'
                              }}
                            >
                              {detail.title}
                            </Typography>
                            <Typography 
                              variant="subtitle1"
                              sx={{ 
                                fontWeight: 500,
                                direction: 'ltr',
                                textAlign: isRTL ? 'right' : 'left',
                                width: '100%'
                              }}
                            >
                              {detail.value}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Stack>
                </Box>

                <Box 
                  sx={{ 
                    mt: 4,
                    display: 'flex',
                    justifyContent: isRTL ? 'flex-start' : 'flex-end',
                    gap: 2
                  }}
                >
                  {socialLinks.map((social, index) => (
                    <Tooltip key={index} title={social.label}>
                      <IconButton
                        component="a"
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: social.color,
                          background: alpha(social.color, 0.1),
                          '&:hover': {
                            background: alpha(social.color, 0.2),
                            transform: 'translateY(-4px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
