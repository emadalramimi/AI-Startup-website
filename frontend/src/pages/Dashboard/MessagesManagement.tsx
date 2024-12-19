import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TablePagination,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Check, Delete, Visibility } from '@mui/icons-material';
import { api } from '../../services/api';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';

interface Message {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const MessagesManagement = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchMessages = async () => {
    try {
      // Debug: Log token and headers
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      console.log('Current headers:', api.defaults.headers.common);

      const response = await api.get('/contact/');
      console.log('Full response:', response);

      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else if (response.data.results && Array.isArray(response.data.results)) {
        setMessages(response.data.results);
      } else {
        setMessages([]);
        console.error('Unexpected response format:', response.data);
      }
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config?.headers
      });
      enqueueSnackbar('Failed to load messages', { variant: 'error' });
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.patch(`/contact/${id}/`, { is_read: true });
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
      enqueueSnackbar('Message marked as read', { variant: 'success' });
    } catch (error) {
      console.error('Error marking message as read:', error);
      enqueueSnackbar('Failed to mark message as read', { variant: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/contact/${id}/`);
      setMessages(messages.filter(msg => msg.id !== id));
      enqueueSnackbar('Message deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting message:', error);
      enqueueSnackbar('Failed to delete message', { variant: 'error' });
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Messages Management
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((message) => (
                  <TableRow key={message.id} hover>
                    <TableCell>
                      <Chip
                        label={message.is_read ? 'Read' : 'Unread'}
                        color={message.is_read ? 'default' : 'primary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.company || '-'}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography noWrap>{message.message}</Typography>
                    </TableCell>
                    <TableCell>
                      {format(new Date(message.created_at), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleViewMessage(message)}
                        color="primary"
                        size="small"
                        title="View message"
                      >
                        <Visibility />
                      </IconButton>
                      {!message.is_read && (
                        <IconButton
                          onClick={() => handleMarkAsRead(message.id)}
                          color="primary"
                          size="small"
                          title="Mark as read"
                        >
                          <Check />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => handleDelete(message.id)}
                        color="error"
                        size="small"
                        title="Delete message"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={messages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Message from {selectedMessage?.name}
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="body1" gutterBottom>
              <strong>From:</strong> {selectedMessage?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {selectedMessage?.email}
            </Typography>
            {selectedMessage?.company && (
              <Typography variant="body1" gutterBottom>
                <strong>Company:</strong> {selectedMessage?.company}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              {selectedMessage?.message}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Received on: {selectedMessage?.created_at ? format(new Date(selectedMessage.created_at), 'MMMM dd, yyyy HH:mm') : 'N/A'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MessagesManagement;
