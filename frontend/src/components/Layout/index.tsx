import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Login,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import amadLogo from '../../assets/Amad logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Services', icon: <Business />, path: '/services' },
    { text: 'Case Studies', icon: <Cases />, path: '/case-studies' },
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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
              {isAuthenticated ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => handleNavigation('/login')}
                  startIcon={<Login />}
                >
                  Login
                </Button>
              )}
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
              {isAuthenticated ? (
                <MenuItem onClick={handleLogout}>
                  <Login />
                  <Typography sx={{ ml: 1 }}>Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleNavigation('/login')}>
                  <Login />
                  <Typography sx={{ ml: 1 }}>Login</Typography>
                </MenuItem>
              )}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, mt: '64px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
