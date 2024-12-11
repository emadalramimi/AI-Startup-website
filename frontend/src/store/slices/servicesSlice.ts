import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService 
} from '../../services/api';
import { Service } from '../../types';

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getServices();
      // Handle different possible response structures
      return Array.isArray(response) 
        ? response 
        : (response.results || response.data || []);
    } catch (error) {
      return rejectWithValue('Failed to fetch services');
    }
  }
);

export const addService = createAsyncThunk(
  'services/addService',
  async (serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>, { rejectWithValue }) => {
    try {
      return await createService(serviceData);
    } catch (error: any) {
      console.error('Add service error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Extract more specific error message if available
      const errorMessage = 
        error.response?.data?.detail || 
        error.response?.data?.message || 
        'Failed to add service';
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateServiceAction = createAsyncThunk(
  'services/updateService',
  async ({ id, data }: { id: number, data: Partial<Service> }, { rejectWithValue }) => {
    try {
      return await updateService(id, data);
    } catch (error) {
      return rejectWithValue('Failed to update service');
    }
  }
);

export const deleteServiceAction = createAsyncThunk(
  'services/deleteService',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteService(id);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete service');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateServiceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateServiceAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteServiceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceAction.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(service => service.id !== action.payload);
      })
      .addCase(deleteServiceAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default servicesSlice.reducer;
