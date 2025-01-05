import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MessagesManagement: React.FC = () => {
  const { t } = useTranslation();

  const messages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Service Inquiry' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Pricing Question' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Technical Support' },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {t('dashboard.messages.title')}
      </Typography>
      <Paper elevation={3}>
        <List>
          {messages.map((message) => (
            <ListItem 
              key={message.id} 
              divider
              secondaryAction={
                <Button variant="outlined" color="primary">
                  {t('dashboard.messages.view')}
                </Button>
              }
            >
              <ListItemText
                primary={`${message.name} (${message.email})`}
                secondary={message.subject}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MessagesManagement;
