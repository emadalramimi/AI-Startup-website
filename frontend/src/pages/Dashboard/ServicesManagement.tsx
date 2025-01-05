import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ServicesManagement: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    { id: 1, name: 'AI Automation', description: 'Streamline business processes' },
    { id: 2, name: 'Machine Learning', description: 'Advanced predictive analytics' },
    { id: 3, name: 'Computer Vision', description: 'Intelligent image recognition' },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {t('dashboard.services.title')}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('dashboard.services.name')}</TableCell>
              <TableCell>{t('dashboard.services.description')}</TableCell>
              <TableCell>{t('dashboard.services.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                    {t('dashboard.services.edit')}
                  </Button>
                  <Button variant="outlined" color="error">
                    {t('dashboard.services.delete')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServicesManagement;
