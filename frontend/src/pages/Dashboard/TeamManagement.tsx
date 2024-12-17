import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Container,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { RootState } from '../../store';
import { 
  fetchTeamMembers,
  addTeamMember, 
  updateTeamMemberAction, 
  deleteTeamMemberAction 
} from '../../store/slices/teamSlice';
import { TeamMember } from '../../types';
import { useSnackbar } from 'notistack';
import TeamMemberForm from '../../components/TeamMemberForm';

const TeamManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { teamMembers, loading } = useSelector((state: RootState) => {
    const teamData = state.team.teamMembers;
    const teamMembersList = Array.isArray(teamData) ? teamData : [];
    return {
      teamMembers: teamMembersList,
      loading: state.team.loading,
    };
  });
  const error = useSelector((state: RootState) => state.team.error);
  const { enqueueSnackbar } = useSnackbar();
  
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  const handleOpen = (member?: TeamMember) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(undefined);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (selectedMember?.id) {
        await dispatch(updateTeamMemberAction({ 
          id: selectedMember.id, 
          data: formData 
        }));
        enqueueSnackbar('Team member updated successfully', { variant: 'success' });
      } else {
        await dispatch(addTeamMember(formData));
        enqueueSnackbar('Team member added successfully', { variant: 'success' });
      }
      handleClose();
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Failed to save team member', { variant: 'error' });
    }
  };

  const handleDeleteClick = (id: number) => {
    setMemberToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (memberToDelete) {
      try {
        await dispatch(deleteTeamMemberAction(memberToDelete));
        enqueueSnackbar('Team member deleted successfully', { variant: 'success' });
      } catch (error: any) {
        enqueueSnackbar(error.message || 'Failed to delete team member', { variant: 'error' });
      }
    }
    setDeleteConfirmOpen(false);
    setMemberToDelete(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Team Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Team Member
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                  <Avatar
                    src={typeof member.image === 'string' ? member.image : undefined}
                    sx={{ width: 100, height: 100, mb: 2 }}
                    alt={member.name}
                  />
                  <Typography variant="h6" component="h2" align="center">
                    {member.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom align="center">
                    {member.position}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {member.bio}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box>
                  {member.linkedin_url && (
                    <Tooltip title="LinkedIn Profile">
                      <IconButton
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedInIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {member.github_url && (
                    <Tooltip title="GitHub Profile">
                      <IconButton
                        href={member.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <Box>
                  <IconButton onClick={() => handleOpen(member)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(member.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedMember ? 'Edit Team Member' : 'Add Team Member'}
        </DialogTitle>
        <DialogContent>
          <TeamMemberForm
            initialData={selectedMember}
            onSubmit={handleSubmit}
            isLoading={loading}
            error={error}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this team member? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeamManagement;