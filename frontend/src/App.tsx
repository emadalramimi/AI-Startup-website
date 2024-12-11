import { Box } from '@mui/material';
import Layout from './components/Layout';
import AppRoutes from './routes';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Layout>
        <AppRoutes />
      </Layout>
    </Box>
  );
}

export default App;
