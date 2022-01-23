import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosClient from "../../utils/axiosClient";
import Toast from "../../utils/Toast";

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  username: string;
  userId: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  username: "",
  userId: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/auth/login", data);
      return response;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/auth/register", data);
      return response;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const validateTokenAsync = createAsyncThunk(
  "auth/validateToken",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/auth");
      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state: AuthState) => {
      state.authenticated = false;
      state.username = "";
      localStorage.removeItem("token");
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        Toast.fire({
          icon: "success",
          title: "Login Successful",
        });
        const token: any = action.payload;
        localStorage.setItem("token", token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
        const error: any = action.payload || "Login failed";
        Toast.fire({
          icon: "error",
          title: error,
        });
      })
      .addCase(validateTokenAsync.fulfilled, (state, action) => {
        const payload: any = action.payload;
        if (payload === undefined) {
          state.authenticated = false;
          state.username = "";
        } else {
          state.username = payload.username;
          state.userId = payload.userId;
          state.authenticated = true;
        }
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;

        Toast.fire({
          icon: "success",
          title: "Register Successful",
        });
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        const error: any = action.payload || "Register failed";
        Toast.fire({
          icon: "error",
          title: error,
        });
      });
  },
});

export const {logout} = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectUserId = (state: RootState) => state.auth.userId;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;