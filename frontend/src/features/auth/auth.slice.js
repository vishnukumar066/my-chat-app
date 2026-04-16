import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { connectSocket, disconnectSocket } from "../../lib/socket.js";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk(
  "user/me",
  async (__dirname, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/user/me");
      connectSocket(res.data.user);
      return res.data.user;
    } catch (error) {
      console.log("Error while fetching users", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user",
      );
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.get("/user/logout");
      disconnectSocket();
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
)

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/user/login", data); 

    connectSocket(res.data);

    toast.success(res?.data?.message || "Logged in Successssss"); 

    return res.data; 
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});


export const register = createAsyncThunk("user/register", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/user/register", data);

    connectSocket(res.data);

    toast.success(res?.data?.message || "sign in Successssss");

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Account Creating failed");
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});


export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/user/update-profile", data);

      toast.success(res?.data?.message || "update Successssss");

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Updation failed");
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
  },
  reducers: {
    setonlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.authUser = state.authUser;
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
      })
      .addCase(register.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isSigningUp = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isUpdatingProfile = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
      });
  },
});

export const { setonlineUsers } = authSlice.actions;
export default authSlice.reducer;
