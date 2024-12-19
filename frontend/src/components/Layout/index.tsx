import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Business,
  Cases,
  People,
  Mail,
  SmartToy,
} from '@mui/icons-material';
import amadLogo from '../../assets/Amad logo.png';

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Services', icon: <Business />, path: '/services' },
    { text: 'Case Studies', icon: <Cases />, path: '/case-studies' },
    { text: 'AI Demos', icon: <SmartToy />, path: '/ai-demos' },
    { text: 'Team', icon: <People />, path: '/team' },
    { text: 'Contact', icon: <Mail />, path: '/contact' },
  ];

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMobileMenuClose();
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      <AppBar position="fixed" sx={{ background: 'rgba(10, 10, 30, 0.95)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Logo and Brand */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1, 
              cursor: 'pointer' 
            }}
            onClick={() => handleNavigation('/')}
          >
            <img 
              src={amadLogo} 
              alt="Amad Logo" 
              style={{ 
                height: '40px', 
                marginRight: '10px',
                filter: 'brightness(1.2)' 
              }} 
            />
          </Box>

          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  color="inherit"
                  key={item.text}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          ) : (
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.text} onClick={() => handleNavigation(item.path)}>
                  {item.icon}
                  <Typography sx={{ ml: 1 }}>{item.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, mt: '64px' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
