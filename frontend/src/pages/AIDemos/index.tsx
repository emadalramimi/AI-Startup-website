import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Analytics, Agriculture, RemoveRedEye, Description } from '@mui/icons-material';

const demoItems = [
  {
    title: 'Interactive AI Dashboard Demo',
    description: 'Experience real-time data visualization and AI-driven insights through our interactive dashboard.',
    icon: Analytics,
    path: '/ai-demos/dashboard',
    image: '/images/dashboard-demo.jpg'
  },
  {
    title: 'Agriculture AI',
    description: 'Smart farming solutions powered by AI for crop analysis, yield prediction, and agricultural optimization.',
    icon: Agriculture,
    path: '/ai-demos/agriculture',
    image: '/images/agriculture-demo.jpg'
  },
  {
    title: 'Real-Time Object Detection Demo',
    description: 'See AI in action with our real-time object detection system using computer vision technology.',
    icon: RemoveRedEye,
    path: '/ai-demos/object-detection',
    image: '/images/object-detection-demo.jpg'
  },
  {
    title: 'Resume Classification',
    description: 'Automated resume screening and classification using advanced NLP and machine learning algorithms.',
    icon: Description,
    path: '/ai-demos/resume-classification',
    image: '/images/resume-classification-demo.jpg'
  }
];

const AIDemos = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          AI Demos
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 8, color: 'text.secondary' }}>
          Experience the power of our AI solutions through interactive demonstrations
        </Typography>

        <Grid container spacing={4}>
          {demoItems.map((demo) => {
            const Icon = demo.icon;
            return (
              <Grid item xs={12} md={6} key={demo.title}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.8 }} />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {demo.title}
                    </Typography>
                    <Typography>
                      {demo.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="large" 
                      onClick={() => navigate(demo.path)}
                      sx={{ ml: 1, mb: 1 }}
                    >
                      Try Demo
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default AIDemos;
