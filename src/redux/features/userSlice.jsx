"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    const response = await fetch(
      "https://we-ticket-backend.vercel.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    if (!response.ok) {
      return rejectWithValue(new Error("Failed to signup"));
    }

    const result = await response.json();
    localStorage.setItem("user", JSON.stringify(result));
    return result;
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (signupData, { rejectWithValue }) => {
    const response = await fetch(
      "https://we-ticket-backend.vercel.app/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );

    if (!response.ok) {
      return rejectWithValue(new Error("Failed to login"));
    }
    const result = await response.json();
    localStorage.setItem("user", JSON.stringify(result));
    return result;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
  },
});

export default userSlice.reducer;
