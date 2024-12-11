import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../../store';
import { addService, updateServiceAction, deleteServiceAction, fetchServices } from '../../store/slices/servicesSlice';
import { getIconComponent } from '../../utils/iconMapper';
import { Service } from '../../types';

interface ServiceFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

const initialFormData: ServiceFormData = {
  name: '',
  slug: '',
  description: '',
  icon: '',
};

const ServicesManagement: React.FC = () => {
  const dispatch = useDispatch();
  const services = useSelector((state: RootState) => {
    console.log('Full services state:', state.services);
    
    // Extract services data, handling various possible structures
    const servicesData = state.services.services;
    
    // Check for different possible data structures
    const servicesList = Array.isArray(servicesData) 
      ? servicesData 
      : (
          servicesData?.results || 
          servicesData?.data || 
          (typeof servicesData === 'object' ? Object.values(servicesData) : [])
        );
    
    console.log('Processed services:', servicesList);
    return servicesList;
  });
  const loading = useSelector((state: RootState) => state.services.loading);
  const error = useSelector((state: RootState) => state.services.error);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (!formData.name.trim()) {
      alert('Service name is required');
      return;
    }

    // Generate slug if not provided
    const slug = formData.slug.trim() || 
      formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const serviceData = {
      name: formData.name.trim(),
      slug: slug,
      description: formData.description.trim(),
      icon: formData.icon.trim() || 'default-icon', // Provide a default icon if not specified
    };

    if (editingId !== null) {
      // Update existing service
      dispatch(updateServiceAction({
        id: editingId,
        ...serviceData,
      }));
    } else {
      // Add new service
      dispatch(addService(serviceData));
    }
    handleClose();
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
    });
    handleOpen();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteServiceAction(id));
  };

  if (loading) {
    return <Typography>Loading services...</Typography>;
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">Error loading services: {error}</Typography>
        <Button onClick={() => dispatch(fetchServices())}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Services Management
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add New Service
      </Button>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2">{service.description}</Typography>
                {getIconComponent(service.icon)}
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(service)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(service.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingId !== null ? 'Edit Service' : 'Add New Service'}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            name="slug"
            label="Slug"
            fullWidth
            margin="normal"
            value={formData.slug}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            name="icon"
            label="Icon"
            fullWidth
            margin="normal"
            value={formData.icon}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServicesManagement;