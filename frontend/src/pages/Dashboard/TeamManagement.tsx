import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../../store';
import { 
  fetchTeamMembers,
  addTeamMember, 
  updateTeamMemberAction, 
  deleteTeamMemberAction 
} from '../../store/slices/teamSlice';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  linkedin_url?: string;
  github_url?: string;
}

interface TeamMemberFormData {
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin_url?: string;
  github_url?: string;
}

const initialFormData: TeamMemberFormData = {
  name: '',
  position: '',
  bio: '',
  image: '',
  linkedin_url: '',
  github_url: '',
};

const TeamManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { teamMembers, loading, error } = useSelector((state: RootState) => {
    const teamData = state.team.teamMembers;
    
    // Ensure we always have an array
    const teamMembersList = Array.isArray(teamData) 
      ? teamData 
      : (teamData?.results || teamData?.data || []);
    
    return {
      teamMembers: teamMembersList,
      loading: state.team.loading,
      error: state.team.error
    };
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TeamMemberFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (editingId) {
      // Update existing member
      dispatch(updateTeamMemberAction({
        id: editingId,
        data: formData
      }));
    } else {
      // Add new member
      dispatch(addTeamMember(formData));
    }
    handleClose();
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      image: member.image || '',
      linkedin_url: member.linkedin_url || '',
      github_url: member.github_url || '',
    });
    handleOpen();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTeamMemberAction(id));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography color="error" variant="h6">
          Error loading team members
        </Typography>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => dispatch(fetchTeamMembers())}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h6">
          No team members found
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          sx={{ mt: 2 }}
        >
          Add First Team Member
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Team Management
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Add Team Member
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamMembers.map((member: TeamMember) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(member)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(member.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingId ? 'Edit Team Member' : 'Add Team Member'}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            name="position"
            label="Position"
            fullWidth
            margin="normal"
            value={formData.position}
            onChange={handleInputChange}
          />
          <TextField
            name="bio"
            label="Bio"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            margin="normal"
            value={formData.image}
            onChange={handleInputChange}
          />
          <TextField
            name="linkedin_url"
            label="LinkedIn URL"
            fullWidth
            margin="normal"
            value={formData.linkedin_url}
            onChange={handleInputChange}
          />
          <TextField
            name="github_url"
            label="GitHub URL"
            fullWidth
            margin="normal"
            value={formData.github_url}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamManagement;