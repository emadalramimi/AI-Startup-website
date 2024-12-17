import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { TeamMember } from '../types';

interface TeamMemberFormProps {
  initialData?: TeamMember;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<TeamMember>({
    name: '',
    position: '',
    bio: '',
    linkedin_url: '',
    github_url: '',
    ...initialData,
  });

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    typeof initialData?.image === 'string' ? initialData.image : undefined
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        if (key === 'image') {
          // Only append image if it's a File object
          if (value instanceof File) {
            submitData.append(key, value);
          }
        } else if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
          // Append other fields except id and timestamps
          submitData.append(key, value.toString());
        }
      }
    });

    await onSubmit(submitData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* Image Upload */}
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar
              src={imagePreview}
              sx={{ width: 100, height: 100 }}
              alt={formData.name || 'Team member'}
            />
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </Grid>

        {/* Name */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            error={Boolean(error)}
          />
        </Grid>

        {/* Position */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="position"
            label="Position"
            value={formData.position}
            onChange={handleInputChange}
            error={Boolean(error)}
          />
        </Grid>

        {/* Bio */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            name="bio"
            label="Bio"
            value={formData.bio}
            onChange={handleInputChange}
            error={Boolean(error)}
          />
        </Grid>

        {/* LinkedIn URL */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="linkedin_url"
            label="LinkedIn URL"
            value={formData.linkedin_url}
            onChange={handleInputChange}
          />
        </Grid>

        {/* GitHub URL */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="github_url"
            label="GitHub URL"
            value={formData.github_url}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Error Message */}
        {error && (
          <Grid item xs={12}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : initialData ? (
              'Update Team Member'
            ) : (
              'Add Team Member'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamMemberForm;
