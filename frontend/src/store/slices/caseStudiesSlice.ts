import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getCaseStudies, 
  createCaseStudy, 
  updateCaseStudy, 
  deleteCaseStudy 
} from '../../services/api';
import { CaseStudy } from '../../types';

interface CaseStudiesState {
  caseStudies: CaseStudy[];
  loading: boolean;
  error: string | null;
}

const initialState: CaseStudiesState = {
  caseStudies: [],
  loading: false,
  error: null,
};

export const fetchCaseStudies = createAsyncThunk(
  'caseStudies/fetchCaseStudies',
  async (_, { rejectWithValue }) => {
    try {
      return await getCaseStudies();
    } catch (error) {
      return rejectWithValue('Failed to fetch case studies');
    }
  }
);

export const addCaseStudy = createAsyncThunk(
  'caseStudies/addCaseStudy',
  async (caseStudyData: Omit<CaseStudy, 'id'>, { rejectWithValue }) => {
    try {
      return await createCaseStudy(caseStudyData);
    } catch (error) {
      return rejectWithValue('Failed to add case study');
    }
  }
);

export const updateCaseStudyAction = createAsyncThunk(
  'caseStudies/updateCaseStudy',
  async ({ id, data }: { id: number, data: Partial<CaseStudy> }, { rejectWithValue }) => {
    try {
      return await updateCaseStudy(id, data);
    } catch (error) {
      return rejectWithValue('Failed to update case study');
    }
  }
);

export const deleteCaseStudyAction = createAsyncThunk(
  'caseStudies/deleteCaseStudy',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCaseStudy(id);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete case study');
    }
  }
);

const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Case Studies
      .addCase(fetchCaseStudies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.loading = false;
        state.caseStudies = action.payload;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add Case Study
      .addCase(addCaseStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCaseStudy.fulfilled, (state, action) => {
        state.loading = false;
        state.caseStudies.push(action.payload);
      })
      .addCase(addCaseStudy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Case Study
      .addCase(updateCaseStudyAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCaseStudyAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.caseStudies.findIndex(cs => cs.id === action.payload.id);
        if (index !== -1) {
          state.caseStudies[index] = action.payload;
        }
      })
      .addCase(updateCaseStudyAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete Case Study
      .addCase(deleteCaseStudyAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCaseStudyAction.fulfilled, (state, action) => {
        state.loading = false;
        state.caseStudies = state.caseStudies.filter(cs => cs.id !== action.payload);
      })
      .addCase(deleteCaseStudyAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default caseStudiesSlice.reducer;
