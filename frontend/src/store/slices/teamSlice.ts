import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TeamMember } from '../../types';
import { 
  fetchTeamMembersAPI, 
  addTeamMemberAPI, 
  updateTeamMemberAPI, 
  deleteTeamMemberAPI 
} from '../../services/api';

// Async Thunks
export const fetchTeamMembers = createAsyncThunk(
  'team/fetchTeamMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTeamMembersAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTeamMember = createAsyncThunk(
  'team/addTeamMember',
  async (memberData: Omit<TeamMember, 'id'>, { rejectWithValue }) => {
    try {
      const response = await addTeamMemberAPI(memberData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTeamMemberAction = createAsyncThunk(
  'team/updateTeamMember',
  async ({ id, data }: { id: number, data: Partial<TeamMember> }, { rejectWithValue }) => {
    try {
      const response = await updateTeamMemberAPI(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTeamMemberAction = createAsyncThunk(
  'team/deleteTeamMember',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteTeamMemberAPI(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
interface TeamState {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teamMembers: [],
  loading: false,
  error: null
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Team Members
    builder.addCase(fetchTeamMembers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTeamMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.teamMembers = action.payload;
    });
    builder.addCase(fetchTeamMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Team Member
    builder.addCase(addTeamMember.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTeamMember.fulfilled, (state, action) => {
      state.loading = false;
      state.teamMembers.push(action.payload);
    });
    builder.addCase(addTeamMember.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Team Member
    builder.addCase(updateTeamMemberAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTeamMemberAction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.teamMembers.findIndex(member => member.id === action.payload.id);
      if (index !== -1) {
        state.teamMembers[index] = action.payload;
      }
    });
    builder.addCase(updateTeamMemberAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Team Member
    builder.addCase(deleteTeamMemberAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTeamMemberAction.fulfilled, (state, action) => {
      state.loading = false;
      state.teamMembers = state.teamMembers.filter(member => member.id !== action.payload);
    });
    builder.addCase(deleteTeamMemberAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export default teamSlice.reducer;
