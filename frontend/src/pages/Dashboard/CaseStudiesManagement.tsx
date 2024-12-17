import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    Grid,
    IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { 
    fetchCaseStudies, 
    createCaseStudy, 
    updateCaseStudy, 
    deleteCaseStudy 
} from '../../store/slices/caseStudiesSlice';
import ImageUpload from '../../components/ImageUpload';

interface CaseStudyFormData {
    id?: number;
    title: string;
    description: string;
    client_name: string;
    client_industry: string;
    challenge: string;
    solution: string;
    results: string;
    image?: File | null;
    order?: number;
}

const CaseStudiesManagement: React.FC = () => {
    const dispatch = useDispatch();
    const { caseStudies, loading, error } = useSelector((state: RootState) => state.caseStudies);

    const [open, setOpen] = useState(false);
    const [currentCaseStudy, setCurrentCaseStudy] = useState<CaseStudyFormData>({
        title: '',
        description: '',
        client_name: '',
        client_industry: '',
        challenge: '',
        solution: '',
        results: '',
        image: null,
        order: 0
    });

    useEffect(() => {
        dispatch(fetchCaseStudies());
    }, [dispatch]);

    const handleOpen = (caseStudy?: CaseStudyFormData) => {
        if (caseStudy) {
            setCurrentCaseStudy({
                ...caseStudy,
                image: null  // Reset image to prevent unnecessary updates
            });
        } else {
            setCurrentCaseStudy({
                title: '',
                description: '',
                client_name: '',
                client_industry: '',
                challenge: '',
                solution: '',
                results: '',
                image: null,
                order: 0
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentCaseStudy(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (file: File | null) => {
        setCurrentCaseStudy(prev => ({
            ...prev,
            image: file
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        
        // Append all fields to FormData
        Object.entries(currentCaseStudy).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (key !== 'image') {
                    formData.append(key, String(value));
                }
            }
        });

        try {
            if (currentCaseStudy.id) {
                // Update existing case study
                await dispatch(updateCaseStudy({ 
                    id: currentCaseStudy.id, 
                    data: formData 
                }));
            } else {
                // Create new case study
                await dispatch(createCaseStudy(formData));
            }
            
            handleClose();
        } catch (err) {
            console.error('Case Study Submission Error:', err);
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this case study?')) {
            dispatch(deleteCaseStudy(id));
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Case Studies Management
            </Typography>

            <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
                sx={{ mb: 2 }}
            >
                Add Case Study
            </Button>

            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <Grid container spacing={3}>
                {caseStudies.map((caseStudy) => (
                    <Grid item xs={12} md={4} key={caseStudy.id}>
                        <Box sx={{ 
                            border: '1px solid #ddd', 
                            borderRadius: 2, 
                            p: 2, 
                            position: 'relative' 
                        }}>
                            <Typography variant="h6">{caseStudy.title}</Typography>
                            <Typography variant="body2">{caseStudy.description}</Typography>
                            
                            <Box sx={{ 
                                position: 'absolute', 
                                top: 10, 
                                right: 10 
                            }}>
                                <IconButton 
                                    color="primary" 
                                    onClick={() => handleOpen(caseStudy)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    color="error" 
                                    onClick={() => handleDelete(caseStudy.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {currentCaseStudy.id ? 'Edit Case Study' : 'Add Case Study'}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    value={currentCaseStudy.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="client_name"
                                    label="Client Name"
                                    fullWidth
                                    value={currentCaseStudy.client_name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="client_industry"
                                    label="Client Industry"
                                    fullWidth
                                    value={currentCaseStudy.client_industry}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={currentCaseStudy.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="challenge"
                                    label="Challenge"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={currentCaseStudy.challenge}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="solution"
                                    label="Solution"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={currentCaseStudy.solution}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="results"
                                    label="Results"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={currentCaseStudy.results}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ImageUpload 
                                    onImageChange={handleImageChange}
                                    existingImage={currentCaseStudy.image}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        color="primary" 
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Save Case Study
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CaseStudiesManagement;