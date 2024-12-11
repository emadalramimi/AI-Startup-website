import { Box, Typography, useTheme, alpha, SxProps } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  delay?: number;
  sx?: SxProps;
  children?: React.ReactNode;
}

const AnimatedCard = ({ title, description, icon, image, delay = 0, sx = {}, children }: AnimatedCardProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Box
        sx={{
          p: 4,
          height: '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)}, ${alpha(
            theme.palette.background.paper,
            0.05
          )})`,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-10px)',
          },
          position: 'relative',
          overflow: 'hidden',
          ...sx,
        }}
      >
        {image && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '200px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              },
            }}
          />
        )}
        <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
          {icon && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(
                  theme.palette.secondary.main,
                  0.2
                )})`,
                display: 'inline-flex',
                color: theme.palette.primary.main,
              }}
            >
              {icon}
            </Box>
          )}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
              {description}
            </Typography>
          )}
          {children}
        </Box>
      </Box>
    </motion.div>
  );
};

export default AnimatedCard;
