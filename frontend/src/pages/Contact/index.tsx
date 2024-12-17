import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
  alpha,
  Card,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Email, Phone, LocationOn, LinkedIn, Twitter, Facebook, ContentCopy, Send } from '@mui/icons-material';

interface ContactInfo {
  icon: JSX.Element;
  title: string;
  content: string;
  link?: string;
  copyable?: boolean;
}

const Contact = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState<string | null>(null);

  const contactInfo: ContactInfo[] = [
    {
      icon: <Email fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Email',
      content: 'contact@mantiq.om',
      copyable: true,
      link: 'mailto:contact@mantiq.om',
    },
    {
      icon: <Phone fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Phone',
      content: '+968 95901821',
      copyable: true,
      link: 'tel:+96895901821',
    },
    {
      icon: <LocationOn fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Location',
      content: 'Muscat, Oman',
      link: 'https://maps.google.com/?q=Muscat,Oman',
    },
  ];

  const socialLinks = [
    { icon: <LinkedIn />, name: 'LinkedIn', link: '#' },
    { icon: <Twitter />, name: 'Twitter', link: '#' },
    { icon: <Facebook />, name: 'Facebook', link: '#' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(content);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 12,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.8)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
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

      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 8 }}
          >
            Have a question or want to work together? We'd love to hear from you.
          </Typography>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    {info.icon}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                      {info.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {info.link ? (
                        <Typography
                          component="a"
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: 'text.primary',
                            textDecoration: 'none',
                            '&:hover': { color: 'primary.main' },
                          }}
                        >
                          {info.content}
                        </Typography>
                      ) : (
                        <Typography>{info.content}</Typography>
                      )}
                      {info.copyable && (
                        <Tooltip
                          title={copied === info.content ? 'Copied!' : 'Copy'}
                          placement="top"
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(info.content)}
                            color={copied === info.content ? 'primary' : 'default'}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            sx={{
              p: 4,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <IconButton
                    component="a"
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-3px)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;
