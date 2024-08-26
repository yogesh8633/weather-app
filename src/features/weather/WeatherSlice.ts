// src/features/weather/weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCoordinates, fetchWeatherByLocalityId } from '../../utils/fetchWeather';

interface WeatherState {
  searchQuery: string;
  weatherData: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  searchQuery: '',
  weatherData: null,
  status: 'idle',
  error: null,
};

export const getWeatherByCoordinates = createAsyncThunk(
  'weather/fetchByCoordinates',
  async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    return await fetchWeatherByCoordinates(latitude, longitude);
  }
);

export const getWeatherByLocalityId = createAsyncThunk(
  'weather/fetchByLocalityId',
  async (localityId: string) => {
    return await fetchWeatherByLocalityId(localityId);
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCoordinates.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWeatherByCoordinates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(getWeatherByCoordinates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(getWeatherByLocalityId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWeatherByLocalityId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(getWeatherByLocalityId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { setSearchQuery } = weatherSlice.actions;
export default weatherSlice.reducer;
