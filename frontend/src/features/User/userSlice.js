import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Register API
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      };
      const { data } = await axios.post("/api/v1/register", userData, config);
      console.log("Registration data", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed. Please try again later"
      );
    }
  }
);

// Login API
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );
      console.log("Login data", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed. Please try again later"
      );
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (__, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load User Profile"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (__, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/logout", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      };

      const { data } = await axios.put(
        "/api/v1/profile/update",
        userData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Profile Update failed. Please try again later."
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Registration cases
    builder
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(register.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message ||
            "Registration failed. Please try again later");
        state.user = null;
        state.isAuthenticated = false;
      });

    // Login cases
    builder
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        console.log(state.user);
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Login failed. Please try again later");
        state.user = null;
        state.isAuthenticated = false;
      });

    // Loading User
    builder
      .addCase(loadUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(loadUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Failed to load user profile");
        state.user = null;
        state.isAuthenticated = false;
      });

    // Logout cases
    builder
      .addCase(logout.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(logout.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null), (state.user = null);
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Logout Failed");
      });

    // Update User Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.user = action.payload?.user || null;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message ||
            "Profile Update failed. Please try again later.");
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
