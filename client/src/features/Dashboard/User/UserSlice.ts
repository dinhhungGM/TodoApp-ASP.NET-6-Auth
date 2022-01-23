import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";
import Toast from "../../../utils/Toast";

export interface User {
  userId: string;
  username: string;
  password: string;
  role: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

export const fetchUsersAsync = createAsyncThunk(
  "user/fetchUsers",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/users");
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const addUserAsync = createAsyncThunk(
  "user/addUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/users", data);
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/users/${data.userId}`, data);
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/users/${data.userId}`);
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action: any) => {
        state.users = action.payload.data;
        state.loading = false;
      })
      .addCase(addUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action: any) => {
        state.loading = false;
        Toast.fire({
          icon: "error",
          title: "Error",
          text: action.payload.response || "Something went wrong",
        });
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user: User) => user.userId === action.payload.data.userId
        );
        state.users[index] = action.payload.data;
      })
      .addCase(updateUserAsync.rejected, (state, action: any) => {
        state.loading = false;
        Toast.fire({
          icon: "error",
          title: "Error",
          text: action.payload.response || "Something went wrong",
        });
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user: User) => user.userId === action.payload.data.userId
        );
        state.users.splice(index, 1);
      })
      .addCase(deleteUserAsync.rejected, (state, action: any) => {
        state.loading = false;
        Toast.fire({
          icon: "error",
          title: "Error",
          text: action.payload.response || "Something went wrong",
        });
      });
  },
});


export default userSlice.reducer;