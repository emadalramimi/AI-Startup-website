import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchTeamMembersAPI, 
  addTeamMemberAPI, 
  updateTeamMemberAPI, 
  deleteTeamMemberAPI 
} from '../../services/api';
import { TeamMember } from '../../types';

// Define the state type
interface TeamState {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TeamState = {
  teamMembers: [],
  loading: false,
  error: null
};

// Define pagination response type
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Async thunk for fetching team members
export const fetchTeamMembers = createAsyncThunk(
  'team/fetchTeamMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTeamMembersAPI();
      // Extract only the results from the paginated response
      const paginatedData = response.data as PaginatedResponse<TeamMember>;
      return paginatedData.results;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch team members');
    }
  }
);

// Async thunk for adding a team member
export const addTeamMember = createAsyncThunk(
  'team/addTeamMember',
  async (memberData: FormData, { rejectWithValue }) => {
    try {
      const response = await addTeamMemberAPI(memberData);
      // Return only the team member data
      return response.data;
    } catch (error: any) {
      const errorMessage = 
        error.response?.data?.detail || 
        error.response?.data?.message || 
        'Failed to add team member';
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for updating a team member
export const updateTeamMemberAction = createAsyncThunk(
  'team/updateTeamMember',
  async ({ id, data }: { id: number, data: FormData }, { rejectWithValue }) => {
    try {
      const response = await updateTeamMemberAPI(id, data);
      // Return only the team member data
      return response.data;
    } catch (error: any) {
      const errorMessage = 
        error.response?.data?.detail || 
        error.response?.data?.message || 
        'Failed to update team member';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for deleting a team member
export const deleteTeamMemberAction = createAsyncThunk(
  'team/deleteTeamMember',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteTeamMemberAPI(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete team member');
    }
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch team members
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add team member
      .addCase(addTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers.push(action.payload);
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update team member
      .addCase(updateTeamMemberAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamMemberAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teamMembers.findIndex(member => member.id === action.payload.id);
        if (index !== -1) {
          state.teamMembers[index] = action.payload;
        }
      })
      .addCase(updateTeamMemberAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete team member
      .addCase(deleteTeamMemberAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeamMemberAction.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = state.teamMembers.filter(member => member.id !== action.payload);
      })
      .addCase(deleteTeamMemberAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default teamSlice.reducer;
