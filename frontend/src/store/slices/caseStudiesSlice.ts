import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  description: string;
  client_name: string;
  client_industry: string;
  challenge: string;
  solution: string;
  results: string;
  image?: string;
  order?: number;
}

interface CaseStudiesState {
  caseStudies: CaseStudy[];
  loading: boolean;
  error: string | null;
}

const initialState: CaseStudiesState = {
  caseStudies: [],
  loading: false,
  error: null
};

export const fetchCaseStudies = createAsyncThunk(
  'caseStudies/fetchCaseStudies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/case-studies/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const createCaseStudy = createAsyncThunk(
  'caseStudies/createCaseStudy',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/case-studies/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error: any) {
      console.error('Create Case Study Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const updateCaseStudy = createAsyncThunk(
  'caseStudies/updateCaseStudy',
  async ({ id, data }: { id: number, data: FormData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/case-studies/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error: any) {
      console.error('Update Case Study Error:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const deleteCaseStudy = createAsyncThunk(
  'caseStudies/deleteCaseStudy',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/case-studies/${id}/`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(createCaseStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCaseStudy.fulfilled, (state, action) => {
        state.loading = false;
        state.caseStudies.push(action.payload);
      })
      .addCase(createCaseStudy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCaseStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCaseStudy.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.caseStudies.findIndex(cs => cs.id === action.payload.id);
        if (index !== -1) {
          state.caseStudies[index] = action.payload;
        }
      })
      .addCase(updateCaseStudy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCaseStudy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCaseStudy.fulfilled, (state, action) => {
        state.loading = false;
        state.caseStudies = state.caseStudies.filter(cs => cs.id !== action.payload);
      })
      .addCase(deleteCaseStudy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default caseStudiesSlice.reducer;
