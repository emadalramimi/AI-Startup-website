import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  Select,
  FormControl,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Language,
} from '@mui/icons-material';
import amadLogoEn from '../../assets/logo_en.png';
import amadLogoAr from '../../assets/logo_ar.png';

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const menuItems = [
    { text: t('navigation.home'), path: '/' },
    { text: t('navigation.services'), path: '/services' },
    { text: t('navigation.pricing'), path: '/pricing' },
    { text: t('navigation.contact'), path: '/contact' },
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

  const handleLanguageChange = (event: any) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
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
      <AppBar 
        position="fixed" 
        sx={{ 
          background: '#091927', 
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ height: '100%' }}>
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
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1, 
              cursor: 'pointer',
              height: '100%',
            }}
            onClick={() => handleNavigation('/')}
          >
            <img 
              src={i18n.language === 'ar' ? amadLogoAr : amadLogoEn} 
              alt="Amad Logo" 
              style={{ 
                height: '50px',
                marginRight: '16px',
              }}
            />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    fontSize: '1rem',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              
              {/* Language Selector */}
              <FormControl 
                size="small" 
                sx={{ 
                  minWidth: 100,
                  marginLeft: 2,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                }}
              >
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  displayEmpty
                  variant="outlined"
                  sx={{ color: 'white' }}
                  IconComponent={Language}
                >
                  <MenuItem value="en">EN</MenuItem>
                  <MenuItem value="ar">AR</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: theme.palette.background.paper,
                minWidth: 200,
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  gap: 2,
                  py: 1.5,
                }}
              >
                <Typography>{item.text}</Typography>
              </MenuItem>
            ))}
            <MenuItem>
              <FormControl fullWidth>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  displayEmpty
                  variant="outlined"
                  startAdornment={<Language sx={{ mr: 1 }} />}
                >
                  <MenuItem value="en">EN</MenuItem>
                  <MenuItem value="ar">AR</MenuItem>
                </Select>
              </FormControl>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          marginTop: '80px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
