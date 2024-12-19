import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from '@mui/material';
import {
    CloudUpload,
    Grass,
    BugReport,
    Water,
    Agriculture,
    LocalFlorist,
    Spa,
    CheckCircle,
    Warning,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AgricultureAI: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [activeDemo, setActiveDemo] = useState<string>('plant-disease');

    const demoTypes = [
        {
            id: 'plant-disease',
            title: 'Plant Disease Detection',
            icon: <BugReport />,
            description: 'Identify plant diseases from leaf images'
        },
        {
            id: 'crop-health',
            title: 'Crop Health Analysis',
            icon: <Spa />,
            description: 'Analyze crop health and growth status'
        },
        {
            id: 'weed-detection',
            title: 'Weed Detection',
            icon: <Grass />,
            description: 'Identify and locate weeds in crop fields'
        },
        {
            id: 'irrigation',
            title: 'Irrigation Analysis',
            icon: <Water />,
            description: 'Assess irrigation needs and water stress'
        }
    ];

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            
            reader.readAsDataURL(file);
            
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('type', activeDemo);
                
                // Make actual API call to backend
                const response = await fetch('http://localhost:8000/api/agriculture/analyze/', {
                    method: 'POST',
                    body: formData,
                });
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
                    console.error('API Error:', errorData);  // Debug log
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('API Response:', data);  // Debug log
                
                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid response format');
                }
                
                setResults(data);
                
            } catch (error) {
                console.error('Error analyzing image:', error);
                setResults({
                    status: 'Error',
                    details: [
                        { 
                            label: 'Error', 
                            value: 'Failed to analyze image. Please try again.', 
                            status: 'error' 
                        }
                    ]
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Agriculture AI Analysis
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Smart farming solutions powered by AI for crop analysis, yield prediction, and agricultural optimization
            </Typography>

            {/* Demo Type Selection */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {demoTypes.map((demo) => (
                    <Grid item xs={12} sm={6} md={3} key={demo.id}>
                        <Card 
                            sx={{ 
                                cursor: 'pointer',
                                bgcolor: activeDemo === demo.id ? 'primary.light' : 'background.paper',
                                '&:hover': { bgcolor: 'primary.light' }
                            }}
                            onClick={() => setActiveDemo(demo.id)}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1}>
                                    {demo.icon}
                                    <Typography variant="h6">{demo.title}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {demo.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Image Upload and Analysis Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            <label htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleImageUpload}
                                />
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<CloudUpload />}
                                >
                                    Upload Image
                                </Button>
                            </label>
                            {selectedImage && (
                                <Box sx={{ width: '100%', mt: 2 }}>
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        style={{
                                            width: '100%',
                                            maxHeight: '400px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Analysis Results */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <CircularProgress />
                            </Box>
                        ) : results ? (
                            <Box>
                                <Typography variant="h5" gutterBottom>
                                    Analysis Results
                                </Typography>
                                {results.status && (
                                    <Box sx={{ mb: 2 }}>
                                        <Chip
                                            icon={<CheckCircle />}
                                            label={`${results.status} ${results.confidence ? `(${results.confidence}% Confidence)` : ''}`}
                                            color={results.status === 'Healthy' ? 'success' : 'warning'}
                                        />
                                    </Box>
                                )}
                                {results.details && results.details.length > 0 && (
                                    <>
                                        <Typography variant="h6" gutterBottom>
                                            Detailed Analysis
                                        </Typography>
                                        <List>
                                            {results.details.map((detail: any, index: number) => (
                                                <ListItem key={index}>
                                                    <ListItemIcon>
                                                        {detail.status === 'good' ? (
                                                            <CheckCircle color="success" />
                                                        ) : detail.status === 'warning' ? (
                                                            <Warning color="warning" />
                                                        ) : (
                                                            <CheckCircle />
                                                        )}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={detail.label}
                                                        secondary={detail.value}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </>
                                )}
                                {results.recommendations && results.recommendations.length > 0 && (
                                    <>
                                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                            Recommendations
                                        </Typography>
                                        <List>
                                            {results.recommendations.map((rec: string, index: number) => (
                                                <ListItem key={index}>
                                                    <ListItemIcon>
                                                        <Agriculture />
                                                    </ListItemIcon>
                                                    <ListItemText primary={rec} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </>
                                )}
                            </Box>
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <Typography color="text.secondary">
                                    Upload an image to see analysis results
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AgricultureAI;
