import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    IconButton,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Chip,
    useTheme,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    Warning,
    CheckCircle,
    Timeline,
    BubbleChart,
    Speed,
    Psychology,
    Insights,
    Analytics,
    DataUsage,
} from '@mui/icons-material';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

// Simulated AI predictions and analysis
const aiPredictions = {
    marketTrends: {
        prediction: "Upward",
        confidence: 87,
        factors: [
            "Increased consumer spending",
            "Market expansion in GCC",
            "New product adoption rate"
        ],
        recommendation: "Consider expanding product line in Q2 2024"
    },
    riskAnalysis: {
        level: "Low",
        score: 82,
        keyRisks: [
            "Supply chain disruption (12%)",
            "Market competition (8%)",
            "Regulatory changes (5%)"
        ]
    },
    customerInsights: {
        sentiment: "Positive",
        score: 91,
        trends: [
            "Product quality satisfaction ",
            "Customer service rating ",
            "Brand loyalty metrics "
        ]
    }
};

// Simulated time series data
const revenueData = [
    { month: 'Jan', actual: 4200, predicted: 4000 },
    { month: 'Feb', actual: 4800, predicted: 4600 },
    { month: 'Mar', actual: 5100, predicted: 5200 },
    { month: 'Apr', actual: 5400, predicted: 5500 },
    { month: 'May', actual: 5900, predicted: 5800 },
    { month: 'Jun', actual: 6100, predicted: 6300 },
];

const customerSegments = [
    { name: 'Enterprise', value: 45 },
    { name: 'SMB', value: 30 },
    { name: 'Startup', value: 15 },
    { name: 'Individual', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AIDashboard: React.FC = () => {
    const theme = useTheme();
    const [selectedInsight, setSelectedInsight] = useState(0);

    const renderAIInsightCard = (title: string, content: any, icon: React.ReactNode) => (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{icon}</Avatar>
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                {content}
            </CardContent>
        </Card>
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    AI-Powered Business Intelligence Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Real-time analytics and predictive insights powered by advanced AI
                </Typography>
            </Box>

            {/* Key Metrics Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Revenue Performance & AI Predictions
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer>
                                <AreaChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="actual"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        name="Actual Revenue"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="predicted"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        name="AI Predicted"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            AI Risk Assessment
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                Overall Risk Score
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Box sx={{ flex: 1, mr: 2 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={aiPredictions.riskAnalysis.score}
                                        color="success"
                                        sx={{ height: 10, borderRadius: 5 }}
                                    />
                                </Box>
                                <Typography variant="h6">
                                    {aiPredictions.riskAnalysis.score}%
                                </Typography>
                            </Box>
                        </Box>
                        <List>
                            {aiPredictions.riskAnalysis.keyRisks.map((risk, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <Warning color="warning" />
                                    </ListItemIcon>
                                    <ListItemText primary={risk} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* AI Insights Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    {renderAIInsightCard(
                        'Market Trend Analysis',
                        <Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    AI Confidence Level
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Box sx={{ flex: 1, mr: 2 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={aiPredictions.marketTrends.confidence}
                                            color="primary"
                                            sx={{ height: 10, borderRadius: 5 }}
                                        />
                                    </Box>
                                    <Typography variant="h6">
                                        {aiPredictions.marketTrends.confidence}%
                                    </Typography>
                                </Box>
                            </Box>
                            <List>
                                {aiPredictions.marketTrends.factors.map((factor, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <Insights color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={factor} />
                                    </ListItem>
                                ))}
                            </List>
                            <Chip
                                icon={<Psychology />}
                                label={aiPredictions.marketTrends.recommendation}
                                color="primary"
                                sx={{ mt: 2 }}
                            />
                        </Box>,
                        <Timeline />
                    )}
                </Grid>

                <Grid item xs={12} md={4}>
                    {renderAIInsightCard(
                        'Customer Sentiment Analysis',
                        <Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Sentiment Score
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Box sx={{ flex: 1, mr: 2 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={aiPredictions.customerInsights.score}
                                            color="success"
                                            sx={{ height: 10, borderRadius: 5 }}
                                        />
                                    </Box>
                                    <Typography variant="h6">
                                        {aiPredictions.customerInsights.score}%
                                    </Typography>
                                </Box>
                            </Box>
                            <List>
                                {aiPredictions.customerInsights.trends.map((trend, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckCircle color="success" />
                                        </ListItemIcon>
                                        <ListItemText primary={trend} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>,
                        <BubbleChart />
                    )}
                </Grid>

                <Grid item xs={12} md={4}>
                    {renderAIInsightCard(
                        'Customer Segmentation',
                        <Box sx={{ height: 250 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={customerSegments}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}%`}
                                    >
                                        {customerSegments.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>,
                        <DataUsage />
                    )}
                </Grid>
            </Grid>

            {/* Action Items Section */}
            <Paper sx={{ mt: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    AI-Generated Action Items
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                            <CardContent>
                                <Typography variant="h6">Opportunity</Typography>
                                <Typography variant="body2">
                                    Market expansion potential in GCC region shows 85% success probability
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                            <CardContent>
                                <Typography variant="h6">Risk Alert</Typography>
                                <Typography variant="body2">
                                    Supply chain optimization needed - 15% efficiency improvement possible
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
                            <CardContent>
                                <Typography variant="h6">Strategic Insight</Typography>
                                <Typography variant="body2">
                                    Customer feedback analysis suggests product feature enhancement priority
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default AIDashboard;
