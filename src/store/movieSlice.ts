import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_SECRET_KEY;

export interface MovieState {
  movies: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// Thunk untuk memanggil API dan mendapatkan data film
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`${API_URL}movie/popular`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
});

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

