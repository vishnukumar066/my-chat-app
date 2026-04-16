import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../lib/axios.js";

export const getUsers = createAsyncThunk(
  "chat/getUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/message/users");
      return res.data.users;
    } catch (error) {
      toast.error(error?.response?.data?.message || "getting users failed");
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error getting all users",
      );
    }
  },
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/message/get-messages/${userId}`);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "getting messages failed");
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error getting messages",
      );
    }
  },
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      const { chat } = thunkAPI.getState();
      const res = await axiosInstance.post(
        `/message/send-message/${chat.selectedUser._id}`,
        messageData,
      );
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "sending message failed");
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Error sending message",
      );
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    pushNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.users = [];
        state.isUsersLoading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = Array.isArray(action.payload)
          ? action.payload
          : action.payload.messages || [];
        state.isMessagesLoading = false;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const messageData = action.payload.message || action.payload;
        state.messages.push(messageData);
      });
  },
});

export const { setSelectedUser, pushNewMessage } = chatSlice.actions;
export default chatSlice.reducer;
