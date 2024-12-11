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
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../../store';
import { addCaseStudy, updateCaseStudyAction, deleteCaseStudyAction, fetchCaseStudies } from '../../store/slices/caseStudiesSlice';

interface CaseStudyFormData {
  title: string;
  description: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  imageUrl: string;
}

const initialFormData: CaseStudyFormData = {
  title: '',
  description: '',
  client: '',
  challenge: '',
  solution: '',
  results: '',
  imageUrl: '',
};

const CaseStudiesManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { caseStudies, loading } = useSelector((state: RootState) => {
    const caseStudiesData = state.caseStudies.caseStudies;
    
    // Ensure we always have an array
    const caseStudiesList = Array.isArray(caseStudiesData) 
      ? caseStudiesData 
      : (caseStudiesData?.results || caseStudiesData?.data || []);
    
    return {
      caseStudies: caseStudiesList,
      loading: state.caseStudies.loading
    };
  });

  // Use state with explicit type and initial state
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    mode: 'add' | 'edit';
    editingId: number | null;
    formData: CaseStudyFormData;
  }>({
    open: false,
    mode: 'add',
    editingId: null,
    formData: { ...initialFormData }
  });

  useEffect(() => {
    console.error('Component Render - Dialog State:', dialogState);
  }, [dialogState]);

  useEffect(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);

  const handleOpen = (mode: 'add' | 'edit' = 'add') => {
    console.error('handleOpen CALLED:', { 
      mode, 
      currentState: dialogState 
    });

    setDialogState(prev => {
      const newState = {
        ...prev,
        open: true,
        mode,
        formData: mode === 'add' ? { ...initialFormData } : prev.formData,
        editingId: mode === 'add' ? null : prev.editingId
      };
      
      console.error('Dialog State Updated:', { 
        prevState: prev, 
        newState,
        stackTrace: new Error('State Update Trace').stack 
      });

      return newState;
    });
  };

  const handleClose = () => {
    console.error('handleClose CALLED');
    setDialogState(prev => ({
      ...prev,
      open: false,
      mode: 'add',
      editingId: null,
      formData: { ...initialFormData }
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDialogState(prev => ({
      ...prev,
      formData: { ...prev.formData, [name]: value }
    }));
  };

  const handleSubmit = () => {
    console.error('handleSubmit CALLED', { formData: dialogState.formData });
    
    if (!dialogState.formData.title.trim()) {
      alert('Case Study title is required');
      return;
    }

    if (dialogState.mode === 'edit' && dialogState.editingId !== null) {
      // Update existing case study
      dispatch(updateCaseStudyAction({
        id: dialogState.editingId,
        ...dialogState.formData,
      }));
    } else {
      // Add new case study
      dispatch(addCaseStudy(dialogState.formData));
    }
    
    handleClose();
  };

  const handleEdit = (caseStudy: any) => {
    console.error('handleEdit CALLED', { caseStudy });
    setDialogState(prev => ({
      ...prev,
      open: true,
      mode: 'edit',
      editingId: caseStudy.id,
      formData: {
        title: caseStudy.title,
        description: caseStudy.description,
        client: caseStudy.client,
        challenge: caseStudy.challenge || '',
        solution: caseStudy.solution || '',
        results: caseStudy.results || '',
        imageUrl: caseStudy.imageUrl || '',
      }
    }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCaseStudyAction(id));
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          p: 3 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Case Studies Management
        </Typography>
        <Button 
          color="primary" 
          variant="contained" 
          onClick={handleOpen} 
          sx={{ mb: 2 }}
        >
          Add First Case Study
        </Button>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            mt: 4 
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            No case studies found
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Start by adding your first case study
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Case Studies Management
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleOpen} 
        sx={{ mb: 2 }}
      >
        Add New Case Study
      </Button>

      <Grid container spacing={3}>
        {caseStudies.map((caseStudy) => (
          <Grid item xs={12} sm={6} md={4} key={caseStudy.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{caseStudy.title}</Typography>
                <Typography variant="body2">{caseStudy.description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(caseStudy)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(caseStudy.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={dialogState.open} 
        onClose={handleClose}
        aria-labelledby="case-study-dialog-title"
        fullWidth
        maxWidth="md"
        disablePortal
        container={() => document.body}
        style={{ 
          position: 'fixed', 
          zIndex: 9999, 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)' 
        }}
        PaperProps={{
          style: {
            minWidth: '500px',
            maxWidth: '90%',
            margin: 'auto',
            backgroundColor: 'white',
            border: '3px solid red', // Diagnostic border
            position: 'relative',
            zIndex: 10000
          }
        }}
      >
        <DialogTitle>
          {/* Diagnostic information */}
          <Typography variant="h6" color="error">
            Dialog Diagnostic Information
          </Typography>
          <Typography variant="body2">
            Open State: {dialogState.open.toString()}
            {' | '}
            Editing ID: {dialogState.editingId ?? 'None'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Minimal content to verify rendering */}
          <Typography variant="body1" color="primary">
            This is a test dialog to diagnose rendering issues.
          </Typography>
          
          {/* Original form content */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                margin="normal"
                value={dialogState.formData.title}
                onChange={handleInputChange}
                required
                error={!dialogState.formData.title}
                helperText={!dialogState.formData.title ? 'Title is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="client"
                label="Client"
                fullWidth
                margin="normal"
                value={dialogState.formData.client}
                onChange={handleInputChange}
                required
                error={!dialogState.formData.client}
                helperText={!dialogState.formData.client ? 'Client is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={dialogState.formData.description}
                onChange={handleInputChange}
                required
                error={!dialogState.formData.description}
                helperText={!dialogState.formData.description ? 'Description is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="challenge"
                label="Challenge"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={dialogState.formData.challenge}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="solution"
                label="Solution"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={dialogState.formData.solution}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="results"
                label="Results"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={dialogState.formData.results}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="imageUrl"
                label="Image URL"
                fullWidth
                margin="normal"
                value={dialogState.formData.imageUrl}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            color="secondary"
          >
            Close Diagnostic Dialog
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={!dialogState.formData.title || !dialogState.formData.client || !dialogState.formData.description}
          >
            {dialogState.mode === 'edit' ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CaseStudiesManagement;