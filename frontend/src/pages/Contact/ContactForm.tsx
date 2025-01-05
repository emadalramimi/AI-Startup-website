import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Stack,
  Alert,
  useTheme,
  alpha,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAIL_JS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

const ContactForm = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Validate EmailJS configuration
    if (!EMAIL_JS_CONFIG.serviceId || !EMAIL_JS_CONFIG.templateId || !EMAIL_JS_CONFIG.publicKey) {
      console.warn('EmailJS configuration is incomplete. Form submission will not work.');
    } else {
      emailjs.init(EMAIL_JS_CONFIG.publicKey);
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required(t('contact.form.name.error')),
    email: Yup.string()
      .email(t('contact.form.email.error.invalid'))
      .required(t('contact.form.email.error.required')),
    phone: Yup.string().required(t('contact.form.phone.error')),
    company: Yup.string(),
    service_interest: Yup.string(),
    message: Yup.string().required(t('contact.form.message.error'))
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service_interest: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Check if EmailJS is configured
      if (!EMAIL_JS_CONFIG.serviceId || !EMAIL_JS_CONFIG.templateId) {
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('loading');
      try {
        await emailjs.send(
          EMAIL_JS_CONFIG.serviceId,
          EMAIL_JS_CONFIG.templateId,
          {
            from_name: values.name,
            from_email: values.email,
            phone: values.phone,
            company: values.company,
            service_interest: values.service_interest,
            message: values.message
          }
        );
        setSubmitStatus('success');
        resetForm();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } catch (error) {
        console.error('Email send error:', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    }
  });

  const inputProps = {
    sx: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: alpha(theme.palette.primary.main, 0.2),
        },
        '&:hover fieldset': {
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
      },
      '& .MuiOutlinedInput-input': {
        textAlign: isRTL ? 'right' : 'left',
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: '100%',
        '& > *': {
          mb: 2.5
        }
      }}
    >
      <Stack spacing={2.5}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label={t('contact.form.name.label')}
          placeholder={t('contact.form.name.placeholder')}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          {...inputProps}
        />

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label={t('contact.form.email.label')}
            placeholder={t('contact.form.email.placeholder')}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            {...inputProps}
          />

          <TextField
            fullWidth
            id="phone"
            name="phone"
            label={t('contact.form.phone.label')}
            placeholder={t('contact.form.phone.placeholder')}
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            {...inputProps}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            fullWidth
            id="company"
            name="company"
            label={t('contact.form.company.label')}
            placeholder={t('contact.form.company.placeholder')}
            value={formik.values.company}
            onChange={formik.handleChange}
            {...inputProps}
          />

          <TextField
            fullWidth
            select
            id="service_interest"
            name="service_interest"
            label={t('contact.form.service_interest.label')}
            value={formik.values.service_interest}
            onChange={formik.handleChange}
            {...inputProps}
          >
            {t('contact.form.service_interest.options', { returnObjects: true }).map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          id="message"
          name="message"
          label={t('contact.form.message.label')}
          placeholder={t('contact.form.message.placeholder')}
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          {...inputProps}
        />

        {submitStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {t('contact.form.submit_success')}
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t('contact.form.submit_error')}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitStatus === 'loading'}
          startIcon={submitStatus === 'loading' ? <CircularProgress size={20} /> : null}
          endIcon={
            submitStatus !== 'loading' ? (
              <SendIcon 
                sx={{ 
                  transform: isRTL ? 'scaleX(-1)' : 'scaleX(1)',
                  ml: isRTL ? -1 : 0,
                  mr: isRTL ? 1 : 0
                }} 
              />
            ) : null
          }
          sx={{
            mt: 2,
            py: 1.5,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            },
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          {t('contact.form.submit')}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactForm;
